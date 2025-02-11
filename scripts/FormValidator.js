export default class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;
    this._inputs = [];
  }

  _getForm() {
    const formElement = document.querySelector(this._formSelector);
    console.log(formElement);
    return formElement;
  }

  _setEventListeners() {
    for (const input of this._inputs) {
      input.addEventListener('input', (event) => {
        this._checkIsValid(event);
      });
    }
  }

  enableValidation() {
    this._form = this._getForm();
    console.log(this._form);
    console.log(this._config.inputElement);
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputElement));
    this._setEventListeners();
  }

  _addErrorMessage() {
    const errorMessage = this._inputElement.validationMessage;
    this._inputElement.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._config.elementErrorClass);
  }

  _removeErrorMessage() {
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._config.elementErrorClass);
  }

  _enableButton() {
    this._button.classList.remove(this._config.buttonErrorClass);
    this._button.removeAttribute("disabled");
  }

  _disableButton() {
    this._button.classList.add(this._config.buttonErrorClass);
    this._button.setAttribute("disabled", true);
  }

  _checkIsValid(evt) {
    this._inputElement = evt.target;
    this._errorElement = this._inputElement.nextElementSibling;
    this._button = this._form.querySelector("button");

    if (!this._inputElement.validity.valid) {
      if (this._errorElement.tagName !== 'BUTTON') {
        this._addErrorMessage();
      }
      this._disableButton();
    } else {
      if (this._errorElement.tagName !== "BUTTON") {
        this._removeErrorMessage();
      }
      this._enableButton();
    }
  }
}
