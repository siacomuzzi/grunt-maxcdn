'use strict';

module.exports = function (grunt) {

  grunt.registerMultiTask('maxcdn', 'Interact with the MaxCDN API', function () {

    var done = this.async();
    var options = this.options();

    if (!this.files) {
      grunt.fail.fatal('files is mandatory');
      return done();
    }

    if (!options.zone_id) {
      grunt.fail.fatal('options.zone_id is mandatory');
      return done();
    }

    if (options.method !== 'delete') {
      grunt.fail.fatal('Sorry! Only delete method is supported.');
      return done();
    }
    
    var files = [];
    var MaxCDN = require('maxcdn');
    var maxcdn = new MaxCDN(
      options.companyAlias,
      options.consumerKey,
      options.consumerSecret
    );

    grunt.log.writeln('Purging cache...');

    this.files.forEach(function (f) {
      grunt.log.writeln('\t' + f.dest);
      files.push(f.dest);
    });

    maxcdn.delete(
      'zones/pull.json/' + options.zone_id + '/cache', 
      { files: files },
      function (err, response) {
        if (err) {
          grunt.log.error(err);
          return done();
        }

        console.log(response);
        done(true);
      });
  });

};
