const usage = require('../');

usage({
	'one': (nextArgvIndex) => {
		console.log('ONE', nextArgvIndex);
	},

	'two': {
		options: 'ARG0',
		callback: (nextArgvIndex) => {
			console.log('TWO', nextArgvIndex);
		}
	},

	'three': {
		options: 'ARG0',
		description: 'Description',
		callback: (nextArgvIndex) => {
			return usage({
				'four': (nextArgvIndex) => {
					console.log('FOUR', nextArgvIndex);
				},

				'five': {
					usage: {
						'six': (nextArgvIndex) => {
							console.log('SIX', nextArgvIndex);
						},
					}
				}
			}, nextArgvIndex);
		}
	}
});
