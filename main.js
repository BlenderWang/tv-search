const resDisplay = document.querySelector('.resDisplay')
const searchBtn = document.querySelector('.search-icon')

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const searchField = document.querySelector('.search-field').value
    const url = 'http://api.tvmaze.com/singlesearch/shows?q=' + searchField + '&embed=episodes'

    const myRequest = new XMLHttpRequest()
    myRequest.open('GET', url, true)
    myRequest.onreadystatechange = function() {
        if(myRequest.readyState === 4 && myRequest.status == 200) {
            const myData = JSON.parse(myRequest.responseText)
            renderHTML(myData)
        }
    }
    myRequest.send()
})

function renderHTML(data) {
    const output = document.createElement('div')
    output.classList.add('showBorder')

    output.innerHTML = `
        <img src="${data.image.original}" alt="">
        <h2 class="name">${data.name}</h2>
        <p class="rating">Rating: <span>${data.rating.average}</span></p>
        <div class="summary">${data.summary}</div>
        <div class="season-list">
            <button><a href="http://api.tvmaze.com/shows/1/seasons">S 1</a></button>
            <button><a href="http://api.tvmaze.com/shows/2/seasons">S 2</a></button>
            <button><a href="http://api.tvmaze.com/shows/3/seasons">S 3</a></button>
        </div>
        <div class="episode-list">
            <div class="left">
                <h5>S1 Ep2</h5>
                <img src="http://static.tvmaze.com/uploads/images/medium_landscape/31/79061.jpg" alt="">
            </div>
            <div class="right">
                <h4 class="name">Fist Like a Bullet</h4>
                <p class="name">M.K. finds refuge in an unlikely and dangerous place, while Sunny's loyalty is tested when Quinn tries to force him to commit an unspeakable act.</p>
            </div>
        </div>
    `
    resDisplay.appendChild(output)
}