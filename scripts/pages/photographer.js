//Mettre le code JavaScript lié à la page photographer.html
class PhotographerPage {

    constructor(api) {
        this.api = api

        // Get DOM Elements
        this.$photographerInformationsWrapper = document.querySelector('.photograph-header')
        this.$filter = document.querySelector('.photograph-filter')
        this.$mediasWrapper = document.querySelector('.photograph-medias')
        this.$bottomPhotographerInformations = document.querySelector('.photograph-informations')
    }

    async init() {
        // Get the photographer ID in the URL
        const params = new URLSearchParams(window.location.search)
        this.photographerId = parseInt(params.get("id"))

        // Get the Data 
        const photographerMedias = await this.getPhotographerMedias()
        const photographerInformations = await this.getPhotographerInformations()
        
        // Create the page title
        document.title = document.title + " " + photographerInformations.name

        this.displayPhotographerInformations(photographerInformations)
        // Affichage du total de like demarrage page
        this.totalMediasLikes = photographerMedias.reduce( (acc, curr) => acc + curr.likes, 0)
        document.querySelector('.totalLikes').innerHTML = this.totalMediasLikes

        
        this.Sorter = new SorterForm(photographerMedias, photographerInformations, 'popularity')
        this.Sorter.render()
        await this.Sorter.sorterMedias();
        this.reloadAfterSorted(photographerInformations)

        // this.Sorter.onChangeSorter(this.reloadAfterSorted.bind(this))
        this.Sorter.onChangeSorter(() => {
            this.reloadAfterSorted(photographerInformations)
        })
    
        document.getElementById('contactBtn').addEventListener('click', () => {
            const modalContact = new ModalContact(photographerInformations)
            modalContact.init()
        })

    }

    reloadAfterSorted(photographerInformations) {
        const sortedMedias = this.Sorter.getSortedMedias()
        const checkboxesHeart = Array.from(document.querySelectorAll('.media__checkbox'))

        // tick the checkboxes who have been checked
        sortedMedias.forEach(media => {
            if (media.isLiked === true) {
                const currentCheckbox = checkboxesHeart.find(elt => parseInt(elt.id.split('-')[1]) === media.id)
                currentCheckbox.checked = true
            }
        })

        this.mediaListener(sortedMedias, photographerInformations)
        this.likeListener()
    }

    mediaListener(sortedMedias, photographerInformations) {

        const images = document.querySelectorAll('.media__image')
        images.forEach(image => {

            image.addEventListener('click', (e) => {
                this.openLightbox(e, sortedMedias, photographerInformations)
            })

            image.addEventListener('keyup', (e) => {
                if(e.key === 'Enter') {
                    this.openLightbox(e, sortedMedias, photographerInformations)
                }
            }) 
        })

    }

    openLightbox(event, sortedMedias, photographerInformations) {
        const mediaId = event.target.parentNode.getAttribute('data-id')
        const lightbox = new Lightbox(sortedMedias, mediaId, photographerInformations)
        lightbox.init()
    }

    // Function add listener click and keyup on all media hearts
    likeListener() {
        const hearts = document.querySelectorAll('.media__heart')
        hearts.forEach(heart => {
            heart.addEventListener('click', e => {
                e.preventDefault()
                this.likeHandler(e)
            })

            heart.addEventListener('keyup', e => {
                if(e.key === 'Enter') {
                    this.likeHandler(e)
                }
            })
        })
    }

    likeHandler(e) {
        const sortedMedias = this.Sorter.getSortedMedias()
            
        const currentHeartId = e.target.getAttribute('data-id')
        const currentElement = sortedMedias.find(elt => elt.id === parseInt(currentHeartId))
                    
        const numberLikes = Array.from(document.querySelectorAll('.numberOfLike'))
        const currentNumberLike = numberLikes.find(elt => elt.getAttribute("data-id") === currentHeartId)
        
        const checkboxs = Array.from(document.querySelectorAll('.media__checkbox'))
        const currentCheckbox = checkboxs.find(elt => elt.id.split('-')[1] === currentHeartId)

        if(!currentCheckbox.checked){
            currentElement.isLiked = true
            currentCheckbox.checked = true
            currentElement.likes++
            this.totalMediasLikes++
        } else {
            currentElement.isLiked = false
            currentCheckbox.checked = false
            currentElement.likes--
            this.totalMediasLikes--
        }

        currentNumberLike.innerHTML = currentElement.likes
        document.querySelector('.totalLikes').innerHTML = this.totalMediasLikes
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
const api = new PhotographerApi("data/photographers.json")

const photographer = new PhotographerPage(api)
photographer.init()