const path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');

{
    gulp.task('build', gulp.parallel(buildIconfont));
    gulp.task('dist', gulp.parallel(distIconfont));

    const fontName = 'iconfont';
    const cssClass = 'icon';
    const src = path.resolve(__dirname, './src/icons/**/*.svg');
    const fontDir = path.resolve(__dirname, `../public/bundles/${fontName}/`);
    const cssFilePath = path.resolve(__dirname, `../public/bundles/${fontName}.css`);
    const cssCleanedDir = path.resolve(__dirname, `../public/bundles/`);

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
            .on('end', () => done());
    }

    function distIconfont(done) {
        buildIconfont(() => {
            gulp.src(cssFilePath)
                .pipe(cleanCSS())
                .pipe(rename(`${fontName}.min.css`))
                .pipe(gulp.dest(cssCleanedDir))
                .on('end', () => done());
        });
    }
}
