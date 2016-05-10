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

function search( query, s ) {
  if (s === undefined || (typeof s !== "number")) s = 1;
  // Request to Google Custom Search Engine
  var request = {
    uri: "https://www.googleapis.com/customsearch/v1?",
    parameters: {
      key: "AIzaSyDbW-5Me54iWLLMiVD9QqyK2aTw0oJn0dI",
      cx: "002530401311297665613:fph-uhrftwy",
      q: query,
      alt: "json",
      callback: "callbackGCS",
      start: s,
      fields: "items(link, htmlTitle, htmlFormattedUrl, htmlSnippet), queries(previousPage, nextPage)"
    }
  };
  // Construsting search URI
  var searchURI = request.uri,
  params = '',
  key;
  for (key in request.parameters) {
    params += '&' + key + '=' + encodeURIComponent(request.parameters[key]);
  }
  searchURI += params.substr(1);
  // Call to Google Custom Search Engine
  $.ajax({
    method: "GET",
    url: searchURI,
    dataType: "jsonp",
    error: function(jqXHR, textStatus, errorThrown) {
      if (jqXHR.status != 200) {
        console.log('ERROR ====================================================');
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        console.log('ERROR ====================================================');
      }
    }
  });

  // var oReq = new XMLHttpRequest();
  // oReq.open('GET', searchURI);
  // oReq.onload = function() {
  //   console.log('Loaded...');
  //   console.log(this.responseText);
  // }
  // // oReq.onerror = function() {
  // //   console.error('Error:' + this.status + ' ' + this.statusText);
  // // };
  // oReq.send();

}

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
