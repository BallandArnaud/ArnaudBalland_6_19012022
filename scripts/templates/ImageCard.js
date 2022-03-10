class ImageCard {
    constructor(media, photographer) {
        this.media = media
        this.photographer = photographer
    }

    createElement(){
        const photographerName = this.photographer.name.split(' ')[0]
        
        return `
            <div class="media" data-id="${this.media.id}">
                <img src="/assets/images/${photographerName}/${this.media.image}" tabindex="0"/>
                <div class="media__caption">
                    <p class="media__description">${this.media.title}</p>
                    <p class="media__like"><span class="numberOfLike">${this.media.likes}</span> <i class="fa-solid fa-heart"></i></p>
                </div>
                <!--<p>${this.media.date}</p>-->
            </div>
        `
    }
}