export class ImageCard {
  constructor (media, photographer) {
    this.media = media
    this.photographer = photographer
  }

  createElement () {
    const photographerName = this.photographer.name.split(' ')[0]

    return `
            <div class="media" data-id="${this.media.id}">
                <img class="media__image" src="assets/images/${photographerName}/${this.media.image}" alt="${this.media.title}" tabindex="0"/>
                <div class="media__caption">
                    <p class="media__description">${this.media.title}</p>
                    <p class="media__like"><span class="numberOfLike" data-id="${this.media.id}">${this.media.likes}</span></p>
                    <div>
                        <input id="heart-${this.media.id}" class="media__checkbox" type="checkbox" tabindex="-1" />
                        <label for="heart-${this.media.id}"><i class="fa-solid fa-heart media__heart" data-id="${this.media.id}" tabindex="0" aria-label="likes"></i></label>
                    </div>
                </div>
            </div>
        `
  }
}
