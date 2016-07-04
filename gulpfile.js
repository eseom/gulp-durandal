var gulp = require('gulp');
var ghtmlSrc = require('gulp-html-src');
var concatCss = require('gulp-concat-css');
var durandal = require('gulp-durandal');
var cleanCSS = require('gulp-clean-css');
var uglifycss = require('gulp-uglifycss');

 
gulp.task('durandal', function(){
    durandal({
		baseDir: 'src/app',
		main: 'main.js',
		output: 'main.js',
		almond: true,
		minify: true
	})
	.pipe(gulp.dest('dist'));
});

gulp.task('copy-css', function() {
	gulp.src('./src/index.html')
	.pipe(ghtmlSrc({ presets: 'css'}))
	.pipe(concatCss('bundle.css'))
	.pipe(uglifycss({
		      "maxLineLen": 80,
			        "uglyComments": true
					    }))
	// .pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('./dist'));
});

gulp.task('copy-entrance', function () {
	gulp.src([
	'./src/index-dist.html',
	'./src/bower_components/requirejs/require.js',
	])
	.pipe(gulp.dest('./dist'))
});


gulp.task('default', ['durandal', 'copy-css', 'copy-entrance'])
