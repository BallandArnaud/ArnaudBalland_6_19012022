class VideoCard {
    constructor(media, photographer) {
        this.media = media
        this.photographer = photographer
    }

    createElement(){
        const photographerName = this.photographer.name.split(' ')[0]

        return `
            <div class="media" data-id="${this.media.id}">
                <video>
                    <source src="/assets/images/${photographerName}/${this.media.video}" type="video/webm">
                    <source src="/assets/images/${photographerName}/${this.media.video}" type="video/mp4">
                    Sorry, your browser doesn't support embedded videos.
                </video>
                <p><span class="media__description">${this.media.title}</span> - ${this.media.likes} <i class="fa-solid fa-heart"></i></p>
                <p>${this.media.date}</p>
            </div>
        `
    }

}