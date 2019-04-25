const resDisplay = document.querySelector('.resDisplay')
const searchBtn = document.querySelector('.search-icon')

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const searchField = document.querySelector('.search-field').value
    const url = 'http://api.tvmaze.com/singlesearch/shows?q=' + searchField

    const myRequest = new XMLHttpRequest()
    myRequest.open('GET', url)
    myRequest.onload = function() {
        const myData = JSON.parse(myRequest.responseText)
        renderHTML(myData)
    }
    myRequest.send()
})

function renderHTML(data) {
    const output = document.createElement('div')
    output.classList.add('showBorder')

    output.innerHTML = `
        <img src="${data.image.original}" alt="">
        <h2 class="name">${data.name}</h2>
        <div class="summary">${data.summary}</div>
    `
    resDisplay.appendChild(output)
}