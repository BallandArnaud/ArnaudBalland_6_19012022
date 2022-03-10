class VideoCard {
    constructor(media, photographer) {
        this.media = media
        this.photographer = photographer
    }

    createElement(){
        const photographerName = this.photographer.name.split(' ')[0]

        return `
            <div class="media" data-id="${this.media.id}">
                <video tabindex="0">
                    <source src="/assets/images/${photographerName}/${this.media.video}" type="video/webm">
                    <source src="/assets/images/${photographerName}/${this.media.video}" type="video/mp4">
                    Sorry, your browser doesn't support embedded videos.
                </video>
                <div class="media__caption">
                    <p class="media__description">${this.media.title}</p>
                    <p class="media__like"><span class="numberOfLike">${this.media.likes}</span> <i class="fa-solid fa-heart"></i></p>
                </div>
                <!--<p>${this.media.date}</p>-->
            </div>
        `
    }

}