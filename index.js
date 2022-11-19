const Fs = require('fs');
const Path = require('path');

// ----------
// USAGE
// ----------

function usage(config, argvIndex = 2) {
	return Promise.resolve().then(() => {
		const argv = process.argv[argvIndex];
		if (!argv || !config[argv]) {

			const prefix = process.argv.slice(2, argvIndex).reduce((acc, cur) => {
				acc.push(cur);
				return acc;
			}, [
				'node',
				Fs.lstatSync(process.argv[1]).isDirectory()
					? 'index'
					: Path.basename(process.argv[1], Path.extname(process.argv[1]))
			]).join(' ');

			const commands = Object.keys(config).map((key) => {
				const value = config[key];
				return [
					[
						key,
						...typeof value !== 'object' || !value.options
							? []
							: !Array.isArray(value.options)
								? [value.options]
								: value.options
					].join(' '),

					typeof value !== 'object' || !value.description
						? ''
						: value.description
				];
			});

			const padding = Math.max(...commands.map((command) => {
				return command[0].length;
			})) + 3;

			console.group('Usage:');
			for (const command of commands) {
				console.log(prefix, command[0].padEnd(padding), command[1]);
			}
			console.groupEnd();
			console.log();

			return;
		}

		const callback = typeof config[argv] !== 'object'
			? config[argv]
			: config[argv].callback || ((nextAgvIndex) => {
				return usage(config[argv].usage, nextAgvIndex);
			});

		return callback(argvIndex + 1);
	});
}

// ----------
// EXPORTS
// ----------

module.exports = usage;
