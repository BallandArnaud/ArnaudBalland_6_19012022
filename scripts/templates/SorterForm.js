class SorterForm {
    constructor(medias, photographerInfos) {
        this.medias = medias
        this.photographerInfos = photographerInfos
        this.$sorterFormWrapper = document.querySelector('.filter')
        this.$mediasWrapper = document.querySelector('.photograph-medias')

        this.ProxySorter = new ProxySorterMedias()
    }

    async sorterMedias(sorter) {
        this.clearMediasWrapper()

        // Check if sorter is not empty or null and the value can be a true value
        if(!!sorter) {

            // const sortedMedias = SorterMedias.sorter(this.medias, sorter)
            const sortedMedias = this.ProxySorter.sorter(this.medias, sorter)
            
            this.$mediasWrapper.innerHTML = sortedMedias
                .map(media => new MediasFactory(media).forPhotographer(this.photographerInfos))
                .join('')
                
        } else {
            console.log('erreur sorter is False')
        }
    }

    onChangeSorter() {
        this.$sorterFormWrapper.addEventListener('change', e => {
            const sorterSelected = e.target.value
            this.sorterMedias(sorterSelected)
        })
    }

    clearMediasWrapper() {
        this.$mediasWrapper.innerHTML = ''
    }

    render() {
        const sorterForm = `
            <label for="media-filter">Trier par</label>
            <select name="filter" id="media-filter">
                <option value="popularity">Popularité</option>
                <option value="date">Date</option>
                <option value="title">Titre</option>
            </select>
        `
        this.onChangeSorter()
        this.$sorterFormWrapper.innerHTML = sorterForm
    }
}