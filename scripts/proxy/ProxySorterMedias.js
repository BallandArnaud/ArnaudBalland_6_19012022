class ProxySorterMedias {

    constructor() {
        this.cache = new Map()
    }

    sorter(medias, sorterSelected) {
        if(this.cache.has(sorterSelected)) {
            console.log('get from cache')
            return this.cache.get(sorterSelected)
        }

        const data = SorterMedias.sorter(medias, sorterSelected)

        this.cache.set(sorterSelected, data)
        return data
    }
}