/*
 * grunt-regex-replace
 * https://github.com/bomsy/grunt-regex-replace
 *
 * Copyright (c) 2012 Hubert Boma Manilla
 * Licensed under the MIT license.
 *
 */

module.exports = function(grunt) {
  "use strict";
  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================
  grunt.registerMultiTask('regex-replace', 'find & replace content of a file based regex patterns', function(){
    var actions = typeof this.data.actions !== 'function' ? this.data.actions : this.data.actions(),
      arrString = "[object Array]",
      regexString = "[object RegExp]",
      template = grunt.template,
      toString = Object.prototype.toString,
      GLOBAL = 'g',
      options = null,
      srchAction = null,
      rplAction = null,
      action,
      replaceType,
      sourceContent,
      type,
      updatedContent,
      use;

    this.files.forEach(function(file) {
      file.src.forEach(function(src) {
        sourceContent = grunt.file.read(src);
        updatedContent = sourceContent;
        for(var j = 0; j < actions.length; j++){
          action = actions[j];
          if('use' in action){
            use = action.use;
            if(use){
              type = typeof use;
              if(type === 'function'){
                use = use({file: src, sourceContent: sourceContent, updatedContent: updatedContent, action: action, task: this, grunt: grunt});
              } else if(type === 'string') {
                use = template.process(use);
              }
            }
          } else {
            use = true;
          }
          if(use){
            srchAction = action.search,
            rplAction = action.replace;
            options = action.flags;
            if(typeof options === 'undefined'){
              options = GLOBAL;
            }
            type = typeof srchAction;
            replaceType = typeof rplAction;
            if( (type !== 'string' && toString.call(srchAction) !== regexString ) || (replaceType !== 'string' && typeof rplAction !== 'function') || typeof options !== 'string' ){
              grunt.warn('An error occured while processing (Invalid type passed for \'search\' or \'replace\' of \'flags\', only strings accepted.)' );
            }
            if(type === 'string'){
              srchAction = template.process(srchAction);
            }
            if(replaceType === 'string'){
              rplAction = template.process(rplAction);
            }
            updatedContent = regexReplace( updatedContent, srchAction, rplAction , options, j, action.name);
          }
        }
        if(updatedContent !== sourceContent){
          grunt.file.write(src, updatedContent);
        }
        grunt.log.verbose.ok('File \'' + src + '\' replace complete.');
      });
    });

    if(this.errorCount){
        return false;
    }
  });
  // ==========================================================================
  // HELPERS
  // ==========================================================================

 var regexReplace = function(src, regex, substr, options, index, actionName){
    //takes the src content and changes the content
    var regExp = null,
        updatedSrc;
    if(typeof regex ===  'string'){
      regExp = new RegExp(regex , options); //regex => string
    } else {
      regExp = regex; //regex => RegExp object
    }
    updatedSrc = String(src).replace(regExp, substr); //note: substr can be a function
    index = typeof index === 'undefined' ? '' : index;
    if(!actionName){
      grunt.log.verbose.ok(index + 1 + ' action(s) completed.');
    } else {
      grunt.log.verbose.ok(actionName + ' action completed.');
    }
    return updatedSrc;
  };

};
