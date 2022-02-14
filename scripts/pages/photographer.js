//Mettre le code JavaScript lié à la page photographer.html
class PhotographerPage {

    constructor(api) {
        this.api = api

        // Get DOM Elements
        this.$photographerInformationsWrapper = document.querySelector('.photograph-header')
        this.$mediasWrapper = document.querySelector('.photograph-medias')
        this.$filter = document.querySelector('.filter')
    }

    async init() {
        // Get the photographer ID in the URL
        const params = new URLSearchParams(window.location.search)
        this.photographerId = parseInt(params.get("id"),10)

        this.displayPhotographerInformations()
        this.getPhotographerMedias()
        this.displayPhotographerMedias()

        

        const Sorter = new SorterForm(await this.getPhotographerMedias(), await this.getPhotographerInformations())
        Sorter.render()
        
    }

    // Function to get all informations of the chosen photographer
    async getPhotographerInformations() {
        const photographers = await this.api.getPhotographers()

        return photographers.find(photographer => photographer.id === this.photographerId)
    }

    // Function to get all medias of the chosen photographer
    async getPhotographerMedias() {
        const medias = await this.api.getMedias()

        return medias.filter(media => media.photographerId == this.photographerId)
    }

    // Function diplay all informations of the chosen photographer
    async displayPhotographerInformations() {
        const informations = await this.getPhotographerInformations()

        this.$photographerInformationsWrapper.innerHTML = new photographerInformation(informations).render()
    }

    // Function diplay all medias of the chosen photographer
    async displayPhotographerMedias() {
        const medias = await this.getPhotographerMedias()
        const photographerInfos = await this.getPhotographerInformations()

        this.$mediasWrapper.innerHTML = medias
        .map(media => new MediasFactory(media).forPhotographer(photographerInfos))
        .join('')
    }
}

// Get Json Data
const api = new PhotographerApi("/data/photographers.json")

const photographer = new PhotographerPage(api)
photographer.init()