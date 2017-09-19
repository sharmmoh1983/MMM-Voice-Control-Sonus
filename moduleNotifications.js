function receivedNotification(scope,type,payload) {

	switch (type) {
       case "list":
			 		scope.sendNotification("SHOW_ALERT", {
			 			title: "Commands",
			 			message: scope.readableCommands.commands.join("</p><p>"),
			 			timer: scope.config.listOfCommandsNotificationTime
			 		});
          break;
       case "dublinbus_start":
           scope.sendNotification("DUBLINBUS_START");
           break;
       case "sleep":
			 		MM.getModules().enumerate(function(module) {
						module.hide(1000);
					});
         break;
       case "wake_up":
			 		MM.getModules().enumerate(function(module) {
				 	module.show(1000);
			 		});
           break;
       case "SHOW_MAP":
          Log.log("SHOW_MAP");
          scope.sendNotification("SHOW_MAP");
           break;
      case "HIDE_MAP":
          Log.log("HIDE_MAP");
          scope.sendNotification("HIDE_MAP");
           break;
case "SHOW_VIDEO":
          Log.log("SHOW_VIDEO");
          scope.sendNotification("SHOW_VIDEO");
           break;
case "REMOVE_VIDEO":
          Log.log("REMOVE_VIDEO");
          scope.sendNotification("REMOVE_VIDEO");
           break;
case "SHOW_EVENTS":
          Log.log("SHOW_EVENTS");
          scope.sendNotification("SHOW_EVENTS");
           break;
case "HIDE_EVENTS":
          Log.log("HIDE_EVENTS");
          scope.sendNotification("HIDE_EVENTS");
           break;
   }
}
