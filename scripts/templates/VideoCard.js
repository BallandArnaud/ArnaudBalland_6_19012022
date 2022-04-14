export class VideoCard {
  constructor (media, photographer) {
    this.media = media
    this.photographer = photographer
  }

  createElement () {
    const photographerName = this.photographer.name.split(' ')[0]

    return `
            <div class="media" data-id="${this.media.id}">
                <video class="media__image" tabindex="0">
                    <source src="assets/images/${photographerName}/${this.media.video}" type="video/webm">
                    <source src="assets/images/${photographerName}/${this.media.video}" type="video/mp4">
                    Sorry, your browser doesn't support embedded videos.
                </video>
                <div class="media__caption">
                    <p class="media__description">${this.media.title}</p>
                    <p class="media__like"><span class="numberOfLike" data-id="${this.media.id}">${this.media.likes}</span></p>
                    <div>
                        <input id="heart-${this.media.id}" class="media__checkbox" type="checkbox" tabindex="-1"/>
                        <label for="heart-${this.media.id}"><i class="fa-solid fa-heart media__heart" data-id="${this.media.id}" tabindex="0" aria-label="likes"></i></label>
                    </div>
                </div>
            </div>
        `
  }
}
