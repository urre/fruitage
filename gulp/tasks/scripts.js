var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var config  = require('../config').basePaths;

gulp.task('scripts', function() {
    gulp.src([
      config.scripts.base + 'jquery.min.js',
      config.scripts.base + 'fruitage.js'
    ])
    .pipe(plumber())
    .on('error', function(err) {
        console.log(err.message);
    })
    .pipe(concat('fruitage.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.scripts.dist))
});
