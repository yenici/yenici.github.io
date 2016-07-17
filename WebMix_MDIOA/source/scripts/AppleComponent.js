'use strict';

import toggleClass from './toggleClass';

const AppleComponent = {
  initAccordeonListener: () => {
    document.querySelector('nav.ap-navigation').addEventListener('click', e => {
      if ( e.target.classList.contains('ap-navigation__button') &&
          ~window.getComputedStyle(e.target, ':after').getPropertyValue('content').indexOf('+') ) {
        toggleClass(e.target, 'active');
      }
    });
  }
};

export default AppleComponent;
