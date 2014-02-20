'use strict';

module.exports = function (grunt) {

  // Project configuration
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Configuration to be run (just for testing purposes)
    maxcdn: {
      invalidate: {
        options: {
          companyAlias:   '{COMPANY_ALIAS}',
          consumerKey:    '{CONSUMER_KEY}',
          consumerSecret: '{CONSUMER_SECRET}',
          zone_id:        '{ZONE_ID}',
          method:         'delete'
        },
        files: [
          { dest: 'w2/auth0-widget-2.4.27.min.js' }
        ],
      },
    },
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['default', 'maxcdn:invalidate']);
  grunt.registerTask('default', ['jshint']);
};
