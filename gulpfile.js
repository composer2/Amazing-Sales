const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

gulp.task('compile:scss', () => {
    return gulp
        .src(['scss/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('compiledSCSS'))
});

gulp.task('minify-css', () => {
    return gulp
        .src(['css/**/*.css'])
        .pipe(cleanCSS())
        .pipe(gulp.dest('minifiedCSS'))
});