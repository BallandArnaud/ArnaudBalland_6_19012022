 class Lightbox {

    constructor (photographerMedias, mediaId, photographerInformations) {
        this.medias = photographerMedias
        this.mediaId = parseInt(mediaId)
        this.photographerInformations = photographerInformations
        this.$main = document.getElementById('main')
    }

    init () {
        this.currentMedia = this.medias.find(media => media.id === this.mediaId)
        this.$main.appendChild(this.render(this.currentMedia))

        document.querySelector('.lightbox__close').addEventListener('click', (e) => {
            this.closeLightbox()
            window.removeEventListener('keyup', this.keyboardHandler)
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