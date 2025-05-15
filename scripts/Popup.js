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
      evt.target.classList.contains(this._popup.classList[0]) || // Classe principal do popup
      evt.target.classList.contains('popup__button-close') ||     // Botão de fechar padrão
      evt.target.classList.contains('modal__button-close') ||     // Botão de fechar do modal
      evt.target.classList.contains('popup-expanded__button-close') // Botão de fechar da imagem expandida
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
