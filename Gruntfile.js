var grunt = require('grunt'),
    path = require('path');

module.exports = function(grunt) {
   // 'use strict';
    var pkg = grunt.file.readJSON('package.json');
    var cfg = {
        cfg: {
            dist: 'dist',
            src: 'zugmeister',
            tmp: '.tmp'
        }
    };

    grunt.initConfig({
        localize : {
            module: {
                options: {
                    src: 'dist/zugmeister/module.js',
                    dest: 'dist/zugmeister'
                },
                files: [
                    {expand: true, flatten: true, src: ['zugmeister/locale/*.json']}
                ]
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            },
            ci: {
                configFile: 'test/karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },

        compass : {
            run: {
                options: {
                    cacheDir: '.sass-cache/', sassDir: 'zugmeister/scss/', cssDir: 'tmp/zugmeister/'
                }
            }
        },

        concat : {
            dist: {
                src: [
                    'zugmeister/module.js',
                    'zugmeister/modules/*/*.js',
                    'tmp/js/templates.js',
                    'tmp/js/styles.js'
                ],
                dest: 'tmp/zugmeister/module.js'
            }
        },

        uglify : {
            main: {
                options: {
                    sourceMap: false,
                    mangle: false
                },
                files: [
                    {
                        src: ['tmp/zugmeister/module.js'],
                        dest: 'dist/zugmeister/module.js'
                    }
                ]
            }
        },

        clean : {
            main: ['docs',
                'coverage',
                'tmp',
                'dist',
                '.stage'],
            dist: ['dist/*/*.css', 'dist/*/module.js', 'dist/*/module.js.map']
        },

        autoprefixer : {
            options: {
                map: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'tmp/concat/zugmeister/',
                        src: '*/*.css',
                        dest: 'tmp/concat/zugmeister/'
                    }
                ]
            }
        },

        useminPrepare : {
            html: 'index.html'
        },

        usemin : {
            css: {
                files: {
                    'zugmeister/concat/module.css': ['tmp/zugmeister/module.css']
                }
            }
        },

        watch : {
            src: {
                files: [
                    'zugmeister/*/*{.js,.css,.html}'
                ],
                tasks: ['build']
            }
        },

        ngtemplates : {
            app: {
                options: {
                    base: 'zugmeister',
                    module: 'app.zugmeister'
                },
                src: 'zugmeister/*.html',
                dest: 'tmp/js/templates.js'
            }
        },

        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 9000,
                    hostname: '*',
                    onCreateServer: function(server, connect, options) {
                        var io = require('socket.io').listen(server);
                        io.sockets.on('connection', function(socket) {
                            // do something with socket
                        });
                    }
                }
            }
        }

    });


    grunt.task.registerTask('optimize', [
        'ngtemplates',
        'compass:run',
        'useminPrepare',
        'autoprefixer',
        'cssmin:generated',
        'concat',
        'uglify',
        'usemin'
    ]);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('karma-jasmine');
    grunt.loadNpmTasks('grunt-karma');


    grunt.task.registerTask('build-feature', ['clean:main','optimize', 'connect']);
    grunt.task.registerTask('build-package', ['default',  'build-feature', 'serve']);
    grunt.task.registerTask('test', ['karma:unit']);


};
