class MediasFactory {
    constructor(media) {
        this.media = media
    }

    forPhotographer(photographer) {
        
        if(this.media.image){
            return new ImageCard(this.media, photographer).createElement()
        } else if (this.media.video){
            return new VideoCard(this.media, photographer).createElement()
        } else {
            throw 'Unknown type format'
        }
    }

}