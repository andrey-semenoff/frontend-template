'use strict';

module.exports = function() {
  $.gulp.task('pug', function() {
    return $.gulp.src( $.config.path.pug.src )
        .pipe($.gp.pug({ pretty: true }))
        .on('error', $.gp.notify.onError(function(error) {
                                                          return {
                                                            title: 'Jade',
                                                            message:  error.message
                                                          }
        }))
        .pipe($.gulp.dest( $.config.path.pug.dest ));
  });
};
