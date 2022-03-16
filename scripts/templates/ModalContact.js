class ModalContact {

    constructor(photographer) {
        this.photographer = photographer
        this.$contactButton = document.getElementById('contactBtn')
        this.$contactModal = document.getElementById('contact_modal')
        this.formIsValid
    }

    init () {
        this.$contactModal.innerHTML = this.render()
        this.displayModal()

        this.focusHandler()
        
        document.querySelector('.modal__close').addEventListener('click', e => {
            this.closeModal()
            this.$contactButton.focus()
        })

        document.querySelector('.modal__form').addEventListener('submit', e => {
            e.preventDefault()
            e.stopPropagation()
            this.validate()

            if(this.formIsValid){
                this.closeModal()
            }
        })
    }

    displayModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "block";
    }

    closeModal () {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
    }

    focusHandler() {
        const focusableElements ='button, input, textarea, [tabindex]:not([tabindex="-1"])';
        const modal = this.$contactModal; // select the modal by it's id

        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        document.addEventListener('keydown', function(e) {
            let isTabPressed = e.key === 'Tab'
          
            if (!isTabPressed) {
                return;
            }
            
            if (e.shiftKey) { // if shift key pressed for shift + tab combination
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus(); // add focus for the last focusable element
                    e.preventDefault();
                }
            } else { // if tab key is pressed
                if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                    firstFocusableElement.focus(); // add focus for the first focusable element
                    e.preventDefault();
                }
            }
        });
          
        firstFocusableElement.focus();
    }

    formInputIsValid(inputValue, inputType) {
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regexName = /^[a-z-A-Z ,.'-]+$/;

        if(inputValue == "" || inputValue.length < 2) {
            this.formIsValid = false
            console.log("Le champs est vide ou ne comporte pas assez de caractère")
        } else if (inputType == "text" && regexName.test(inputValue) != true) {
            this.formIsValid = false
            console.log("Veuillez entrer des caractères valide pour le champ nom")
        } else if (inputType == "email" && regexEmail.test(inputValue) != true) {
            this.formIsValid = false
            console.log("Veuillez entrer une adresse email valide")
        } else {
            console.log(inputValue)
        }
    }

    validate () {
        this.$formFirst = document.getElementById('firstname').value
        this.$formLast = document.getElementById('lastname').value
        this.$formEmail = document.getElementById('email').value
        this.$formMessage = document.getElementById('message').value

        this.formIsValid = true

        this.formInputIsValid(this.$formFirst, "text")
        this.formInputIsValid(this.$formLast, "text")
        this.formInputIsValid(this.$formEmail, "email")
        this.formInputIsValid(this.$formMessage)

        if (this.formIsValid) {
            console.log('Formulaire envoyé')
        } else {
            return
        }
    }

    render () {
        return `
            <div class="modal">
            <header class="modal__header">
                <h2>Contactez-moi <br/>${this.photographer.name}</h2>
                <button class="modal__close"><img src="assets/icons/close.svg" /></button>
            </header>
            <form class="modal__form" action="#">
                <div>
                    <label for="firstname">Prénom</label>
                    <input id="firstname" name="firstname" minlength="2" required />
        
                    <label for="lastname">Nom</label>
                    <input id="lastname" name="lastname" minlength="2" required />
        
                    <label for="email">Email</label>
                    <input id="email" name="email" minlength="2" required />
        
                    <label for="message">Votre message</label>
                    <textarea name="message" id="message"></textarea>
                </div>
                <button class="btn btn--contact">Envoyer</button>
            </form>
        </div>
        `
    }
}