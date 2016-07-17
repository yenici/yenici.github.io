'use strict';

import toggleClass from './toggleClass';
import MicrosoftMenu from "./MicrosoftMenu";
import tmpl from "./tmpl";

function createMenuFromTemplate() {
  document.getElementById('ms-menu__wrapper')
    .insertAdjacentHTML('beforeend',
                        tmpl(document.getElementById('ms-header-template').innerHTML, {data: MicrosoftMenu}));
}

function isMenuReady() {
  const MAX_WAIT_TIME = 1000;
  const WAIT_TIME = 100;
  let iteration = 0;
  while (!document.getElementById('ms-menu__wrapper')) {
    setTimeout( () => {}, 100);
    iteration += WAIT_TIME;
    if ( WAIT_TIME > MAX_WAIT_TIME) {
      return false;
    }
  }
  return true;
}

function isMenuHorisontal() {
  return  window.getComputedStyle(document.getElementById('ms-menu__wrapper'))
                .getPropertyValue('position') !== 'absolute';
}

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

function addMenuItemOnClickEvent() {
  document.getElementById('ms-menu__wrapper').addEventListener( 'click', e => {
    if (isMenuHorisontal()) { // Disable click on Vertical Menu Lev. 1 Item (replaced bu Hover Action)
      if (e.target.className.indexOf('ms-menu__item level2 with-submenu') === -1) {
        performMenuAction(e);
      }
    } else {
      performMenuAction(e);
    }
  });
}

function addMenuItemOnHoverEvent() {
  document.getElementById('ms-menu__wrapper').addEventListener( 'mouseover', e => {
    if (~e.target.className.indexOf('ms-menu__item level2')) {
      if (isMenuHorisontal() &&                       // Applied only for horisontal menu
          !e.target.classList.contains('active') ) {  // Don't hide vertical submenu after 2nd hover
        performMenuAction(e);
      }
    }
  });
}

function addToggleMenuBtnEvent() {
  document.getElementById('ms-nav__toggle-menu').addEventListener('click', e => {
    toggleClass(document.getElementsByTagName('html')[0], 'ms-block-content');
    toggleClass(e.target, 'active');
    toggleClass(document.getElementById('ms-menu__wrapper'), 'active');
    setTimeout(() => toggleClass(document.getElementById('ms-menu__wrapper'), 'hidden'), 300);
  });
}

function addToggleSearchEvent() {
  document.getElementById('ms-toggle-search').addEventListener('click', e => {
    toggleClass(e.target, 'active');
    toggleClass(document.getElementById('ms-search-form'), 'active');
  });
}

const MicrosoftComponent = {
  initMenu: () => {
    createMenuFromTemplate();
    if (isMenuReady()) {
      addMenuItemOnClickEvent();
      addMenuItemOnHoverEvent();
      addToggleMenuBtnEvent();
    }
    addToggleSearchEvent();
  },
  cleanMenu: () => {
    let menuElement = document.getElementById('ms-menu__wrapper');
    // Clean heights
    let nodeList = menuElement.getElementsByTagName('ul');
    let iterator = 0;
    let node;
    while ((node = nodeList[iterator++])) {
      if (node.getAttribute('style')) {
        node.removeAttribute('data-height');
        node.removeAttribute('style');
      }
    }
  }
};

export default MicrosoftComponent;
