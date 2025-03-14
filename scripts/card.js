export default class Card {
  constructor(data, templateSelector) {
    this._text = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  // Obtém o template do card
  _getTemplate() {
    const templateContent = document
      .querySelector(this._templateSelector)
      .content; // Acessa o conteúdo do template

    // Retorna o elemento clonado do template
    return templateContent.querySelector(".main__card").cloneNode(true);
  }

  // Adiciona os ouvintes de eventos ao card
  _setEventListeners() {
    this._element
      .querySelector(".main__icon")
      .addEventListener("click", this._handleLike.bind(this));

    this._element
      .querySelector(".main__button-delete")
      .addEventListener("click", this._handleDelete.bind(this));

    this._element
      .querySelector(".main__image")
      .addEventListener("click", this._handleImageClick.bind(this));
  }

  // Manipula o evento de "curtir" o card
  _handleLike(event) {
    event.target.classList.toggle("main__icon_black-heart");
  }

  // Manipula o evento de deletar o card
  _handleDelete(event) {
    event.target.closest(".main__card").remove();
  }

  // Manipula o evento de clicar na imagem para expandir
  _handleImageClick() {
    const expandedPopup = document.querySelector(".popup-expanded");
    const expandedImage = expandedPopup.querySelector(".popup-expanded__image");
    const expandedImageName = expandedPopup.querySelector(".popup-expanded__image-name");

    // Define a imagem e o texto no popup expandido
    expandedImage.setAttribute("src", this._link);
    expandedImage.setAttribute("alt", this._text);
    expandedImageName.textContent = this._text;

    // Abre o popup expandido
    expandedPopup.classList.add("popup-expanded_oppened");

    // Fecha o popup expandido ao clicar fora da imagem
    const closeExpandedPopup = (e) => {
      if (e.target === expandedPopup) {
        expandedPopup.classList.remove("popup-expanded_oppened");
        expandedPopup.removeEventListener("click", closeExpandedPopup);
      }
    };

    expandedPopup.addEventListener("click", closeExpandedPopup);
  }

  // Retorna o elemento do card pronto para ser renderizado
  getCardElement() {
    this._element = this._getTemplate();
    this._element.querySelector(".main__title-image").textContent = this._text;
    this._element.querySelector(".main__image").setAttribute("src", this._link);
    this._element.querySelector(".main__image").setAttribute("alt", this._text);
    this._setEventListeners();
    return this._element;
  }
}