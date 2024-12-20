const formElement = document.querySelector("#modal__form");
const nameInput = document.querySelector("#input__name");
const jobInput = document.querySelector("#input__job");

const profileName = document.querySelector(".header__name");
const profileJob = document.querySelector(".header__job");

const popupForm = document.querySelector(".popup__form");
const titleInput = document.querySelector("#input__title");
const linkInput = document.querySelector("#input__link-image");
const addCard = document.querySelector("#popup__button");

const cardTemplate = document.querySelector("#main__template").content;

const containerCards = document.querySelector(".main__cards");

const cardElement = document.querySelector(".main__card");
const image = document.querySelector(".main__image");
const titleImage = document.querySelector(".main__title-image");
const heart = document.querySelector('#main__icon');
const deleteCard = document.querySelector('#main__button-delete');

const expandedPopup = document.querySelector(".popup-expanded");
const expandedImage = document.querySelector(".popup-expanded__image");
const titleExpandedImage = document.querySelector(".popup-expanded__image-name");
const closeExpandedPopup = document.querySelector("#popup-expanded__button-close");

const initialCards = [
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

function closeOnClick(event) {
  if(event.target.classList[0] == "modal") {
    closeModal();
  }
  if(event.target.classList[0] == "popup") {
    closePopup();
  }
  }


//opeen modal
function openModal() {
  const openModal = document.getElementById('modal');
  openModal.style.display = 'flex';
  openModal.addEventListener("click", closeOnClick);
  nameInput.classList.add("input-bottom");
  jobInput.classList.add("input-bottom");
}

//close modal
function closeModal() {
  const closeModal = document.getElementById('modal');
  closeModal.style.display = 'none';
  closeModal.removeEventListener("click", closeOnClick);
}

//open popup
function openPopup() {
  const openPopup = document.getElementById('popup');
  openPopup.style.display = 'flex';
  titleInput.classList.add("input-bottom");
  linkInput.classList.add("input-bottom");
  titleInput.value = "";
  linkInput.value = "";
  openPopup.addEventListener("click", closeOnClick);
}

//close popup
function closePopup() {
  const closePopup = document.getElementById('popup');
  closePopup.style.display = 'none';
  closePopup.removeEventListener("click", closeOnClick);
}

//close popup Image
function closePopupImage() {
  expandedPopup.classList.remove('popup-expanded_oppened');
}


// valida e atualiza as informações do perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (nameInput.value != "" && jobInput.value != "") {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal();
  }
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// alteração da cor ao curtir
function handleLike(event) {
  event.target.classList.toggle("main__icon_black-heart");
}
// remoção de cards
function removeCard(event) {
  event.target.parentElement.remove();
}

// fechamento via ESC
document.addEventListener("keydown", function(evt) {
  if (evt.key === "Escape") {
    closeModal();
    closePopup();
    expandedPopup.classList.remove('popup-expanded_oppened');
  }
})




// criando um novo card
function createCard(card) {

  const cardElement = cardTemplate.querySelector(".main__card").cloneNode(true);

  cardElement.querySelector(".main__title-image").textContent = card.name;
  cardElement.querySelector(".main__image").setAttribute("src", card.link);
  cardElement.querySelector(".main__image").setAttribute("alt", card.name);
  // alteração da cor ao curtir
  cardElement.querySelector(".main__icon").addEventListener('click', handleLike);
  cardElement.querySelector("#main__image").addEventListener("click", function (event) {
  expandedPopup.querySelector(".popup-expanded__image").setAttribute("src", card.link);
  expandedPopup.querySelector(".popup-expanded__image-name").textContent = card.name;
  expandedPopup.classList.add('popup-expanded_oppened');
  //fecha imagem extendia com click fora de sua area
  expandedPopup.addEventListener('click', function(e) {
    if (e.target == this) {
      closePopupImage()
    }
  });


  });
  // remover cards
  cardElement.querySelector(".main__button-delete").addEventListener('click', removeCard);
  return cardElement
}
for (const card of initialCards) {
  const newCard = createCard(card);
  containerCards.prepend(newCard);
}

// adicionar novos cards
function addNewImageCard(evt) {
  evt.preventDefault()
  if (titleInput.value != "" && linkInput.value != "") {
    const newCards = createCard({
      name: titleInput.value,
      link: linkInput.value,
    })
    containerCards.prepend(newCards);
    closePopup()
    titleImage.value = "";
    linkInput.value = "";
  }
}

popupForm.addEventListener("submit", addNewImageCard);




