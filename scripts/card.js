// Card.js
export default class Card {
  constructor(data, templateSelector, handleCardClick,  handleDeleteClick, handleLikeClick, userId) {
  this._data = data;
  this._name = data.name;
  this._link = data.link;
  this._id = data._id;
  this._ownerId = data.owner ? data.owner._id || data.owner : null;
  this._likes = Array.isArray(data.likes) ? data.likes : [];
  this._userId = userId;
  this._templateSelector = templateSelector;
  this._handleCardClick = handleCardClick;
  this._handleDeleteClick = handleDeleteClick;
  this._handleLikeClick = handleLikeClick;
 this._isLiked = this.checkIsLiked();
  if (typeof templateSelector !== "string") {
    throw new Error("templateSelector deve ser uma string válida.");
  }
}

checkIsLiked() { // Método renomeado
    return this._likes.some(like => like._id === this._userId);
  }

  _getTemplate() {
    const templateContent = document
      .querySelector(this._templateSelector)
      .content;
    return templateContent.querySelector(".main__card").cloneNode(true);
  }

  _setEventListeners() {
  this._likeButton = this._element.querySelector(".main__icon");
  this._deleteButton = this._element.querySelector(".main__button-delete");

  this._likeButton.addEventListener("click", () => {
    this._handleLikeClick(this._id, this._isLiked);
  });


  if (this._ownerId === this._userId) {
    this._deleteButton.classList.add('visible');
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id, this._element); // Passar o elemento do DOM
    });
  } else {
    this._deleteButton.classList.remove('visible');
  }

  this._element
    .querySelector(".main__image")
    .addEventListener("click", () => {
      this._handleCardClick({ link: this._link, name: this._name });
    });
}

  _isLiked() {
    return this._likes.some(like => like._id === this._userId);
  }


updateLikes(updatedLikes) {
  this._likes = Array.isArray(updatedLikes) ? updatedLikes : [];
  this._isLiked = this.checkIsLiked();
  this._renderLikes();
}

_renderLikes() {
  if (!this._likeButton || !this._element) return;

  const likeCountElement = this._element.querySelector('.main__like-count');
  if (likeCountElement) {
    likeCountElement.textContent = this._likes.length;

    this._likeButton.classList.remove('main__icon', 'main__icon_black-heart');
    this._likeButton.classList.add(this._isLiked ? 'main__icon_black-heart' : 'main__icon');
  }
}

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  getCardElement() {
    if (!this._element) {
      this._element = this._getTemplate();
      this._element.dataset.cardId = this._id; // Adiciona o ID do card
      this._element._cardInstance = this; // Vincula a instância ao elemento

    // Elementos do template
    this._element.querySelector(".main__title-image").textContent = this._name;
    const cardImage = this._element.querySelector(".main__image");
    const likeCountElement = this._element.querySelector('.main__like-count');

    // Configuração
    cardImage.src = this._link;
    cardImage.alt = this._name;
    likeCountElement.textContent = this._likes.length;

    this._renderLikes();
    this._setEventListeners();
  }
    return this._element;
  }
}