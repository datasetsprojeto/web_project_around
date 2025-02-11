export const formElement = document.querySelector("#modal__form");
export const nameInput = document.querySelector("#input__name");
export const jobInput = document.querySelector("#input__job");
export const iconCloseModal = document.querySelector(".modal__button-close");
export const modal = document.getElementById('modal');

export const profileName = document.querySelector(".header__name");
export const profileJob = document.querySelector(".header__job");
export const iconOpenModal = document.querySelector(".header__icon-edit");

export const popupForm = document.querySelector(".popup__form");
export const titleInput = document.querySelector("#input__title");
export const linkInput = document.querySelector("#input__link-image");
export const addCard = document.querySelector("#popup__button");
export const iconOpenPopup = document.querySelector(".header__button");
export const iconClosePopup = document.querySelector(".popup__button-close");
export const popup = document.querySelector(".popup");

export const cardTemplate = document.querySelector("#main__template").content;

export const containerCards = document.querySelector(".main__cards");

export const expandedPopup = document.querySelector(".popup-expanded");
export const expandedImage = document.querySelector(".popup-expanded__image");
export const titleExpandedImage = document.querySelector(".popup-expanded__image-name");
export const closeExpandedPopup = document.querySelector("#popup-expanded__button-close");

export const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
];

export function close() {
  modal.style.display = 'none';
  popup.style.display = 'none';
  expandedPopup.classList.remove('popup-expanded_oppened');
}

export function closeOnClick(event) {
  if (event.target.classList.contains("modal")) {
    modal.style.display = 'none';
  }
  if (event.target.classList.contains("popup")) {
    popup.style.display = 'none';
  }
}

// Abrir modal
iconOpenModal.addEventListener('click', function() {
  modal.style.display = 'flex';
  modal.addEventListener("click", closeOnClick);
  nameInput.classList.add("input-bottom");
  jobInput.classList.add("input-bottom");
});

// Fechar modal
iconCloseModal.addEventListener('click', function() {
  modal.style.display = 'none';
  modal.removeEventListener("click", closeOnClick);
});

// Fechamento via ESC
document.addEventListener("keydown", function(evt) {
  if (evt.key === "Escape") {
    close();
  }
});

// Abrir popup
iconOpenPopup.addEventListener('click', function() {
  popup.style.display = 'flex';
  titleInput.classList.add("input-bottom");
  linkInput.classList.add("input-bottom");
  titleInput.value = "";

linkInput.value = "";
popup.addEventListener("click", closeOnClick);
})

//close popup
iconClosePopup.addEventListener('click', function() {
popup.style.display = 'none';
popup.removeEventListener("click", closeOnClick);
})

//close popup Image
closeExpandedPopup.addEventListener('click', function() {
expandedPopup.classList.remove('popup-expanded_oppened');
})

// valida e atualiza as informações do perfil
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (nameInput.value != "" && jobInput.value != "") {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    modal.style.display = 'none';
  }
}