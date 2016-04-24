(function($) {


  var methods = {

    /**************************************************************************
    * Plugin initialization
    **************************************************************************/
    init: function(options) {

      if (!this.data("imgStartIndex")) {
        // На данном элементе плагин не был инициализирован
        var settings = $.extend(
          {
            imgOnScreen: 1, // Количество изображений, показываемых одновременно
            marginWidth: 10,  // Расстояние между изображениями
            duration: 300 // Длительность анимации, мс
          }, options
        );

        if (this.prop("tagName").toLowerCase() === "div") { // jQuery-элемент должен быть div
          this.addClass("simpleJQCarousel");

          var parentWidth = this.parent().width();  // Определяем ширину родительского контейнера и работаем на полную ширину
          if (parentWidth != 0) {
            this.prepend('<div class="simpleJQCarousel__film clearfix"></div>');  // Создаем контейнер для изображений (плёнку)
            var $film = this.find(".simpleJQCarousel__film");
            var $images = this.children("img");
            $film.append($images);  // Переносим изображения "на плёнку"

            settings.imgCount = $images.length;

            settings.imgWidth = Math.round(
              (parentWidth - settings.marginWidth * (settings.imgOnScreen - 1 )) /
              settings.imgOnScreen);  // Определяем ширину изображения
            for (let i = 0; i < settings.imgCount; i++) {
              // Устанавливаем для всех изображений рассчитанную ширину с сохранением пропорций
              $images.eq(i).attr("width", settings.imgWidth + "px")
              .attr("height", "auto")
              .css("margin-right", settings.marginWidth + "px");
            }

            // Рассчитавыем ширину окна просмотра
            var hiderWidth = settings.imgOnScreen * settings.imgWidth
                            + settings.marginWidth * (settings.imgOnScreen - 1);

            // Рассчитываем ширину "плёнки"
            var filmWidth = settings.imgCount
                          * (settings.imgWidth + settings.marginWidth);
            $film.width(filmWidth + "px");

            settings.height = parseInt($film.height());

            // Устанавливаем параметры для контейнера видимых изображений
            this.width(hiderWidth + "px").height(settings.height + "px");

            // Добавляем сверху контейнер для стрелок управления
            if (settings.imgCount > settings.imgOnScreen) {
              this.append('<div class="simpleJQCarousel__controls simpleJQCarousel__controls--right"></div>');
              var arrowSize = Math.round(hiderWidth * 0.1) + "px";  // Стрелка занимает 10% ширины контейнера
              this.find(".simpleJQCarousel__controls")
              .css("background-size",
              arrowSize + " " + arrowSize + ", "
              + arrowSize + " " + arrowSize);
              // На контейнер со срелками вешаем обработчик событий по клику
              this.find(".simpleJQCarousel__controls").on("click", function(e) {
                var $element = $(this);
                // Определяем позицию курсора при клике и сдвигаем в сторону, к которой он ближе
                if (((e.pageX - $element.offset().left) - ($element.width() >> 1)) > 0) {
                  $element.parent().simpleJQCarousel("scroll", "right");
                } else {
                  $element.parent().simpleJQCarousel("scroll", "left");
                }
              });
            }

            // Сохраняем настройки и номер первого изображения
            this.data("settings", settings)
            .data("imgStartIndex", 1);

            return this;
          } else {
            $.error("The length of the container for simleJQCarousel plugin should be greater then 0.");
          }
        } else {
          $.error("You should use DIV-tag for simpleJQCarousel plugin.");
        }
      } else {
        $.error("simpleJQCarousel plugin has been already initialized on this element.");
      }
    },

    /**************************************************************************
    * Scroll
    **************************************************************************/
    scroll: function(moveTo) {
      var direction;
      if (moveTo === "left") {
        direction = -1;
      } else if (moveTo === "right") {
        direction = 1;
      }
      if (direction) {
        var settings = this.data("settings");
        var imgStartIndex = this.data("imgStartIndex");
        var $film = this.find(".simpleJQCarousel__film");
        var shift = settings.imgWidth + settings.marginWidth;

        if (direction == 1) {
          if((imgStartIndex + settings.imgOnScreen) <= settings.imgCount ) {
            $film.animate({left: "-=" + shift}, settings.duration);
            this.data("imgStartIndex", ++imgStartIndex);
          }
        } else {
          if (imgStartIndex > 1) {
            $film.animate({left: "+=" + shift}, settings.duration);
            this.data("imgStartIndex", --imgStartIndex);
          }
        }

        $controls = this.find(".simpleJQCarousel__controls");
        if (imgStartIndex == 1) {
          // Скрываем левую стрелку
          $controls.removeClass("simpleJQCarousel__controls--bidirectional")
                    .removeClass("simpleJQCarousel__controls--left")
                    .addClass("simpleJQCarousel__controls--right");
        } else if((imgStartIndex + settings.imgOnScreen) > settings.imgCount ) {
          // Скрываем правую стрелку
          $controls.removeClass("simpleJQCarousel__controls--bidirectional")
                    .addClass("simpleJQCarousel__controls--left")
                    .removeClass("simpleJQCarousel__controls--right");
        } else {
          if (!$controls.hasClass("simpleJQCarousel__controls--bidirectional")) {
            // Показываем обе стрелки
            $controls.addClass("simpleJQCarousel__controls--bidirectional")
            .removeClass("simpleJQCarousel__controls--left")
            .removeClass("simpleJQCarousel__controls--right");
          }
        }
      }
      return this;
    },

    status: function() {
      console.log(settings);
    }

  };

  /**************************************************************************
  * function
  **************************************************************************/
  $.fn.simpleJQCarousel = function(method) {
    if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if(typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("There's no \"" + method + "\" in SimpleJQCarousel");
    }
  }

})(jQuery);
