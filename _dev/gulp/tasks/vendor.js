'use strict';

module.exports = function() {
  $.gulp.task('vendor', function() {
    return $.gulp.src( $.config.path.vendor.src )
        .pipe($.gulp.dest( $.config.path.vendor.dest ))
  })
};
