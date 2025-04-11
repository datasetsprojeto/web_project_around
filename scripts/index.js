import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {
  formElement,
  popupForm,
  titleInput,
  linkInput,
  popup,
  containerCards,
  initialCards,
  handleProfileFormSubmit,
  iconOpenPopup
} from './utils.js';

// Instância da Section
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#main__template', handleCardClick).getCardElement();
    return card;
  }
}, '.main__cards');

cardSection.renderItems();

// Imagem expandida
const popupWithImage = new PopupWithImage('#popup-expanded');
popupWithImage.setEventListeners();

function handleCardClick({ link, name }) {
  popupWithImage.open({ link, name });
}

// Novo card
const popupWithForm = new PopupWithForm('#popup', (formData) => {
  const newCard = {
    name: formData.title,
    link: formData.url
  };
  const card = new Card(newCard, '#main__template', handleCardClick).getCardElement();
  cardSection.addItem(card);
});
popupWithForm.setEventListeners();

// Info do usuário
const userInfo = new UserInfo({
  nameSelector: '.header__name',
  jobSelector: '.header__job'
});

// Formulário de edição de perfil
const popupWithProfileForm = new PopupWithForm('#modal', (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.job
  });
});
popupWithProfileForm.setEventListeners();

// Validação do formulário de perfil
const formValidatorProfile = new FormValidator({
  formSelector: "#modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: "#modal__button",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "input__error",
  errorClass: "input__error"
}, formElement);

formValidatorProfile.enableValidation();

// Abre o modal de edição de perfil com dados e validação resetada
document.querySelector('.header__icon-edit').addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  document.querySelector('#input__name').value = name;
  document.querySelector('#input__job').value = job;
  formValidatorProfile.resetValidation();
  popupWithProfileForm.open();
});

// Validação do formulário de novo card
const formValidatorCard = new FormValidator({
  formSelector: "#popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: "#popup__button",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "input__error",
  errorClass: "input__error"
}, popupForm);

formValidatorCard.enableValidation();

iconOpenPopup.addEventListener('click', () => {
  formValidatorCard.resetValidation(); // Limpa erros de validação
  popupWithForm.open(); // Abre o popup
});