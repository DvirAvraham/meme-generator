'use strict'

function onInit() {
    renderImgs()
}

function renderImgs() {
    document.querySelector('.gallery-main').classList.add('show')
    document.querySelector('.editor-main').classList.remove('flex')
    document.querySelector('.header-gallery-btn').classList.add('pressed')
    resetVars()
    resetMeme()
    clearTxtInput()
    const imgs = getImgs()
    var strHTMLs = imgs.map(img => {
        return `</div class="main-layout">
                 <img class="img" id="${img.id}" src="${img.url}" onclick="renderMeme(${img.id})" alt="">
                </div>`
    })
    document.querySelector('.gallery-section').innerHTML = strHTMLs.join('')
}

function toggleNav() {
    document.querySelector('.main-screen').classList.toggle('menu-open')
    document.querySelector('body').classList.toggle('menu-open')
    document.querySelector('.header-options-list').classList.toggle('show-menu')
}

function resetVars() {
    gLinesNum = 0
    gCurrXPos = 100
    gCurrYPos = 100
    gIsNotFirstLine = false
}