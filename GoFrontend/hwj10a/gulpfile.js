'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    connect = require('gulp-connect'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

var path = {
  src: {
    html: "*.html",
    styles: "./styles/**/*.scss",
    js: "./js/**/*.js",
    jslibs: [
      "./bower_components/lodash/dist/lodash.min.js"
    ],
    img: "./img/*"
  },
  dest: {
    html: "./dist/",
    styles: "./dist/css/",
    js: "./dist/js/",
    img: "./dist/img/"
  },
  clean: "./dist/"
};


gulp.task('build:html', function() {
  gulp.src(path.src.html)
    .pipe(gulp.dest(path.dest.html))
    .pipe(connect.reload());
});

gulp.task('build:styles', function() {
  gulp.src(path.src.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.dest.styles))
    .pipe(connect.reload());
});

gulp.task('build:js', function() {
  for(let i = 0; i < path.src.jslibs.length; i++) {
    gulp.src(path.src.jslibs[i])
      .pipe(gulp.dest(path.dest.js));
  }
  gulp.src(path.src.js)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.dest.js))
      .pipe(connect.reload());
});

gulp.task('build:img', function() {
  gulp.src(path.src.img + '.jpg')
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          interlaced: true
      }))
      .pipe(gulp.dest(path.dest.img))
      .pipe(connect.reload());
      gulp.src(path.src.img + '*.png')
          .pipe(imagemin({
              progressive: true,
              svgoPlugins: [{removeViewBox: false}],
              use: [imageminPngquant()],
              interlaced: true
          }))
          .pipe(gulp.dest(path.dest.img))
          .pipe(connect.reload());
});

gulp.task('build', [
  'build:html',
  'build:styles',
  'build:js',
  'build:img'
]);

gulp.task('clean', function (cb) {
    del(path.clean);
});

gulp.task('server', function() {
  connect.server({
    root: './dist',
    port: 8080,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(path.src.html, ['build:html']);
  gulp.watch(path.src.styles, ['build:styles']);
  gulp.watch(path.src.js, ['build:js']);
  gulp.watch(path.src.img, ['build:img']);
});

gulp.task('default', [
  'server',
  'watch'
]);
