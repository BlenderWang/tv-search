const searchBtn = document.querySelector('.search-icon')
const searchField = document.querySelector('.search-field')
const resDisplay = document.querySelector('.resDisplay')

function searchTv() {
    fetch(`http://api.tvmaze.com/singlesearch/shows?q=${searchField.value}&embed=episodes`)
        .then(blob => blob.json())
        .then(data => {
            const episodes = data["_embedded"].episodes // arrary
            // console.log(episodes);
            const accordion = document.createElement('div')
            accordion.classList.add('episode-list', 'hide', 'accordion')
            const accordionList = document.createElement('ul')
            accordionList.classList.add('accordion-list')
            accordion.appendChild(accordionList)

            accordionList.innerHTML = episodes.map(episode => `
                    <li class="accordion-item">
                        <a href="#" class="accordion-title">
                            <span class="ep">Season ${episode.season} Episode ${episode.number}</span>
                        </a>
                        <div class="ep-content">
                            ${episode.image ? `<img src="${episode.image.medium}" alt="">` : ''}
                            <h4 class="name">${episode.name}</h4>
                        </div>
                    </li>
                `
            ).join('')

            const showBorder = document.createElement('div')
            showBorder.classList.add('showBorder')
            showBorder.innerHTML = `
                ${data.image ? `<img src="${data.image.medium}">` : ''}
                <h2 class="name">${data.name}</h2>
                ${data.rating.average ? `<p class="rating">Rating: <span>${data.rating.average}</span></p>` : ''}
                <br>
                <button type="button" class="show-episodes">Details</button>
            `
            showBorder.appendChild(accordion)
            resDisplay.appendChild(showBorder)

            const showBtn = document.querySelector('.show-episodes')
            showBtn.addEventListener('click', () => {
                accordion.classList.toggle('hide')
            })

            const accordionTitles = accordionList.querySelectorAll('.accordion-title')
            for (let i = 0; i < accordionTitles.length; i++) {
                accordionTitles[i].addEventListener('click', toggleContent);
            }
        })
        .catch(err => console.log(err))
}

function toggleContent(e) {
    e.preventDefault()
    const content = this.parentNode.querySelector('.ep-content')
    const contents = this.parentNode.parentNode.querySelectorAll('.ep-content')

    for(let i = 0; i < contents.length; i++) {
        const isActive = contents[i].classList.contains('is-active')
        const isSame = !(contents[i] === content)

        if(isActive && isSame) contents[i].classList.remove('is-active')
    }
    content.classList.toggle('is-active')
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    searchTv()
})