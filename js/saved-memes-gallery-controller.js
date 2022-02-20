'use strict'



function renderMemes() {
    var memesUrls = openSavedMemes()
    document.querySelector('.saved-memes').classList.add('grid')
    document.querySelector('.gallery-main').classList.remove('show')
    document.querySelector('.editor-main').classList.remove('flex')
    document.querySelector('.header-gallery-btn').classList.remove('pressed')
    document.querySelector('.header-saved-memes').classList.add('pressed')

    var strHTMLs = memesUrls.map(url => {
        return `</div class="main-layout">
                 <img class="img" src="${url}" >
                </div>`
    })
    document.querySelector('.saved-memes').innerHTML = strHTMLs.join('')
}