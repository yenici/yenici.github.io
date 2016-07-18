/**
* Function: toggleClass
* Description: Togggle class name of an element
*
* Parameters:
*     element      - a reference to an Element object
*     toggledClass - class name
*/

'use strict';

export default function toggleClass(element, toggledClass) {
  toggledClass = toggledClass.trim();
  let status = false;
  if (element.classList.contains(toggledClass)) {
    element.classList.remove(toggledClass);
  } else {
    element.classList.add(toggledClass);
    status = true;
  }
  return status;
}
