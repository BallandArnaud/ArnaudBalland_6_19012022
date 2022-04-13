export class PhotographerFactory {
  constructor (data) {
    this.name = data.name
    this.portrait = data.portrait
    this.id = data.id
    this.city = data.city
    this.country = data.country
    this.tagline = data.tagline
    this.price = data.price

    this.picture = `assets/photographers/${this.portrait}`
  }

  createUserCard () {
    return `
            <article class="card-photographer">
                <a class="card-photographer__link" href="photographer.html?id=${this.id}">
                    <img
                        class="card-photographer__image"
                        src="${this.picture}"
                    />
                    <h2 class="card-photographer__name">${this.name}</h2>
                </a>
                <p class="card-photographer__location">${this.city}, ${this.country}</p>
                <p class="card-photographer__slogan">${this.tagline}</p>
                <p class="card-photographer__pricePerDay">${this.price}€/jour</p>
            </article>
        `
  }
}
