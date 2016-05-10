module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'css',
            src: ['normalize.css'],
            dest: 'production/css',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'js',
            src: ['lib/**'],
            dest: 'production/js'
          },
          {
            expand: true,
            src: ['index.html'],
            dest: 'production'
          }
        ]
      }
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
        // separator: ';\n'
        separator: '\n'
      },
      js_and_css: {
        files: {
          'production/js/likegoogle.js': ['js/*'],
          'production/css/styles.css': ['css/styles_search.css', 'css/styles_result.css']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'production/js/likegoogle.js',
        dest: 'production/js/likegoogle.min.js'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'production/img'
        }]
      }
    },
    watch: {
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        }
      }
      styles: {
        files: ['css/*.css'],
        tasks: ['concat', 'copy'],
        options: {
          spawn: false
        }
      },
      images: {
        files: ['img/*'],
        tasks: ['imagemin'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Load the plugin that provides the "copy" task.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the "imagemin" task.
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'concat', 'uglify', 'imagemin']);
  // grunt.registerTask('default', 'Log some stuff.', function() {
  //     grunt.log.write('Logging some stuff...').ok();
  // });



};
