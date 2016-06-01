function mainScript() {
  /****************************************************************************
  * Scripts for 'How It Works' section
  ****************************************************************************/
  var slidersContent = getHowItWorksData();
  // Replaced for IE8 compartibility
  // var element = document.getElementsByClassName('howitworks__slider-block')[0];
  var element = document.querySelector('.howitworks__slider-block');

  //                     ECMAScript 2015
  // for (var slider of slidersContent) {
  //   element.innerHTML += tmpl('howitworks__template', {data: slider}) || '';
  // }
  // for (var slider of slidersContent) {
  //   // If I place this Swiper objects initialization into the previous loop,
  //   // only the last slider starts to play. I have no idea about this feature.
  //   new Swiper('#' + slider.id, {
  //     autoplay: 3000,
  //     autoplayDisableOnInteraction: false,
  //     effect: slider.effect || 'slide',
  //     grabCursor: true,
  //     initialSlide: slider.initialSlide || 0,
  //     loop: true,
  //     nextButton: '.swiper-button-next',
  //     prevButton: '.swiper-button-prev',
  //     spaceBetween: 0
  //   });
  // }
  //                   < ECMAScript 2015
  var i, slider;
  for (i = 0; i < slidersContent.length; i++) {
    slider = slidersContent[i];
    element.innerHTML += tmpl('howitworks__template', {data: slider}) || '';
  }
  for (i = 0; i < slidersContent.length; i++) {
    slider = slidersContent[i];
    try {
      // Prevent braking the script in IE8
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
    } catch(e) {};
  }

  function getHowItWorksData() {
    return JSON.parse('[{"id":"howitworks__slider--no1","effect":"slide","initialSlide":0,"slides":[{"imgURL":"img/howitworks_1.jpg","caption":"STEP 1","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""},{"imgURL":"img/howitworks_2.jpg","caption":"STEP 2","title":"Morbi velit risus","text":"Nulla venenatis tempor dui in molestie. Nulla quis dictum purus, sit amet porttitor est.","classMod":"--bottom"},{"imgURL":"img/howitworks_3.jpg","caption":"STEP 3","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""}]},{"id":"howitworks__slider--no2","effect":"flip","initialSlide":0,"slides":[{"imgURL":"img/howitworks_2.jpg","caption":"STEP 2","title":"Morbi velit risus","text":"Nulla venenatis tempor dui in molestie. Nulla quis dictum purus, sit amet porttitor est.","classMod":"--bottom"},{"imgURL":"img/howitworks_3.jpg","caption":"STEP 3","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""},{"imgURL":"img/howitworks_1.jpg","caption":"STEP 1","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""}]},{"id":"howitworks__slider--no3","effect":"fade","initialSlide":0,"slides":[{"imgURL":"img/howitworks_3.jpg","caption":"STEP 3","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""},{"imgURL":"img/howitworks_1.jpg","caption":"STEP 1","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""},{"imgURL":"img/howitworks_2.jpg","caption":"STEP 2","title":"Morbi velit risus","text":"Nulla venenatis tempor dui in molestie. Nulla quis dictum purus, sit amet porttitor est.","classMod":"--bottom"}]}]');
  }

  /****************************************************************************
  * Scripts for 'Meet a partner for your best holiday' section
  ****************************************************************************/
  var partners = getPartnersData();
  // Replaced for IE8 compartibility
  // element = document.getElementsByClassName('partners__list')[0];
  element = document.querySelector('.partners__list');
  element.innerHTML += tmpl('partners__template', {data: partners}) || '';

  function getPartnersData() {
    return JSON.parse('[{"linkUrl":"https://www.google.com.ua/#q=Bradley+Hunter","imgUrl":"img/partner1.png","name":"Bradley Hunter","description":"Based in Chicago. I love playing tennis and loud music.","activity":"tv"},{"linkUrl":"https://www.google.com.ua/#q=Heather+Walker","imgUrl":"img/partner2.png","name":"Heather Walker","description":"I\'m a happy person that loves cats and climbing on mountains.","activity":"eat"},{"linkUrl":"https://www.google.com.ua/#q=Lucas+Marsha","imgUrl":"img/partner3.png","name":"Lucas Marsha","description":"I get my inspiration from nature and objects around me. I have a passion to colours, typography and skateboards.","activity":"study"},{"linkUrl":"https://www.google.com.ua/#q=Bradley+Hunter","imgUrl":"img/partner4.png","name":"Bradley Hunter","description":"Based in Chicago. I love playing tennis and loud music.","activity":"play"}]');
  }

  /****************************************************************************
  * Scripts for 'Discover holiday activity ideas' section
  ****************************************************************************/
  updateMasonry(true);
  document.querySelector('.ideas__search > input[type="button"]')
    .addEventListener('click', updateMasonry);
  document.querySelector('.ideas__search > input[type="text"]')
    .addEventListener("keypress", function(event) {
      if (event.keyCode == 13) updateMasonry();
    });

  function updateMasonry(init) {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var oReq = new XHR();
    // oReq =(function() {
    //   try {
    //     if(window.ActiveXObject) {
    //       return new window.ActiveXObject("Microsoft.XMLHTTP");
    //     }
    //     return new window.XMLHttpRequest()
    //   } catch(e) {}
    // })();
    var query =
      document.querySelector('.ideas__search > input[type="text"]').value || '';
    query = query.trim().replace(/\s+/g, '+');
    var images = [];
    oReq.open('GET', 'https://pixabay.com/api/?'
      + 'key=2660080-f094061c77f6ce6ff6f3628df'
      + '&q=' + encodeURIComponent(query.trim())
      + '&lang=en'
      + '&per_page=7');
    oReq.onreadystatechange = function() {
      if (oReq.readyState == 4) {
        if (oReq.status == 200) {
          var response;
          try {
            response = JSON.parse(oReq.responseText);
          } catch(e) {};
          for (var i = 0; i < Math.min(7, response.hits.length); i++) {
            images.push({
              tags: response.hits[i].tags,
              webformatHeight: response.hits[i].webformatHeight,
              webformatWidth: response.hits[i].webformatWidth,
              webformatURL: response.hits[i].webformatURL,
              pageURL: response.hits[i].pageURL
            });
          }
        }
        if (images.length < 7) {
          for (var i = images.length; i < 7; i++ ) {
            images.push({
              tags: '',
              webformatHeight: 0,
              webformatWidth: 0,
              webformatURL: 'https://pixabay.com/static/img/logo_square.png',
              pageURL: 'https://pixabay.com'
            });
          }
        }
        var element = document.querySelector('.grid');
        element.innerHTML = tmpl('ideas__template', {images: images}) || '';
        var masonry = new Masonry( '.grid', {
          itemSelector: '.grid-item',
          gutter: 20
        });
        if (!init) {
          document.querySelector('.ideas').scrollIntoView();
        }
      }
    }
    oReq.send();
  }

}
