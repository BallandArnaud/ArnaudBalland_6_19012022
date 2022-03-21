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

        // function resetEverything() {
        //     console.log('reset après le tri')
        //     const test = $photographerMedias.querySelectorAll('.fa-heart')
        //     console.log(test)
        //     test.forEach(heart => heart.addEventListener('click', (e) => {
        //         console.log(e.target)

        //         this.likeFunction(e)
        //         // const sortedMedias = Sorter.getSortedMedias()
            
        //         // const currentElementIdClick = e.target.getAttribute('data-id')
        //         // const currentElementClick = sortedMedias.find(elt => elt.id === parseInt(currentElementIdClick))
                            
        //         // const likes = document.querySelectorAll('.numberOfLike')
        //         // const likeArray = Array.from(likes)
        //         // const numberLikeToChange = likeArray.find(elt => elt.getAttribute("data-id") === currentElementIdClick)
                
        //         // const checkboxs = document.querySelectorAll('.checkbox-heart')
        //         // const checkboxArray = Array.from(checkboxs)
        //         // const checkboxClicked = checkboxArray.find(elt => elt.id.split('-')[1] === currentElementIdClick)

        //         // if(!checkboxClicked.checked){
        //         //     currentElementClick.isLiked = true
        //         //     currentElementClick.likes++
        //         //     totalMediasLikes++
        //         // } else {
        //         //     currentElementClick.isLiked = false
        //         //     currentElementClick.likes--
        //         //     totalMediasLikes--
        //         // }

        //         // numberLikeToChange.innerHTML = currentElementClick.likes
        //         // document.querySelector('.totalLikes').innerHTML = totalMediasLikes
        //     }))
        // }

        // const listenerFunction = function (e) {
            
        //     e.stopPropagation()

        //     const sortedMedias = this.Sorter.getSortedMedias()
        //     // console.log(e)
        //     // console.log(sortedMedias)

        //     if(e.target && e.target.classList.contains("media__image")
        //     && (e.type == "click" || e.key == "Enter")) {
        //         const mediaId = e.target.parentNode.getAttribute('data-id')
        //         const lightbox = new Lightbox(sortedMedias, mediaId, photographerInformations)
        //         lightbox.init()
        //     }

        //     if(e.target && e.target.classList.contains("fa-heart")
        //     && (e.type == "click" || e.key == "Enter")) {
        //         console.log("click coeur")
        //     }
        // }

        // this.$mediasWrapper.addEventListener('click', listenerFunction, false)
        // this.$mediasWrapper.addEventListener('keyup', listenerFunction, false)
        
        // Affichage du total de like demarrage page
        this.totalMediasLikes = photographerMedias.reduce( (acc, curr) => acc + curr.likes, 0)
        document.querySelector('.totalLikes').innerHTML = this.totalMediasLikes
        
        
        // Lorsque l'on clique sur les btn like
        // Si case check alors +1 et si on décoche -1

        // this.$mediasWrapper.querySelectorAll('.heart').forEach(heart => heart.addEventListener('click', e => {
        //     const sortedMedias = Sorter.getSortedMedias()
            
        //     const currentElementIdClick = e.target.getAttribute('data-id')
        //     const currentElementClick = sortedMedias.find(elt => elt.id === parseInt(currentElementIdClick))
                        
        //     const likes = document.querySelectorAll('.numberOfLike')
        //     const likeArray = Array.from(likes)
        //     const numberLikeToChange = likeArray.find(elt => elt.getAttribute("data-id") === currentElementIdClick)
            
        //     const checkboxs = document.querySelectorAll('.checkbox-heart')
        //     const checkboxArray = Array.from(checkboxs)
        //     const checkboxClicked = checkboxArray.find(elt => elt.id.split('-')[1] === currentElementIdClick)

        //     if(!checkboxClicked.checked){
        //         currentElementClick.isLiked = true
        //         currentElementClick.likes++
        //         totalMediasLikes++
        //     } else {
        //         currentElementClick.isLiked = false
        //         currentElementClick.likes--
        //         totalMediasLikes--
        //     }

        //     numberLikeToChange.innerHTML = currentElementClick.likes
        //     document.querySelector('.totalLikes').innerHTML = totalMediasLikes
        // }))
    
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
            currentElementClick.likes++
            this.totalMediasLikes++
        } else {
            currentElementClick.isLiked = false
            currentElementClick.likes--
            this.totalMediasLikes--
        }

        numberLikeToChange.innerHTML = currentElementClick.likes
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
const api = new PhotographerApi("/data/photographers.json")

const photographer = new PhotographerPage(api)
photographer.init()