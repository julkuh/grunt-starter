module.exports = function (grunt) {

    // Configurable paths
    var config = {
        src: 'src',
        dist: 'dist',
        mainfile: 'index.html'
    };

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({

        // Project settings
        config: config,

        pkg: grunt.file.readJSON('package.json'),


        clean: {
            build: '<%= config.dist %>/'
        },


        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                expand: true,
                cwd: '<%= config.src %>/js/', // All src matches are relative to (but don't include) this path.
                src: '{,*/}*.js',
                dest: '<%= config.dist %>/js/',
                ext: '.min.js', // Dest filepaths will have this extension.
            }
        },

        // connect and open dev app
        connect: {
            build: {
                options: {
                    port: 3000,
                    base: './<%= config.dist %>/',
                    hostname: '*',
                    livereload: true
                }
            },
            dev: {
                options: {
                    port: 3000,
                    base: './<%= config.src %>/',
                    hostname: '*',
                    livereload: true
                }
            }
        },
        open: {
            dev: {
                path: 'http://localhost:3000/<%= config.mainfile %>',
                app: 'Chrome'
            }
        },
        watch: {
            build: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= config.dist %>/**/*.html',
                    '<%= config.dist %>/js/**/*.js',
                    '<%= config.dist %>/css/**/*.css',
                    '<%= config.dist %>/assets/**/*.*'
                ]
            },
            dev: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= config.src %>/**/*.html',
                    '<%= config.src %>/js/**/*.js',
                    '<%= config.src %>/css/**/*.css',
                    '<%= config.src %>/assets/**/*.*'
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/',
                    src: ['**/*.html'],
                    dest: '<%= config.dist %>/',
                    ext: '.html'
                }]
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.dist %>/css',
                    ext: '.css'
                }]
            }
        },
        concurrent: {
            build: [
                'cssmin',
                'uglify',
                'htmlmin'
            ],
            show: [
                'connect',
                'open:dev'
            ]
        }
    });

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Default task(s).
    grunt.registerTask('default', [
        'connect:dev',
        'open:dev',
        'watch:dev'
    ]);

    //TODO: Watch, reload/browsersync and Concatenate css and JS
    //TODO: Wiredependencies to get e.g. bootstrap or ZurbFoundation dependencies into html

    grunt.registerTask('build', [
        'clean',
        'concurrent:build'
    ]);

    grunt.registerTask('show', [
        'clean',
        'concurrent:build',
        'concurrent:show',
        'watch:build'
    ]);

};