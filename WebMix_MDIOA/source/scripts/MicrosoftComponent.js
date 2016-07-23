'use strict';

import toggleClass from './toggleClass';
import tmpl from './tmpl';

export default function MicrosoftComponent (menuData) {
  this.state = {
    menuContainer: document.getElementById('ms-menu__wrapper'),
    menuObject: menuData,
    menuTemplate: document.getElementById('ms-header-template').innerHTML,
    menuActive: false,
    vertical: false,
    activeItem: [],
    menuBtn: document.getElementById('ms-nav__btn-toggle-menu'),
    searchBtn: document.getElementById('ms-toggle-search'),
    searchForm: document.getElementById('ms-search-form')
  };
  // Creating HTML representation of a Menu Component
  this.state.menuContainer.insertAdjacentHTML('beforeend',
        tmpl(this.state.menuTemplate, {data: this.state.menuObject}));
  // Setting orientation
  this.state.vertical = isMenuVertical();

  // Adding event listeners
  this.state.menuContainer.addEventListener('click', processClickEvent.bind(this));
  this.state.menuContainer.addEventListener('mouseover', processHoverEvent.bind(this));
  let self = this;
  this.state.menuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    self.toggleVerticalMenu();    
  });
  this.state.searchBtn.addEventListener('click', e => {
    toggleClass(e.target, 'active');
    toggleClass(self.state.searchForm, 'active');
  });

  // Hie menu on click outside of it
  this.hideMenu = function () {
    if (this.state.vertical) {
      if (this.state.menuActive) this.toggleVerticalMenu();
    } else {
      this.processEvent([]);
    }
  };

  // Show/hide vertical menu (media-width < lg)
  this.toggleVerticalMenu = function () {
    toggleClass(document.getElementsByTagName('html')[0], 'ms-block-content');
    this.state.menuActive = toggleClass(this.state.menuContainer, 'active');
    setTimeout(() => toggleClass(this.state.menuContainer, 'hidden'), 300);
  };

  // Change the state on window resize
  this.processResize = function () {
    this.processEvent([]);
    if (this.state.menuActive) this.toggleVerticalMenu();
    this.state.vertical = isMenuVertical();
  };

  // Process click and hover events on menu items
  this.processEvent = function (newActiveItem) {
    // Compare new state with current state
    let diffLevel = -1;
    for (let i = 0; i < Math.min(this.state.activeItem.length, newActiveItem.length); i++) {
      if (this.state.activeItem[i] !== newActiveItem[i]) {
        diffLevel = i;
        break;
      }
    }
    if (diffLevel < 0 && this.state.activeItem.length !== newActiveItem.length) {
      diffLevel = Math.min(this.state.activeItem.length, newActiveItem.length);
    }
    if (diffLevel < 0) {
      // New state is equal to current
      this.toggleMenu(newActiveItem);
      this.state.activeItem = newActiveItem.slice(0, newActiveItem.length - 1);
    } else {
      // Toggle current state
      for (let i = this.state.activeItem.length - 1; i >= diffLevel; i--) {
        this.toggleMenu(this.state.activeItem.slice(0, i + 1));
      }
      // Toggle new state
      // if (diffLevel === newActiveItem.length && diffLevel > 0) diffLevel--;
      for (let i = diffLevel; i < newActiveItem.length; i++) {
        this.toggleMenu(newActiveItem.slice(0, i + 1));
      }
      this.state.activeItem = newActiveItem;
    }
  };

  // Helper function to hide/show menu items
  this.toggleMenu = function (item) {
    let listElement = this.state.menuContainer;
    for (let i = 0; i < item.length; i++) {
      listElement = listElement.querySelectorAll(`.ms-menu.level${i}>li`)[parseInt(item[i], 10)];
    }
    const itemElement = listElement.getElementsByTagName('a')[0];
    const activeStatus = toggleClass(itemElement, 'active');
    if (itemElement.classList.contains('with-submenu')) {
      const submenuElement = listElement.getElementsByClassName('ms-menu')[0];
      toggleClass(submenuElement, 'active');
      if (!this.state.vertical && item.length > 1) {
        if (activeStatus) {
          const height = Math.max(listElement.parentElement.offsetHeight, submenuElement.offsetHeight);
          listElement.parentElement.style.height = height + 'px';
          submenuElement.style.height = height + 'px';
        } else {
          listElement.parentElement.style.height = 'auto';
          submenuElement.style.height = 'auto';
        }
      }
    }
  };

  // Click event wrapper
  function processClickEvent (e) {
    const elementId = e.target.getAttribute('data-id');
    if (elementId) { // Process click on menu item only
      e.stopPropagation();
      this.processEvent(elementId.split('.'));
    }
  }

  // Hover event wrapper
  function processHoverEvent (e) {
    if (!this.state.vertical) {  // For horisontal menu on base level only
      const elementId = e.target.getAttribute('data-id');
      if (elementId) { // Process click on menu item only
        const activeItem = elementId.split('.');
        if (activeItem.length === 2) { // For first vertical menu only
          e.stopPropagation();
          this.processEvent(activeItem);
        }
      }
    }
  }

  // Helper function to check menu orientation
  function isMenuVertical () {
    return window.getComputedStyle(document.getElementById('ms-menu__wrapper'))
      .getPropertyValue('position') === 'absolute';
  }
}