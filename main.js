const searchBtn = document.querySelector('.search-icon')
const searchField = document.querySelector('.search-field')
const resDisplay = document.querySelector('.resDisplay')

function searchTv() {
    fetch(`http://api.tvmaze.com/singlesearch/shows?q=${searchField.value}&embed=episodes`)
        .then(blob => blob.json())
        .then(data => {
            const episodes = data["_embedded"].episodes // arrary
            // console.log(episodes);
            const list = document.createElement('div')
            list.classList.add('episode-list', 'hide')
            list.innerHTML = episodes.map(episode => `
                <h3 class="season">Season ${episode.season}</h3>
                <div class="season-content">
                    <ul class="content-list">
                        <li>
                            <h4 class="ep">Episode ${episode.number}</h4>
                            <div class="ep-content">
                                ${episode.image ? `<img src="${episode.image.medium}" alt="">` : ''}
                                <h4 class="name">${episode.name}</h4>
                            </div>
                        </li>
                    </ul>
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
                <button type="button" class="show-episodes">Details</button>
            `
            showBorder.appendChild(list)
            resDisplay.appendChild(showBorder)

            const showBtn = document.querySelector('.show-episodes')
            showBtn.addEventListener('click', () => {
                list.classList.toggle('hide')
            })
        })
        .catch(err => console.log(err))
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    searchTv()
})
