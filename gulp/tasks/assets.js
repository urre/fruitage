var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');
var pngquant = require('imagemin-pngquant');
var jpegtran = require('imagemin-jpegtran');
var gifsicle = require('imagemin-gifsicle');
var config  = require('../config').basePaths;

/*-------------------------------------------------------------------
Minify images
-------------------------------------------------------------------*/
gulp.task('optimize-images', function () {
	return gulp.src([config.images.base+"*.jpg", config.images.base+"*.jpeg", config.images.base+"*.gif", config.images.base+"*.png"])
	.pipe(size())
	.pipe(imagemin({
		progressive: false,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant(), jpegtran(), gifsicle()]
	}))
	.pipe(size())
	.pipe(gulp.dest(config.site.dist));
});