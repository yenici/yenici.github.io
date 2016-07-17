'use strict';

import MicrosoftComponent from './MicrosoftComponent';
import DropboxComponent from './DropboxComponent';
import InvisionComponent from './InvisionComponent';
import AppleComponent from './AppleComponent';

document.addEventListener('DOMContentLoaded', function() {

  /*-- **********************   Header - Microsoft   ********************* --*/
  MicrosoftComponent.initMenu();
  window.onresize = MicrosoftComponent.cleanMenu.bind();

  /*-- **************************   Section_Dp   ************************* --*/
  DropboxComponent.initPaginator();

  /*-- **************************   Section_In   ************************* --*/
  InvisionComponent.initInputs();

  /*-- ************************   Footer - Apple   *********************** --*/
  AppleComponent.initAccordeonListener();

});
