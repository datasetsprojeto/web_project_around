export default class Card {
  constructor(selector) {
    this._selector = selector;
  }

  _buscaItem() {
    return document.querySelector(this._selector)
  }

  alteraTexto() {
    const item = this._buscaItem()
    item.textContent = "Renato Soares Pereira"
  }
  alteraTexto2() {
    const item = this._buscaItem()
    item.textContent = "Desenvolvedor Web"
  }

  }