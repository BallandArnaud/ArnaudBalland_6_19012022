class Api {
  constructor (url) {
    this.url = url
  }

  async get () {
    return fetch(this.url)
      .then(res => res.json())
      .catch(err => console.log('Error : ', err))
  }
}

export class PhotographerApi extends Api {
  constructor (url) {
    super(url)
  }

  async getPhotographers () {
    return this.get()
      .then(res => res.photographers)
  }

  async getMedias () {
    return this.get()
      .then(res => res.media)
  }
}
