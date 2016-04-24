$(document).ready(function() {
  $("div.tab").on("click", function() {
    var $e = $(this);
    if (!$e.hasClass("tab--active")) {
      var i = $("div.tab").index($e);
      $("div.tab--active").toggleClass("tab--active").toggleClass("tab--inactive");
      $e.toggleClass("tab--inactive").toggleClass("tab--active");
      $("div.tab-text__article--active").toggleClass("tab-text__article--active");
      $("div.tab-text__article").eq(i).addClass("tab-text__article--active");
    }
  })
})
