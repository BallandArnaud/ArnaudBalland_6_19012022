class Api {
    constructor(url) {
        this.url = url
    }

    async get() {
        return fetch(this.url)
            .then(res => res.json())
            .catch(err => console.log('Error : ', err))
    }
}


class PhotographerApi extends Api {
    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        return await this.get()
        .then(res => res.photographers) 
    }

    async getMedias() {
        return await this.get()
        .then(res => res.media)
    }
}