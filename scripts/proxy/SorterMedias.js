class SorterMedias {

    static sorter(medias, sorterSelected) {
        console.log('get from file JSON')
        console.log(medias)

        switch (sorterSelected) {
            case 'popularity' :
                return medias.sort(function(a, b){return a.likes - b.likes})

            case 'date' :
                return medias.sort(function(a,b){return Date.parse(a.date) - Date.parse(b.date)})

            case 'title' :
                return medias.sort((a, b) => a.title.localeCompare(b.title))

        }
    }
}