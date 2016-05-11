'use strict';

document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("search__input")
          .addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
      var q = event.target.value.trim();
      if (q.length > 0) search( q );
    };
  })

  document.getElementById("search__button")
          .addEventListener("click", function(event) {
    var q = document.getElementById("search__input").value.trim();
    if (q.length > 0) search( q );
  })

})
