"use strict";

module.exports = function () {
  $.gulp.task('copyToRoot', function() {
    return $.gulp.src($.config.path.copyToRoot.src)
        .pipe($.gulp.dest($.config.path.copyToRoot.dest))
  });
};