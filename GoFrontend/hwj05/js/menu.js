$(function() {

  const ANIMATION_DURATION = 300;

  $(".jq-menu__dropdown").hover(
    function(e){
      $(this).children('ul').slideDown(ANIMATION_DURATION);
    },
    function(e){
      $(this).children('ul').slideUp(ANIMATION_DURATION);
    }
  );

  $(".jq-menu__dropright").hover(
    function(e){
      const SUBMENU_SHIFT = 5;
      var position = $(this).position();
      position.top = (position.top + SUBMENU_SHIFT) + "px"
      position.left = (position.left + $(this).width() - SUBMENU_SHIFT) + "px";
      var $submenu = $(this).children('ul');
      $submenu.css("top", position.top).css("left", position.left);
      $submenu.animate({width:'toggle', height:'toggle'}, ANIMATION_DURATION);
    },
    function(e){
      $(this).children('ul').animate({width:'toggle'}, ANIMATION_DURATION);
    }
  );

})
