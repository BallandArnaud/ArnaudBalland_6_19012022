class HomePage {

    constructor() {
        this.$photographerWrapper = document.querySelector(".photographer_section")
        this.photographersApi = new PhotographerApi("/data/photographers.json")
    }

    async main() {
        const photographers = await this.photographersApi.getPhotographers()

        const photographersDomElements = photographers.map((photographer) => {
            const photographerModel = photographerFactory(photographer);
            return photographerModel.getUserCardDOM();
        });
    
        this.$photographerWrapper.innerHTML = photographersDomElements.join('')
    }
}

const app = new HomePage()
app.main()