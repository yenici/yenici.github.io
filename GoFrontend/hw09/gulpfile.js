'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect');

var httpServer = {
  host: '192.68.0.2',
  port: 8080,
  root: '.'
}
var path = {
  src: {
    html: "*.html",
    styles: "./css/**/*.css",
    img: "./img/*"
  },
};


gulp.task('build:html', function() {
  gulp.src(path.src.html)
    .pipe(connect.reload());
});

gulp.task('build:styles', function() {
  gulp.src(path.src.styles)
    .pipe(connect.reload());
});

gulp.task('build:img', function() {
  gulp.src(path.src.img)
      .pipe(connect.reload());
});

gulp.task('build', [
  'build:html',
  'build:styles',
  'build:img'
]);

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
  gulp.watch(path.src.html, ['build:html']);
  gulp.watch(path.src.styles, ['build:styles']);
  gulp.watch(path.src.img, ['build:img']);
});

gulp.task('default', [
  'server',
  'watch'
]);
