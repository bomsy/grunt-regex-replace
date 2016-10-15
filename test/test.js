var grunt = require('grunt');
"use strict";
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

function checkFile(data) {
  var file = data.file,
      message = data.message || 'not equal',
      test = data.test;

  test.expect(1);
  test.equal(grunt.file.read('test/actual/' + file), grunt.file.read('test/expected/' + file), message);
  test.done();
}

exports['regex-replace'] = {
  setUp: function (done) {
    // setup here
    done();
  },
  //tests not specifying flags
  'noflags': function (test) {
    checkFile({test: test, file: 'noflags.txt'});
  },
  //test using empty flags
  'emptyflags': function (test) {
    checkFile({test: test, file: 'emptyflags.txt'});
  },
  //test caseinsensitivity
  'caseinsensitive': function (test) {
    checkFile({test: test, file: 'caseinsensitive.txt'});
  },
  //test the multiline flag
  'multiline': function (test) {
    checkFile({test: test, file: 'multiline.txt'});
  },
  //tests passing a regular expression object as a value to the search property
  'regexpobjectsearch': function(test){
    checkFile({test: test, file: 'regexpobjectsearch.txt'});
  },
  //tests passing a function to the replace property
  'replacefunction': function(test){
    checkFile({test: test, file: 'replacefunction.txt'});
  },
  //tests the arguments passed to the function passed to the replace property
  'replacefunction2': function(test) {
    checkFile({test: test, file: 'replacefunction2.txt'});
  },
  //test using glob patterns for the target
  'globpatterns': function(test){
    test.expect(2);

    var expected1 = grunt.file.read('test/expected/glob1.txt');
    var expected2 = grunt.file.read('test/expected/glob2.txt');

    var actual1 = grunt.file.read('test/actual/glob1.txt');
    var actual2 = grunt.file.read('test/actual/glob2.txt');

    test.equal(actual1, expected1, 'not equal');
    test.equal(actual2, expected2, 'not equal');

    test.done();
  },
  //test specifying a single src target using a string
  'singlesrc': function(test){
    checkFile({test: test, file: 'singlesrc.txt'});
  },
  //test passing a function to the actions property
  'actionsfunction': function(test){
    checkFile({test: test, file: 'actionsfunction.txt'});
  },
  //test specifying 'use: false' option
  'usefalse': function(test){
    checkFile({test: test, file: 'usefalse.txt'});
  },
  //test specifying 'use: function' option
  'usefunc': function(test){
    checkFile({test: test, file: 'usefunc.txt'});
  },
  //test specifying 'use: function' option
  'usestring': function(test){
    checkFile({test: test, file: 'usestring.txt'});
  },
  //test a single dest target using a string
  'dest': function(test) {
    test.expect(2);

    var expected1 = grunt.file.read('test/expected/unchangesrc.txt');
    var expected2 = grunt.file.read('test/expected/changedest.txt');

    var actual1 = grunt.file.read('test/actual/unchangesrc.txt');
    var actual2 = grunt.file.read('test/actual/changedest.txt');

    test.equal(actual1, expected1, 'not equal');
    test.equal(actual2, expected2, 'not equal');

    test.done();
  },
  //test dest array one item
  'onedest': function(test) {
    checkFile({ test: test, file: 'changesrc.txt' });
  },
  //test the ignored dest item
  'ignoredest': function(test) {
    checkFile({ test: test, file: 'ignoredest.txt' });
  }
};
