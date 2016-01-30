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

exports['regex-replace'] = {
  setUp: function (done) {
    // setup here
    done();
  },
  //tests not specifying flags
  'noflags': function (test) {
    test.expect(1);

    var expected = grunt.file.read('test/expected/noflags.txt');
    var actual = grunt.file.read('test/actual/noflags.txt');
    test.equal(actual, expected, 'not equal');

    test.done();
  },
  //test using empty flags
  'emptyflags': function (test) {
    test.expect(1);

    var expected = grunt.file.read('test/expected/emptyflags.txt');
    var actual = grunt.file.read('test/actual/emptyflags.txt');
    test.equal(actual, expected, 'not equal');

    test.done();
  },
  //test caseinsensitivity
  'caseinsensitive': function (test) {
    test.expect(1);

    var expected = grunt.file.read('test/expected/caseinsensitive.txt');
    var  actual = grunt.file.read('test/actual/caseinsensitive.txt');
    test.equal(actual, expected, 'not equal');

    test.done();
  },
  //test the multiline flag
  'multiline': function (test) {
    test.expect(1);

    var expected = grunt.file.read('test/expected/multiline.txt');
    var  actual = grunt.file.read('test/actual/multiline.txt');
    test.equal(actual, expected, 'not equal');

    test.done();
  },
  //tests passing a regular expression object as a value to the search property
  'regexpobjectsearch': function(test){
    test.expect(1);

    var expected = grunt.file.read('test/expected/regexpobjectsearch.txt');
    var actual = grunt.file.read('test/actual/regexpobjectsearch.txt');
    test.equal(actual, expected, 'not equal');

    test.done();
  },
  //tests passing a function to the replace property
  'replacefunction': function(test){
    test.expect(1);

    var expected = grunt.file.read('test/expected/replacefunction.txt');
    var actual = grunt.file.read('test/actual/replacefunction.txt');
    test.equal(actual, expected, 'not equal');

    test.done();
  },
  //tests the arguments passed to the function passed to the replace property
  'replacefunction2': function(test) {
    test.expect(1);

    var expected = grunt.file.read('test/expected/replacefunction2.txt');
    var actual = grunt.file.read('test/actual/replacefunction2.txt');
    test.equal(actual, expected, 'not equal');

    test.done();
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
    test.expect(1);

    var expected = grunt.file.read('test/expected/singlesrc.txt');
    var actual = grunt.file.read('test/actual/singlesrc.txt');

    test.equal(actual, expected, 'not equal');

    test.done(); 
  }
};
