"use strict";

module.exports = {
  root: './_build',
  package: require('../../package.json'),
  options: {
    autoprefixer: { browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'] },
    spritesmith: {
                    general: {
                                imgPath: '../img/spriteIcons.png',
                                imgName: 'spriteIcons.png',
                                cssName: '_spriteIcons.scss',
                                cssFormat: 'scss',
                                cssSpritesheetName: 'icons',
                                padding: 5
                              },
                    src: './_dev/src/img/icons/**/*.png',
                    imgDest: './_dev/src/img/',
                    styleDest: './_dev/src/style/common/'
                  },
    svgSprite: {
                general: {
                          mode: {
                            symbol: {
                              dest: 'template/common/',
                              sprite: '_spriteIcons.svg'
                            }
                          }
                        },
                src:'./_dev/src/img/icons/**/*.svg',
                dest: './_dev/src/'
              }
  },
  path: {
    pug: {
          src: './_dev/src/template/page/*.*',
          dest: './_build/',
          watch: './_dev/src/template/**/*.*'
          },
    style: {
          src: './_dev/src/style/main.scss',
          dest: './_build/css/',
          watch: './_dev/src/style/**/*.*'
          },
    js: {
          src: './_dev/src/js/**/*.js',
          dest: './_build/js/',
          watch: './_dev/src/js/**/*.*'
        },
    image: {
              src: ['./_dev/src/img/**/*.*','!_dev/src/img/icons/**/*.*'],
              dest: './_build/img/'
            },
    fonts: {
              src: ['./_dev/src/fonts/**/*.*', '!_dev/src/fonts/**/*.md'],
              dest: './_build/fonts/'
            },
    vendorJS: {
                src:[
                      './bower_components/jquery/dist/jquery.min.js',
                      './bower_components/owl.carousel/dist/owl.carousel.min.js'
                    ],
                dest: './_build/js/vendor/'
              },
    vendorCSS: {
                src:[
                      './bower_components/normalize-css/normalize.css',
                      './bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
                      './bower_components/font-awesome/css/font-awesome.min.css',
                    ],
                dest: './_build/css/vendor/'
              },
    copyToRoot: {
                src: './_dev/src/copyToRoot/**/*.*',
                dest: './_build/'
              }
  },
  task: [
    './_dev/gulp/tasks/clean.js',
    './_dev/gulp/tasks/spritePNG.js',
    './_dev/gulp/tasks/spriteSVG.js',
    './_dev/gulp/tasks/style.js',
    './_dev/gulp/tasks/pug.js',
    './_dev/gulp/tasks/mainJS.js',
    './_dev/gulp/tasks/vendorJS.js',
    './_dev/gulp/tasks/vendorCSS.js',
    './_dev/gulp/tasks/images.js',
    './_dev/gulp/tasks/fonts.js',
    './_dev/gulp/tasks/copyToRoot.js',
    './_dev/gulp/tasks/watch.js',
    './_dev/gulp/tasks/server.js'
  ]
};