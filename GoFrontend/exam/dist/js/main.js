function mainScript(){function e(){var e,i,o=t(),r=document.querySelector(".howitworks__slider-block");for(e=0;e<o.length;e++)i=o[e],r.innerHTML+=tmpl("howitworks__template",{data:i})||"";for(document.querySelector("#"+o[e-1].id).className+=" swiper-container--last-child",e=0;e<o.length;e++){i=o[e];try{new Swiper("#"+i.id,{autoplay:3e3,autoplayDisableOnInteraction:!1,effect:i.effect||"slide",grabCursor:!0,initialSlide:i.initialSlide||0,loop:!0,nextButton:".swiper-button-next",prevButton:".swiper-button-prev",spaceBetween:0})}catch(n){}}}function t(){return JSON.parse('[{"id":"howitworks__slider--no1","effect":"slide","initialSlide":0,"slides":[{"imgURL":"img/howitworks_1.jpg","caption":"STEP 1","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""},{"imgURL":"img/howitworks_2.jpg","caption":"STEP 2","title":"Morbi velit risus","text":"Nulla venenatis tempor dui in molestie. Nulla quis dictum purus, sit amet porttitor est.","classMod":"--bottom"},{"imgURL":"img/howitworks_3.jpg","caption":"STEP 3","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""}]},{"id":"howitworks__slider--no2","effect":"flip","initialSlide":0,"slides":[{"imgURL":"img/howitworks_2.jpg","caption":"STEP 2","title":"Morbi velit risus","text":"Nulla venenatis tempor dui in molestie. Nulla quis dictum purus, sit amet porttitor est.","classMod":"--bottom"},{"imgURL":"img/howitworks_3.jpg","caption":"STEP 3","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""},{"imgURL":"img/howitworks_1.jpg","caption":"STEP 1","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""}]},{"id":"howitworks__slider--no3","effect":"fade","initialSlide":0,"slides":[{"imgURL":"img/howitworks_3.jpg","caption":"STEP 3","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""},{"imgURL":"img/howitworks_1.jpg","caption":"STEP 1","title":"Sed leo enim, condimentum","text":"Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.","classMod":""},{"imgURL":"img/howitworks_2.jpg","caption":"STEP 2","title":"Morbi velit risus","text":"Nulla venenatis tempor dui in molestie. Nulla quis dictum purus, sit amet porttitor est.","classMod":"--bottom"}]}]')}function i(){var e=o(),t=document.querySelector(".partners__list");t.innerHTML+=tmpl("partners__template",{data:e})||""}function o(){return JSON.parse('[{"linkUrl":"https://www.google.com.ua/#q=Bradley+Hunter","imgUrl":"img/partner1.jpg","name":"Bradley Hunter","description":"Based in Chicago. I love playing tennis and loud music.","activity":"tv"},{"linkUrl":"https://www.google.com.ua/#q=Heather+Walker","imgUrl":"img/partner2.jpg","name":"Heather Walker","description":"I\'m a happy person that loves cats and climbing on mountains.","activity":"eat"},{"linkUrl":"https://www.google.com.ua/#q=Lucas+Marsha","imgUrl":"img/partner3.jpg","name":"Lucas Marsha","description":"I get my inspiration from nature and objects around me. I have a passion to colours, typography and skateboards.","activity":"study"},{"linkUrl":"https://www.google.com.ua/#q=Bradley+Hunter","imgUrl":"img/partner4.jpg","name":"Bradley Hunter","description":"Based in Chicago. I love playing tennis and loud music.","activity":"play"}]')}function r(){n();var e=document.querySelector(".ideas__search");e.addEventListener?e.addEventListener("submit",n):e.attachEvent("onsubmit",n)}function n(e){e&&(e.preventDefault?e.preventDefault():e.returnValue=!1);var t,i="https://pixabay.com/api/?key=2660080-f094061c77f6ce6ff6f3628df&q=<%%>&lang=en&per_page=7";"onload"in new XMLHttpRequest?t=new XMLHttpRequest:(t=new XDomainRequest,i=i.replace(/https:/,"http:"));var o=document.querySelector('.ideas__search > input[type="text"]').value||"";o=o.trim().replace(/\s+/g,"+");var r=[];t.open("GET",i.replace(/<%%>/,encodeURIComponent(o.trim()))),t.onload=function(){var i;try{i=JSON.parse(t.responseText)}catch(o){}for(var n=0;n<Math.min(7,i.hits.length);n++)r.push({tags:i.hits[n].tags,webformatHeight:i.hits[n].webformatHeight,webformatWidth:i.hits[n].webformatWidth,webformatURL:i.hits[n].webformatURL,pageURL:i.hits[n].pageURL});if(r.length<7)for(var n=r.length;7>n;n++)r.push({tags:"",webformatHeight:0,webformatWidth:0,webformatURL:"https://pixabay.com/static/img/logo_square.png",pageURL:"https://pixabay.com"});var s=document.querySelector(".grid");s.innerHTML=tmpl("ideas__template",{images:r})||"";new Masonry(".grid",{itemSelector:".grid-item",gutter:20});e&&document.querySelector(".ideas").scrollIntoView()},t.send()}e(),i(),r()}