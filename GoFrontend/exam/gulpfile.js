'use strict';

// var gulp = require('gulp'),
//     del = require('del'),
//     imagemin = require('gulp-imagemin'),
//     imageminPngquant = require('imagemin-pngquant'),
//     sourcemaps = require('gulp-sourcemaps'),
//     uglify = require('gulp-uglify');
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    connect = require('gulp-connect'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass');

var httpServer = {
  host: '192.68.0.2',
  port: 8080,
  root: './dist'
}
var path = {
  src: {
    html: "./src/html/*.html",
    styles: "./src/styles/**/*.scss",
    fonts: "./src/fonts/*",
    js: "./src/js/",
    img: "./src/img/*"
  },
  dist: {
    html: "./dist/",
    styles: "./dist/css/",
    fonts: "./dist/fonts/",
    js: "./dist/js/",
    img: "./dist/img/"
  },
  clean: "./dist/"
};


gulp.task('build:html', function() {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.dist.html))
    .pipe(connect.reload());
});

gulp.task('build:styles', function() {
  gulp.src(path.src.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie >= 8'],
			cascade: false
		}))
    // .pipe(sourcemaps.init())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.styles))
    .pipe(connect.reload());
});

gulp.task('build:fonts', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('build:js', function() {
  gulp.src(path.src.js + 'lib/*.js')
    .pipe(gulp.dest(path.dist.js + 'lib/'))
    .pipe(connect.reload());
  gulp.src(path.src.js + '*.js')
      // .pipe(sourcemaps.init())
      // .pipe(uglify())
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.dist.js))
      .pipe(connect.reload());
});

gulp.task('build:img', function() {
  gulp.src(path.src.img + '.jpg')
  //     .pipe(imagemin({
  //         progressive: true,
  //         svgoPlugins: [{removeViewBox: false}],
  //         interlaced: true
  //     }))
      .pipe(gulp.dest(path.dist.img))
      .pipe(connect.reload());
  gulp.src(path.src.img + '.svg')
  //     .pipe(imagemin({
  //         progressive: true,
  //         svgoPlugins: [{removeViewBox: false}],
  //         interlaced: true
  //     }))
      .pipe(gulp.dest(path.dist.img))
      .pipe(connect.reload());
  gulp.src(path.src.img + '*.png')
  //     .pipe(imagemin({
  //         progressive: true,
  //         svgoPlugins: [{removeViewBox: false}],
  //         use: [imageminPngquant()],
  //         interlaced: true
  //     }))
      .pipe(gulp.dest(path.dist.img))
      .pipe(connect.reload());
});

gulp.task('build', [
  'build:html',
  'build:styles',
  'build:fonts',
  'build:js',
  'build:img'
]);

gulp.task('clean', function (cb) {
    del(path.clean);
});

gulp.task('server', function() {
  connect.server({
    root: httpServer.root,
    host: httpServer.host,
    port: httpServer.port,
    livereload: true,
    debug: true
  });
});

gulp.task('watch', function() {
  // gulp.watch(path.src.html, ['build:html']);
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  gulp.watch('./src/html/**/*.html', ['build:html']);
  gulp.watch(path.src.styles, ['build:styles']);
  gulp.watch(path.src.fonts, ['build:fonts']);
  gulp.watch(path.src.js + '**/*.js', ['build:js']);
  gulp.watch(path.src.img, ['build:img']);
});

gulp.task('default', [
  'server',
  'watch'
]);
