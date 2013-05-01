module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    watch: {
      files: '<%= jshint.all %>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        expr: true
      },
      all: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    clean: {
      actual: [
        'test/actual/**/*.*'
      ]
    },
    copy: {
      fixtures: {
        expand: true,
        cwd: 'test/fixtures/',
        src: ['*.txt'],
        dest: 'test/actual/'
      }
    },
    "regex-replace": {
      noflags: {
        src: ['test/actual/noflags.txt'],
        actions: [
          {
            search: 'field',
            replace: 'replaced'
          },
          {
            search: 'o[\\w]{3}r([0-9])',
            replace: 'ok$1'
          }
        ]
      },
      emptyflags: {
        src: ['test/actual/emptyflags.txt'],
        actions: [
          {
            search: 'field',
            replace: 'replaced',
            flags: ''
          }
        ]
      },
      caseinsensitive: {
        src: ['test/actual/caseinsensitive.txt'],
        actions: [
          {
            search: 'field',
            replace: 'replaced',
            flags: 'gi'
          }
        ]
      },
      multiline: {
        src: ['test/actual/multiline.txt'],
        actions: [
          {
            search: '^- ',
            replace: '',
            flags: 'gm'
          }
        ]
      }
    },
    nodeunit: {
      all: ['test/**/*test.js']
    }
  });
  //Load dependency tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Load local tasks.
  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['clean', 'jshint', 'copy:fixtures', 'regex-replace', 'nodeunit']);

};
