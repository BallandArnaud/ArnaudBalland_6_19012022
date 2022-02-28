class ImageCard {
    constructor(media, photographer) {
        this.media = media
        this.photographer = photographer
    }

    createElement(){
        const photographerName = this.photographer.name.split(' ')[0]
        
        return `
            <div class="media" data-id="${this.media.id}">
                <img src="/assets/images/${photographerName}/${this.media.image}" />
                <p><span class="media__description">${this.media.title}</span> - ${this.media.likes} <i class="fa-solid fa-heart"></i></p>
                <p>${this.media.date}</p>
            </div>
        `
    }
}