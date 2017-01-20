'use strict';

module.exports = function() {
  $.gulp.task('vendorJS', function() {
    return $.gulp.src( $.config.path.vendorJS.src )
        // .pipe($.gp.concat('vendor.js'))
        .pipe($.gulp.dest( $.config.path.vendorJS.dest ))
  })
};
