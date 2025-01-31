export class ModalContact {
  constructor (photographer) {
    this.photographer = photographer
  }

  init () {
    document.body.appendChild(this.render())

    this.$contactButton = document.getElementById('contactBtn')
    this.$contactModal = document.getElementById('contact_modal')
    this.$modal = document.querySelector('.modal')
    this.$closeBtn = document.getElementById('modal__close')
    this.$submitBtn = document.getElementById('modal__form')

    this.displayModal()
    this.focusHandler()

    this.$closeBtn.addEventListener('click', e => {
      this.closeModal()
    })

    this.$closeBtn.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        this.closeModal()
      }
    })

    this.$submitBtn.addEventListener('submit', this.checkValidation.bind(this))

    this.eventHandler = e => this.keyboardHandler(e)
    this.$modal.addEventListener('keyup', this.eventHandler, false)
  }

  displayModal () {
    this.$contactModal.style.display = 'block'
    this.$modal.setAttribute('aria-hidden', 'false')
  }

  closeModal () {
    this.$contactModal.style.display = 'none'
    this.$contactButton.focus()
    this.$modal.setAttribute('aria-hidden', 'true')
    this.$modal.removeEventListener('keyup', this.eventHandler)
    this.$submitBtn.removeEventListener('submit', this.checkValidation)
  }

  keyboardHandler (e) {
    if (e.key === 'Escape') {
      this.closeModal()
    }
  }

  // Keep the focus in the modal
  focusHandler () {
    const focusableElements = 'button, input, textarea, [tabindex]:not([tabindex="-1"])'
    const $modal = this.$contactModal // select the modal by it's id

    const focusableContent = $modal.querySelectorAll(focusableElements)
    const focusableContentArr = Array.from(focusableContent)

    const firstFocusableElement = $modal.querySelectorAll(focusableElements)[0] // get first element to be focused inside modal
    const lastFocusableElement = focusableContent[focusableContent.length - 1] // get last element to be focused inside modal
    const firstInput = focusableContentArr.find(elt => elt.tagName === 'INPUT')

    firstInput.focus()

    $modal.addEventListener('keydown', function (e) {
      const isTabPressed = e.key === 'Tab'

      if (!isTabPressed) {
        return
      }

      if (e.shiftKey) { // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus() // add focus for the last focusable element
          e.preventDefault()
        }
      } else { // if tab key is pressed
        if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
          firstFocusableElement.focus() // add focus for the first focusable element
          e.preventDefault()
        }
      }
    })
  }

  formInputIsValid (inputElement, inputType) {
    const regexName = /^[a-z-A-Z ,.'-]+$/
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const inputValue = inputElement.value
    const currentInput = inputElement.id.split('__')[1]

    if (inputValue === '' || inputValue.length < 2) {
      this.formIsValid = false
      this.addFormErrorMessage(inputElement)
      console.log(`Le champs ${currentInput} est vide ou ne comporte pas assez de caractère`)
    } else if (inputType === 'text' && regexName.test(inputValue) !== true) {
      this.formIsValid = false
      this.addFormErrorMessage(inputElement)
      console.log(`Veuillez entrer des caractères valide pour le champ ${currentInput}`)
    } else if (inputType === 'email' && regexEmail.test(inputValue) !== true) {
      this.formIsValid = false
      this.addFormErrorMessage(inputElement)
      console.log('Veuillez entrer une adresse email valide')
    } else {
      this.removeFormErrorMessage(inputElement)
      console.log(inputValue)
    }
  }

  // Add error message
  addFormErrorMessage (element) {
    element.setAttribute('data-error-visible', 'true')
    element.setAttribute('aria-invalid', 'true')
  }

  // Remove error message
  removeFormErrorMessage (element) {
    element.removeAttribute('data-error-visible')
    element.removeAttribute('aria-invalid')
  }

  resetModal () {
    this.$formFirst.value = ''
    this.$formLast.value = ''
    this.$formEmail.value = ''
    this.$formMessage.value = ''
  }

  checkValidation (e) {
    e.preventDefault()
    e.stopPropagation()

    this.validate()

    if (this.formIsValid) {
      this.closeModal()
    }
  }

  validate () {
    this.$formFirst = document.getElementById('modal__firstname')
    this.$formLast = document.getElementById('modal__lastname')
    this.$formEmail = document.getElementById('modal__email')
    this.$formMessage = document.getElementById('modal__message')

    this.formIsValid = true

    this.formInputIsValid(this.$formFirst, 'text')
    this.formInputIsValid(this.$formLast, 'text')
    this.formInputIsValid(this.$formEmail, 'email')
    this.formInputIsValid(this.$formMessage)

    if (this.formIsValid) {
      console.log('#################')
      console.log('Formulaire envoyé')
      this.resetModal()
    }
  }

  render () {
    const dom = document.createElement('div')
    dom.setAttribute('id', 'contact_modal')
    dom.innerHTML = `
            <div class="modal" aria-hidden="true" role="dialog">
            <header class="modal__header">
                <h2>Contactez-moi <br/>${this.photographer.name}</h2>
                <button id="modal__close" class="modal__close" aria-label="Fermer">
                    <img src="assets/icons/close.svg" />
                </button>
            </header>
            <form id="modal__form" class="modal__form" action="#">
                <div>
                    <label for="modal__firstname">Prénom</label>
                    <input type="text" id="modal__firstname" name="modal__firstname" minlength="2" aria-required=true />
        
                    <label for="modal__lastname">Nom</label>
                    <input type="text" id="modal__lastname" name="modal__lastname" minlength="2" aria-required=true />
        
                    <label for="modal__email">Email</label>
                    <input  type="text"id="modal__email" name="modal__email" minlength="2" aria-required=true />
        
                    <label for="modal__message">Votre message</label>
                    <textarea id="modal__message" name="modal__message"></textarea>
                </div>
                <button class="btn btn--contact">Envoyer</button>
            </form>
        </div>
        `
    return dom
  }
}
