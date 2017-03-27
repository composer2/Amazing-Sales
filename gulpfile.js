const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const transpile = require('gulp-babel');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

gulp.task('build-js', () => {
    return gulp.src('build/**/*.js')
        .pipe(transpile({ presets: ['es2015'] }))
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('dist/'))
});



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

gulp.task('default', ['build-js', 'minify-css']);