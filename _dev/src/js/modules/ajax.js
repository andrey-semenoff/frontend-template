

/** =======================
* ---- Form_Send_Ajax -----
* ====================== */
var Form_Send_Ajax = (function() {

  function init(options) {
    var validate = options.validate || false;

    if( options.forms !== undefined && options.forms.length !== 0 ) {
      options.forms.forEach(function(item) {
        var $item = $(item);

        if( $item.length === 0 || !$item.is("form") ) {
          return console.error("ERROR: Елемент с селектором '"+ item +"' - не форма!");
        }
      })
    } else {
      return console.error("ERROR: Не определена форма для отправки в настройках плагина!");
    }

    if( options.validate === undefined || !(options.validate instanceof Function)) {
      return console.error("ERROR: Не определен плагин валидации формы!");
    }

    // convert array to string
    var forms = options.forms.join(','),
        timer;

    $(forms).submit(function(e) {
      e.preventDefault();

      var $form = $(this);

      // if( true ) {
      if( validate($form) ) {
          var formData = $form.serialize();
          
        $.ajax({
          method: "POST",
          url: "mail.php",
          data: formData
        })
        .done(function( res ) {
          var data = JSON.parse(res),
              status = data.status,
              msg = data.msg,
              alert_class = '',
              $alert = $('.alert').clone();

          if( status ) {
            alert_class = 'success';
          } else {
            alert_class = 'danger';
          }

          $form.append( $alert.addClass('alert_show alert-'+ alert_class).children('.alert__msg').html(msg).parent() );
          
          $(document).on('click', ".alert", function(){
            removeAlert();
            clearTimeout(timer);
          });

          timer = setTimeout(function(){
            removeAlert();
          }, 5000);

          function removeAlert() {
            $form[0].reset();
            $(".alert.alert-"+ alert_class).addClass("alert_hide").fadeOut("slow", function() {
              $(".alert.alert-"+ alert_class).remove();
              // $.modal.close();
            });
          }

        })
        .fail(function() {
          var $alert = $('.alert').clone();

          $form.append( $alert.addClass('alert_show alert-danger').children('.alert__msg').html("Ошибка отправки! Попробуйте позже!").parent() );
          
          $(document).on('click', ".alert", function(){
            removeAlert();
            clearTimeout(timer);
          });

          timer = setTimeout(function(){
            removeAlert();
          }, 5000);

          function removeAlert() {
            $form[0].reset();
            $(".alert.alert-danger").addClass("alert_hide").fadeOut("slow", function() {
              $(".alert.alert-danger").remove();
              // $.modal.close();
            });
          }

        });

      }
    });
  }

  return {
    init: init
  }
}());