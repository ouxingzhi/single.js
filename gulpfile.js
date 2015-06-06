
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var minifyhtml = require('gulp-html-minifier');
var r = require('gulp-seajs-r');

var src = './src';

var build = './build'

// gulp.task('default',function(){
// 	return gulp.src(src + '/**',{base:'./src'})
// 		.pipe(r());
// 	console.log(module);

// });

gulp.task('build.min.js',['clean'],function(){
	return gulp.src([src + '/**/*.js'],{base:src})
		.pipe(r())
		.pipe(uglify({
            mangle: {except: ['require','$super']}
        }))
		.pipe(gulp.dest(build));
});

gulp.task('build.min.html',['clean'],function(){
	return gulp.src([src + '/**/*.html'])
		.pipe(minifyhtml({collapseWhitespace: true}))
		.pipe(gulp.dest(build));
});

gulp.task('build.pack.js',['clean'],function(){
	return gulp.src([src + '/**/*.js',src + '/**/*.html'],{base:src})
		.pipe(r())
		.pipe(uglify({
            mangle: {except: ['$super']}
        }))
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest(build));
});

gulp.task('minify.css',['clean'],function(){
	return gulp.src(src + '/**/*.css')
		.pipe(minifycss())
		.pipe(gulp.dest('./build'));
});

gulp.task('clean',function(){
	return gulp.src(build,{read:false})
		.pipe(clean());
});


gulp.task('default',['build.min.js','build.pack.js','build.min.html','minify.css']);