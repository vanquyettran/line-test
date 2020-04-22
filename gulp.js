require('./gulpfile');
const gulp = require('gulp');
const args = process.argv.slice(2);
const commandOpt = args[0];

if (commandOpt === '--dist') {
    runTask('dist');
    return;
}

{
    runTask('build');
}

function runTask(task) {
    console.log(`gulp ${task} start`);
    gulp.task(task)(() => console.log(`gulp ${task} done`));
}
