var gulp = require('gulp');
	pug = require('gulp-pug');
	less = require('gulp-less');
	autoprefixer = require('gulp-autoprefixer');
	minifyCSS = require('gulp-csso');
	concat = require('gulp-concat');
	image = require('gulp-image');
	uglify = require('gulp-uglify');
	util = require('gulp-util');
	jsonMinify = require('gulp-json-minify');
	data = require('gulp-data'),
	fs = require('fs');
	rimraf = require('rimraf');
	rename = require("gulp-rename");
	plumber = require("gulp-plumber");
	watch = require('gulp-watch');
	connect = require('gulp-connect');


var path = {
	build: {
		htaccess: 'build/',
		html: 'build/',
		css: 'build/templates/_ares/css/',
		js: 'build/templates/_ares/js/',
		fonts: 'build/templates/_ares/fonts/',
		image: 'build/templates/_ares/img/'
	},
	src: {
		pug: 'src/pug/**/[^_]*.pug',
		css: 'src/less/styles.less',
		js: 'src/js/*',
		image: 'src/img/**/*',
		fonts: 'src/fonts/**/*',
		json: 'src/json/*',
		htaccess: 'src/.htaccess'
	},
	watch: {
		pug: 'src/includes/*',
		css: 'src/assets/less/*',
		js: 'src/assets/js/*',
		image: 'src/assets/img/*/*',
		fonts: 'src/assets/fonts/*/*',
		htaccess: 'src/.htaccess',
	},
	clean: './build',
	outputDir: './build'
};

gulp.task('connect', function(){
    connect.server({
        root: [path.outputDir],
        port: 9999,
        livereload: true
    });
});

gulp.task('pug:build', function() {
  return gulp.src(path.src.pug)
    .pipe(pug())
    .pipe(gulp.dest(path.build.html));
});

gulp.task('css:build', function(){
  return gulp.src([
	(path.src.css)
	])
    .pipe(less())
    .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
    .pipe(concat('styles.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.build.css))
});

gulp.task('js:build', function(){
  return gulp.src([
	(path.src.js),
	])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
});

gulp.task('image:build', function () {
  gulp.src(path.src.image)
    .pipe(image())
    .pipe(gulp.dest(path.build.image));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts)) //выгружаем в build
});

gulp.task('htaccess:build', function() {
    gulp.src(path.src.htaccess)
        .pipe(gulp.dest(path.build.htaccess)) //выгружаем в build
});


// билдим все
gulp.task('build', [
    'pug:build',
	'css:build',
	'js:build',
    'fonts:build',
	'image:build',
	'htaccess:build'
]);

// чистим папку билда
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// watch
gulp.task('watch', function(){
     //билдим pug в случае изменения
    watch([path.watch.pug], function(event, cb) {
        gulp.start('pug:build');
    });
     //билдим css в случае изменения
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
     //билдим js в случае изменения
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
     //билдим статичные изображения в случае изменения
    watch([path.watch.image], function(event, cb) {
        gulp.start('image:build');
    });
     //билдим шрифты в случае изменения
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
     //билдим htaccess в случае изменения
    watch([path.watch.htaccess], function(event, cb) {
        gulp.start('htaccess:build');
    });
});

// действия по умолчанию
gulp.task('default', ['build','watch','connect']);