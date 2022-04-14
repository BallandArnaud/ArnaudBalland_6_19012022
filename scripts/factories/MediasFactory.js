import { ImageCard } from '../templates/ImageCard.js'
import { VideoCard } from '../templates/VideoCard.js'
import { ImageLightbox } from '../templates/ImageLightbox.js'
import { VideoLightbox } from '../templates/VideoLightbox.js'

export class MediasFactory {
  constructor (media) {
    this.media = media
  }

  forPhotographer (photographer) {
    if (this.media.image) {
      return new ImageCard(this.media, photographer).createElement()
    } else if (this.media.video) {
      return new VideoCard(this.media, photographer).createElement()
    } else {
      throw new Error('Unknown type format')
    }
  }

  forLightbox (photographer) {
    if (this.media.image) {
      return new ImageLightbox(this.media, photographer).createElement()
    } else if (this.media.video) {
      return new VideoLightbox(this.media, photographer).createElement()
    } else {
      throw new Error('Unknown type format')
    }
  }
}
