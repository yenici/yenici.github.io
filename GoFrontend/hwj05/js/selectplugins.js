$(function () {

  /*---------- START Selects block ----------*/
  cuSel({
    changedEl: ".cusel-select",
    visRows: 6,
    scrollArrows: true
  });


  $(".sel-select").selectric();

  $("select").change(function(e) {
    $('.jcarousel').jcarousel('scroll', parseInt(e.target.value));
  });
  /*---------- END Selects block ----------*/

  /*---------- START Checkboxes block ----------*/
  // Initial setup
  $(".jq-checkbox").each(function() {
    var $input = $(this).find("input").eq(0);
    if ($input.attr("checked")) {
      $(this).addClass("jq-checkbox--checked");
    }
    if ($input.attr("disabled")) {
      $(this).css("opacity", "0.4");
    }
  });

  $(".jq-checkbox").mousedown(function() {
    var $input = $(this).find("input").eq(0);
    if (!$input.attr("disabled")) {
      $input.checked = !$input.checked;
    }
  });

  $(".jq-checkbox > input").change(function(e) {
    $(e.target).parent().toggleClass("jq-checkbox--checked");
  });
  /*---------- END Checkboxes block ----------*/

})
