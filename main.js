const searchBtn = document.querySelector('.search-icon')
const searchField = document.querySelector('.search-field')

function searchTv () {
    fetch(`https://api.tvmaze.com/search/shows?q=${searchField.value}`)
        .then(blob => blob.json())
        .then(data => {
            const resDisplay = document.querySelector('.resDisplay')
            resDisplay.innerHTML = data.map(({ show }) => `
                <div class="showBorder">
                    ${show.image ? `<img src="${show.image.medium}">` : ''}
                    <h2 class="name">${show.name}</h2>
                    ${show.rating.average ? `<p class="rating">Rating: <span>${show.rating.average}</span></p>` : ''}
                    <br>
                    <div class="summary">${show.summary}</div>
                </div>
            `).join();
        })
}

searchField.addEventListener('keyup', searchTv)
searchField.addEventListener('change', searchTv)
searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
})

// function renderHTML(data) {
//     const output = document.createElement('div')
//     output.classList.add('showBorder')

//     output.innerHTML = `
//         <img src="${data.image.original}" alt="">
//         <h2 class="name">${data.name}</h2>
//         <p class="rating">Rating: <span>${data.rating.average}</span></p>
//         <div class="summary">${data.summary}</div>
//         <div class="season-list">
//             <button><a href="http://api.tvmaze.com/shows/1/seasons">S 1</a></button>
//             <button><a href="http://api.tvmaze.com/shows/2/seasons">S 2</a></button>
//             <button><a href="http://api.tvmaze.com/shows/3/seasons">S 3</a></button>
//         </div>
//         <div class="episode-list">
//             <div class="left">
//                 <h5>S1 Ep2</h5>
//                 <img src="http://static.tvmaze.com/uploads/images/medium_landscape/31/79061.jpg" alt="">
//             </div>
//             <div class="right">
//                 <h4 class="name">Fist Like a Bullet</h4>
//                 <p class="name">M.K. finds refuge in an unlikely and dangerous place, while Sunny's loyalty is tested when Quinn tries to force him to commit an unspeakable act.</p>
//             </div>
//         </div>
//     `
//     resDisplay.appendChild(output)
// }