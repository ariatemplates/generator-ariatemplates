# Generator-ariatemplates

![Aria Templates logo](http://ariatemplates.com/images/logo-forum.png)

![Yeoman logo](http://yeoman.io/assets/img/yeoman-logo.png)

An Aria Templates generator for Yeoman.

### Travis build status
[![Build Status](https://secure.travis-ci.org/ariatemplates/generator-ariatemplates.png?branch=master)](https://travis-ci.org/ariatemplates/generator-ariatemplate)


Getting started
===============
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-ariatemplates`
- Run: 
	- `yo ariatemplates` to create a very basic aria templates project
	- `yo ariatemplates --wizard` to chose which file you want to generate for you project
	- `yo ariatemplates --help` for help

## SubGenerators
The generator-ariatemplates comes also with some subgenerator that you can use to generate single files.

- `yo ariatemplates:template` to generate a template
- `yo ariatemplates:controller` to generate a module controller
- `yo ariatemplates:interface` to generate an interface for a module controller
- `yo ariatemplates:csstemplate` to generate a CSS template
- `yo ariatemplates:macro` to generate a macro library
- `yo ariatemplates:bootstrap` to generate the bootstrap file

## Live Reload
After creating your project, you can also run the grunt server embedded in order to see your template generated and to start working on it, using the amazing live reload feature.

From your project folder type:
'grunt server'

The application will open a tab broweser and it will show you your template. If you want to change something inside your template, or you want to add more stuff, just do it and have a look at the browser, your application it will be refreshed automatically without pressing F5.

## License
[Apache License](https://en.wikipedia.org/wiki/Apache_License)
