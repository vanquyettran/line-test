const moment = require('moment');
const path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');

const buildTasks = [];
const distTasks = [];
const watchTasks = [];

{
    buildTasks.push(buildIconfont);
    distTasks.push(distIconfont);
    watchTasks.push(watchIconfont);

    const fontName = 'iconfont';
    const cssClass = 'icon';
    const src = path.resolve(__dirname, './src/icons/**/*.svg');
    const fontDir = path.resolve(__dirname, `../public/bundles/${fontName}/`);
    const cssFilePath = path.resolve(__dirname, `../public/bundles/${fontName}.css`);
    const cssMinDir = path.resolve(__dirname, `../public/bundles/`);

    function buildIconfont(done) {
        gulp.src(src)
            .pipe(iconfontCss({
                fontName: fontName,
                fontPath: fontName + '/',
                targetPath: cssFilePath,
                timestamp: Math.round(Date.now() / 1000),
                cssClass: cssClass,
            }))
            .pipe(iconfont({
                fontName: fontName,
                fontHeight: 10000,
                formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
                normalize: true,
                timestamp: Math.round(Date.now() / 1000),
            }))
            .pipe(gulp.dest(fontDir))
            .on('end', () => {
                console.log('---> ' + path.resolve(fontDir, '*'));
                console.log('     ' + cssFilePath);
                done();
            });
    }

    function distIconfont(done) {
        const minFileName = `${fontName}.min.css`;

        buildIconfont(() => {
            gulp.src(cssFilePath)
                .pipe(cleanCSS())
                .pipe(rename(minFileName))
                .pipe(gulp.dest(cssMinDir))
                .on('end', () => {
                    console.log(`     ` + path.resolve(cssMinDir, minFileName));
                    done();
                });
        });
    }

    function watchIconfont(done) {
        buildIconfont(() => {
            gulp.watch('src/icons/**/*.svg', {cwd: __dirname}).on('change', () => {
                console.log('[' + moment().format('hh:mm:ss') + '] gulp is watching...');
                buildIconfont(() => {});
            });
            done();
        });
    }
}

gulp.task('build', gulp.parallel(...buildTasks));
gulp.task('dist', gulp.parallel(...distTasks));
gulp.task('watch', gulp.parallel(...watchTasks));