"use strict";

global.$ = {
  gulp: require('gulp'),
  rimraf: require('rimraf'),
  browserSync: require('browser-sync').create(),
  rsp: require('remove-svg-properties'),
  gp: require('gulp-load-plugins')(),
  config: require('./_dev/gulp/config')
};

$.config.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    'clean',
    'spritePNG',
    'spriteSVG',
    $.gulp.parallel(
        'mainJS',
        'vendorJS',
        'vendorCSS',
        'fonts'
    ),
    'pug',
    'style',
    'images',
    'copyToRoot',
    $.gulp.parallel(
        'watch',
        'server'
    )
));
