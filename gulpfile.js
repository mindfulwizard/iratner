var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var runSeq = require('run-sequence');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
//var sass = require('gulp-sass');
// var mocha = require('gulp-mocha');
// var babel = require('gulp-babel');


// Default
gulp.task('default', function() {
    gulp.start('build');

    gulp.watch(['client/pre-build/app.js', 'client/pre-build/**/*.js'], function() {
        runSeq('buildJS');
    });

    // gulp.watch(['client/pre-build/app.scss', 'client/pre-build/**/*.scss'], function() {
    //     runSeq('buildCSS');
    // });

    //gulp.watch(['client/**/*.html', 'server/*.html'], ['reload']);
    // gulp.watch(['server/**/*.js'], ['testServerJS']);
});

gulp.task('build', function() {
    runSeq(['buildJS']);
});

gulp.task('buildJS', function() {
    return gulp.src(['./pre-build/app.js', './pre-build/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'));
});