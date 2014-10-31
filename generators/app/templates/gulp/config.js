'use strict';

var path = require('path');
var env = require('./env');

// Folders & files names
var src = './src';
  var assets = 'assets';
    var assets_images = 'images';
  var scripts = 'scripts';
    var scripts_app = 'app';
      var scripts_app_entry = 'app.module.js';
    var scripts_config = env.getEnv() + '.config.json';
    var scripts_index = 'index.jade';
    var scripts_vendors = 'vendors.js';
    var scripts_app_output = 'app.js';
    var scripts_app_output_partial = 'app*';
    var scripts_vendors_output = 'vendors.js';
    var scripts_vendors_output_partial = 'vendors*';
  var styles = 'styles';
    var styles_main = 'main.scss';
    var styles_output = 'app';
var build = './build';
var dist = './dist';
var tmp = './.tmp';
  var tmp_config_module = 'app.config';
  var tmp_config_output = 'config';
  var tmp_templates_module = 'app.templates';
  var tmp_templates_output = 'templates.js';

var dest = env.isDev() ? build : dist;

// Configuration for each task
var configuration = {
  assets: {
    src: path.join(src, assets, '**/*'),
    imagesFilter: path.join(assets_images, '**/*'),
    imagemin: { optimizationLevel: 5, progressive: true, interlaced: true },
    dest: path.join(dest, assets)
  },
  browserify: {
    app: {
      browserify: {
        cache: {}, packageCache: {}, fullPaths: true,
        entries: ['./' + path.join(src, scripts, scripts_app, scripts_app_entry)],
        debug: true
      },
      output: scripts_app_output,
      dest: dest
    },

    vendors: {
      browserify: {
        cache: {}, packageCache: {}, fullPaths: true,
        entries: ['./' + path.join(src, scripts, scripts_vendors)]
      },
      output: scripts_vendors_output,
      dest: dest
    }
  },
  clean: {
    src: [
      path.join(dest, '**/*'),
      path.join(tmp, '**/*')
    ]
  },
  config: {
    src: path.join(src, scripts, scripts_config),
    rename: {
      basename: tmp_config_output
    },
    ngConstant: {
      name: tmp_config_module,
      wrap: 'commonjs'
    },
    dest: tmp
  },
  index: {
    src: path.join(src, scripts, scripts_index),
    injectSrc: [
      path.join(dest, scripts_vendors_output_partial + '.js'),
      path.join(dest, scripts_app_output_partial + '.{css,js}')
    ],
    inject: {
      ignorePath: path.join(dest),
      addRootSlash: false
    },
    dest: dest
  },
  lint: {
    src: path.join(src, '**/*.js')
  },
  serve: {
    browserSync: {
      server: {baseDir: dest},
      open: false
    }
  },
  styles: {
    cssFilter: '**/*.css',
    src: path.join(src, styles, styles_main),
    rename: {basename: styles_output},
    sass: {
      sourcemap: env.isDev() ? 'auto' : 'none',
      sourcemapPath: path.join('..', src, styles),
      style: 'compressed'
    },
    dest: dest
  },
  templates: {
    src: path.join(src, scripts, scripts_app, '**/*.jade'),
    templateCache: {
      filename: tmp_templates_output,
      options: {
        moduleSystem: 'Browserify',
        standalone: true,
        module: tmp_templates_module,
        base: function (file) {
          return path.basename(file.relative);
        }
      }
    },
    dest: tmp
  },
  watch: {
    lint: path.join(src, scripts, scripts_app, '**/*.js'),
    index: path.join(src, scripts, scripts_index),
    config: path.join(src, scripts, scripts_config),
    templates: path.join(src, scripts, scripts_app, '**/*.jade'),
    styles: path.join(src, styles, '**/*.{sass,scss}'),
    styles_output: styles_output + '.min.css',
    reload: path.join(dest, '**/*.{js,html}')
  }
};

module.exports = configuration;
