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

    this.eventHandler = e => this.keyboardHandler(e)
    document.addEventListener('keyup', this.eventHandler, false)

    document.querySelector('.lightbox__close').addEventListener('click', (e) => {
      this.closeLightbox()
      document.removeEventListener('keyup', this.keyboardHandler)
    })

    document.querySelector('.lightbox__close').addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.closeLightbox()
        this.focusOnLastMediaSeen()
        document.removeEventListener('keyup', this.keyboardHandler)
      }
    })

    document.querySelector('.lightbox__prev').addEventListener('click', () => {
      this.prevMedia()
    })

    document.querySelector('.lightbox__next').addEventListener('click', () => {
      this.nextMedia()
    })

    this.focusHandler()
  }

  getCurrentMediaIndex () {
    return this.medias.indexOf(this.currentMedia)
  }

  closeLightbox () {
    document.removeEventListener('keyup', this.eventHandler)
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

  changeMedia (media) {
    this.image = media.image
    this.description = media.title
    this.photographerName = this.photographerInformations.name.split(' ')[0]
    return new MediasFactory(media).forLightbox(this.photographerInformations)
  }

  keyboardHandler (event) {
    // event.preventDefault()
    switch (event.key) {
      case 'ArrowLeft':
        this.prevMedia()
        break
      case 'ArrowRight':
        this.nextMedia()
        break
      case 'Escape':
        this.closeLightbox()
        this.focusOnLastMediaSeen()
        break
      default:
    }
  }

  // Get the last media seen and redirect the focus on the last media in the photographer page
  focusOnLastMediaSeen () {
    const currentImage = document.querySelector("[data-id='" + this.currentMedia.id + "']").childNodes[1]
    currentImage.focus()
  }

  // Keep the focus in the lightbox
  focusHandler () {
    const focusableElements = 'button, span.lightbox__close, [tabindex]:not([tabindex="-1"])'
    const $lightbox = document.querySelector('.lightbox') // select the modal by it's id

    const firstFocusableElement = $lightbox.querySelectorAll(focusableElements)[0] // get first element to be focused inside modal
    const focusableContent = $lightbox.querySelectorAll(focusableElements)
    const lastFocusableElement = focusableContent[focusableContent.length - 1] // get last element to be focused inside modal

    lastFocusableElement.focus()

    document.addEventListener('keydown', function (e) {
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

  render (media) {
    const dom = document.createElement('div')
    dom.classList.add('lightbox')
    dom.innerHTML = `
            <span class="lightbox__close" aria-label="Fermer modale" tabindex="0"></span>
            <button class="lightbox__prev" aria-label="Image précédente">Image précédente</button>
            <button class="lightbox__next" aria-label="Image suivante">Image suivante</button>
        `

    const lightBoxContainer = document.createElement('div')
    lightBoxContainer.classList.add('lightbox__container')
    lightBoxContainer.innerHTML = new MediasFactory(media).forLightbox(this.photographerInformations)

    dom.appendChild(lightBoxContainer)
    return dom
  }
}
