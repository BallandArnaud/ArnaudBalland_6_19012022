function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        return  `
            <article class="card-photographer">
                <a class="card-photographer__link" href="/photographer.html?id=${data.id}">
                    <img
                        class="card-photographer__image"
                        src="assets/photographers/${data.portrait}"
                    />
                    <h2 class="card-photographer__name">${data.name}</h2>
                </a>
                <p class="card-photographer__location">${data.city}, ${data.country}</p>
                <p class="card-photographer__slogan">${data.tagline}</p>
                <p class="card-photographer__pricePerDay">${data.price}€/jour</p>
            </article>
        `
    }

    return {getUserCardDOM }
}