'use strict';

document.addEventListener('DOMContentLoaded', function() {

  /*-- ****************************   Header   *************************** --*/
  var lodashCompiledTemplate = _.template(
    document.getElementById('ms-header-template').innerHTML,
    {variable: 'data'}
  );
  document.getElementById('ms-menu')
    .insertAdjacentHTML('beforeend', lodashCompiledTemplate(getMsMenu()));
  document.getElementById('ms-menu').addEventListener( 'click', e => {
    if (~e.target.className.indexOf('ms-menu__item')) {
      let subMenu = e.target.nextElementSibling;  // Looking for a submenu
      let parent = e.target.parentElement.parentElement; // UL.ms-menu < LI < (A.ms-menu__item)
      // Close all siblings and descendants
      let isActive = ~e.target.className.indexOf('active');
      let activeElements;
      while((activeElements = parent.getElementsByClassName('active')).length > 0) {
        if (activeElements[0].getAttribute('data-height')) { // Restore original height
          activeElements[0].style.height = activeElements[0].getAttribute('data-height') + 'px';
        }
        activeElements[0].className = activeElements[0].className.replace(' active', '');
      }
      // Remove / set active status
      if (isActive) {
        if (parent.getAttribute('data-height')) { // Restore original height
          parent.style.height = parent.getAttribute('data-height') + 'px';
        }
      } else {
        e.target.className += ' active';
        if (subMenu) {
          subMenu.className += ' active';
          if (~subMenu.className.indexOf('level3')) {
            let parentHeight;
            if (!parent.getAttribute('data-height')) {
              parentHeight = parent.offsetHeight;
              parent.setAttribute('data-height', parentHeight); // Store original height for the 2nd level ms-menu
            } else {
              parentHeight = parent.getAttribute('data-height');
            }
            if (parentHeight > subMenu.offsetHeight) {
              subMenu.style.height = parentHeight + 'px';
            } else {
              parent.style.height = subMenu.offsetHeight + 'px';
            }
          }
        }
      }
    }
  });
  document.getElementById('ms-menu').addEventListener( 'mouseover', e => {
    if (~e.target.className.indexOf('ms-menu__item level2 with-submenu')) {
      console.log('Open submenu...');
      console.log(e.target);
    }
  });

  /*-- **************************   Section_Dp   ************************* --*/
  document.getElementById('db-carousel__paginator').addEventListener('click', e => {
    if (~e.target.className.indexOf('db-carousel__paginator-btn')) {
      if (!~e.target.className.indexOf('active')) {
        const page = parseInt(e.target.getAttribute('data-pg'));
        setCurrentPage(page);
      }
    }
  });
  document.getElementById('db-carousel__navigation-arrow').addEventListener('click', e => {
    setCurrentPage();
  });
  /**
  * Function: setCurrentPage
  *
  * Parameters:
  *    newPage     - the number of a selected page (0,1,2) or ignore this parameter to select the NEXT page
  */
  function setCurrentPage(newPage = -1) {
    const slideNames = ['together', 'performance', 'safe']
    const paginator = document.getElementById('db-carousel__paginator');
    let currentPage = 0;
    // Change active paginator button
    const btns = paginator.getElementsByClassName('db-carousel__paginator-btn');
    for(let i =0; i < btns.length; i++) {
      if (~btns[i].className.indexOf('active')) {
        toggleClass(btns[i], 'active');
        currentPage = i;
        break;
      }
    }
    if (newPage < 0) {
      newPage = (currentPage + 1) % 3;
    }
    toggleClass(btns[newPage], 'active');
    // Change active screeen
    document.getElementById('db-carousel__screen').className =
      document.getElementById('db-carousel__screen').className.replace('--' + slideNames[currentPage], '--' + slideNames[newPage]);
    const screen = document.getElementById('db-carousel__screen');
    const images = screen.getElementsByClassName('db-carousel__screen-image');
    toggleClass(images[currentPage], 'active');
    setTimeout(() => {
      const film = screen.getElementsByClassName('db-carousel__screen-film')[0];
      film.setAttribute('style', 'transform: translateX(' + (-newPage * 100 / 3) + '%)');
      toggleClass(images[newPage], 'active');
    }, 600);
    // Change active description
    const textWrapper = document.getElementById('dp-carousel__text');
    const texts = textWrapper.getElementsByClassName('dp-carousel__text-item');
    toggleClass(texts[currentPage], 'active');
    setTimeout(() => {
      textWrapper.setAttribute('style', 'transform: translateX(' + (-newPage * 100 / 3) + '%)');
      toggleClass(texts[newPage], 'active');
    }, 450);
  }

  /*-- **************************   Section_In   ************************* --*/
  const validator = {
    checkEmail: emailElement => {
      //http://stackoverflow.com/questions/46155/validate-email-address-in-javascript?noredirect=1&lq=1
      let eMailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let email = emailElement.value.trim();
      return eMailRegExp.test(email.trim());
    },
    checkTextField: (textElement, minLength = 6 ) => {
      let text = textElement.value.trim();
      return (text.trim().length >= minLength);
    },
    toggleError: (element, valid) => {
      if (!valid) {
        element.className = 'error';
      } else {
        element.className = '';
      }
    }
  };
  const NAME_MIN_LENGTH = 5;
  const PASSWORD_MIN_LENGTH = 6;
  document.getElementById("registration-form__input--name").addEventListener('keyup', e => {
    validator.toggleError(e.target, validator.checkTextField(e.target, NAME_MIN_LENGTH));
  });

  document.getElementById("registration-form__input--email").addEventListener('keyup', e => {
    validator.toggleError(e.target, validator.checkEmail(e.target, PASSWORD_MIN_LENGTH));
  });

  document.getElementById("registration-form__input--password").addEventListener('keyup', e => {
    validator.toggleError(e.target, validator.checkTextField(e.target));
  });

  document.getElementById("registration-form__input--submit").addEventListener('click', e => {
    let status = true;
    let checkResult;
    let element = document.getElementById("registration-form__input--name");
    validator.toggleError(
      element,
      (status = validator.checkTextField(element, NAME_MIN_LENGTH))
    );
    element = document.getElementById("registration-form__input--email");
    validator.toggleError(
      element,
      (checkResult = validator.checkEmail(element))
    );
    if (!checkResult) { status = false; }
    element = document.getElementById("registration-form__input--password");
    validator.toggleError(
      element,
      (checkResult = validator.checkTextField(element, PASSWORD_MIN_LENGTH))
    );
    if (!checkResult) { status = false; }
    if (!status) { e.preventDefault(); }
  });

  /*-- ************************   Section_Apple   ************************ --*/
  document.querySelector('nav.ap-navigation').addEventListener('click', e => {
    if ( ~e.target.className.indexOf('ap-navigation__button')
          && ~window.getComputedStyle(e.target, ':after').getPropertyValue('content').indexOf('+') ) {
      toggleClass(e.target, 'active');
    }
  });

  function toggleClass(element, toggledClass) {
    if (~element.className.indexOf(toggledClass.trim())) {
      element.className = element.className.replace(' ' + toggledClass.trim(), '');
    } else {
      element.className += (' ' +  toggledClass.trim());
    }
  }

});

