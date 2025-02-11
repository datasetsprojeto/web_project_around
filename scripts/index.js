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

const h1 = new Card(".header__name");
h1.alteraTexto();
const h2 = new Card(".header__job");
h2.alteraTexto2();

formElement.addEventListener("submit", handleProfileFormSubmit);

// Alteração da cor ao curtir
function handleLike(event) {
  event.target.classList.toggle("main__icon_black-heart");
}

// Remoção de cards
function removeCard(event) {
  event.target.parentElement.remove();
}

// Criando um novo card
function createCard(card) {
  const cardElement = cardTemplate.querySelector(".main__card").cloneNode(true);

  cardElement.querySelector(".main__title-image").textContent = card.name;
  cardElement.querySelector(".main__image").setAttribute("src", card.link);
  cardElement.querySelector(".main__image").setAttribute("alt", card.name);

  // Alteração da cor ao curtir
  cardElement.querySelector(".main__icon").addEventListener('click', handleLike);

  cardElement.querySelector(".main__image").addEventListener("click", function (event) {
    expandedPopup.querySelector(".popup-expanded__image").setAttribute("src", card.link);
    expandedPopup.querySelector(".popup-expanded__image-name").textContent = card.name;
    expandedPopup.classList.add('popup-expanded_oppened');

    // Fecha imagem estendida com click fora de sua área
    const closeExpandedPopup = function(e) {
      if (e.target === expandedPopup) {
        expandedPopup.classList.remove('popup-expanded_oppened');
        expandedPopup.removeEventListener('click', closeExpandedPopup); // Remover o evento após o fechamento
      }
    };
    expandedPopup.addEventListener('click', closeExpandedPopup);
  });

  // Remover cards
  cardElement.querySelector(".main__button-delete").addEventListener('click', removeCard);
  return cardElement;
}

for (const card of initialCards) {
  const newCard = createCard(card);
  containerCards.prepend(newCard);
}

// Adicionar novos cards
function addNewImageCard(evt) {
  evt.preventDefault();
  if (titleInput.value !== "" && linkInput.value !== "") {
    const newCards = createCard({
      name: titleInput.value,
      link: linkInput.value,
    });
    containerCards.prepend(newCards);
    popup.style.display = 'none';

    // Limpar os campos de entrada
    titleInput.value = "";
    linkInput.value = "";
  }
}

popupForm.addEventListener("submit", addNewImageCard);

const form1 = new FormValidator({
  config: {
    inputElement: 'input',
    buttonErrorClass: "form__btn_disabled",
    elementErrorClass: "input-error-show"
  },
  formSelector: "#modal__form"
}).enableValidation();

const form2 = new FormValidator({
  config: {
    inputElement: 'input',
    buttonErrorClass: "form__btn_disabled",
    elementErrorClass: "input-error-show"
  },
  formSelector: "#popup__form"
}).enableValidation();


