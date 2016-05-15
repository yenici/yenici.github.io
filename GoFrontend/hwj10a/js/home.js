'use strict';

document.addEventListener("DOMContentLoaded", function() {

  /*
  * Render Benefits Section
  */
  var lodashCompiledTemplate = _.template(document
    .getElementById("benefit-template").innerHTML, {variable: "benefits"});
  var element = document.querySelector("section.benefits > div.container");
  var benefits = [
    {
      title: "Power Inside",
      text: "Cum sociis natoque penatibus et magnis dis parturient montesmus. Pro vel nibh et elit mollis commodo et nec augueique"
    },
    {
      title: "New Technologies",
      text: "Cum sociis natoque penatibus et magnis dis parturient montesmus. Pro vel nibh et elit mollis commodo et nec augueique"
    },
    {
      title: "Fast Support",
      text: "Cum sociis natoque penatibus et magnis dis parturient montesmus. Pro vel nibh et elit mollis commodo et nec augueique"
    }
  ];
  element.innerHTML += lodashCompiledTemplate(benefits);

  /*
  * Render Services Section
  */


});
