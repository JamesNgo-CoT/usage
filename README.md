# usage

Version 1.0.0

Consolidate multiple single purpose scripts into one script that uses CLI options to execute the right script. When none of the option is selected a usage description is displayed.

## Installation

```
npm install git+https://github.com/JamesNgo-CoT/usage.git#1.0.0
```

## usage(config, argvIndex)

- config `object`
- argvIndex `number` Defaults: `2`.
- Return: `Promise`

``` JavaScript
const usage = require('usage');

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
}).then(() => {
	console.log('COMPLETED');
})
```

## config

Type: `object`

List possible argv found on `argvIndex` argument.

## config item

Type: `function` | `object`
- options `string` | `string[]`
- description `string`
- callback `function` Accepts `nextArgIndex` argument which points to the next `process.argv` item to determine options. Return value is returned by the `usage` function as the `Promise` resolved value.
- usage `object` Nesting usage configuration.
