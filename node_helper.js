/* Magic Mirror
 * Node Helper: {{MODULE_NAME}}
 *
 * By {{AUTHOR_NAME}}
 * {{LICENSE}} Licensed.
 */

var NodeHelper = require("node_helper");
var Sonus = require('sonus')
const SoundPlayer = require('soundplayer');
const ROOT_DIR = __dirname ;

module.exports = NodeHelper.create({

	socketNotificationReceived: function(notification, payload) {
		if (notification === "CONFIG") {
			console.log("Working notification system. Notification:", notification, "payload: ", payload);
			this.activateSonus(payload)
		}
	},

	activateSonus: function(config) {
  	var self = this;
		const speech = require('@google-cloud/speech')({
			projectId:   config.projectId,
			keyFilename:  ROOT_DIR + config.keyFilename
		})

		const hotwords = [{ file: ROOT_DIR + config.hotWordFile, hotword: config.hotword }]
		const sonus = Sonus.init({ 'hotwords':hotwords,language:'en-IN'}, speech);

		var commands = require('./commands')(self);

		Sonus.annyang.addCommands(commands)
		Sonus.start(sonus)
		sonus.on('hotword', (index, keyword) => {
        console.log("hotword triggered");
        new SoundPlayer().sound(ROOT_DIR  + '/resources/ding.wav');
		});
		sonus.on('partial-result', result => console.log("!p:", result))
		sonus.on('final-result', result => console.log("!f:", result))
		sonus.on('error', error => console.error("!e:", error))

	  self.sendSocketNotification('SONUS', sonus);
	}
});
