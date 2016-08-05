'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    uglify = require('gulp-uglify');

var httpServer = {
  host: '192.68.0.2',
  port: 3000,
  root: './dist'
}
var path = {
  src: {
    html: "./src/html/",
    styles: "./src/styles/",
    fonts: "./src/fonts/*",
    js: "./src/js/",
    img: "./src/img/"
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
  gulp.src(path.src.html + '*.html')
    .pipe(rigger())
    .pipe(gulp.dest(path.dist.html))
    .pipe(connect.reload());
});

gulp.task('build:styles', function() {
  gulp.src(path.src.styles + '**/*.scss')
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
      .pipe(uglify())
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.dist.js))
      .pipe(connect.reload());
});

gulp.task('build:img', function() {
  gulp.src(path.src.img + '*.jpg')
      .pipe(imagemin({
          interlaced: true,
          progressive: true
      }))
      .pipe(gulp.dest(path.dist.img))
      .pipe(connect.reload());
  // gulp.src(path.src.img + '.svg')
  //     .pipe(imagemin({
  //         progressive: true,
  //         svgoPlugins: [{removeViewBox: false}],
  //         interlaced: true
  //     }))
  //     .pipe(gulp.dest(path.dist.img))
  //     .pipe(connect.reload());
  gulp.src(path.src.img + '*.png')
      .pipe(imagemin({
          interlaced: true,
          progressive: true,
          use: [imageminPngquant()]
      }))
      .pipe(gulp.dest(path.dist.img))
      .pipe(connect.reload());
});

gulp.task('build:sprite', function() {
  var spriteData = gulp.src(path.src.img + 'sprite/*.png')
    .pipe(spritesmith({
      algorithm: 'left-right',
      cssFormat: 'scss_maps',
      cssName: '_sprite.scss',
      imgName: 'sprite.png',
      imgPath: '../img/sprite.png'
    }));
    spriteData.img.pipe(gulp.dest(path.src.img))
      .pipe(connect.reload());
    spriteData.css.pipe(gulp.dest(path.src.styles + 'components/'))
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
  gulp.watch(path.src.html + '**/*.html', ['build:html']);
  gulp.watch(path.src.styles + '**/*.scss', ['build:styles']);
  gulp.watch(path.src.fonts, ['build:fonts']);
  gulp.watch(path.src.js + '**/*.js', ['build:js']);
  gulp.watch(path.src.img, ['build:img']);
});

gulp.task('default', [
  'server',
  'watch'
]);
