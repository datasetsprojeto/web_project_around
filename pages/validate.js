enableValidattion({
  formElement: "form",
  inputElement: "input",
  submitButtonSelector: ".popup__button",
  buttonErrorClass: "form__btn_disabled",
  inputErrorClass: ".input__message_error",
  elementErrorClass: "input-error-show"
});

function addErrorMessage(input, errorElement, config) {
  const errorMessage = input.validationMessage;
  errorElement.textContent = errorMessage
  errorElement.classList.add(config.elementErrorClass)
  errorElement.classList.add(config.elementErrorClass)
}

function removeErrorMessage(errorElement, config) {
  errorElement.textContent = ""
  errorElement.classList.remove(config.elementErrorClass)
}

function enableButton(button, config) {
  button.classList.add(config.buttonErrorClass)
  button.setAttribute("disabled", true)
}

function disableButton(button, config) {
  button.classList.remove(config.buttonErrorClass)
  button.removeAttribute("disabled")
}


function checkIsValid(event, config, form) {
  const inputElement = event.target;
  const errorElement = inputElement.nextElementSibling;
  const button = form.querySelector("button");
  if (!inputElement.validity.valid) {
    if (errorElement.tagName !== 'BUTTON') {
    addErrorMessage(inputElement, errorElement, config);
    }
    enableButton(button, config);
  } else {
    if (errorElement.tagName !== "BUTTON") {
    removeErrorMessage(errorElement, config);
    }

    disableButton(button, config);
  }
}

function enableValidattion(config) {
const forms = Array.from(document.querySelectorAll(config.formElement));
for (const form of forms) {
  const inputs = Array.from(form.querySelectorAll(config.inputElement));
  for (const input of inputs) {
    input.addEventListener('input', (event) => {
      checkIsValid(event, config, form);
    })
  }
}
}

