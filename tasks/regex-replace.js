/*
 * grunt-regex-replace
 * https://github.com/bomsy/grunt-regex-replace
 *
 * Copyright (c) 2012 Hubert Boma Manilla
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict'
  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================
  ;
  grunt.registerMultiTask('regex-replace', 'find & replace content of a file based regex patterns', function(){
    var files = grunt.file.expandFiles(this.file.src),
      actions = this.data.actions,
      arrString = "[object Array]",
      toString = Object.prototype.toString,
      GLOBAL = 'g',
      options = null,
      updatedContent;
      for(var i = 0; i< files.length; i++){
        if(toString.call(actions) === arrString){
          updatedContent = grunt.file.read(files[i]);
          for(var j = 0; j < actions.length; j++){
            options = actions[j].flags;
            if(typeof options === 'undefined'){
              options = GLOBAL;
            }
            if(typeof actions[j].search !== 'string' || typeof actions[j].replace !== 'string' || typeof options !== 'string' ){
              grunt.warn('An error occured while processing (Invalid type passed for \'search\' or \'replace\' of \'flags\', only strings accepted.)' );
            }
            updatedContent = grunt.helper('regex-replace', updatedContent, grunt.template.process(actions[j].search), grunt.template.process(actions[j].replace), options, j);
          }
          grunt.file.write(files[i], updatedContent);
          if(this.errorCount){
            return false;
          } 
          grunt.log.writeln('File \'' + files[i] + '\' replace complete.');
        }
      }
  });
  // ==========================================================================
  // HELPERS
  // ==========================================================================

 grunt.registerHelper('regex-replace', function(src, regex, substr, options, index){
    //takes the sr content and changes the
    var regExp = new RegExp(regex , options),
      updatedSrc;
    updatedSrc = String(src).replace(regExp, substr);
    index = typeof index === 'undefined' ? '' : index;
    grunt.log.writeln(index + 1 + ' action(s) completed.');
    return updatedSrc;
  });

};
