class SorterForm {

    constructor(medias, photographerInfos, sortValue) {
        this.medias = medias
        this.photographerInfos = photographerInfos
        this.sortValue = sortValue
        
        this.$sorterFormWrapper = document.querySelector('.photograph-filter')
        this.$mediasWrapper = document.querySelector('.photograph-medias')

        this.ProxySorter = new ProxySorterMedias()
    }

    getSortedMedias() {
        return this.sortedMedias;
    }

    async sorterMedias() {
        this.sortedMedias = this.ProxySorter.sorter(this.medias, this.sortValue)
        
        this.$mediasWrapper.innerHTML = this.sortedMedias
            .map(media => new MediasFactory(media).forPhotographer(this.photographerInfos))
            .join('')
    }

    onChangeSorter(callback) {
        this.$sorterFormWrapper.addEventListener('change', e => {
            const sorterSelected = e.target.value
            this.sortValue = sorterSelected
            this.sorterMedias()
            callback()
        })
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
        //this.onChangeSorter()
        this.$sorterFormWrapper.innerHTML = sorterForm
    }
}