'use strict';

module.exports = function (grunt) {

  grunt.registerMultiTask('maxcdn', 'Interact with the MaxCDN API', function () {

    var options = this.options();

    if (!this.files) {
      grunt.fail.fatal('files is mandatory');
    }

    if (!options.zone_id) {
      grunt.fail.fatal('options.zone_id is mandatory');
    }

    if (options.method !== 'delete') {
      grunt.fail.fatal('Sorry! Only delete method is supported.');
    }
    
    var files = [];
    var MaxCDN = require('maxcdn');
    var maxcdn = new MaxCDN(
      options.companyAlias,
      options.consumerKey,
      options.consumerSecret
    );

    grunt.log.writeln('Invalidate the following files:');

    this.files.forEach(function (f) {
      grunt.log.writeln('\t' + f.dest);
      files.push(f.dest);
    });

    maxcdn.delete(
      'zones/pull.json/' + options.zone_id + '/cache', 
      { files: this.files },
      function (err, response) {
        if (err) {
          grunt.log.error(err);
        }
      });
  });

};
