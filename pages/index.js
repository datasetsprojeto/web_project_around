
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
const formElement = document.querySelector("#modalForm");
function handleProfileFormSubmit(evt) {

  evt.preventDefault();

  let nameInput = document.querySelector("#inputName");
  let jobInput = document.querySelector("#inputJob");
  let profileName = document.querySelector(".header__name");
  let profileJob = document.querySelector(".header__job");

  if (nameInput.value != "" && jobInput.value != "") {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal();
  }
}

formElement.addEventListener("submit", handleProfileFormSubmit);

