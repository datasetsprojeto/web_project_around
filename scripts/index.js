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
  handleProfileFormSubmit
} from './utils.js';

// Instância da classe Section para renderizar os cards
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#main__template', handleCardClick).getCardElement();
    return card;
  }
}, '.main__cards');

cardSection.renderItems();

// Instância da classe PopupWithImage para exibir imagens expandidas
const popupWithImage = new PopupWithImage('.popup-expanded');

// Função para lidar com o clique na imagem do card
function handleCardClick({ link, name }) {
  popupWithImage.open({ link, name });
}

// Instância da classe PopupWithForm para o formulário de novo card
const popupWithForm = new PopupWithForm('.popup', (formData) => {
  const newCard = {
    name: formData.title,
    link: formData.url
  };
  const card = new Card(newCard, '#main__template', handleCardClick).getCardElement();
  cardSection.addItem(card);
});

popupWithForm.setEventListeners();

// Instância da classe UserInfo para gerenciar as informações do usuário
const userInfo = new UserInfo({
  nameSelector: '.header__name',
  jobSelector: '.header__job'
});

// Instância da classe PopupWithForm para o formulário de edição de perfil
const popupWithProfileForm = new PopupWithForm('.modal', (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.job
  });
});

popupWithProfileForm.setEventListeners();

// Event listener para abrir o formulário de edição de perfil
document.querySelector('.header__icon-edit').addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  document.querySelector('#input__name').value = name;
  document.querySelector('#input__job').value = job;
  popupWithProfileForm.open();
});

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