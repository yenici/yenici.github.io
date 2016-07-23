'use strict';

import MicrosoftComponent from './MicrosoftComponent';
import MicrosoftMenu from './MicrosoftMenu';
import DropboxComponent from './DropboxComponent';
import InvisionComponent from './InvisionComponent';
import AppleComponent from './AppleComponent';

document.addEventListener('DOMContentLoaded', function () {
  /* -- **********************   Header - Microsoft   ********************* --*/
  const menu = new MicrosoftComponent(MicrosoftMenu);
  window.onresize = function () {
    menu.processResize();
  };
  document.addEventListener('click', function () {
    menu.hideMenu();
  });

  /* -- **************************   Section_Dp   ************************* --*/
  DropboxComponent.initPaginator();

  /* -- **************************   Section_In   ************************* --*/
  InvisionComponent.initInputs();

  /* -- ************************   Footer - Apple   *********************** --*/
  AppleComponent.initAccordeonListener();
});
