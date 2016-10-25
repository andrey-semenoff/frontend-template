'use strict';

module.exports = function () {
  $.gulp.task('spriteSVG', function (cb) {
    $.rimraf($.config.options.svgSprite.dest + $.config.options.svgSprite.general.mode.symbol.sprite, cb);
  
    return $.gulp.src( $.config.options.svgSprite.src ) // путь, откуда берем картинки для спрайта
        .pipe($.gp.cheerio({
              run: function(jq) {
                jq('[fill]').removeAttr('fill');
                jq('[style]').removeAttr('style');
              },
              parserOptions: {
                xmlMode: true
              }
            }))
        .pipe($.gp.replace('&gt;', '>'))
        .pipe($.gp.svgSprite( $.config.options.svgSprite.general ))
        .pipe($.gulp.dest( $.config.options.svgSprite.dest ));
  });
};