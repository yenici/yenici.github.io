'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(
  {
    pattern: ['gulp-*', 'gulp.*', 'imagemin-pngquant*', 'del*'],
    rename: {
      'imagemin-pngquant': 'pngquant'
    }
  });

var path = {
  src: {
    html: 'src/*.html',
    js: 'src/js/*.js',
    css: 'src/css/*.css',
    img: 'src/img/**/*.*',
    lib: 'bower_components/'
  },
  build: {
      html: 'build/',
      js: 'build/js/',
      css: 'build/css/',
      img: 'build/img/'
  },
  watch: {
      html: 'src/**/*.html',
      js: 'src/js/**/*.js',
      css: 'src/css/**/*.css',
      img: 'src/img/**/*.*'
  },
  clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "hwj09b"
};

gulp.task('build:html', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(plugins.connect.reload());
});

gulp.task('build:css', function () {
    gulp.src(path.src.css)
        .pipe(plugins.autoprefixer({browsers: ['last 2 versions', 'not ie <= 8']}))
        .pipe(plugins.concat('styles.min.css'))
        .pipe(plugins.cleanCss())
        .pipe(gulp.dest(path.build.css))
        .pipe(plugins.connect.reload());
});

gulp.task('build:js', function () {
    gulp.src(path.src.js)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('likegoogle.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(plugins.rename('likegoogle.min.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(plugins.connect.reload());
});

gulp.task('build:img', function () {
    gulp.src(path.src.img)
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [plugins.pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(plugins.connect.reload());
});

gulp.task('build:lib', function() {
  gulp.src(path.src.lib + 'jquery/dist/jquery.min.js')
      .pipe(gulp.dest(path.build.js));
  gulp.src(path.src.lib + 'lodash/dist/lodash.min.js')
      .pipe(gulp.dest(path.build.js));
  gulp.src(path.src.lib + 'normalize-css/normalize.css')
      .pipe(gulp.dest(path.build.css));
});

gulp.task('clean', function (cb) {
    plugins.del(path.clean);
});

gulp.task('build', [
  'build:html',
  'build:css',
  'build:js',
  'build:img',
  'build:lib'
]);

gulp.task('connect', function() {
  plugins.connect.server({
    root: 'build',
    port: 8000,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(path.watch.html, ['build:html']);
  gulp.watch(path.watch.js, ['build:js']);
  gulp.watch(path.watch.css, ['build:css']);
  gulp.watch(path.watch.img, ['build:img']);
});

gulp.task('httpd', ['connect', 'watch']);

gulp.task('default', function() {
  // plugins.util.log(Object.keys(plugins));
  plugins.util.log('===== JavaScript Lessons 17-18 =====');
  plugins.util.log('Available commands:');
  plugins.util.log('\tgulp clean');
  plugins.util.log('\tgulp build');
  plugins.util.log('\tgulp build:html');
  plugins.util.log('\tgulp build:css');
  plugins.util.log('\tgulp build:js');
  plugins.util.log('\tgulp build:img');
  plugins.util.log('\tgulp build:lib');
  plugins.util.log('\tgulp connect - starts HTTP server ');
  plugins.util.log('\tgulp watch');
  plugins.util.log('\tgulp httpd - starts connect and watch');
});
