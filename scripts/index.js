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

// Configuração da API
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

// Seção de cards
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
      cardSection.addItem(createCard(newCard), 'prepend');
      popupWithForm.close();
    })
    .catch(console.error)
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
      .catch(console.error)
      .finally(() => popupWithConfirmation.renderLoading(false));
  });
  popupWithConfirmation.open();
}

function handleLikeClick(cardId, isLiked) {
  const action = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);
  action
    .then((updatedCard) => {
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      if (cardElement && cardElement._cardInstance) {
        const likes = Array.isArray(updatedCard.likes) ? updatedCard.likes : [];
        cardElement._cardInstance.updateLikes(likes);
        if (typeof updatedCard.isLiked === 'boolean') {
          cardElement._cardInstance._isLiked = updatedCard.isLiked;
        }
        cardElement._cardInstance._renderLikes();
      } else {
        console.error("Card não encontrado ou instância inválida");
      }
    })
    .catch((err) => {
      console.error("Erro ao atualizar like:", err);
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

formValidatorProfile.initialize();
formValidatorCard.initialize();
formValidatorAvatar.initialize();

// Carregamento inicial
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar
    });

    // Garanta que todos os cards tenham likes definidos
    const processedCards = cards.map(card => ({
      ...card,
      likes: Array.isArray(card.likes) ? card.likes : []
    }));

    cardSection.setItems(processedCards);
    cardSection.renderItems();
  })
  .catch(err => {
    console.error('Erro no carregamento inicial:', err);
    document.querySelector('.main__cards').innerHTML = `
      <p class="error-message">Falha ao carregar conteúdo. Recarregue a página.</p>
    `;
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