document.addEventListener('DOMContentLoaded', function() {
  /*
  * Scripts for 'How It Works' section
  */
  var slidersContent = getHowItWorksData();
  var element = document.getElementsByClassName('howitworks__slider-block')[0];
  for (var slider of slidersContent) {
    element.innerHTML += tmpl('howitworks__template', {data: slider}) || '';
  }
  for (var slider of slidersContent) {
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
  var partners = getPartnersData();
  element = document.getElementsByClassName('partners__list')[0];
  element.innerHTML += tmpl('partners__template', {data: partners}) || '';

  function getPartnersData() {
    return JSON.parse("[{\"linkUrl\":\"#\",\"imgUrl\":\"img/partner1.png\",\"name\":\"Bradley Hunter\",\"description\":\"Based in Chicago. I love playing tennis and loud music.\",\"activity\":\"tv\"},{\"linkUrl\":\"#\",\"imgUrl\":\"img/partner2.png\",\"name\":\"Heather Walker\",\"description\":\"I'm a happy person that loves cats and climbing on mountains.\",\"activity\":\"eat\"},{\"linkUrl\":\"#\",\"imgUrl\":\"img/partner3.png\",\"name\":\"Lucas Marsha\",\"description\":\"I get my inspiration from nature and objects around me. I have a passion to colours, typography and skateboards.\",\"activity\":\"study\"},{\"linkUrl\":\"#\",\"imgUrl\":\"img/partner4.png\",\"name\":\"Bradley Hunter\",\"description\":\"Based in Chicago. I love playing tennis and loud music.\",\"activity\":\"play\"}]");
  }

  /*
  * Scripts for 'Discover holiday activity ideas' section
  */
  var masonry = new Masonry( '.grid', {
    itemSelector: '.grid-item',
    gutter: 20
  });

  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function() {
    console.log(oReq.responseText);
  });
  // oReq.open('GET', 'http://api.pixplorer.co.uk/image?word=dog&amount=7&size=m');
  oReq.open('GET', 'https://pixabay.com/api/?key=2660080-f094061c77f6ce6ff6f3628df&q=dog&lang=en&response_group&per_page=7');
  // response_group=image_details
  // oReq.send();
  var res = '{"totalHits":500,"hits":[{"previewHeight":107,"likes":113,"favorites":60,"tags":"dog, young dog, puppy","webformatHeight":457,"views":30358,"webformatWidth":640,"previewWidth":150,"comments":28,"downloads":7408,"pageURL":"https://pixabay.com/en/dog-young-dog-puppy-280332/","previewURL":"https://pixabay.com/static/uploads/photo/2014/03/05/19/23/dog-280332_150.jpg","webformatURL":"https://pixabay.com/get/eb3db10c2bf61c2ad65a5854e44a4096e37fe2c818b5174590f9c370a2e5_640.jpg","imageWidth":2799,"user_id":43193,"user":"-Savanna-","type":"photo","id":280332,"userImageURL":"https://pixabay.com/static/uploads/user/2015/03/24/11-41-43-470_250x250.png","imageHeight":2000},{"previewHeight":112,"likes":50,"favorites":41,"tags":"dog, yorkshire terrier, lazy dog","webformatHeight":480,"views":15085,"webformatWidth":640,"previewWidth":150,"comments":11,"downloads":4386,"pageURL":"https://pixabay.com/en/dog-yorkshire-terrier-lazy-dog-195877/","previewURL":"https://pixabay.com/static/uploads/photo/2013/10/15/08/20/dog-195877_150.jpg","webformatURL":"https://pixabay.com/get/e83cb4072ff31c2ad65a5854e44a4096e37fe2c818b5174590f9c370a2e5_640.jpg","imageWidth":4000,"user_id":48777,"user":"Josch13","type":"photo","id":195877,"userImageURL":"https://pixabay.com/static/uploads/user/2013/11/05/02-10-23-764_250x250.jpg","imageHeight":3000},{"previewHeight":105,"likes":49,"favorites":36,"tags":"dog, yorkshire terrier, small dog","webformatHeight":450,"views":16794,"webformatWidth":640,"previewWidth":150,"comments":5,"downloads":4791,"pageURL":"https://pixabay.com/en/dog-yorkshire-terrier-small-dog-216282/","previewURL":"https://pixabay.com/static/uploads/photo/2013/11/23/02/17/dog-216282_150.jpg","webformatURL":"https://pixabay.com/get/eb34b70d20f61c2ad65a5854e44a4096e37fe2c818b5174590f9c370a2e5_640.jpg","imageWidth":3999,"user_id":48777,"user":"Josch13","type":"photo","id":216282,"userImageURL":"https://pixabay.com/static/uploads/user/2013/11/05/02-10-23-764_250x250.jpg","imageHeight":2817},{"previewHeight":99,"likes":30,"favorites":12,"tags":"yorkshire terrier, dog, small dog","webformatHeight":426,"views":9952,"webformatWidth":640,"previewWidth":150,"comments":6,"downloads":1754,"pageURL":"https://pixabay.com/en/yorkshire-terrier-dog-small-dog-320833/","previewURL":"https://pixabay.com/static/uploads/photo/2014/04/10/10/27/yorkshire-terrier-320833_150.jpg","webformatURL":"https://pixabay.com/get/ea37b1072bf71c2ad65a5854e44a4096e37fe2c818b5174590f9c370a2e5_640.jpg","imageWidth":6000,"user_id":48777,"user":"Josch13","type":"photo","id":320833,"userImageURL":"https://pixabay.com/static/uploads/user/2013/11/05/02-10-23-764_250x250.jpg","imageHeight":4000},{"previewHeight":150,"likes":43,"favorites":29,"tags":"dog, viszla, close","webformatHeight":640,"views":17978,"webformatWidth":632,"previewWidth":149,"comments":2,"downloads":15158,"pageURL":"https://pixabay.com/en/dog-viszla-close-1086286/","previewURL":"https://pixabay.com/static/uploads/photo/2015/12/10/11/42/dog-1086286_150.jpg","webformatURL":"https://pixabay.com/get/e835b9092afc073ed95c4518b74e4090e377ead504b0154791f5c87baee8bd_640.jpg","imageWidth":1898,"user_id":1551977,"user":"Mr_niceshoot","type":"photo","id":1086286,"userImageURL":"","imageHeight":1920},{"previewHeight":99,"likes":44,"favorites":41,"tags":"dog, model, french bulldog","webformatHeight":426,"views":17390,"webformatWidth":640,"previewWidth":150,"comments":4,"downloads":14317,"pageURL":"https://pixabay.com/en/dog-model-french-bulldog-view-1224267/","previewURL":"https://pixabay.com/static/uploads/photo/2016/02/26/16/32/dog-1224267_150.jpg","webformatURL":"https://pixabay.com/get/e837b30b2af2063ed95c4518b74e4090e377ead504b0154791f5c87baee8bd_640.jpg","imageWidth":5184,"user_id":1982503,"user":"lightstargod","type":"photo","id":1224267,"userImageURL":"https://pixabay.com/static/uploads/user/2016/03/04/13-23-05-387_250x250.jpg","imageHeight":3456},{"previewHeight":99,"likes":102,"favorites":75,"tags":"dog, cute, pet","webformatHeight":426,"views":21700,"webformatWidth":640,"previewWidth":150,"comments":13,"downloads":12672,"pageURL":"https://pixabay.com/en/dog-cute-pet-715545/","previewURL":"https://pixabay.com/static/uploads/photo/2015/04/10/00/47/dog-715545_150.jpg","webformatURL":"https://pixabay.com/get/ee34b40a2cf11c2ad65a5854e44a4096e37fe2c818b5174590f9c370a2e5_640.jpg","imageWidth":5184,"user_id":916237,"user":"Wow_Pho","type":"photo","id":715545,"userImageURL":"https://pixabay.com/static/uploads/user/2015/04/07/14-10-15-590_250x250.jpg","imageHeight":3456}],"total":8966}';
  // {
  //   tags: "",
  //   webformatHeight:
  //   webformatWidth:
  //   webformatURL:
  // }

  function fc() {
    console.log("Callback function called...");
    console.log(oReq.responseText);
  }



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
