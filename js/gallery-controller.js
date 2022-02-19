'use strict'

var gKeyRate = []

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
    renderKeyWords()
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
    gCurrLineIdx = 0
    gCurrXPos = 100
    gCurrYPos = 100
    gIsNotFirstLine = false
}

function filterByKeyWords(keyWordByClick) {
    var keyWord = document.getElementById('key-words').value
    if (!keyWord) keyWord = keyWordByClick
    var KeyImgs = gImgs.filter(img => img.keywords.includes(keyWord))
    if (!KeyImgs.length) strHTMLs = [`</div class="main-layout">No Results...</div>`]
    else var strHTMLs = KeyImgs.map(img => {
        return `</div class="main-layout">
        <img class="img" id="${img.id}" src="${img.url}" onclick="renderMeme(${img.id})" alt="">
        </div>`
    })
    document.querySelector('.gallery-section').innerHTML = strHTMLs.join('')
    document.getElementById('key-words').value = ''
}

function renderKeyWords() {
    const imgs = getImgs()

    var keyWords = []
    for (var i = 0; i < imgs.length; i++) {
        for (var j = 0; j < imgs[i].keywords.length; j++) {
            if (!keyWords.includes(imgs[i].keywords[j])) keyWords.push(imgs[i].keywords[j])
        }
    }
    keyWords.forEach(keyword => {
        var keywordObj = {
            'keyword': keyword,
            'rate': 16
        }
        gKeyRate.push(keywordObj)
    })

    var strHTMLs = keyWords.map(keyWord => {
        return `<div class="key-word" onclick="increaseFontSize('${keyWord}', this)">${keyWord}  ,</div>`
    })
    document.querySelector('.keywords-section').innerHTML = strHTMLs.join('')
}

function increaseFontSize(keyWord, elWord) {
    var keyIdx = gKeyRate.findIndex(key => key.keyword === keyWord)
    gKeyRate[keyIdx].rate++
        elWord.style.fontSize = gKeyRate[keyIdx].rate + 'px'
    filterByKeyWords(keyWord)

}