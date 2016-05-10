'use strict';

function callbackGCS( response ) {
  var element = document.getElementById("search__result");
  element.innerHTML = "";
  if (!response.error) {
    if (!_.isEmpty(response)) {
      var lodashCompiledTemplate = _.template(document
        .getElementById("search__template").innerHTML, {variable: "item"});
      for (var i = 0; i < response.items.length; i++) {
        element.innerHTML += lodashCompiledTemplate(response.items[i]);
      }
      // Constructing navigation elements
      var sep = '', nav = '<nav id="search-result__nav">';
      if (response.queries.previousPage) {
        nav += '<a href="#search" data-q="'
        + encodeURIComponent(response.queries.previousPage[0].searchTerms)
        + '" data-start="'
        + response.queries.previousPage[0].startIndex
        + '">&lt; Попередня сторінка ('
        + response.queries.previousPage[0].startIndex
        +' - '
        + (response.queries.previousPage[0].startIndex + response.queries.previousPage[0].count - 1)
        +')</a>'
        sep = ' ... ';
      }
      if (response.queries.nextPage && (response.queries.nextPage[0].startIndex < 100)) {
        nav += sep;
        sep = 'Ok';
        var nextPageEnd = response.queries.nextPage[0].startIndex
        + response.queries.nextPage[0].count
        - 1 ;
        nextPageEnd = Math.min(nextPageEnd,
          parseInt(response.queries.nextPage[0].totalResults));
          nav += '<a href="#search" data-q="'
          + encodeURIComponent(response.queries.nextPage[0].searchTerms)
          + '" data-start="'
          + response.queries.nextPage[0].startIndex
          + '">Наступна сторінка ('
          + response.queries.nextPage[0].startIndex
          +' - '
          + nextPageEnd
          + ') &gt;</a>'
      }
      if (sep) {
        nav += '</nav>';
        element.innerHTML += nav;
        document.getElementById("search-result__nav")
        .addEventListener("click", function(event) {
          // event.preventDefault();
          var q = decodeURIComponent(event.target.dataset.q);
          var startIndex = parseInt(event.target.dataset.start);
          search(q, startIndex);
        });
      }
    } else {
      element.innerHTML = '<div class="search-item"><div class="search__error">'
      + 'Вашому запиту не задовольняє жоден документ. Уточніть запит та спробуйте ще раз.'
      + '</div></div>';
    }
  } else {
    element.innerHTML = '<div class="search-item"><div class="search__error"><span>ERROR: <span>'
      + response.error.code + '. ' + response.error.message
      + '</div></div>';
  }

}
