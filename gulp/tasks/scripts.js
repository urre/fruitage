var gulp = require('gulp');
var size = require('gulp-size');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var plumber = require('gulp-plumber');
var config  = require('../config').basePaths;

/*-------------------------------------------------------------------
Concatinate, uglify
-------------------------------------------------------------------*/
gulp.task('scripts', function() {
    gulp.src([
      config.scripts.base + 'bling.js',
      config.scripts.base + 'fruitage-test.js'
    ])
    .pipe(plumber())
    .on('error', function(err) {
        console.log(err.message);
    })
    .pipe(concat('fruitage.js'))
    //.pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest(config.scripts.dist))
});