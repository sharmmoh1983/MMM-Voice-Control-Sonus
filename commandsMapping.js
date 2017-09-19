function CommandManager(scope, annyang) {

	scope.registerCommand(scope,annyang,'list', function() {
		scope.sendNotification("SHOW_ALERT", {
			title: "",
			message: scope.readableCommands.commands.join("</p><p>"),
			timer: scope.config.listOfCommandsNotificationTime
		});
	});

	scope.registerCommand(scope,annyang,'sleep', function() {
		MM.getModules().enumerate(function(module) {
			module.hide(1000);
		});
	});

	scope.registerCommand(scope,annyang,'wake_up', function() {
		MM.getModules().enumerate(function(module) {
			module.show(1000);
		});
	});

	scope.registerCommand(scope,annyang,'dublinbus_start', function() {
		scope.sendNotification("DUBLINBUS_START");
	});

	scope.registerCommand(scope,annyang,'dublinbus_stop', function() {
		scope.sendNotification("DUBLINBUS_STOP");
	});
}

