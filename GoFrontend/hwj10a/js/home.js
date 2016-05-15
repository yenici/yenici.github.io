'use strict';

document.addEventListener("DOMContentLoaded", function() {

    /*
    * Render Benefits Section
    */
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
    var lodashCompiledTemplate = _.template(document
      .getElementById("benefit-template").innerHTML, {variable: "benefits"});
    var element = document.querySelector("section.benefits > div.container");
    element.innerHTML += lodashCompiledTemplate(benefits);

    /*
    * Render Services Section
    */
    var services = [
      'Schedule Services',
      'Preventive Maintence',
      'Tire & Wheel Services',
      'Repair Services'
    ];
    lodashCompiledTemplate = _.template(document
      .getElementById("services-template").innerHTML, {variable: "services"});
    element = document.querySelector("section.services > div.container > div");
    element.innerHTML += lodashCompiledTemplate(services);

});
