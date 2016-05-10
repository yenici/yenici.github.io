'use strict';

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