function getMsMenu() {
  return(
    [
      {
        name: "Sign in",
        link: "https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=12&ct=1468141168&rver=6.5.6509.0&wp=MBI&wreply=https:%2F%2Fwww.microsoft.com%2Fen-us%2F&lc=1033",
        children: []
      },
      {
        name: "Store",
        link: "javascript:void(0)",
        children: [
          {
            name: "Store home",
            link: "http://www.microsoftstore.com/store/msusa/en_US/home",
            children: []
          },
          {
            name: "Device",
            link: "javascript:void(0)",
            children: [
              {name: "Microsoft Surface", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/All-Surface/categoryID.69403400"},
              {name: "PCs &amp; tablets", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/All-PCs-tablets/categoryID.69404700"},
              {name: "Xbox", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/categoryID.69405400"},
              {name: "Virtual reality", link: "https://www.microsoftstore.com/store/msusa/en_US/cat/Virtual-and-Augmented-Reality/categoryID.594470000?icid=en_US_Store_UH_devices_vr"},
              {name: "Accessories", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/All-accessories/categoryID.69407900"},
              {name: "Windows phone", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/All-Windows-Phone/categoryID.69406200"},
              {name: "Microsoft Band", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/categoryID.69889600"}
            ]
          },
          {
            name: "Software",
            link: "javascript:void(0)",
            children: [
              {name: "Office", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/All-Office/categoryID.69403900"},
              {name: "Windows", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/categoryID.70036700"},
              {name: "Additional software", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/All-additional-software/categoryID.69407400"}
            ]
          },
          {
            name: "Apps",
            link: "javascript:void(0)",
            children: [
              {name: "All apps", link: "https://www.microsoft.com/en-us/store/apps"},
              {name: "Windows apps", link: "https://www.microsoft.com/en-us/store/apps/windows"},
              {name: "Windows phone apps", link: "https://www.microsoft.com/en-us/store/apps/windows-phone"}
            ]
          },
          {
            name: "Games",
            link: "javascript:void(0)",
            children: [
              {name: "Xbox One games", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/Xbox-One-games/categoryID.69405600"},
              {name: "Xbox 360 games", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/Xbox-360-games/categoryID.69405800"},
              {name: "PC games", link: "http://www.microsoftstore.com/store/msusa/en_US/list/PC-games/categoryID.62688000?icid=en_US_Store_UH_games_PC"},
              {name: "Windows games", link: "https://www.microsoft.com/en-us/store/games/windows"},
              {name: "Windows phone games", link: "https://www.microsoft.com/en-us/store/games/windows-phone"}
            ]
          },
          {
            name: "Entertainment",
            link: "javascript:void(0)",
            children: [
              {name: "All Entertainment", link: "https://www.microsoft.com/en-us/store/entertainment"},
              {name: "Movies &amp; TV", link: "https://www.microsoft.com/en-us/store/movies-and-tv"},
              {name: "Music", link: "https://www.microsoft.com/en-us/store/music"}
            ]
          },
          {
            name: "Business &amp; Education",
            link: "javascript:void(0)",
            children: [
              {name: "Business Store", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/Business/categoryID.69408700"},
              {name: "Education Store", link: "http://www.microsoftstore.com/store/msusa/en_US/edu"},
              {name: "Developer", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/Developer/categoryID.69418300?icid=en_US_Store_UH_BusEd_Dev"}
            ]
          },
          {
            name: "Sale",
            link: "javascript:void(0)",
            children: [
              {name: "Back-to-school essentials", link: "https://www.microsoftstore.com/store/msusa/en_US/cat/Back-to-school-essentials/categoryID.67998200?icid=en_US_Store_UH_sale_gm_bts",children: []},
              {name: "Sale", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/Sale/categoryID.69403000"}
            ]
          },
          {
            name: "Find a store",
            link: "http://www.microsoft.com/en-us/store/locations/find-a-store?icid=L_navAB_FindAStore",
            children: []
          },
          {
            name: "Gift cards",
            link: "https://www.microsoft.com/en-us/store/gift-cards",
            children: []
          }
        ]
      },
      {
        name: "Products",
        link: "javascript:void(0)",
        children: [
          {
            name: "Software &amp; services",
            link: "javascript:void(0)",
            children: [
              {name: "Windows", link: "//www.microsoft.com/en-us/windows"},
              {name: "Office", link: "https://products.office.com/en-us/home"},
              {name: "Free downloads &amp; security", link: "https://www.microsoft.com/en-us/download/default.aspx"},
              {name: "Internet Explorer", link: "http://windows.microsoft.com/en-us/internet-explorer/download-ie"},
              {name: "Microsoft Edge", link: "http://www.microsoft.com/en-us/windows/microsoft-edge"},
              {name: "Skype", link: "http://www.skype.com/en/"},
              {name: "OneNote", link: "http://www.onenote.com/"},
              {name: "OneDrive", link: "https://onedrive.live.com/about/en-us/"},
              {name: "Microsoft Health", link: "http://www.microsoft.com/microsoft-health/en-us"},
              {name: "MSN", link: "http://www.msn.com/?ocid=HEA000"},
              {name: "Bing", link: "http://www.bing.com"},
              {name: "Microsoft Groove", link: "https://www.microsoft.com/en-us/groove"},
              {name: "Microsoft Movies &amp; TV", link: "https://www.microsoft.com/en-us/movies-and-tv"}
            ]
          },
          {
            name: "Devices &amp; Xbox",
            link: "javascript:void(0)",
            children: [
              {name: "All Microsoft devices", link: "https://www.microsoft.com/devices/en-us"},
              {name: "Microsoft Surface", link: "http://www.microsoft.com/surface/en-us"},
              {name: "All Windows PCs &amp; tablets", link: "http://www.microsoftstore.com/store/msusa/en_US/cat/Computers/categoryID.62684600"},
              {name: "PC accessories", link: "https://www.microsoft.com/accessories/en-us"},
              {name: "Xbox &amp; games", link: "http://www.xbox.com"},
              {name: "Microsoft Band", link: "http://www.microsoft.com/Microsoft-Band/en-us"},
              {name: "Microsoft Lumia", link: "http://www.microsoft.com/en-us/mobile/"},
              {name: "All Windows phones", link: "https://www.microsoft.com/en-us/windows/phones"},
              {name: "Microsoft HoloLens", link: "http://www.microsoft.com/microsoft-hololens/en-us"}
            ]
          },
          {
            name: "For business",
            link: "javascript:void(0)",
            children: [
              {name: "Cloud Platform", link: "http://www.microsoft.com/en-us/server-cloud/"},
              {name: "Microsoft Azure", link: "http://azure.microsoft.com/"},
              {name: "Microsoft Dynamics", link: "http://www.microsoft.com/en-us/dynamics/default.aspx"},
              {name: "Windows for business", link: "http://www.microsoft.com/en-us/windows/business/default.aspx"},
              {name: "Office for business", link: "https://products.office.com/en-us/business/office"},
              {name: "Skype for business", link: "https://products.office.com/en-us/skype-for-business"},
              {name: "Surface for business", link: "http://www.microsoft.com/surface/en-us/business/overview"},
              {name: "Enterprise solutions", link: "http://www.microsoft.com/enterprise"},
              {name: "Small business solutions", link: "http://www.microsoft.com/en-us/business/"},
              {name: "Find a solutions provider", link: "https://pinpoint.microsoft.com"},
              {name: "Volume Licensing", link: "https://www.microsoft.com/en-us/licensing/default.aspx"}
            ]
          },
          {
            name: "For developers &amp; IT pros",
            link: "javascript:void(0)",
            children: [
              {name: "Develop Windows apps", link: "https://dev.windows.com/en-us"},
              {name: "Microsoft Azure", link: "http://azure.microsoft.com/"},
              {name: "MSDN", link: "http://msdn.microsoft.com/en-us/"},
              {name: "TechNet", link: "http://technet.microsoft.com/en-us/"},
              {name: "Visual Studio", link: "http://www.visualstudio.com/"}
            ]
          },
          {
            name: "For students &amp; educators",
            link: "javascript:void(0)",
            children: [
              {name: "Office for students", link: "http://www.microsoft.com/en-us/education/products/office/default.aspx"},
              {name: "OneNote in classroom", link: "http://www.microsoft.com/en-us/education/products/onenote/default.aspx"},
              {name: "Shop PCs &amp; tablets perfect for students", link: "http://www.microsoftstore.com/store/msusa/en_US/edu"},
              {name: "Microsoft in Education", link: "http://www.microsoft.com/en-us/education"}
            ]
          }
        ]
      },
      {
        name: "Support",
        link: "https://support.microsoft.com/en-us",
        children: []
      }
    ]
  );
}
