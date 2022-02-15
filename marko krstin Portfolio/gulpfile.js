const gulp = require('gulp');
// const sass = require('gulp-sass');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// compile scss to css

function style() {
    // 1. where is my scss
    return gulp.src('*.scss')
        // 2. pass that file through sass compailer
        .pipe(sass().on('error', sass.logError))
        // 3. where do i save the compiled css
        .pipe(gulp.dest('./css'))
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