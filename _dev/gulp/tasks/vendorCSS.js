'use strict';

module.exports = function() {
  $.gulp.task('vendorCSS', function() {
    return $.gulp.src( $.config.path.vendorCSS.src )
        // .pipe($.gp.concatCss('vendor.css'))
        .pipe($.gp.cleanCss())
        .pipe($.gulp.dest( $.config.path.vendorCSS.dest ))
  })
};
