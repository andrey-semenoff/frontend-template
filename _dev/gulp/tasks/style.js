'use strict';

module.exports = function() {
  $.gulp.task('style', function() {
    return $.gulp.src( $.config.path.style.src )
        .pipe($.gp.sourcemaps.init())
        .pipe($.gp.sass({outputStyle: 'expanded'})).on('error', $.gp.notify.onError({ title: 'Style' }))
        .pipe($.gp.autoprefixer( $.config.options.autoprefixer ))
        .pipe($.gp.stripCssComments())
        .pipe($.gp.sourcemaps.write())
        .pipe($.gulp.dest( $.config.path.style.dest ))
        .pipe($.browserSync.stream())
  })
};
