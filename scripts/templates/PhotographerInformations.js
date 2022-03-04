class photographerInformation {
    constructor(photographer) {
        this.name = photographer.name
        this.city = photographer.city
        this.country = photographer.country
        this.tagline = photographer.tagline
        this.picture = photographer.portrait
        this.price = photographer.price
    }

    render() {
        return `
        <div class="photograph-header__informations">
            <h1 class="photograph-header__name">${this.name}</h1>
            <p class="photograph-header__location">${this.city}, ${this.country}</p>
            <p class="photograph-header__tagline">${this.tagline}</p>
        </div>
        <button id="contactBtn" class="btn btn--contact" onclick="displayModal()">Contactez-moi</button>
        <img class="photograph-header__picture" src="/assets/photographers/${this.picture}">
        `
    }

    renderBottom() {
        return `
            <span class="totalLikes">297 081 <i class="fa-solid fa-heart"></i></span>
            <span class="pricePerDay">${this.price}€ / jour</span>
        `
    }
}