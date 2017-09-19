/* global Module */

/* Magic Mirror
 * Module: {{MODULE_NAME}}
 *
 * By {{AUTHOR_NAME}}
 * {{LICENSE}} Licensed.
 */



Module.register("MMM-Voice-Control-Sonus", {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000,
    language: "en",
    voice: "UK English Male",
    welcomeMesasage: "What can I do for you . Say smart mirror What can I say?  to see a list of commands",
    animationSpeed: 2000,
    voiceTextRestTimeout: 3000, // 3 seconds
    listOfCommandsNotificationTime: 10000 // 10 seconds
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;

		if (this.config.projectId === undefined) {
			texts.push("projectId must be set in the config before using sonus!");
		}

		if (this.config.keyFilename === undefined) {
			texts.push("keyFilename must be set in the config before using sonus!");
		}

    if (responsiveVoice) {
      //responsiveVoice.setDefaultVoice(this.config.voice);
Log.log("voicesupport", responsiveVoice.voiceSupport());
responsiveVoice.setDefaultVoice("US English Female");
Log.log("isPlaying", responsiveVoice.isPlaying());
      responsiveVoice.speak("hello how are you");
    }

if(responsiveVoice.isPlaying()) {
  console.log("I hope you are listening");
}
		//Flag for check if module is loaded
		this.loaded = false;
		//this.interimResult = self.translate("home").commands;
		this.readableCommands = {
			header: this.interimResult,
			commands: []
		};
		//this.registerCommand();
		this.sendSocketNotification("CONFIG", this.config);
	},

	registerCommand: function() {
		for (var commandId in this.translate("commands")) {
		  if (this.translate("commands").hasOwnProperty(commandId)) {
				this.readableCommands.commands.push(this.translate("commands")[commandId].text + ": " + this.translate("commands")[commandId].description);
		  }
		}
	},
	/*
	 * getData
	 * function example return data and show it in the module wrapper
	 * get a URL request
	 *
	 */
	getData: function() {
		var self = this;

		var urlApi = "https://jsonplaceholder.typicode.com/posts/1";
		var retry = true;

		var dataRequest = new XMLHttpRequest();
		dataRequest.open("GET", urlApi, true);
		dataRequest.onreadystatechange = function() {
			console.log(this.readyState);
			if (this.readyState === 4) {
				console.log(this.status);
				if (this.status === 200) {
					self.processData(JSON.parse(this.response));
				} else if (this.status === 401) {
					self.updateDom(self.config.animationSpeed);
					Log.error(self.name, this.status);
					retry = false;
				} else {
					Log.error(self.name, "Could not load data.");
				}
				if (retry) {
					self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
				}
			}
		};
		dataRequest.send();
	},


	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update.
	 *  If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
			self.getData();
		}, nextLoad);
	},

	getDom: function() {
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		// If this.dataRequest is not empty
		if (this.dataRequest) {
			var wrapperDataRequest = document.createElement("div");
			// check format https://jsonplaceholder.typicode.com/posts/1
			wrapperDataRequest.innerHTML = this.dataRequest.title;

			var labelDataRequest = document.createElement("label");
			// Use translate function
			//             this id defined in translations files
			labelDataRequest.innerHTML = this.translate("TITLE");


			wrapper.appendChild(labelDataRequest);
			wrapper.appendChild(wrapperDataRequest);
		}

		// Data from helper
		if (this.dataNotification) {
			var wrapperDataNotification = document.createElement("div");
			// translations  + datanotification
			wrapperDataNotification.innerHTML =  this.translate("UPDATE") + ": " + this.dataNotification.date;

			wrapper.appendChild(wrapperDataNotification);
		}
		return wrapper;
	},

	getScripts: function() {
		return ['http://code.responsivevoice.org/responsivevoice.js', 'moduleNotifications.js'];
	},

	getStyles: function () {
		return [
			"MMM-Voice-Control-Sonus.css",
		];
	},

	// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},

	processData: function(data) {
		var self = this;
		this.dataRequest = data;
		if (this.loaded === false) { self.updateDom(self.config.animationSpeed) ; }
		this.loaded = true;

		// the data if load
		// send notification to helper
		this.sendSocketNotification("MMM-Voice-Control-Sonus-NOTIFICATION_TEST", data);
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
   receivedNotification(this,notification,payload);
  // this.dataNotification = payload;
  // this.updateDom();
	},
});
