"use strict";

module.exports = function () {
  $.gulp.task('spritePNG', function (cb) {
    $.rimraf($.config.options.spritesmith.imgDest + $.config.options.spritesmith.general.imgName, cb);
    $.rimraf($.config.options.spritesmith.styleDest + $.config.options.spritesmith.general.cssName, cb);
    
    var spriteData =
        $.gulp.src( $.config.options.spritesmith.src ) // путь, откуда берем картинки для спрайта
          .pipe($.gp.spritesmith( $.config.options.spritesmith.general ));
    spriteData.img.pipe($.gulp.dest( $.config.options.spritesmith.imgDest )); // путь, куда сохраняем картинку
    spriteData.css.pipe($.gulp.dest( $.config.options.spritesmith.styleDest )); // путь, куда сохраняем стили

    return spriteData;
  });
};