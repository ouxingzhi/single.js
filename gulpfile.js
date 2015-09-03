
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var minifyhtml = require('gulp-html-minifier');
var r = require('gulp-seajs-r');

var src = './src';

var build = './build';

var libs_src = './libs';

var libs_build = build + '/libs';

var prefix = 'SINGLE/';

var ignorejs = [
	'!' + src + '/common/lrc.js',
	'!' + src + '/common/lrcview.js',
	'!' + src + '/common/scroll.js',
	'!' + src + '/common/audioplay.js',
];

// gulp.task('default',function(){
// 	return gulp.src(src + '/**',{base:'./src'})
// 		.pipe(r());
// 	console.log(module);

// });

gulp.task('build.min.js',['clean'],function(){
	return gulp.src([src + '/**/*.js'],{base:src})
		.pipe(r({
			formatPath:function(a){
				a = prefix+a;
				return a;
			}
		}))
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
	return gulp.src([src + '/**/*.js',src + '/**/*.html'].concat(ignorejs),{base:src})
		.pipe(r({
			formatPath:function(a){
				a = prefix+a;
				return a;
			}
		}))
		.pipe(uglify({
            mangle: {except: ['require','$super']}
        }))
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest(build));
});

gulp.task('minify.css',['clean'],function(){
	return gulp.src(src + '/**/*.css')
		.pipe(minifycss())
		.pipe(gulp.dest(build));
});

gulp.task('build.libs.js',['cleanlibs'],function(){
	return gulp.src([
			libs_src + '/zepto.min.js',
			libs_src + '/underscore-min.js',
			libs_src + '/sea.js',
			libs_src + '/seajs-text.js',
			libs_src + '/fastclick.js'
			])
		.pipe(uglify())
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest(libs_build));
});

gulp.task('clean',function(){
	return gulp.src(build,{read:false})
		.pipe(clean());
});


gulp.task('cleanlibs',function(){
	return gulp.src(libs_build,{read:false})
		.pipe(clean());
});

gulp.task('default',['build.min.js','build.pack.js','build.min.html','minify.css','build.libs.js']);
