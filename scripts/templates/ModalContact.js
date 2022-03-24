class ModalContact {

    constructor(photographer) {
        this.photographer = photographer
        this.formIsValid
    }

    init () {
        document.body.appendChild(this.render())

        this.$contactButton = document.getElementById('contactBtn')
        this.$contactModal = document.getElementById('contact_modal')

        this.displayModal()
        this.focusHandler()
        
        document.getElementById('modal__close').addEventListener('click', e => {
            this.closeModal()
            this.$contactButton.focus()
        })

        document.getElementById('modal__form').addEventListener('submit', e => {
            e.preventDefault()
            e.stopPropagation()
            this.validate()

            if (this.formIsValid) {
                this.closeModal()
            }
        })
    }

    displayModal() {
        this.$contactModal.style.display = "block";
    }

    closeModal () {
        this.$contactModal.style.display = "none";
    }

    focusHandler() {
        const focusableElements ='button, input, textarea, [tabindex]:not([tabindex="-1"])';
        const modal = this.$contactModal; // select the modal by it's id

        const focusableContent = modal.querySelectorAll(focusableElements);
        const focusableContentArr = Array.from(focusableContent)

        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
        const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
        const firstInput = focusableContentArr.find(elt => elt.tagName === "INPUT")

        modal.addEventListener('keydown', function(e) {
            let isTabPressed = e.key === 'Tab'
            
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
        firstInput.focus();
    }

    formInputIsValid(inputElement, inputType) {
        const regexName = /^[a-z-A-Z ,.'-]+$/;
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        const inputValue = inputElement.value
        const currentInput = inputElement.id.split("__")[1]

        if(inputValue == "" || inputValue.length < 2) {
            this.formIsValid = false
            this.addFormErrorMessage(inputElement)
            console.log(`Le champs ${currentInput} est vide ou ne comporte pas assez de caractère`)
        } else if (inputType == "text" && regexName.test(inputValue) != true) {
            this.formIsValid = false
            this.addFormErrorMessage(inputElement)
            console.log(`Veuillez entrer des caractères valide pour le champ ${currentInput}`)
        } else if (inputType == "email" && regexEmail.test(inputValue) != true) {
            this.formIsValid = false
            this.addFormErrorMessage(inputElement)
            console.log("Veuillez entrer une adresse email valide")
        } else {
            this.removeFormErrorMessage(inputElement)
            console.log(inputValue)
        }
    }

    // Add error message
    addFormErrorMessage(element){
        element.setAttribute('data-error-visible', 'true');
    }
    
    // Remove error message
    removeFormErrorMessage(element){
        element.removeAttribute('data-error-visible');
    }

    resetModal() {
        this.$formFirst.value = ""
        this.$formLast. value = ""
        this.$formEmail. value = ""
        this.$formMessage.value = ""
    }

    validate () {
        this.$formFirst = document.getElementById('modal__firstname')
        this.$formLast = document.getElementById('modal__lastname')
        this.$formEmail = document.getElementById('modal__email')
        this.$formMessage = document.getElementById('modal__message')

        this.formIsValid = true

        this.formInputIsValid(this.$formFirst, "text")
        this.formInputIsValid(this.$formLast, "text")
        this.formInputIsValid(this.$formEmail, "email")
        this.formInputIsValid(this.$formMessage)

        if (this.formIsValid) {
            console.log('Formulaire envoyé')
            this.resetModal()
        }
    }

    render () {
        const dom = document.createElement('div')
        dom.setAttribute("id", "contact_modal")
        dom.innerHTML = `
            <div class="modal">
            <header class="modal__header">
                <h2>Contactez-moi <br/>${this.photographer.name}</h2>
                <button id="modal__close" class="modal__close" aria-label="Fermer">
                    <img src="assets/icons/close.svg" />
                </button>
            </header>
            <form id="modal__form" class="modal__form" action="#">
                <div>
                    <label for="modal__firstname">Prénom</label>
                    <input id="modal__firstname" name="modal__firstname" minlength="2" required />
        
                    <label for="modal__lastname">Nom</label>
                    <input id="modal__lastname" name="modal__lastname" minlength="2" required />
        
                    <label for="modal__email">Email</label>
                    <input id="modal__email" name="modal__email" minlength="2" required />
        
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