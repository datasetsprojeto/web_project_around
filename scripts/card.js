export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._text = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const templateContent = document
      .querySelector(this._templateSelector)
      .content;
    return templateContent.querySelector(".main__card").cloneNode(true);
  }

  _setEventListeners() {
    this._element
      .querySelector(".main__icon")
      .addEventListener("click", this._handleLike.bind(this));

    this._element
      .querySelector(".main__button-delete")
      .addEventListener("click", this._handleDelete.bind(this));

    this._element
      .querySelector(".main__image")
      .addEventListener("click", () => {
        this._handleCardClick({ link: this._link, name: this._text });
      });
  }

  _handleLike(event) {
    event.target.classList.toggle("main__icon_black-heart");
  }

  _handleDelete(event) {
    event.target.closest(".main__card").remove();
  }

  getCardElement() {
    this._element = this._getTemplate();
    this._element.querySelector(".main__title-image").textContent = this._text;
    this._element.querySelector(".main__image").setAttribute("src", this._link);
    this._element.querySelector(".main__image").setAttribute("alt", this._text);
    this._setEventListeners();
    return this._element;
  }
}