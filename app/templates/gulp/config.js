global.SRC_FOLDER = 'src';
global.BUILD_FOLDER = 'build';
global.RELEASE_FOLDER = 'release';
global.TMP_FOLDER = 'tmp';

global.config = {
    paths: {
        src: {
            index: SRC_FOLDER + '/index.jade',
            fonts: SRC_FOLDER + '/assets/fonts/**/*',
            images: SRC_FOLDER + '/assets/images/**/*',
            scripts: SRC_FOLDER + '/modules/**/*.js',
            styles: SRC_FOLDER + '/styles/app.scss',
            templates: SRC_FOLDER + '/modules/**/*.jade',
            templatesCompiled: TMP_FOLDER,
            livereload: [BUILD_FOLDER + '/**/*', '!' + BUILD_FOLDER + '/assets/**/*'],
            modules: './' + SRC_FOLDER + '/modules/index.js'
        },
        dest: {
            build: {
                styles: BUILD_FOLDER,
                scripts: BUILD_FOLDER,
                images: BUILD_FOLDER + '/assets/images',
                fonts: BUILD_FOLDER + '/assets/fonts',
                index: BUILD_FOLDER,
                server: BUILD_FOLDER
            },
            release: {
                styles: RELEASE_FOLDER,
                scripts: RELEASE_FOLDER,
                images: RELEASE_FOLDER + '/assets/images',
                fonts: RELEASE_FOLDER + '/assets/fonts',
                index: RELEASE_FOLDER,
                server: RELEASE_FOLDER
            }
        }
    },
    filenames: {
        build: {
            styles: 'bundle.css',
            scripts: 'bundle.js'
        },
        release: {
            styles: 'bundle.min.css',
            scripts: 'bundle.min.js'
        },
        templates: {
            compiled: 'templates.js',
            angular: {
                moduleName: 'app.templates',
                prefix: '',
                stripPrefix: 'app/'
            }
        }
    },
    ports: {
        staticServer: 8080,
        livereloadServer: 35729
    }
};