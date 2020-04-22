const webpack = require('webpack');
const moment = require('moment');
const args = process.argv.slice(2);
const config = require('./webpack.config');
const commandOpt = args[0];

if (commandOpt === '--watch') {
    webpack(config).watch({}, (err, stats) => {
        logResult(moment().format('hh:mm:ss') + ' webpack is watching...', err, stats);
    });
    return;
}

if (commandOpt === '--min') {
    config.optimization.minimize = true;
    config.output.filename = '[name].min.js';

    webpack(config).run((err, stats) => {
        logResult('webpack --min done.', err, stats);
    });
    return;
}

webpack(config).run((err, stats) => {
    logResult('webpack done.', err, stats);
});

function logResult(name, err, stats) {
    console.log(name);

    if (err) {
        console.error(err);
        return;
    }

    if (stats.compilation.errors.length > 0) {
        console.error(stats.compilation.errors);
        return;
    }

    // show bundle files
    let i = 0;
    for (let assetName in stats.compilation.assets) {
        if (!stats.compilation.assets.hasOwnProperty(assetName)) {
            continue;
        }
        console.log((i === 0 ? '---> ' : '     ') + stats.compilation.assets[assetName].existsAt);
        i++;
    }
}
