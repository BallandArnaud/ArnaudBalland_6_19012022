class ModalContact {

    constructor(photographer) {
        this.photographer = photographer
        this.$contactButton = document.getElementById('contactBtn')
        this.$contactModal = document.getElementById('contact_modal')
    }

    init () {
        this.$contactModal.innerHTML = this.render()
        this.displayModal()

        document.querySelector('.modal input').focus()
        
        document.querySelector('.modal__close').addEventListener('click', e => {
            this.closeModal()
            this.$contactButton.focus()
        })

        document.querySelector('.modal__form').addEventListener('submit', e => {
            e.preventDefault()
            e.stopPropagation()
            this.validate()
            this.closeModal()
        })
    }

    validate () {
        this.$formFirst = document.getElementById('firstname').value
        this.$formLast = document.getElementById('lastname').value
        this.$formEmail = document.getElementById('email').value
        this.$formMessage = document.getElementById('message').value
        console.log(this.$formFirst)
        console.log(this.$formLast)
        console.log(this.$formEmail)
        console.log(this.$formMessage)
        console.log('Formulaire envoyé')
    }

    closeModal () {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
    }

    displayModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "block";
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