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
  'noflags': function (test) {
    test.expect(1);

    var expected = grunt.file.read('test/expected/noflags.txt');
    var actual = grunt.file.read('test/actual/noflags.txt');
    test.equal(actual, expected, 'not equal');

    test.done();
  },
  'emptyflags': function (test) {
    test.expect(1);

    var expected = grunt.file.read('test/expected/emptyflags.txt');
    var actual = grunt.file.read('test/actual/emptyflags.txt');
    test.equal(actual, expected, 'not equal');

    test.done();
  },
  'caseinsensitive': function (test) {
    test.expect(1);

    var expected = grunt.file.read('test/expected/caseinsensitive.txt');
    var  actual = grunt.file.read('test/actual/caseinsensitive.txt');
    test.equal(actual, expected, 'not equal');

    test.done();
  },
  'multiline': function (test) {
    test.expect(1);

    var expected = grunt.file.read('test/expected/multiline.txt');
    var  actual = grunt.file.read('test/actual/multiline.txt');
    test.equal(actual, expected, 'not equal');

    test.done();
  }
};
