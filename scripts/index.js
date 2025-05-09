// index.js
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';
import Api from './Api.js';
import UserInfo from './UserInfo.js';

let userId;

// Configuração da API
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "3a0867d1-4795-4a66-b02f-4cb159bf2ae9",
    "Content-Type": "application/json"
  }
});

// Instância das informações do usuário
const userInfo = new UserInfo({
  nameSelector: '.header__name',
  jobSelector: '.header__job',
  avatarSelector: '.header__avatar'
});

// Seção de cards
const cardSection = new Section({
  items: [],
  renderer: (item) => {
    const card = createCard(item);
    return card;
  }
}, '.main__cards');

// Popups
const popupWithImage = new PopupWithImage('#popup-expanded');
popupWithImage.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation('#popup-confirm');
popupWithConfirmation.setEventListeners();

const popupWithForm = new PopupWithForm('#popup', (formData) => {
  popupWithForm.renderLoading(true);
  api.addNewCard(formData)
    .then(newCard => {
      const cardElement = createCard(newCard);
      cardSection.addItem(cardElement);
      popupWithForm.close();
    })
    .catch((err) => {
      console.error('Erro ao criar card:', err);
      setTimeout(() => popupWithForm.close(), 2000);
    })
    .finally(() => popupWithForm.renderLoading(false));
});
popupWithForm.setEventListeners();

const popupWithProfileForm = new PopupWithForm('#modal', (formData) => {
  popupWithProfileForm.renderLoading(true);
  api.updateUserInfo(formData)
    .then(updatedData => {
      userInfo.setUserInfo({
        name: updatedData.name,
        job: updatedData.about,
        avatar: updatedData.avatar
      });
      popupWithProfileForm.close();
    })
    .catch(console.error)
    .finally(() => popupWithProfileForm.renderLoading(false));
});
popupWithProfileForm.setEventListeners();

const avatarPopup = new PopupWithForm('#avatar-popup', (formData) => {
  avatarPopup.renderLoading(true);
  api.updateAvatar(formData.avatar)
    .then(updatedData => {
      userInfo.setUserInfo({ avatar: updatedData.avatar });
      avatarPopup.close();
    })
    .catch(console.error)
    .finally(() => avatarPopup.renderLoading(false));
});
avatarPopup.setEventListeners();

// Funções auxiliares
function createCard(data) {
  if (!data || !userId) return null;

  return new Card(
    data,
    '#main__template',
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  ).getCardElement();
}

function handleCardClick({ link, name }) {
  popupWithImage.open({ link, name });
}

function handleDeleteClick(cardId) {
  popupConfirm.setSubmitAction(() => {
    popupConfirm.renderLoading(true);
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        popupConfirm.close();
      })
      .catch(err => console.error(err))
      .finally(() => popupConfirm.renderLoading(false));
  });

  popupConfirm.open();
}

function handleLikeClick(cardId, isLiked) {
  if (!cardId) {
    console.error("ID do card inválido");
    return;
  }

  const action = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);
  action
    .then(updatedCard => {
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      if (cardElement) {
        const cardInstance = cardElement._cardInstance;
        cardInstance.updateLikes(updatedCard.likes || []);
      }
    })
    .catch(err => {
      console.error('Erro ao atualizar like:', err);
      if (err.message.includes("404")) {
        const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
        if (cardElement) cardElement.remove();
      }
    });
}

// Validação de formulários
const formValidatorProfile = new FormValidator({
  formSelector: "#modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: "#modal__button",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "input__error",
  errorClass: "input__error"
}, document.querySelector('#modal__form'));

const formValidatorCard = new FormValidator({
  formSelector: "#popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: "#popup__button",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "input__error",
  errorClass: "input__error"
}, document.querySelector('#popup__form'));

const formValidatorAvatar = new FormValidator({
  formSelector: "#avatar-form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: "#avatar-button",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "input__error",
  errorClass: "input__error"
}, document.querySelector('#avatar-form'));

formValidatorProfile.enableValidation();
formValidatorCard.enableValidation();
formValidatorAvatar.enableValidation();

// Carregamento inicial
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar
    });

    cardSection.setItems(cards.filter(card =>
      card && card.name && card.link && card._id
    ));
    cardSection.renderItems();
  })
  .catch(console.error);

// Event listeners
document.querySelector('.header__icon-edit').addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  document.querySelector('#input__name').value = name;
  document.querySelector('#input__job').value = job;
  formValidatorProfile.resetValidation();
  popupWithProfileForm.open();
});

document.querySelector('.header__button').addEventListener('click', () => {
  formValidatorCard.resetValidation();
  popupWithForm.open();
});

document.querySelector('.header__avatar-container').addEventListener('click', () => {
  formValidatorAvatar.resetValidation();
  avatarPopup.open();
});