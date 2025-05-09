// PopupWithForm.js
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('form');
    this._inputs = this._form ? this._form.querySelectorAll('input') : [];
    this._submitButton = this._form ? this._form.querySelector('.popup__button') : null;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
  }

  close() {
    super.close();
    if (this._form) {
      this._form.reset();
    }
  }

  renderLoading(isLoading, buttonText = 'Salvar', loadingText = 'Salvando...') {
    if (this._submitButton) {
      this._submitButton.textContent = isLoading ? loadingText : buttonText;
    }
  }
}