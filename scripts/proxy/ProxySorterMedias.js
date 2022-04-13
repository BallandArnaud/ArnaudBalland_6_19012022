import { SorterMedias } from './SorterMedias.js'

export class ProxySorterMedias {
  constructor () {
    this.cache = new Map()
  }

  sorter (medias, sorterSelected) {
    //  Get data from cache
    if (this.cache.has(sorterSelected)) {
      return this.cache.get(sorterSelected)
    }

    const data = SorterMedias.sorter(medias, sorterSelected)

    this.cache.set(sorterSelected, data)
    return data
  }
}
