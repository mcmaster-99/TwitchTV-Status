var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
gulp.task('default', ['coffee', 'js']);


gulp.task('copy', function(){
	gulp.src('index.html')
	.pipe(gulp.dest('assets'))
});

gulp.task('log', function(){
	gutil.log('== My Log Task ==')
});

gulp.task('sass', function(){
	gulp.src('styles/style.scss')
	.pipe(sass({style: 'expanded'}))
		.on('error', gutil.log)
	.pipe(gulp.dest('assets'))
});

gulp.task('coffee', function(){
	gulp.src('scripts/hello.coffee')
	.pipe(coffee({bare: true})
		.on('error', gutil.log))
	.pipe(gulp.dest('scripts'))
});

gulp.task('js', function(){
	gulp.src('scripts/*.js')
	.pipe(uglify())
	.pipe(concat('script.js'))
	.pipe(gulp.dest('assets'))
});

gulp.task('watch', function(){
	gulp.watch('scripts/hello.coffee', ['coffee']);
	gulp.watch('scripts/*.js', ['js']);
	gulp.watch('styles/*.scss', ['sass']);
});

gulp.task('connect', function() {
	connect.server({
		root: '.',
		livereload: true
	})
});