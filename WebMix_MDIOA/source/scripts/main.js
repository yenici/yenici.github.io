'use strict';

import toggleClass from './toggleClass';
import MSMenu from "./MSMenu";
import tmpl from "./tmpl"

document.addEventListener('DOMContentLoaded', function() {


  /*-- ****************************   Header   *************************** --*/
  document.getElementById('ms-menu__wrapper')
    .insertAdjacentHTML('beforeend', tmpl(document.getElementById('ms-header-template').innerHTML, {data: MSMenu}));

  window.onresize = function cleanMenu() {
    let menuElement = document.getElementById('ms-menu__wrapper');
    // Clean heights
    let nodeList = menuElement.getElementsByTagName('*');
    let iterator = 0;
    let node;
    while ((node = nodeList[iterator++])) {
      if (node.getAttribute('style')) {
        node.removeAttribute('data-height');
        node.removeAttribute('style');
      }
    }
  };

  function performMenuAction(e) {
    const needHeightControl = isMenuHorisontal();
    let subMenu = e.target.nextElementSibling;  // Looking for a submenu
    let parent = e.target.parentElement.parentElement; // UL.ms-menu < LI < (A.ms-menu__item)
    // Close all siblings and descendants
    let isActive = e.target.classList.contains('active');
    let activeElements;
    while((activeElements = parent.getElementsByClassName('active')).length > 0) {
      if (activeElements[0].getAttribute('data-height')) { // Restore original height
        if (needHeightControl) {
          activeElements[0].style.height = activeElements[0].getAttribute('data-height') + 'px';
        } else {
          activeElements[0].style.height = 'auto';
        }
      }
      activeElements[0].className = activeElements[0].className.replace(' active', '');
    }
    // Remove / set active status
    if (isActive) {
      if (parent.getAttribute('data-height')) { // Restore original height
        if (needHeightControl) {
          parent.style.height = parent.getAttribute('data-height') + 'px';
        } else {
          parent.style.height = 'auto';
        }
      }
    } else {
      e.target.className += ' active';
      if (subMenu) {
        subMenu.className += ' active';
        if (needHeightControl && subMenu.classList.contains('level3')) {
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
  function isMenuHorisontal() {
    return  window.getComputedStyle(document.getElementById('ms-menu__wrapper'))
                  .getPropertyValue('position') !== 'absolute';
  }

  document.getElementById('ms-menu__wrapper').addEventListener( 'click', e => {
    if (isMenuHorisontal()) {
      if (e.target.className.indexOf('ms-menu__item level2 with-submenu') === -1) {
        performMenuAction(e);
      }
    } else {
      performMenuAction(e);
    }
  });

  document.getElementById('ms-menu__wrapper').addEventListener( 'mouseover', e => {
    if (e.target.className.indexOf('ms-menu__item level2 with-submenu') >= 0) {
      if (isMenuHorisontal() && !e.target.classList.contains('active') ) {
        performMenuAction(e);
      }
    }
  });
  document.getElementById('ms-toggle-search').addEventListener('click', e => {
    toggleClass(e.target, 'active');
    toggleClass(document.getElementById('ms-search-form'), 'active');
  });
  document.getElementById('ms-nav__toggle-menu').addEventListener('click', e => {
    toggleClass(document.getElementsByTagName('html')[0], 'ms-block-content');
    toggleClass(e.target, 'active');
    toggleClass(document.getElementById('ms-menu__wrapper'), 'active');
    setTimeout(() => toggleClass(document.getElementById('ms-menu__wrapper'), 'hidden'), 300);
  });

  /*-- **************************   Section_Dp   ************************* --*/
  document.getElementById('db-carousel__paginator').addEventListener('click', e => {
    if (e.target.classList.contains('db-carousel__paginator-btn')) {
      if (!e.target.classList.contains('active')) {
        const page = parseInt(e.target.getAttribute('data-pg'));
        setCurrentPage(page);
      }
    }
  });
  document.getElementById('db-carousel__navigation-arrow').addEventListener('click', () => {
    setCurrentPage();
  });
  /**
  * Function: setCurrentPage
  *
  * Parameters:
  *    newPage     - the number of a selected page (0,1,2) or ignore this parameter to select the NEXT page
  */
  function setCurrentPage(newPage = -1) {
    const slideNames = ['together', 'performance', 'safe'];
    const paginator = document.getElementById('db-carousel__paginator');
    let currentPage = 0;
    // Change active paginator button
    const btns = paginator.getElementsByClassName('db-carousel__paginator-btn');
    for(let i =0; i < btns.length; i++) {
      if (btns[i].classList.contains('active')) {
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
    if ( e.target.classList.contains('ap-navigation__button')
          && ~window.getComputedStyle(e.target, ':after').getPropertyValue('content').indexOf('+') ) {
      toggleClass(e.target, 'active');
    }
  });

});
