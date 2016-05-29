document.addEventListener('DOMContentLoaded', function() {
  /*
  * Scripts for 'How It Works' section
  */
  let slidersContent = getHowItWorksData();
  let element = document.getElementsByClassName('howitworks__slider-block')[0];
  for (let slider of slidersContent) {
    element.innerHTML += tmpl('howitworks__template', {data: slider}) || '';
  }
  for (let slider of slidersContent) {
    // If I place this Swiper objects initialization into the previous loop,
    // only the last slider starts to play. I have no idea about this feature.
    new Swiper('#' + slider.id, {
      autoplay: 3000,
      autoplayDisableOnInteraction: false,
      effect: slider.effect || 'slide',
      grabCursor: true,
      initialSlide: slider.initialSlide || 0,
      loop: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      spaceBetween: 0
    });
  }

  function getHowItWorksData() {
    return JSON.parse('[{"id":"howitworks__slider--no1","effect":"slide","initialSlide":0,"slides":[{"imgURL":"img/howitworks_1.jpg","caption":"STEP 1","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""},{"imgURL":"img/howitworks_2.jpg","caption":"STEP 2","title":"Morbi velit risus","text":"Nulla venenatis tempor dui in molestie. Nulla quis dictum purus, sit amet porttitor est.","classMod":"--bottom"},{"imgURL":"img/howitworks_3.jpg","caption":"STEP 3","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""}]},{"id":"howitworks__slider--no2","effect":"flip","initialSlide":1,"slides":[{"imgURL":"img/howitworks_1.jpg","caption":"STEP 1","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""},{"imgURL":"img/howitworks_2.jpg","caption":"STEP 2","title":"Morbi velit risus","text":"Nulla venenatis tempor dui in molestie. Nulla quis dictum purus, sit amet porttitor est.","classMod":"--bottom"},{"imgURL":"img/howitworks_3.jpg","caption":"STEP 3","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""}]},{"id":"howitworks__slider--no3","effect":"fade","initialSlide":2,"slides":[{"imgURL":"img/howitworks_1.jpg","caption":"STEP 1","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""},{"imgURL":"img/howitworks_2.jpg","caption":"STEP 2","title":"Morbi velit risus","text":"Nulla venenatis tempor dui in molestie. Nulla quis dictum purus, sit amet porttitor est.","classMod":"--bottom"},{"imgURL":"img/howitworks_3.jpg","caption":"STEP 3","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""}]}]');
  }

  /*
  * Scripts for 'Meet a partner for your best holiday' section
  */
  let partners = getPartners();
  element = document.getElementsByClassName('partners__list')[0];
  element.innerHTML += tmpl('partners__template', {data: partners}) || '';

  function getPartners() {
    return JSON.parse("[{\"linkUrl\":\"#\",\"imgUrl\":\"img/partner1.png\",\"name\":\"Bradley Hunter\",\"description\":\"Based in Chicago. I love playing tennis and loud music.\",\"activity\":\"tv\"},{\"linkUrl\":\"#\",\"imgUrl\":\"img/partner2.png\",\"name\":\"Heather Walker\",\"description\":\"I'm a happy person that loves cats and climbing on mountains.\",\"activity\":\"eat\"},{\"linkUrl\":\"#\",\"imgUrl\":\"img/partner3.png\",\"name\":\"Lucas Marsha\",\"description\":\"I get my inspiration from nature and objects around me. I have a passion to colours, typography and skateboards.\",\"activity\":\"study\"},{\"linkUrl\":\"#\",\"imgUrl\":\"img/partner4.png\",\"name\":\"Bradley Hunter\",\"description\":\"Based in Chicago. I love playing tennis and loud music.\",\"activity\":\"play\"}]");
  }

  /*
  * Scripts for 'Discover holiday activity ideas' section
  */

});

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};

  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();
