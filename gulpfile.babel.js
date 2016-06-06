'use strict';

import gulp from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import minifycss from 'gulp-minify-css';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import reload from 'gulp-livereload';
import connect from 'gulp-connect';
import uglify from 'gulp-uglify';
import jshint from 'gulp-jshint';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import babel from 'gulp-babel';

import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';


import watch from 'gulp-watch';

gulp.task('styles', function() {
	return gulp.src('build/less/*.less')
	.pipe(less())
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(minifycss())
	.pipe(gulp.dest('assets/css'))
	.pipe(connect.reload())
	.pipe(notify({
		message: 'css!'
	}));
});

gulp.task('img', function () {
	return gulp.src('build/img/*')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest('assets/img'))
	.pipe(connect.reload())
	.pipe(notify({
		message: 'img`s!'
	}));
});

gulp.task('connect', function() {
	connect.server({
		root: '',
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('*.html')
	.pipe(connect.reload())
	.pipe(notify({
		message: 'html!'
	}));
});

gulp.task('scripts', function() {
	var bundler = browserify('build/js/my/app.js');
	bundler.transform(babelify);

	bundler.bundle()
	.on('error', function (err) { console.error(err); })
	.pipe(source('app.js'))
	.pipe(buffer())
	/*.pipe(rename({suffix: '.min'}))
	.pipe(uglify()) */
	.pipe(gulp.dest('assets/js'))
	.pipe(connect.reload())
	.pipe(notify({ message: 'app.js' }));
});


gulp.task('watch', function () {
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['build/js/my/*.js'], ['scripts']);
	gulp.watch(['build/less/*.less'], ['styles']);
	gulp.watch(['build/img/*'], ['img']);
});

gulp.task('default', ['connect', 'watch']);



