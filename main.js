const searchBtn = document.querySelector('.search-icon')
const searchField = document.querySelector('.search-field')
const resDisplay = document.querySelector('.resDisplay')

function searchTv() {
    fetch(`http://api.tvmaze.com/singlesearch/shows?q=${searchField.value}&embed=episodes`)
        .then(blob => blob.json())
        .then(data => {
            const episodes = data["_embedded"].episodes
            const list = document.createElement('div')
            list.classList.add('episode-list')
            list.innerHTML = episodes.map(episode => `
                <div class="item">
                    <h5>S${episode.season} Ep${episode.number}</h5>
                    ${episode.image ? `<img src="${episode.image.medium}" alt="">` : ''}
                    <h4 class="name">${episode.name}</h4>
                </div>
                `
            ).join('')
            const showBorder = document.createElement('div')
            showBorder.classList.add('showBorder')
            showBorder.innerHTML = `
                ${data.image ? `<img src="${data.image.medium}">` : ''}
                <h2 class="name">${data.name}</h2>
                ${data.rating.average ? `<p class="rating">Rating: <span>${data.rating.average}</span></p>` : ''}
                <br>
            `
            showBorder.appendChild(list)
            resDisplay.appendChild(showBorder)
        })
        .catch(err => console.log(err))
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    searchTv()
})
