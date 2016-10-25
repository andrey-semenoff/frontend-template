'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch( $.config.path.pug.watch , $.gulp.series('pug'));
    $.gulp.watch( $.config.path.style.watch , $.gulp.series('style'));
    $.gulp.watch( $.config.path.js.watch , $.gulp.series('mainJS'));
    $.gulp.watch( $.config.path.image.src , $.gulp.series('images'));
    $.gulp.watch( $.config.path.fonts.src , $.gulp.series('fonts'));
    $.gulp.watch( $.config.path.copyToRoot.src , $.gulp.series('copyToRoot'));
    $.gulp.watch( $.config.options.spritesmith.src , $.gulp.series('spritePNG'));
    $.gulp.watch( $.config.options.svgSprite.src , $.gulp.series('spriteSVG'));
  });
};
