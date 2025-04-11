export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._form = formElement; // Recebe o elemento do DOM diretamente
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(this._config.submitButtonSelector);

    // Verifica se o botão foi encontrado
    if (!this._button) {
      throw new Error(`Botão de submit com seletor ${this._config.submitButtonSelector} não encontrado.`);
    }
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(inputElement) {
    const errorElement = inputElement.closest('form').querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _toggleButtonState() {
    const isFormValid = this._inputs.every(input => input.validity.valid);
    if (isFormValid) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  }

  _enableButton() {
    this._button.classList.remove(this._config.inactiveButtonClass);
    this._button.removeAttribute("disabled");
  }

  _disableButton() {
    this._button.classList.add(this._config.inactiveButtonClass);
    this._button.setAttribute("disabled", true);
  }

  _setEventListeners() {
    this._inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState(); // Validação inicial do botão
  }

  resetValidation(keepButtonState = false) {
    this._inputs.forEach(inputElement => {
      const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
    });

    if (!keepButtonState) {
      this._disableButton();
    } else {
      this._toggleButtonState();
    }
  }

  initialize() {
    this.enableValidation();
    this.resetValidation();
  }
}