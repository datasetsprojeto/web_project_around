const formElement = document.querySelector("#modal__form");
const nameInput = document.querySelector("#input__name");
const jobInput = document.querySelector("#input__job");
const profileName = document.querySelector(".header__name");
const profileJob = document.querySelector(".header__job");
const titleInput = document.querySelector("#input__title");
const linkInput = document.querySelector("#input__job");


//abre modal
function openModal() {
  const openModal = document.getElementById('.modal');
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  const closeModal = document.getElementById('.modal');
  document.getElementById('modal').style.display = 'none';
}

//abre popup
function openPopup() {
  const openPopup = document.getElementById('.popup');
  document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
  const closePopup = document.getElementById('.popup');
  document.getElementById('popup').style.display = 'none';
}

// valida e aatualiza as informações do perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (nameInput.value != "" && jobInput.value != "") {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal();
  }
}

formElement.addEventListener("submit", handleProfileFormSubmit);
