'use strict'
var gElCanvas
var gCtx
var gLinesNum = 0
var gCurrXPos = 100
var gCurrYPos = 100
var gIsNotFirstLine = false

function renderMeme(id) {
    updateMemeImg(id)
    var img = document.getElementById(id)
    const meme = getMeme()
    var memeStyle = meme.lines
    document.querySelector('.gallery-main').classList.remove('show')
    document.querySelector('.header-gallery-btn').classList.remove('pressed')
    document.querySelector('.editor-main').classList.add('flex')
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    // addListeners()
    resizeCanvas()
    renderImg(img)
    for (let i = 0; i < memeStyle.length; i++) {
        var currMeme = memeStyle[i]
        drawText(currMeme.txt, currMeme.x, currMeme.y, currMeme.color, currMeme.size)
    }
}

function reRender() {
    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function setTxtLocation() {
    if (!gLinesNum) return
    if (gLinesNum === 1) {
        gCurrYPos = gElCanvas.height - 100
    } else {
        gCurrYPos = gElCanvas.width / 2
    }
}

function onRemoveLine() {
    // clearTxtInput()
    setTxtLocation()
    removeLine(gLinesNum)
    gLinesNum--
    reRender()
    const meme = getMeme()
    if (gLinesNum < meme.lines.length - 1 || gLinesNum < 0) {
        gLinesNum = 0
        gCurrYPos = 100
        gCurrXPos = 100
    }
}

function onSwitchLine() {
    // clearTxtInput()
    gLinesNum++
    const meme = getMeme()
    if (gLinesNum > meme.lines.length - 1) gLinesNum = 0
}

function onAddLine() {
    // clearTxtInput()
    gLinesNum++
    setTxtLocation()
    updateLinePos(gCurrXPos, gCurrYPos)
    const meme = getMeme()
    var memeStyle = meme.lines[gLinesNum]
    drawText(memeStyle.txt, memeStyle.x, memeStyle.y, memeStyle.color, memeStyle.size)
}

function updateLineTxt(txt) {
    // debugger
    // if (!gLinesNum && gIsNotFirstLine) {
    //     gLinesNum--
    //     onAddLine()
    // }
    // gIsNotFirstLine = true
    setTxtLocation()
    setLineTxt(txt, gLinesNum)
    reRender()
}

function updateColorTxt(color) {
    setTxtLocation()
    setColorTxt(color, gLinesNum)
    reRender()
}

function onReduceFontSize() {
    setTxtLocation()
    lowerFont(gLinesNum)
    reRender()
}

function onIncreaseFontSize() {
    setTxtLocation()
    increaseFont(gLinesNum)
    reRender()
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth - 20
}

// function addListeners() {
//     addMouseListeners()
//     addTouchListeners()
//     window.addEventListener('resize', () => {
//         resizeCanvas()
//     })
// }

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousemove', draw)
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchmove', draw)
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchend', onUp)
// }

// ...................................................................

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    // document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function(event) {
        console.log('onload');
        var img = new Image()
            // Render on canvas
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
            // gImg = img
    }
    console.log('after');
    reader.readAsDataURL(ev.target.files[0])
}


function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}


function drawText(text, x, y, color, font) {
    gCtx.beginPath()
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = color;
    gCtx.fillStyle = color;
    gCtx.font = `${font}px Arial`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


function clearTxtInput() {
    // debugger
    // var itemText = document.getElementsByName("input-txt")[0].value;
    // itemText.innerText = ""
}