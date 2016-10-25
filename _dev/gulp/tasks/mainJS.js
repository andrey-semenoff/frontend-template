'use strict';

module.exports = function() {
  $.gulp.task('mainJS', function() {
    return $.gulp.src( $.config.path.js.src )
        .pipe($.gp.sourcemaps.init())
        .pipe($.gp.concat('main.js'))
        .pipe($.gp.sourcemaps.write())
        .pipe($.gulp.dest( $.config.path.js.dest ))
  })
};
