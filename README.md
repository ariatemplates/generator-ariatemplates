# generator-ariatemplates

![Aria Templates logo](http://ariatemplates.com/images/logo-forum.png)

An Aria Templates generator for Yeoman.

### Travis build status
[![Build Status](https://secure.travis-ci.org/ariatemplates/generator-ariatemplates.png?branch=master)](https://travis-ci.org/ariatemplates/generator-ariatemplates)


Getting started
===============
- Make sure you have [yo](https://github.com/yeoman/yo) installed:

  `npm install -g yo`
- Install: `npm install -g generator-ariatemplates`
- Run: `yo ariatemplates` to create a very basic aria templates project

After creating your files, you can actually see how everything works launching the command:
`grunt server`

It will open a new tab inside your browser and display the Aria Templates hello world template.
After that you can start working on your awesome AT project!


## Options

- `--wizard`

  to chose which file you want to generate for you project.
- `--skip-install`

  to skip the automatic execution of `bower` and `npm` after scaffolding has finished.
- `--help` for help

  well, to display the integrated help.


## SubGenerators

The generator-ariatemplates comes also with some subgenerator that you can use to generate single/multiple files.

- `yo ariatemplates:template MyTemplate` to generate a template
- `yo ariatemplates:template MyTemplateScript` to generate a template script
- `yo ariatemplates:csstemplate MyTemplateStyle` to generate a CSS template
- `yo ariatemplates:controller MyController` to generate a module controller
- `yo ariatemplates:interface IMyInterface` to generate an interface for a module controller
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

Inside this structure you'll find your Aria Templates files inside the application name folder (in this example 'myapp'), the Aria Templates framework inside the ariatemplates folder and the Gruntfile.js, package.json, bower.json and index.html at the root.


### Wizard Mode

When you call the generator using `yo ariatemplates --wizard` the application gives you the possibility to customize your project and choice which files generate inside the application name folder ('myapp'). So the project structure differs from the basic mode project structure only inside myapp folder and it will remain the same for the other files.


### Subgenerator Mode

The generator comes with 7 SubGenerators that let you create a certain type of Aria Templates such as templates, template scripts, module controller, etc.

- `yo ariatemplates:template MyTemplate` : to generate one or more templates
- `yo ariatemplates:templatescript MyTemplateScript` : to generate one or more template scripts
- `yo ariatemplates:csstemplate MyTemplateStyle` : to generate one or more CSS templates
- `yo ariatemplates:controller MyController` : to generate one or more module controllers
- `yo ariatemplates:interface IMyInterface` : to generate one or more interfaces
- `yo ariatemplates:macro MyMacro` : to generate one or more macro libraries
- `yo ariatemplates:bootstrap index` : to generate the bootstrap file

When you use one of the seven subgenerators the application creates only the file specified in the command typed. You can create more files passing name files separated by space.


## A cool feature: Live Reload

Creating your AT project using the generatior gives you the possibility to have a live demo of the project that you created and add also a cool feature, very useful during development, the live reload.
The Live Reload shows all the changes that you make on your template directely inside the browser without asking you to press F5 refreshing automatically the template's content.

To launch the live demo type: `grunt server`.

Change something inside the template and check your browser.


## Help

The Aria Templates generator provides also an help guide. Just type `yo ariatemplates --help` to consult it.


## Running the generator-ariatemplates on Linux

If you want to use the generator on linux platform, maybe you'll have some issues due to how yeoman works on linux.

If you face a problem with `update-notifier-yo.xml` file you should have a look to [this post](https://github.com/yeoman/yeoman/issues/1097#issuecomment-21032777) that explains you how to fix the problem.


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
