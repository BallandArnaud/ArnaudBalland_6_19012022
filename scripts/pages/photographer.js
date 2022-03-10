//Mettre le code JavaScript lié à la page photographer.html
class PhotographerPage {

    constructor(api) {
        this.api = api

        // Get DOM Elements
        this.$photographerInformationsWrapper = document.querySelector('.photograph-header')
        this.$mediasWrapper = document.querySelector('.photograph-medias')
        this.$filter = document.querySelector('.photograph-filter')
        this.$bottomPhotographerInformations = document.querySelector('.photograph-informations')
    }

    async init() {
        // Get the photographer ID in the URL
        const params = new URLSearchParams(window.location.search)
        this.photographerId = parseInt(params.get("id"),10)

        const photographerMedias = await this.getPhotographerMedias()
        const photographerInformations = await this.getPhotographerInformations()

        this.displayPhotographerInformations(photographerInformations)
        
        const Sorter = new SorterForm(photographerMedias, photographerInformations, 'popularity')
        Sorter.render()
        await Sorter.sorterMedias();

        this.$mediasWrapper.addEventListener('click', e => {
            const sortedMedias = Sorter.getSortedMedias()
            if(e.target && e.target.parentNode.classList.contains("media")) {
                const mediaId = e.target.parentNode.getAttribute('data-id')
                const lightbox = new Lightbox(sortedMedias, mediaId, photographerInformations)
                lightbox.init()
                document.querySelector('.lightbox').focus()
            }
        })

        // Affichage du total de like demarrage page
        let totalLikes = 0
        for(let i = 0 ; i < photographerMedias.length; i++){
            totalLikes += photographerMedias[i].likes
        }
        document.querySelector('.totalLikes').innerHTML = totalLikes
        
        // Lorsque l'on clique sur les btn like
        this.$mediasWrapper.querySelectorAll('.fa-heart').forEach(heart => heart.addEventListener('click', e => {
            const sortedMedias = Sorter.getSortedMedias()
            const currentElementIdClick = e.target.parentNode.parentNode.parentNode.getAttribute('data-id')
            const currentElementClick = sortedMedias.find(elt => elt.id === parseInt(currentElementIdClick))
            const numberOfLikeElement = e.target.previousElementSibling

            currentElementClick.likes += 1
            numberOfLikeElement.innerHTML = currentElementClick.likes
            totalLikes++
            document.querySelector('.totalLikes').innerHTML = totalLikes
        }))

        document.getElementById('contactBtn').addEventListener('click', () => {
            const modalContact = new ModalContact(photographerInformations)
            modalContact.init()
        })
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
    async displayPhotographerInformations(photographerInformations) {
        this.$photographerInformationsWrapper.innerHTML = new photographerInformation(photographerInformations).render()
        this.$bottomPhotographerInformations.innerHTML = new photographerInformation(photographerInformations).renderBottom()
    }

}

// Get Json Data
const api = new PhotographerApi("/data/photographers.json")

const photographer = new PhotographerPage(api)
photographer.init()