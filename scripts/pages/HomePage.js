import { PhotographerApi } from '../api/Api.js'
import { PhotographerFactory } from '../factories/PhotographerFactory.js'

class HomePage {
  constructor () {
    this.$photographerWrapper = document.querySelector('.photographer_section')
    this.photographersApi = new PhotographerApi('data/photographers.json')
  }

  async init () {
    const photographers = await this.photographersApi.getPhotographers()

    const photographersDomElements = photographers.map((photographer) => {
      const photographerModel = new PhotographerFactory(photographer)
      return photographerModel.createUserCard()
    })

    this.$photographerWrapper.innerHTML = photographersDomElements.join('')
  }
}

const app = new HomePage()
app.init()
