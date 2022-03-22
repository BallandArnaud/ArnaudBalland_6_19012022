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

        // Get the Data 
        const photographerMedias = await this.getPhotographerMedias()
        const photographerInformations = await this.getPhotographerInformations()

        this.displayPhotographerInformations(photographerInformations)
        
        this.Sorter = new SorterForm(photographerMedias, photographerInformations, 'popularity')
        this.Sorter.render()
        await this.Sorter.sorterMedias();
        this.Sorter.onChangeSorter(this.resetEverything.bind(this))

        this.resetEverything()

        this.$mediasWrapper.addEventListener('click', (e) => {
            this.listenerFunction(e, photographerInformations)
        })

        this.$mediasWrapper.addEventListener('keyup', (e) => {
            this.listenerFunction(e, photographerInformations)
        })
        
        // Affichage du total de like demarrage page
        this.totalMediasLikes = photographerMedias.reduce( (acc, curr) => acc + curr.likes, 0)
        document.querySelector('.totalLikes').innerHTML = this.totalMediasLikes
    
        document.getElementById('contactBtn').addEventListener('click', () => {
            const modalContact = new ModalContact(photographerInformations)
            modalContact.init()
        })

    }

    resetEverything() {
        console.log('reset après le tri')
        const sortedMedias = this.Sorter.getSortedMedias()
        const checkboxsHeart = Array.from(document.querySelectorAll('.checkbox-heart'))

        sortedMedias.forEach(media => {
            if (media.isliked !== undefined || media.isLiked === true) {
                const currentCheckbox = checkboxsHeart.find(elt => parseInt(elt.id.split('-')[1]) === media.id)
                currentCheckbox.checked = true
            }
        })

        const $hearts = this.$mediasWrapper.querySelectorAll('.fa-heart')

        $hearts.forEach(heart => heart.addEventListener('click', (e) => {
            this.likeHandler(e)
        }))
    }

    likeHandler(e) {
        const sortedMedias = this.Sorter.getSortedMedias()
            
        const currentElementIdClick = e.target.getAttribute('data-id')
        const currentElementClick = sortedMedias.find(elt => elt.id === parseInt(currentElementIdClick))
                    
        const likesArray = Array.from(document.querySelectorAll('.numberOfLike'))
        const numberLikeToChange = likesArray.find(elt => elt.getAttribute("data-id") === currentElementIdClick)
        
        const checkboxsArray = Array.from(document.querySelectorAll('.checkbox-heart'))
        const checkboxClicked = checkboxsArray.find(elt => elt.id.split('-')[1] === currentElementIdClick)

        // console.log(sortedMedias)
        // console.log(currentElementClick)

        if(!checkboxClicked.checked){
            currentElementClick.isLiked = true
            checkboxClicked.checked = true
            currentElementClick.likes++
            this.totalMediasLikes++
        } else {
            currentElementClick.isLiked = false
            checkboxClicked.checked = false
            currentElementClick.likes--
            this.totalMediasLikes--
        }

        numberLikeToChange.innerHTML = currentElementClick.likes
        document.querySelector('.totalLikes').innerHTML = this.totalMediasLikes
    }

    listenerFunction(e, photographerInformations) {
        e.stopPropagation()

        const sortedMedias = this.Sorter.getSortedMedias()

        // console.log(e)
        // console.log(sortedMedias)
        // console.log(photographerInformations)

        if(e.target && e.target.classList.contains("media__image")
        && (e.type == "click" || e.key == "Enter")) {
            const mediaId = e.target.parentNode.getAttribute('data-id')
            const lightbox = new Lightbox(sortedMedias, mediaId, photographerInformations)
            lightbox.init()
        }

        if(e.target && e.target.classList.contains("fa-heart")
        && (e.type == "click" || e.key == "Enter")) {
            console.log("click coeur")
            this.likeHandler(e)
        }
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