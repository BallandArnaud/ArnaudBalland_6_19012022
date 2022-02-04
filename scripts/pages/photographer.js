//Mettre le code JavaScript lié à la page photographer.html

class PhotographerPage {
    constructor(api) {
        this.api = api

        // Get DOM Elements
        this.$mediasWrapper = document.querySelector('.photograph-medias')
        this.$photographerInformationsWrapper = document.querySelector('.photograph-header')
        this.$photographerName = document.querySelector('.photograph-header__name')
        this.$photographerLocation = document.querySelector('.photograph-header__location')
        this.$photographerTagline = document.querySelector('.photograph-header__tagline')
    }

    async init() {
        // Get the photographer ID in the URL
        const params = new URLSearchParams(window.location.search)
        this.photographerId = parseInt(params.get("id"),10)

        this.getPhotographerMedias()
        this.displayPhotographerInformations()
        this.displayPhotographerMedias()
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
    async displayPhotographerInformations(){
        const informations = await this.getPhotographerInformations()

        this.$photographerName.innerHTML = informations.name
        this.$photographerLocation.innerHTML = informations.city + ", " + informations.country
        this.$photographerTagline.innerHTML = informations.tagline
        
        const picture = document.createElement('img')
        picture.classList.add('photograph-header__picture')
        picture.src = '/assets/photographers/' + informations.portrait
        this.$photographerInformationsWrapper.appendChild(picture)
    }

    // Function diplay all medias of the chosen photographer
    async displayPhotographerMedias(){
        const medias = await this.getPhotographerMedias()
        const photographInfos = await this.getPhotographerInformations()

        this.$mediasWrapper.innerHTML = medias
        .map(media => new MediasFactory(media).forPhotographer(photographInfos))
        .join('')
    }

}


// Get Json Data
const api = new PhotographerApi("/data/photographers.json")

const photographer = new PhotographerPage(api)
photographer.init()