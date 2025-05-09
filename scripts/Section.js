export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items || [];
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    if (this._container) {
      this._container.innerHTML = '';
    }
  }

  setItems(items) {
    this._items = items.filter(item =>
      item && item.name && item.link // Filtra cards inválidos
    );
  }

  renderItems() {
    this.clear();
    this._items.forEach(item => {
      const element = this._renderer(item);
      if (element) { // Verifica se o elemento é válido
        this.addItem(element);
      }
    });
  }

  addItem(element) {
    if (element && this._container) { // Dupla verificação
      this._container.prepend(element);
    }
  }

  _isValidCard(cardData) {
    return cardData &&
           cardData.name &&
           cardData.link &&
           cardData._id &&
           cardData.owner;
  }
}