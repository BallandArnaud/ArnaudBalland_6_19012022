class ImageCard {
    constructor(media, photographer) {
        this.media = media
        this.photographer = photographer
    }

    createElement(){
        const photographerName = this.photographer.name.split(' ')[0]
        
        return `
            <div>
                <img src="/assets/images/${photographerName}/${this.media.image}" />
                <p>${this.media.title} - ${this.media.likes} likes</p>
                <p>${this.media.date}</p>
            </div>
        `
    }
}