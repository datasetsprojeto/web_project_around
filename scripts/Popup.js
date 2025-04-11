export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(this._getOpenedClass());
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._getOpenedClass());
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target.classList.contains(this._popup.classList[0]) ||
        evt.target.classList.contains(`${this._popup.classList[0]}__button-close`)
      ) {
        this.close();
      }
    });
  }

  // Novo método que identifica qual classe aplicar para abrir o popup/modal
  _getOpenedClass() {
    if (this._popup.classList.contains('modal')) {
      return 'modal_opened';
    }
    return 'popup_opened';
  }
}
