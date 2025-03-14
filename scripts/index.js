import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  formElement,
  nameInput,
  jobInput,
  modal,
  profileName,
  profileJob,
  popupForm,
  titleInput,
  linkInput,
  popup,
  cardTemplate,
  containerCards,
  expandedPopup,
  initialCards,
  handleProfileFormSubmit
} from "./utils.js";

// Event listener para o formulário de perfil
formElement.addEventListener("submit", handleProfileFormSubmit);

// Alteração da cor ao curtir
function handleLike(event) {
  event.target.classList.toggle("main__icon_black-heart");
}

// Remoção de cards
function removeCard(event) {
  event.target.closest(".main__card").remove();
}

// Criando um novo card
function createCard(card) {
  const cardElement = cardTemplate.querySelector(".main__card").cloneNode(true);

  cardElement.querySelector(".main__title-image").textContent = card.name;
  cardElement.querySelector(".main__image").setAttribute("src", card.link);
  cardElement.querySelector(".main__image").setAttribute("alt", card.name);

  // Alteração da cor ao curtir
  cardElement.querySelector(".main__icon").addEventListener('click', handleLike);

  // Abrir popup expandido ao clicar na imagem
  cardElement.querySelector(".main__image").addEventListener("click", function () {
    expandedPopup.querySelector(".popup-expanded__image").setAttribute("src", card.link);
    expandedPopup.querySelector(".popup-expanded__image-name").textContent = card.name;
    expandedPopup.classList.add('popup-expanded_oppened');

    // Fechar popup expandido ao clicar fora da imagem
    const closeExpandedPopup = function(e) {
      if (e.target === expandedPopup) {
        expandedPopup.classList.remove('popup-expanded_oppened');
        expandedPopup.removeEventListener('click', closeExpandedPopup);
      }
    };
    expandedPopup.addEventListener('click', closeExpandedPopup);
  });

  // Remover cards
  cardElement.querySelector(".main__button-delete").addEventListener('click', removeCard);
  return cardElement;
}

// Renderizar cards iniciais
initialCards.forEach(card => {
  const newCard = createCard(card);
  containerCards.prepend(newCard);
});

// Adicionar novos cards
function addNewImageCard(evt) {
  evt.preventDefault();
  if (titleInput.value !== "" && linkInput.value !== "") {
    const newCard = createCard({
      name: titleInput.value,
      link: linkInput.value,
    });
    containerCards.prepend(newCard);
    popup.style.display = 'none';

    // Limpar os campos de entrada
    titleInput.value = "";
    linkInput.value = "";
  }
}

popupForm.addEventListener("submit", addNewImageCard);

// Validação do formulário de perfil
const formValidatorProfile = new FormValidator({
  formSelector: "#modal__form",
  inputSelector: ".modal__form-input", // Seletores dos campos de entrada
  submitButtonSelector: "#modal__button", // ID do botão de submit
  inactiveButtonClass: "form__btn_disabled",
  inputErrorClass: "input__message_error",
  errorClass: "input__message_error"
}, "#modal__form");

formValidatorProfile.enableValidation();

// Validação do formulário de novo card
const formValidatorCard = new FormValidator({
  formSelector: "#popup__form",
  inputSelector: ".popup__form-input", // Seletores dos campos de entrada
  submitButtonSelector: "#popup__button", // ID do botão de submit
  inactiveButtonClass: "form__btn_disabled",
  inputErrorClass: "input__message_error",
  errorClass: "input__message_error"
}, "#popup__form");

formValidatorCard.enableValidation();