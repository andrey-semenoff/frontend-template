'use strict';

module.exports = function() {
  $.gulp.task('images', function() {
    return $.gulp.src( $.config.path.image.src )
        .pipe($.gulp.dest( $.config.path.image.dest ));
  });
};
