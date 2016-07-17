'use strict';

const NAME_MIN_LENGTH = 5;
const PASSWORD_MIN_LENGTH = 6;

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

function initInputName() {
  document.getElementById("registration-form__input--name").addEventListener('keyup', e => {
    validator.toggleError(e.target, validator.checkTextField(e.target, NAME_MIN_LENGTH));
  });
}

function initInputEmail() {
  document.getElementById("registration-form__input--email").addEventListener('keyup', e => {
    validator.toggleError(e.target, validator.checkEmail(e.target));
  });
}

function initInputPassword() {
  document.getElementById("registration-form__input--password").addEventListener('keyup', e => {
    validator.toggleError(e.target, validator.checkTextField(e.target, PASSWORD_MIN_LENGTH));
  });
}

function initSubmitButton() {
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
}

const InvisionComponent = {
  initInputs: () => {
    initInputName();
    initInputEmail();
    initInputPassword();
    initSubmitButton();
  }
};

export default InvisionComponent;
