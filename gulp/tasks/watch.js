var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var config  = require('../config').basePaths;

gulp.task('serve', ['sass', 'scripts', 'browser-sync'], function() {
    gulp.watch([config.scss.src], ['sass'], ['bs-reload']);
    gulp.watch([config.scripts.base+'*.js'], ['scripts'], ['bs-reload']);
});
