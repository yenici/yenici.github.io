$(document).ready(function() {

  $("span.help-message").hide();

  $("#show-help").on("click", function() {
    $("span.help-message").show();
  });

  $(".hform-textfields > input").focusin(function() {
    toggleHelpMessage(this, true);
  });

  $(".hform-textfields > input").focusout(function() {
    toggleHelpMessage(this, false);
  });

  $(".hform-textfields > input").hover(function() {
    toggleHelpMessage(this, true);
  }, function() {
    toggleHelpMessage(this, false);
  });

})

function toggleHelpMessage(element, mode) {
  var i = $(".hform-textfields > input").index(element);
  var $e = $("span.help-message")[i];
  if (mode) {
    $($e).show();
  } else {
    $($e).hide();
  }
}
