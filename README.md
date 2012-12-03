# grunt-regex-replace

Grunt plugin to search and replace text content of files based on regular expression patterns

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-regex-replace`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-regex-replace');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## How to use
Here is an sample of the definition within the object passed to grunt.initConfig 
###Sample Code

      "regex-replace": {
        src: ['foo/bar.js'],
        actions: [
          {
            search: '(^|\\s)console.log',
            replace: '//console.log',
            flags: 'g'
          },{
            search: 'var v = \'[^\']*\';',
            replace: 'var v = \'<%= pkg.release.version_code %>\';',
            flags: ''
          }
        ]
      }
### src property
Takes the path to the files relative to the grunt file, it accepts strings as well as an array of file paths.
Also supports templates, e.g
      
      src: 'customisation/*.js',
      src: ['foo/bar.js','foo/foo.js'],
      src: ['<%= pkg.id %>/bar.js', 'foo/foo.js'],
###actions property
Accepts an array of objects defining the actions to take place. Each action contains a search property, a replace property and 
a flags property. An example af an object.
      
      {
        search:'(^|\\s)console.log',
        replace:'//console.log',
        flags:'gi'
      }
###search property
A regular expression string defining the text contet to be found.
###replace property
A string/ regular expression pattern to replace the text content.
###flags property
Regular expressions options (ie gmi). if the flags property is not defined it defaults to 'g'. To specify no options, set the
flags to empty string (ie flags : '').
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
v0.1.0 - First Release

v0.1.1 - 

v0.1.2 - Changes to readme

## License
Copyright (c) 2012 Hubert Boma Manilla  
Licensed under the MIT license.
=======