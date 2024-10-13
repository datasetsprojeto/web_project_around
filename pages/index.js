const formElement = document.querySelector("#modal__form");
let nameInput = document.querySelector("#input__name");
let jobInput = document.querySelector("#input__job");
let profileName = document.querySelector(".header__name");
let profileJob = document.querySelector(".header__job");

//abre modal
function openModal() {
  const openModal = document.getElementById('.modal');
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  const closeModal = document.getElementById('.modal');
  document.getElementById('modal').style.display = 'none';
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

