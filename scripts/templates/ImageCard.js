class ImageCard {
    constructor(media, photographer) {
        this.media = media
        this.photographer = photographer
    }

    createElement(){
        const photographerName = this.photographer.name.split(' ')[0]
        
        return `
            <div class="media" data-id="${this.media.id}">
                <img class="media__image" src="/assets/images/${photographerName}/${this.media.image}" tabindex="0"/>
                <div class="media__caption">
                    <p class="media__description">${this.media.title}</p>
                    <p class="media__like"><span class="numberOfLike" data-id="${this.media.id}">${this.media.likes}</span></p>
                    <div>
                        <input id="heart-${this.media.id}" class="checkbox-heart" type="checkbox"/>
                        <label for="heart-${this.media.id}"><i class="fa-solid fa-heart heart" data-id="${this.media.id}" tabindex="0"></i></label>
                    </div>
                </div>
                <!--<p>${this.media.date}</p>-->
            </div>
        `
    }
}