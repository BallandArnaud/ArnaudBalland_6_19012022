export class ImageLightbox {
    constructor(media, photographer) {
        this.media = media
        this.photographer = photographer
    }

    createElement(){
        const photographerName = this.photographer.name.split(' ')[0]
        const imageDescription = this.media.title
        return `
            <img src="assets/images/${photographerName}/${this.media.image}" alt="${imageDescription}"/>
            <p class="lightbox__description">${imageDescription}</p>
        `
    }
}