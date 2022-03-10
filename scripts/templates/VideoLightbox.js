class VideoLightbox {
    constructor(media, photographer) {
        this.media = media
        this.photographer = photographer
    }

    createElement(){
        const photographerName = this.photographer.name.split(' ')[0]

        return `
            <video controls tabindex="0">
                <source src="/assets/images/${photographerName}/${this.media.video}" type="video/webm">
                <source src="/assets/images/${photographerName}/${this.media.video}" type="video/mp4">
                Sorry, your browser doesn't support embedded videos.
            </video>
            <p class="lightbox__description">${this.media.title}</p>
            `
    }

}