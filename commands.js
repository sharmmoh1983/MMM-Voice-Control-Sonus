module.exports = function(scope) {
	const commands = {
		'What can I say': function () {
			console.log('You will obey');
			scope.sendSocketNotification('list', "list");
		},
		'(give me) :flavor ice cream': function (flavor) {
			console.log('Fetching some ' + flavor + ' ice ceam for you sr')
		},
		'show me map': function () {
			console.log('Map triggered');
			scope.sendSocketNotification('SHOW_MAP', "Map");
		},
		'turn (the)(lights) :state (the)(lights)': function (state) {
			console.log('Turning the lights', (state == 'on') ? state : 'off')
		},

		'remove map': function () {
			console.log('Map triggered');
			scope.sendSocketNotification('HIDE_MAP', "Map");
		},
               'play video': function () {
			console.log('Map triggered');
			scope.sendSocketNotification('SHOW_VIDEO', "Map");
		},
               'stop video': function () {
			console.log('Map triggered');
			scope.sendSocketNotification('REMOVE_VIDEO', "Map");
		},
               'show me events': function () {
			console.log('events triggered');
			scope.sendSocketNotification('SHOW_EVENTS', "Map");
		},
               'remove events': function () {
			console.log('events triggered');
			scope.sendSocketNotification('HIDE_EVENTS', "Map");
		},
               'remove event': function () {
			console.log('events triggered');
			scope.sendSocketNotification('HIDE_EVENTS', "Map");
		}

	}
	return commands;
};
