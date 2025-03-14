enableValidation({
  formElement: "form",
  inputElement: "input",
  buttonErrorClass: "form__btn_disabled",
  inputErrorClass: "invalido",
  elementErrorClass: "input-error-show"
});

function addErrorMessage(input, errorElement, config) {
  const errorMessage = input.validationMessage;
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.elementErrorClass);
}

function removeErrorMessage(errorElement, config) {
  errorElement.textContent = "";
  errorElement.classList.remove(config.elementErrorClass);
}

function disableButton(button, config) {
  button.classList.add(config.buttonErrorClass);
  button.setAttribute("disabled", true);
}

function enableButton(button, config) {
  button.classList.remove(config.buttonErrorClass);
  button.removeAttribute("disabled");
}

function checkIsValid(event, config, form) {
  const inputElement = event.target;
  const errorElement = inputElement.nextElementSibling;
  const button = form.querySelector("button");

  if (!inputElement.validity.valid) {
    addErrorMessage(inputElement, errorElement, config);
    disableButton(button, config);
  } else {
    removeErrorMessage(errorElement, config);
    enableButton(button, config);
  }
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formElement));
  for (const form of forms) {
    const inputs = Array.from(form.querySelectorAll(config.inputElement));
    for (const input of inputs) {
      input.addEventListener('input', (event) => {
        checkIsValid(event, config, form);
      });
    }
  }
}
