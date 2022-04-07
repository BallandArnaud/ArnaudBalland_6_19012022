class SorterForm {

    constructor(medias, photographerInfos, sortValue) {
        this.medias = medias
        this.photographerInfos = photographerInfos
        this.sortValue = sortValue
        
        this.$sorterFormWrapper = document.querySelector('.photograph-filter')
        this.$mediasWrapper = document.querySelector('.photograph-medias')

        this.ProxySorter = new ProxySorterMedias()
    }

    getSortedMedias() {
        return this.sortedMedias;
    }

    init() {
        this.render()
        this.$sorterSelected = document.querySelector('.sorter-selected')
        this.$sorterList = document.getElementById('sorter-list')
        this.sorterListOpen = false

        this.$sorterSelected.addEventListener("click", this.openSorterList.bind(this))
        this.$sorterSelected.addEventListener("keydown", this.openSorterList.bind(this))
        this.$sorterList.addEventListener("click", this.changeOrderOfTheSortList.bind(this))
    }

    closeSorterList() {
        this.$sorterSelected.setAttribute('aria-expanded', 'false')
        this.$sorterList.style.display = "none"
    }

    openSorterList(e) {

        this.$sorterSelected.setAttribute('aria-expanded', 'true')

        if(e.type === "click" || e.key ==="Enter") {
            this.$sorterList.style.display = "inline-block"
            this.sorterListOpen = true
        }
        
        if(e.key === "Enter"){
            this.focusHandler()
        }
    }

    changeOrderOfTheSortList(e) {
        const currentElement = e.target
        const parentNode = e.target.parentNode
        const FirstOptionElement = e.target.parentNode.firstElementChild
        
        if (FirstOptionElement.getAttribute('data-order') !== currentElement.getAttribute('data-order')) {
            parentNode.insertBefore(currentElement, FirstOptionElement)
            document.querySelector('.selected').textContent = currentElement.textContent
        }
        
        this.closeSorterList()
        this.sortValue = currentElement.getAttribute('data-order')
        e.stopPropagation()
    }

    focusHandler() {
        const focusableElements ='.sorter-list__item, [tabindex]:not([tabindex="-1"])';
        const modal = this.$sorterList; // select the modal by it's id
      
        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
        
        firstFocusableElement.focus();

        modal.addEventListener('keydown', (e) => {
            this.catchFocus(e)           
        })

        // modal.removeEventListener('keydown', this.catchFocus)
    }

    catchFocus(e) {
        const focusableElements ='.sorter-list__item, [tabindex]:not([tabindex="-1"])';
        const modal = this.$sorterList; // select the modal by it's id
      
        const focusableContent = modal.querySelectorAll(focusableElements);
        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
        const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        let isTabPressed = e.key === 'Tab'
        console.log( firstFocusableElement)

        if(e.key === 'Enter') {
            this.changeOrderOfTheSortList(e)
            this.$sorterSelected.focus()
        }

        if(this.sorterListOpen && e.key === "Escape") {
            this.closeSorterList()
            this.sorterListOpen = false
            this.$sorterSelected.focus()
        }
        
        if (!isTabPressed) {
            return
        }
    
        if (e.shiftKey) { // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus() // add focus for the last focusable element
                e.preventDefault()
            }
        } else { // if tab key is pressed
            if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus() // add focus for the first focusable element
                e.preventDefault()
            }
        }
    }

    async sortMedias() {
        this.sortedMedias = this.ProxySorter.sorter(this.medias, this.sortValue)
        
        this.$mediasWrapper.innerHTML = this.sortedMedias
            .map(media => new MediasFactory(media).forPhotographer(this.photographerInfos))
            .join('')
    }

    modifiedSort(callback) {
        let $firstItem = document.querySelector('.sorter-list ul').firstElementChild

        this.$sorterList.addEventListener('click', e => {
            if(e.target !== $firstItem){
                $firstItem = document.querySelector('.sorter-list ul').firstElementChild
                // console.log(e)
                this.sortValue = e.target.getAttribute('data-order')
                this.sortMedias()
                callback()
            }
        })

        this.$sorterList.addEventListener('keydown', e => {
            $firstItem = document.querySelector('.sorter-list ul').firstElementChild
            if(e.key === "Enter" && e.target !== $firstItem) {
                // console.log(e)
                this.sortValue = e.target.getAttribute('data-order')
                this.sortMedias()
                callback()
            }
        })
    }

    render() {
        const sorterForm = `
            <p class="filter-label">Trier par</p>
            <div class="sorter">
                <div tabindex="0" class="sorter-selected" aria-haspopup="true" aria-expanded="false">
                    <span class="selected">Populaire</span>
                    <i class="fa-solid fa-angle-down sorter-arrow"></i>
                </div>
                <div id="sorter-list" class="sorter-list">
                    <ul id="sorter-menu" aria-labelledby="menubutton">
                    <li role="menuitem" class="sorter-list__item" data-order="popularity" tabindex="0">Populaire</li>
                    <li role="menuitem" class="sorter-list__item" data-order="date" tabindex="0">Date</li>
                    <li role="menuitem" class="sorter-list__item" data-order="title" tabindex="0">Titre</li>
                    </ul>
                    <i class="fa-solid fa-angle-up sorter-arrow"></i>
                </div>
            </div>
        `
        this.$sorterFormWrapper.innerHTML = sorterForm
    }
}