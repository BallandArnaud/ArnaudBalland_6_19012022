class ModalContact {

    constructor(photographer) {
        this.photographer = photographer
    }

    render () {
        return `
            <div class="modal">
            <header class="modal__header">
            <h2>Contactez-moi <br/>${this.photographer.name}</h2>
            <img class="modal__close" src="assets/icons/close.svg" onclick="closeModal()" />
            </header>
            <form action="#">
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