class VideoCard {
    constructor(media, photographer) {
        this.media = media
        this.photographer = photographer
    }

    createElement(){
        const photographerName = this.photographer.name.split(' ')[0]

        return `
            <div>
                <video width="250">
                    <source src="/assets/images/${photographerName}/${this.media.video}" type="video/webm">
                    <source src="/assets/images/${photographerName}/${this.media.video}" type="video/mp4">
                    Sorry, your browser doesn't support embedded videos.
                </video>
                <p>${this.media.title} - ${this.media.likes} likes</p>
            </div>
        `
    }

}