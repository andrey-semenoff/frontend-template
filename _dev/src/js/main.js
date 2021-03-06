'use strict';

$(function () {

  // Инициализация скрипта
  Smooth_Scroll.init();
  
  // Инициализация функции валидации форм
  var validate = Validate_Forms.init();
  
  // Инициализация скрипта для формы регистрации
  Form_Send_Ajax.init({
    forms: [
      '.form'
    ],
    validate: validate
  });

  // owl-carousel init
  $(".owl-carousel[data-type='common']").owlCarousel({
  	items: 4,
  	loop: true,
  	smartSpeed: 1000,
  	autoHeight: true,
  	nav: true,
  	navText: [
  		"<span class='fa fa-chevron-left fa-2x owl-nav_arrow'></span>",
  		"<span class='fa fa-chevron-right fa-2x owl-nav_arrow'></span>"
  	],
  	responsive: {
  		992: {
        items: 4,
      },
      
      768: {
      	items: 3,
      },
      
      550: {
      	items: 2,
      },

      0: {
      	items: 1,
      }
  	}
  });


  // modal
  $("[data-modal]").click(function(e) {
    e.preventDefault();
    var $modal = $($(this).attr('href'));

    $modal.on($.modal.BLOCK, function(e) {
      $('.error-note').remove();
    })
    .on($.modal.OPEN, function(e) {
      $modal.find('input:nth-of-type(1)').focus();
    });

    $modal.modal({
      fadeDuration: 500
    });
  })

  //  
});
