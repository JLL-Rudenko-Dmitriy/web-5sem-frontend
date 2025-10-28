import "./swiper.js"

const burger_menu_class = ".header__mobile_menu";
const burger_menu_list = ".header__mobile_menu_list";

document.querySelector(burger_menu_class).addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector(burger_menu_list).classList.toggle('open');
});


// Validation code
const form = document.querySelector('.get-in-touch__form')
const inputList = Array.from(form.querySelectorAll('.get-in-touch__input_field'))
const checkboxElement = form.querySelector('.get-in-touch__agreement')
const buttonElement = form.querySelector('.get-in-touch__button')

startValidation()

function startValidation() {
    toggleButton()
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        if (hasInvalidInput()) {
            formError()
            inputList.forEach((inputElement) => {
                checkInputValidity(inputElement)
                toggleInputError(inputElement)
            })
            toggleInputError(checkboxElement)
        }
    })
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement)
            toggleButton()
        })
        inputElement.addEventListener('blur', () => {
            toggleInputError(inputElement)
        })
        inputElement.addEventListener('focus', () => {
            toggleErrorSpan(inputElement)
        })
        checkboxElement.addEventListener('change', () => {
            toggleInputError(checkboxElement)
            toggleButton()
        })
    })
}

function toggleInputError(inputElement) {
    if (!inputElement.validity.valid) {
      toggleErrorSpan(inputElement, inputElement.validationMessage)
    } else {
      toggleErrorSpan(inputElement)
    }
  }

function checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
      inputElement.setCustomValidity(checkLengthMismatch(inputElement))
    }
}
  
function checkLengthMismatch(inputElement) {
    if (inputElement.type !== 'text') {
      return ''
    }
    const valueLength = inputElement.value.trim().length
    if (valueLength < inputElement.minLength) {
      return `Минимальное количество символов: ${inputElement.minLength}`
    }
    return ''
}
  
function hasInvalidInput() {
    return (
      inputList.some(inputElement => !inputElement.validity.valid) || !checkboxElement.validity.valid
    )
}
  
function toggleErrorSpan(inputElement, errorMessage){
    const errorElement = document.querySelector(`.${inputElement.id}-error`)
    if (errorMessage) {
      inputElement.classList.add('form__type-input-error')
      errorElement.textContent = errorMessage
      errorElement.classList.add('form__error-active')
    } else {
      inputElement.classList.remove('form__type-input-error')
      errorElement.textContent = ''
      errorElement.classList.remove('form__error-active')
    }
}
  
function toggleButton() {
    if (hasInvalidInput()) {
      buttonElement.classList.add('button-inactive')
      buttonElement.setAttribute('aria-disabled', 'true')
    } else {
      buttonElement.classList.remove('button-inactive')
      buttonElement.setAttribute('aria-disabled', 'false')
      formErrorElement.textContent = ''
    }
}
  
function formError() {
    const errorMessage = 'Заполните все поля для отправки формы.'
    formErrorElement.textContent = errorMessage
}
