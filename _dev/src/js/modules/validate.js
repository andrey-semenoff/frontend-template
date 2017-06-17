

/** =======================
* ----- Validate Forms ----
* ====================== */

/** Настройка полей формы для кооректной валидации:
* 1. Для FORM необходимо указать атрибут novalidate.
* 2. По желанию для INPUT можно указать data-rule = "name/email/text/tel/..."
*   если для INPUT не указан data-rule - тип валидации будет равен атрибуту "type",
*   если для TEXTAREA не указан data-rule - тип валидации будет равен "text".
* 3. Для обязательных полей указываем атрибут required
*   если required не указан, то пустое поле проверяться не будет,
*   а заполненное поле будет проверяться, как и обязательные поля.
* 4. По желанию можно поставить autocomplete = "no", чтобы не менялись стили поля.
* 5. При необходимости можно настроить плагин передав ему объект с настройками
*/
var Validate_Forms = (function() {

  function init(options) {

    // Установки по умолчнию
    var actions = {
      name: function($el, value) {
        value = value.trim();
        $el.val(value);
        // $el.attr("value", value);
      },
      tel: function($el, value) {
        value = value.trim();
        value = value.replace(/\D+/g, '');
        $el.val(value);
        // $el.attr("value", value);
      }
    },

    defaults = {

      rules: {
        empty: {
          note: "Заполните пожалуйста это поле!",
        },
        name: {
          regexp: /^[a-zа-я\s]{2,}$/i,
          note: "Имя должно состоять минимум из 2 букв!",
          action: actions.name
        },
        email: {
          regexp: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
          note: "Не правильный формат email!",
          action: actions.name
        },
        tel: {
          regexp: /^\d{6,}$/g,
          note: "Не правильный формат телефона!",
          action: actions.tel
        },
        textarea: {
          regexp: /.{5,}/i,
          note: "Сообщение должно состоять минимум из 5 букв!",
          action: actions.name
        },
        select: {
          regexp: /.+/i,
          note: "Выберите пункт из списка!"
        },
        date: {
          regexp: /^[0-3][0-9].[0|1][0-9].(19|20)[0-9]{2}/i,
          note: "Не правильный формат даты!",
          action: actions.name
        },
      },

      msgBoxClass: "help-block",
      parentErrorClass: "has-error",
      hideNoteOnFocus: false
    };

    // Обработка пользовательских настроек
    if( options !== undefined && $.type(options) === "object" ) {
      defaults = changeDefaults(defaults, options);
    }

    // Изменяет установки по умолчанию, согласно переданным параметрам
    function changeDefaults(defaults, options) {
      if( !$.isEmptyObject(options) ) {
        for(var opt in options) {
          if( defaults.hasOwnProperty(opt) ) {
            if( typeof(options[opt]) === typeof(defaults[opt]) ) {
              if( $.type(options[opt]) === "object" ) {
                changeDefaults(defaults[opt], options[opt])
              } else {
                // Изменение настройки по умолчанию
                defaults[opt] = options[opt];
              }
            }
          } else {
            // Новая настройка
            defaults[opt] = options[opt];
          }
        }
      }
      return defaults
    }

    // Валидация введенных пользователем данных
    return function validate(form) {
      var isValid = true,
          $inputs = form.find('input:not([type=hidden]):not([type=radio]):not([type=checkbox]), textarea, select'),
          rules = defaults.rules,
          msgBoxClass = defaults.msgBoxClass,
          parentErrorClass = defaults.parentErrorClass,
          hideNoteOnFocus = defaults.hideNoteOnFocus;

      $inputs.each(function () {
        var $this = $(this),
            value = $this.val(),
            rule = $this.data('rule'),
            required = $this.prop("required"),
            type = $this.attr('type');

        // Скрывать ли сообщение с текстом ошибки
        if( hideNoteOnFocus ) {
          $this.on('focus', function() {
            $this.next("."+ msgBoxClass).remove();
          });
        }

        // Если нету атрибута "type" - используем название тега
        if( type === undefined ) {
          // console.log($this[0].nodeName.toLowerCase());
          type = $this[0].nodeName.toLowerCase();
        }

        // Если нету атрибута "data-rule"
        if( rule === undefined ) {
          rule = type;
          console.warn("Внимание! Поле формы не содержит атрибут 'data-rule': class = "+ $this.attr('class') + "; name = "+ $this.attr('name') +". Валидация может быть некорректной!");
        }

        // Если поле пустое
        if( value == '' || value == null ) {

          $this.parent().removeClass(parentErrorClass);
          
          if( required ) {
            if( !$this.next("."+ msgBoxClass).length ) {
              $this.after($("<div class='"+ msgBoxClass +"'>"+ rules.empty.note +"</div>"));
            } else {
              $this.next("."+ msgBoxClass).text(rules.empty.note)
            }
            $this.parent().addClass(parentErrorClass);
            isValid = false;
          }
        
        // Если поле НЕ пустое
        } else {
          // Проведим очитску поля не лишнего
          if ( rules[rule].action !== undefined ) {
            rules[rule].action($this, value);
          }

          value = $this.val();
          // console.log("<"+$this.val()+">");
          
          // Проверяем на соответствие регулярному выражению
          if( !value.match(rules[rule].regexp) ) {
            if( !$this.next("."+ msgBoxClass).length ) {
              $this.after($("<div class='"+ msgBoxClass +"'>"+ rules[rule].note +"</div>"));
            } else {
              $this.next("."+ msgBoxClass).text(rules[rule].note)
            }
            $this.parent().addClass(parentErrorClass);
            isValid = false;
          } else {
            $this.next("."+ msgBoxClass).remove();
            $this.parent().removeClass(parentErrorClass);
          }
        }
      });

      return isValid;
    }
  }

  return {
    init: init
  }
}());