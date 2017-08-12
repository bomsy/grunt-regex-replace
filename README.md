# grunt-regex-replace

[![NPM](https://nodei.co/npm/grunt-regex-replace.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/package/grunt-regex-replace)

Grunt plugin to search and replace text content of files based on regular expression patterns

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with:

```
npm install --save-dev grunt-regex-replace
```

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-regex-replace');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## How to use
Here is a sample of the definition within the object passed to grunt.initConfig

###Sample Code

    "regex-replace": {
        foofoo: { //specify a target with any name
            src: ['foo/bar.js'],
            actions: [
                {
                    name: 'bar',
                    search: '(^|\\s)console.log',
                    replace: '//console.log',
                    flags: 'g'
                },{
                    name: 'foo',
                    search: 'var v = \'[^\']*\';',
                    replace: 'var v = \'<%= pkg.release.version_code %>\';',
                    flags: ''
                },{
                   name: 'foobar',
                   search: new RegExp('\\w+'),
                   replace: function() {
                   	    return 'foofoo';
                   }
                },{
                   name: 'baz',
                   use: function(data) {
                     return data.sourceContent.length > 3;
                   },
                   search: 'abc',
                   replace: 'abcde'
                }
            ]
        }
    }

### src property
Takes the path to the files relative to the grunt file, it accepts strings as well as an array of file paths.
Also supports templates, e.g

    src: 'customisation/*.js',
    src: '**/*.js',
    src: ['foo/bar.js','foo/foo.js'],
    src: ['<%= pkg.id %>/bar.js', 'foo/foo.js']

### dest property
Takes a file path string or an array of file paths that match the src paths. If a `dest` file is specified for the corresponding
`src` file, the `src` file remains unchanged and the changes are applied to the `dest` file. e.g

1) `bla.js` will not be overwritten but `foo.js` will contain the new changes.
```
 {
    src: ['bla.js'],
    dest: 'foo.js'
 }
```

2) `bla.js` and `foo.js` will be affected as above. `baz.js` will be overwritten.

```
 {
    src: ['bla.js', 'baz.js'],
    dest: ['foo.js']
 }
```

3) `bla.js` and  `foo.js` will be affected as above. `baz.js` will be ignored.

```
 {
    src: ['bla.js'],
    dest: ['foo.js', 'baz.js']
 }
```



### actions property (array | function)
Accepts an array of objects or a function (which returns an array of objects) representing the actions to take place. Each action contains an optional `name` property, an optional `use` property, a `search` property, a `replace` property and
an optional `flags` property. Here are some examples of the object.

    {
        name: 'foo',
        use: function(data) {
          return data.file.indexOf('.skip') === -1 && data.sourceContent.indexOf('console.log') > -1;
        }, //also accepts a template string or any value
        search: '(^|\\s)console.log',
        replace: '//console.log',
        flags: 'gi'
    }

    {
        name: 'bar',
        search: /\\w+/g, //also accepts new RegExp()
        replace: function() {
            return 'foo';
        }
    }
#### name property
A string value.

#### use property (function | template string | value)
*Default*: `true`

Used to determine whether the corresponding action should be executed or not. If set to `true` the action executes,
if `false` it does not. Can also be a function which returns a value, a template string producing a value.
It enables specifying the conditions for when actions are used.

An object with the following fields is passed in test function:

* `file` - path to a file that is being processed;
* `sourceContent` - source contents of the processed file;
* `updatedContent` - contents of the file after previously applied actions;
* `action` - object that is representing options of the current action;
* `task` - reference to the corresponding task;
* `grunt` - reference to grunt.

#### search property (regexp | substr)
A regular expression string or object defining the text content to be found.

#### replace property (substr | function)
A string / regular expression pattern or function to replace the text content.
For the replace function, values that match the parenthesized substring matches are passed as arguments
```
    {
        search: new RegExp(/(\w+)\s(\w+)/),
        replace: function(arg1, arg2, ... argN) {
          // arg1 is the full string matched
          // arg2 is the first parenthesized substring match
          // argN is the Nth parenthesized substring match
        }
    }
```
See [MDN Documentation](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_parenthesized_substring_matches) for details on "using parenthesized substring matches."

#### flags property
Regular expressions options (ie `gmi`). If the flags property is not defined, and the search property is a string, it defaults to `'g'`. To specify no options, set the flags to empty string (ie flags : '').
Note: Do not use the `flags` property if a `regexp` was used for the search property. Instead, use the flag(s) in your regex. ie: `/^[a-z0-9_-]{6,18}$/g`

#### debug log
specify `--verbose` as a command-line option to show detailed logs

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* `v0.4.0` - added support for `dest` property
* `v0.3.0` - added new `use` property to `actions`, removed peerDependencies restrictions
* `v0.2.10` - add verbose logging
* `v0.2.9` - Clarification for regex flags usage
* `v0.2.7` - Support for passing a function to the action property, Updated documentation for using parenthesized substring matches
* `v0.2.6` - Support for file globbing patterns.
* `v0.2.5` - fix /bin not exist error
* `v0.2.4` - added name property, search property now supports regexp object, replace property now supports functions.
* `v0.2.3` - task format fixes for compatibilty with 0.4.0.
* `v0.2.2` - version fixes
* `v0.2.1` - Updated to support grunt 0.4.x
* `v0.1.2` - Changes to readme
* `v0.1.1` -
* `v0.1.0` - First Release

## License
Copyright (c) 2012 Hubert Boma Manilla  
Licensed under the MIT license.
=======
