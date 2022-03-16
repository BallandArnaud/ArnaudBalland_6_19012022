 class Lightbox {

    constructor (photographerMedias, mediaId, photographerInformations) {
        this.medias = photographerMedias
        this.mediaId = parseInt(mediaId)
        this.photographerInformations = photographerInformations
        this.$main = document.getElementById('main')
    }

    init () {
        this.currentMedia = this.medias.find(media => media.id === this.mediaId)
        const lightbox = this.render(this.currentMedia)
        this.$main.appendChild(lightbox)
        this.focusHandler()

        document.querySelector('.lightbox__close').addEventListener('click', (e) => {
            this.closeLightbox()
            window.removeEventListener('keyup', this.keyboardHandler)

            // const currentElement = document.querySelector("[data-id='"+this.mediaId+"']")
            // currentElement.focus()
        })

        document.querySelector('.lightbox__prev').addEventListener('click', () => {
            this.prevMedia()
        })

        document.querySelector('.lightbox__next').addEventListener('click', () => {
            this.nextMedia()
        })

        this.eventHandler = e => this.keyboardHandler(e)
        window.addEventListener("keyup", this.eventHandler, false);
    }

    getCurrentMediaIndex(){
        return this.medias.indexOf(this.currentMedia)
    }

    closeLightbox () {
        window.removeEventListener('keyup', this.eventHandler)
        this.$main.removeChild(document.querySelector('.lightbox'))
    }

    prevMedia () {
        const PrevIndex = this.getCurrentMediaIndex() - 1
        
        if (PrevIndex < 0) {
            this.currentMedia = this.medias[this.medias.length - 1]
        } else {
            this.currentMedia = this.medias[PrevIndex]
        }
        document.querySelector('.lightbox__container').innerHTML = this.changeMedia(this.currentMedia)
    }

    nextMedia () {
        const nextIndex = this.getCurrentMediaIndex() + 1
        
        if (nextIndex >= this.medias.length) {
            this.currentMedia = this.medias[0]

        } else {
            this.currentMedia = this.medias[nextIndex]
        }
        document.querySelector('.lightbox__container').innerHTML = this.changeMedia(this.currentMedia)
    }

    keyboardHandler(event) {
        
        event.preventDefault()

        switch (event.key) {
            case "ArrowLeft":
                this.prevMedia()
                break
            case "ArrowRight":
                this.nextMedia()
                break
            case "Escape":
                this.closeLightbox()
                break
            default:
                return
        }
    }

    focusHandler() {
        const focusableElements ='button, [tabindex]:not([tabindex="-1"])';
        const $lightbox = document.querySelector('.lightbox'); // select the modal by it's id

        const firstFocusableElement = $lightbox.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
        const focusableContent = $lightbox.querySelectorAll(focusableElements);
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

    changeMedia (media) {
        this.image = media.image
        this.description = media.title
        this.photographerName = this.photographerInformations.name.split(' ')[0]
        return new MediasFactory(media).forLightbox(this.photographerInformations)
    }

    render (media) {
        this.image = media.image
        this.description = media.title
        this.photographerName = this.photographerInformations.name.split(' ')[0]
        
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `
            <button class="lightbox__close">Fermer modale</button>
            <button class="lightbox__prev">Image précédent</button>
            <button class="lightbox__next">Image suivant</button>
        `
        
        const lightBoxContainer = document.createElement('div')
        lightBoxContainer.classList.add('lightbox__container')
        lightBoxContainer.innerHTML = new MediasFactory(media).forLightbox(this.photographerInformations)
        dom.appendChild(lightBoxContainer)

        return dom
    }

}