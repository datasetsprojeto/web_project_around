// index.js
import Card from './card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';
import Api from './Api.js';
import UserInfo from './UserInfo.js';

let userId;

// Configuração da API com token válido
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "9c17d3cc-114c-4086-9c06-6e9071f6004b",
    "Content-Type": "application/json"
  }
});

// Instância das informações do usuário
const userInfo = new UserInfo({
  nameSelector: '.header__name',
  jobSelector: '.header__job',
  avatarSelector: '.header__avatar'
});

// Seção de cards com validação ajustada
const cardSection = new Section({
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

function handleDeleteClick(cardId, cardElement) {
  popupWithConfirmation.setSubmitAction(() => {
    popupWithConfirmation.renderLoading(true);
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        popupWithConfirmation.close();
      })
      .catch(err => console.error(err))
      .finally(() => popupWithConfirmation.renderLoading(false));
  });
  popupWithConfirmation.open();
}

function handleLikeClick(cardId, isLiked) {
  console.log("Iniciando like/unlike para o card:", cardId);
  const action = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);
  action
    .then((updatedCard) => {
      console.log("Resposta da API:", updatedCard); // Verifique se há 'likes' aqui
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      if (cardElement && cardElement._cardInstance) {
        cardElement._cardInstance.updateLikes(updatedCard.likes || []);
      }
    })
    .catch((err) => console.error("Erro ao atualizar like:", err));
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

// Carregamento inicial com tratamento de erro
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar
    });

    // Filtro simplificado
    const validCards = cards.filter(card => card && card.name && card.link);

    cardSection.setItems(validCards);
    cardSection.renderItems();
  })
  .catch(err => {
    console.error('Erro no carregamento inicial:', err);
    const container = document.querySelector('.main__cards');
    container.innerHTML = `<p class="error-message">Falha ao carregar conteúdo. Recarregue a página.</p>`;
  });

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