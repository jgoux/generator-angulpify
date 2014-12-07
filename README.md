# Angulpify generator [![Build Status](https://secure.travis-ci.org/jgoux/generator-angulpify.svg?branch=master)](http://travis-ci.org/jgoux/generator-angulpify)

> [Yeoman](http://yeoman.io) generator that scaffolds out a front-end web app using [angularjs](https://angularjs.org/), [gulp](http://gulpjs.com/) and [browserify](http://browserify.org/)

![](http://i.imgur.com/ucUfQQz.png)


### Notice

This project is still in early stage of development, so use with caution. API breaking changes at this stage are quite likely.


## Features

* Require() everywhere to build a modular application
* Built-in preview server with livereload
* Automagically compile CoffeeScript (you can use plain JavaScript if you prefer!)
* Automagically lint your scripts
* Automagically compile Sass/Less (you can still use CSS too!)
* CSS Autoprefixing
* Automagically compile your Jade (or HTML if you want!) templates into $templateCache
* Awesome image optimization
* Wire-up Bower dependencies easily with browserify-shim
* Bundle your application for two environments (build/dist)

*For more information on what this generator can do for you, take a look at the [gulp plugins](generators/app/templates/_package.json).*

## Tooling

This generator relies on several technologies, make sure your system has:
- [Node.js](http://nodejs.org)
- [Yeoman](http://yeoman.io/learning/index.html)
- [Bower](http://bower.io/#install-bower)
- [Gulp](http://gulpjs.com)
- [[Ruby](https://www.ruby-lang.org/en/installation/) + [Sass](http://sass-lang.com/install)] | Optional


## Getting Started

- Install: `npm install -g generator-angulpify`
- Run: `yo angulpify`
- Run:
  * `gulp` for building to the `build` directory
  * `gulp --env=prod` for building to the `dist` directory
- Go to http://localhost:3000
- Enjoy!


#### Third-Party Dependencies

*(HTML/CSS/JS/Images/etc)*

To install dependencies, run `bower install --save package-name` to get the files, then add an entry into the [browser](generators/app/templates/_package.json#L41) key of your `package.json`.


## Docs

More to come.


## Options

- `--skip-install`
  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.


## Contribute

PRs are welcome!


## Special Thanks

This generator is inspired by the [Web app generator](https://github.com/yeoman/generator-gulp-webapp) and by [Ben Clinkinbeard](http://twitter.com/bclinkinbeard)'s [presentation](http://benclinkinbeard.com/talks/2014/ng-conf/).
Thanks to all the contributors!


## License

[MIT](https://tldrlegal.com/license/mit-license)
