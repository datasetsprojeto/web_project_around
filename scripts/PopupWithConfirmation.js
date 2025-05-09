// PopupWithConfirmation.js
import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('form');
    this._submitButton = this._form.querySelector('.popup__button');
    this._submitAction = null;
  }

  setSubmitAction(action) {
    this._submitAction = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (this._submitAction) {
        this._submitAction();
      }
    });
  }

  renderLoading(isLoading, buttonText = 'Sim', loadingText = 'Excluindo...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = buttonText;
    }
  }
}