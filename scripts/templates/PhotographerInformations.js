export class PhotographerInformation {
  constructor (photographer) {
    this.name = photographer.name
    this.city = photographer.city
    this.country = photographer.country
    this.tagline = photographer.tagline
    this.picture = photographer.portrait
    this.price = photographer.price
  }

  renderHeader () {
    return `
        <div class="photograph-header__informations">
            <h1 class="photograph-header__name" tabindex="0">${this.name}</h1>
            <p class="photograph-header__location" tabindex="0">${this.city}, ${this.country}</p>
            <p class="photograph-header__tagline">${this.tagline}</p>
        </div>
        <button id="contactBtn" class="btn btn--contact" tabindex="0">Contactez-moi</button>
        <img class="photograph-header__picture" src="assets/photographers/${this.picture}" alt="Photo de profil de ${this.name}" tabindex="0">
        `
  }

  renderBottom () {
    return `
            <div class="likes"><span class="totalLikes"></span><i class="fa-solid fa-heart"></i></div>
            <span class="pricePerDay">${this.price}€ / jour</span>
        `
  }
}
