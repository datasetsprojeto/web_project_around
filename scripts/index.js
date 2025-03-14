import Card from './Card.js';
import FormValidator from "./FormValidator.js";
import {
  formElement,
  popupForm,
  titleInput,
  linkInput,
  popup,
  containerCards,
  initialCards,
  handleProfileFormSubmit
} from "./utils.js";

// Event listener para o formulário de perfil
formElement.addEventListener("submit", handleProfileFormSubmit);

// Renderizar cards iniciais
initialCards.forEach(card => {
  const newCard = new Card(card, "#main__template").getCardElement();
  containerCards.prepend(newCard);
});

// Adicionar novos cards
function addNewImageCard(evt) {
  evt.preventDefault();
  if (titleInput.value !== "" && linkInput.value !== "") {
    const newCard = new Card({
      name: titleInput.value,
      link: linkInput.value,
    }, "#main__template").getCardElement();
    containerCards.prepend(newCard);
    popup.style.display = "none";

    // Limpar os campos de entrada
    titleInput.value = "";
    linkInput.value = "";
  }
}

popupForm.addEventListener("submit", addNewImageCard);

// Validação do formulário de perfil
const formValidatorProfile = new FormValidator({
  formSelector: "#modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: "#modal__button",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "input__error",
  errorClass: "input__error"
}, formElement); // Passa o elemento do DOM diretamente

formValidatorProfile.enableValidation();

// Validação do formulário de novo card
const formValidatorCard = new FormValidator({
  formSelector: "#popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: "#popup__button",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "input__error",
  errorClass: "input__error"
}, popupForm); // Passa o elemento do DOM diretamente

formValidatorCard.enableValidation();