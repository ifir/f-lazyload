var gulp = require('gulp'),
	changed = require('gulp-changed'),
	uglify = require('gulp-uglify'),
	plumber = require('gulp-plumber'),
	clean = require('gulp-clean'),
	rename = require('gulp-rename'),
	runSequence = require('run-sequence'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;

var jsPath = './src/*.js',
	htmlPath = './test/*.html';

//gulp dev
gulp.task('dev', function(callback) {
	runSequence(
		'clean',
		'browser-sync',
		callback
	)
});
//gulp build
gulp.task('build', function(callback) {
	runSequence(
		'clean',
		'min:js',
		callback
	)
});
//clean
gulp.task('clean', function(){
	return gulp.src('dist', {
			read: false
		})
		.pipe(clean());
});
gulp.task('js', function(){
	return gulp.src(jsPath)
		.pipe(changed(jsPath))
		.pipe(plumber())
		.pipe(gulp.dest('./dist'))
		.pipe(reload({
			stream: true
		}))
});
gulp.task('html', function(){
	return gulp.src(htmlPath)
		.pipe(changed(htmlPath))
		.pipe(plumber())
		.pipe(gulp.dest('./dist'))
		.pipe(reload({
			stream: true
		}))
});
gulp.task('min:js', function(){
	return gulp.src(jsPath)
		.pipe(gulp.dest('./dist'))
		.pipe(uglify())
		.pipe(rename({
			    dirname: ".",
			    basename: "f-lazyload",
			    suffix: ".min",
			    extname: ".js"
		}))
		.pipe(gulp.dest('./dist'))
});
//browser-sync
gulp.task('browser-sync', ['js', 'html'], function() {
	browserSync.init({
		//browser: "google chrome",
		server: {
			baseDir: "./dist"//多个基目录
		},
		port: 3000 //default 3000
			/*logFileChanges: true,
			logConnections: true*/
	});
	gulp.watch(jsPath, ['js']);
	gulp.watch(htmlPath, ['html']);
});