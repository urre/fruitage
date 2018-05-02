var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var cssmin = require('gulp-cssmin');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var config  = require('../config').basePaths;


gulp.task('sass', function() {
    gulp.src(config.scss.base+'fruitage.scss')
        .pipe(plumber())
        .on('error', function(err) {
            console.log(err.message);
        })
        .pipe(sass())
        .pipe(gulp.dest(config.scss.dist))
        .pipe(prefix({ browsers: ['last 2 version'] }))
        .pipe(cssmin())
        .pipe(gulp.dest(config.scss.dist))
        .pipe(reload({
            stream: true,
            once: true
        }))
});
