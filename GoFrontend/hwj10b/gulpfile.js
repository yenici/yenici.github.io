'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('build:html', function () {
    gulp.src('*.html').pipe(connect.reload());
});

gulp.task('build:js', function () {
    gulp.src('js/*.js').pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: '',
    port: 8080,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch('**/*.html', ['build:html']);
  gulp.watch('js/**/*.js', ['build:js']);
});

gulp.task('default', ['connect', 'watch']);
