# generator-ariatemplates

![Aria Templates logo](http://ariatemplates.com/images/logo-forum.png)

An Aria Templates generator for Yeoman.

### Travis build status
[![Build Status](https://secure.travis-ci.org/ariatemplates/generator-ariatemplates.png?branch=master)](https://travis-ci.org/ariatemplates/generator-ariatemplates)


Getting started
===============
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-ariatemplates`
- Run: 
	- `yo ariatemplates` to create a very basic aria templates project
	- `yo ariatemplates --wizard` to chose which file you want to generate for you project
	- `yo ariatemplates --help` for help

After creating your files, you can actually see how everything works launching the command:
`grunt server`

It will open a new tab inside your browser and display the Aria Templates hello world template.
After that you can start working on your awesome AT project!


## SubGenerators

The generator-ariatemplates comes also with some subgenerator that you can use to generate single/multiple files.

- `yo ariatemplates:template MyTemplate` to generate a template
- `yo ariatemplates:controller MyController` to generate a module controller
- `yo ariatemplates:interface IMyInterface` to generate an interface for a module controller
- `yo ariatemplates:csstemplate MyCssTemplate` to generate a CSS template
- `yo ariatemplates:macro MyMacro` to generate a macro library
- `yo ariatemplates:bootstrap index` to generate the bootstrap file


## What does it generate?
As explained before, there are 3 possible ways to call the generator:
- calling it in basic mode
- calling it in wizard mode
- calling a subgenerator

The generator does different things, it generates the Aria Templates files, but it also download the Aria Templates framework from bower, it downloads and installs all the dependecies and it creates other files like the grunt configuration file, to let you use the live reload feature during development, and other useful things like the package.json, the .gitignore, the bower.json, etc.

So let's have a look what the application generates.


### Basic Mode

When you call the generator using `yo ariatemplates` the application generates the basic files to let you start a new project with Aria Templates.
So it creates this project structure:

- MyFolder
	- ariatemplates
	- myapp
		- lib
			- MyMacro.tml
		- style
			- MyTemplateStyle.tpl.css
		- view
			- MyTemplate.tpl
			- MyTemplateScript.js
		- IMyInterface.js
		- MyController.js
	- node_modules
	- Gruntfile.js
	- index.html
	- bower.json
	- package.json

Inside this structure you'll find your Aria Templates file inside the application name folder (in this example 'myapp'), the Aria Templates framework inside the aria folder, the bower's dependencies inside bower_components folder, and the Gruntfile at the root of the folder.


### Wizard Mode

When you call the generator using `yo ariatemplates --wizard` the application gives you the possibility to choice which file inside the application name folder (in this example is myapp) you want to generate. So the project structure differs from the basic mode project structure only inside myapp folder, because you choose what to create, and it is the same for the other files and folders


### Subgenerator Mode

When you use one of the six subgenerator you creates, inside the current folder, the specific file that the subgenerator can create.
For instance, when you do `yo ariatemplates:controller MyController`, the subgenerator creates a controller file inside the current folder.

You can also create multiple files in one single command, doing `yo ariatemplates:controller MyFirstController MySecondController MyThirdController`. This is particularly useful when you know that you'll need a lot of files, so you can generate them in one command.


## A cool feature: Live Reload

After creating your project, you can also run the grunt server embedded in order to see your template generated and to start working on it, using the amazing live reload feature.

From your project folder type:
`grunt server`

The application will open a tab browser and it will show you your template. If you want to change something inside your template, or you want to add more stuff, just do it and have a look at the browser, your application it will be refreshed automatically without pressing F5.


## Help

The Aria Templates generator provides also an help guide. Just type `yo ariatemplates --help` to consult it.


## Support & Contributing

Visit our **[forum](http://ariatemplates.com/forum/)** to ask questions. If you spotted some problems, please open [an issue](https://github.com/ariatemplates/generator-ariatemplates/issues?state=open) or ideally, a pull request with the fix and a test.
If you feel to contribute please read the [Aria Templates guidelines for contributing](https://github.com/ariatemplates/ariatemplates/blob/master/CONTRIBUTING.md) and try to follow and apply them also to this project.


## Links

- [Aria Templates Website](http://ariatemplates.com)
- [Aria Templates Documentation](http://ariatemplates.com/usermanual)
- [Development discussions](https://github.com/ariatemplates/generator-ariatemplates/issues)
- [Blog](http://ariatemplates.com/blog/)
- [Twitter](https://twitter.com/ariatemplates)


## License
[Apache License](https://en.wikipedia.org/wiki/Apache_License)
