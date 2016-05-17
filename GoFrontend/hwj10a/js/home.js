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

    /*
    * Render News Section
    */
    var news = [
      {
        title: "Advanced Machinery Helps Improve Quality",
        newsUrl: "#",
        imageUrl: "img/news1.jpg",
        month: "Jan",
        day: 23,
        author: "cmsmasters",
        authorUrl: "#",
        comments: 6,
        commentsUrl: "#",
        text: "Cum sociis natoque penatibus et magnis dis parturient ontesmus. "
          + "Pro vel nibh et elit mollis commodo et nec augueique Nemo enim "
          + "ipsam voluptatem quia ptas sit aspernatur samomo enim ipsam "
          + "voluptatem."
      },
      {
        title: "Powerful Techniques for Advanced Service",
        newsUrl: "#",
        imageUrl: "img/news2.jpg",
        month: "Jan",
        day: 21,
        author: "cmsmasters",
        authorUrl: "#",
        comments: 3,
        commentsUrl: "#",
        text: "Cum sociis natoque penatibus et magnis dis parturient ontesmus. "
          + "Pro vel nibh et elit mollis commodo et nec augueique Nemo enim "
          + "ipsam voluptatem quia ptas sit aspernatur samomo enim ipsam "
          + "voluptatem."
      }
    ];
    lodashCompiledTemplate = _.template(document
      .getElementById("news-template").innerHTML, {variable: "news"});
    element = document.querySelector("section.news-banners div.news");
    element.innerHTML += lodashCompiledTemplate(news);

    /*
    * Render Banners Section
    */
    var banners = [
      {
        title: "ACCORDION PANEL 1",
        text: "Cum sociis natoque penatibus et magnis dis parturient mus. Pro "
          + "vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam "
          + "voluptatem quia ptas sit aspernatur momo. Cum sociis natoque "
          + "penatibus et magnis dis parturient ontesmus. Nemo enim ipsam "
          + "voluptatem quia ptas sit aspernatur samomoPro vel nibh et elit "
          + "mollis commodo et nec augueique Nemo enim ipsam voluptatem quia "
          + "ptas sit aspernatur"
      },
      {
        title: "ACCORDION PANEL 2",
        text: "Cum sociis natoque penatibus et magnis dis parturient mus. Pro "
          + "vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam "
          + "voluptatem quia ptas sit aspernatur momo. Cum sociis natoque "
          + "penatibus et magnis dis parturient ontesmus. Nemo enim ipsam "
          + "voluptatem quia ptas sit aspernatur samomoPro vel nibh et elit "
          + "mollis commodo et nec augueique Nemo enim ipsam voluptatem quia "
          + "ptas sit aspernatur"
      },
      {
        title: "ACCORDION PANEL 3",
        text: "Cum sociis natoque penatibus et magnis dis parturient mus. Pro "
          + "vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam "
          + "voluptatem quia ptas sit aspernatur momo. Cum sociis natoque "
          + "penatibus et magnis dis parturient ontesmus. Nemo enim ipsam "
          + "voluptatem quia ptas sit aspernatur samomoPro vel nibh et elit "
          + "mollis commodo et nec augueique Nemo enim ipsam voluptatem quia "
          + "ptas sit aspernatur"
      },
      {
        title: "ACCORDION PANEL 4",
        text: "Cum sociis natoque penatibus et magnis dis parturient mus. Pro "
          + "vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam "
          + "voluptatem quia ptas sit aspernatur momo. Cum sociis natoque "
          + "penatibus et magnis dis parturient ontesmus. Nemo enim ipsam "
          + "voluptatem quia ptas sit aspernatur samomoPro vel nibh et elit "
          + "mollis commodo et nec augueique Nemo enim ipsam voluptatem quia "
          + "ptas sit aspernatur"
      }
    ];
    lodashCompiledTemplate = _.template(document
      .getElementById("banners-template").innerHTML, {variable: "banners"});
    element = document.querySelector("section.news-banners div.banners");
    element.innerHTML += lodashCompiledTemplate(banners);
    element = document.querySelectorAll("section.news-banners div.banner");
    for (var i = 0; i < element.length; i++) {
      element[i].addEventListener('click', function(e) {
        if (!this.classList.contains('banner--active')) {
          var current = document.querySelector("div.banner--active");
          current.classList.remove('banner--active');
          this.classList.add('banner--active');
        };
      });
    }

    /*
    * Render Navigation Links in Footer
    */
    var navigation = [
      {
        item:"SOCIALS",
        subitems: [
          {
            name: "Facebook",
            url: "http://facebook.com"
          },
          {
            name: "Flickr",
            url: "http://flickr.com"
          },
          {
            name: "Twitter",
            url: "http://twitter.com"
          },
          {
            name: "Vimeo",
            url: "http://vimeo.com"
          }
        ]
      },
      {
        item:"LINKS",
        subitems: [
          {
            name: "How to Write a Blog",
            url: "#"
          },
          {
            name: "Create a Blog in 4 Steps",
            url: "#"
          },
          {
            name: "15 Tips to Increase Traffic",
            url: "#"
          },
          {
            name: "20 Blog Post Ideas",
            url: "#"
          }
        ]
      },
      {
        item:"BLOGROLL",
        subitems: [
          {
            name: "Blogs Blog",
            url: "#"
          },
          {
            name: "Roll Up Roll Up",
            url: "#"
          },
          {
            name: "Blog Free",
            url: "#"
          },
          {
            name: "Wordpress Blog",
            url: "#"
          }
        ]
      },
      {
        item:"ABOUT US",
        subitems: [
          {
            name: "Agriculture",
            url: "#"
          },
          {
            name: "Harvest",
            url: "#"
          },
          {
            name: "Company news",
            url: "#"
          },
          {
            name: "Investor relations",
            url: "#"
          }
        ]
      }
    ];
    lodashCompiledTemplate = _.template(document
      .getElementById("footer-template").innerHTML, {variable: "navigation"});
    element = document.querySelector("footer div.container");
    element.innerHTML += lodashCompiledTemplate(navigation);

    /*
    * Create Slider
    */
    $('.owl-carousel').owlCarousel({
      singleItem: true,
      itemsScaleUp: false,
      slideSpeed: 200,
      paginationSpeed: 800,
      rewindSpeed: 1000,
      autoPlay : true,
      autoplayTimeout: 3000,
      stopOnHover: false,
      loop: true
    });

});
