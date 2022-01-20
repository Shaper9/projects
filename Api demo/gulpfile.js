const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');

// GUGLOVATI NPM GULP-AUTOPREFIXER i koristiti to a ne ovo :()

function style() {
    const plugins = [autoprefixer({ cascade: false })]
    // 1. where is my scss
    return gulp.src('style.scss')
        // 2. pass that file through sass compailer
        .pipe(sass().on('error', sass.logError))
        // Autoprefix for other browsers
        .pipe(postcss(plugins))
        // 3. where do i save the compiled css
        .pipe(gulp.dest('./'))
        // 4. Stream cahnges to all browsers
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('*.scss', style);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;