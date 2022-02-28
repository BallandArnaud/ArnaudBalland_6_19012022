class ProxySorterMedias {

    constructor() {
        this.cache = new Map()
    }

    sorter(medias, sorterSelected) {
        // console.log({sorterSelected})
        if(this.cache.has(sorterSelected)) {
            console.log('Data get from cache')
            return this.cache.get(sorterSelected)
        }

        const data = SorterMedias.sorter(medias, sorterSelected)

        this.cache.set(sorterSelected, data)
        return data
    }
}