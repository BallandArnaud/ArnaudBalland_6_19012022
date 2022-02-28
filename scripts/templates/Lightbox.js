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
        this.closeLightbox()
        this.prevMedia()
        this.nextMedia()
    }

    getCurrentMediaIndex(){
        return this.medias.indexOf(this.currentMedia)
    }

    closeLightbox () {
        this.closeButton = document.querySelector('.lightbox__close')
        this.closeButton.addEventListener('click', () => {
            this.$main.removeChild(document.querySelector('.lightbox'))
        })
    }

    prevMedia () {
        this.prevButton = document.querySelector('.lightbox__prev')
        this.prevButton.addEventListener('click', () => {

            const PrevIndex = this.getCurrentMediaIndex() - 1
            
            if (PrevIndex < 0) {
                this.currentMedia = this.medias[this.medias.length - 1]

            } else {
                this.currentMedia = this.medias[PrevIndex]
            }
            document.querySelector('.lightbox__container').innerHTML = this.changeMedia(this.currentMedia)
        }) 
    }

    nextMedia () {
        this.nextButton = document.querySelector('.lightbox__next')
        this.nextButton.addEventListener('click', () => {

            const nextIndex = this.getCurrentMediaIndex() + 1
            
            if (nextIndex >= this.medias.length) {
                this.currentMedia = this.medias[0]

            } else {
                this.currentMedia = this.medias[nextIndex]
            }
            document.querySelector('.lightbox__container').innerHTML = this.changeMedia(this.currentMedia)
        })
    }

    changeMedia (media) {
        this.image = media.image
        this.description = media.title
        this.photographerName = this.photographerInformations.name.split(' ')[0]
        const newMedia = new MediasFactory(media).forLightbox(this.photographerInformations)
        return newMedia
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