'use strict'
var gElCanvas
var gCtx
var gLinesNum = 0
var gCurrXPos = 100
var gCurrYPos = 100
var gIsNotFirstLine = false
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gStartPos


function renderMeme(id) {
    updateMemeImg(id)
    var img = document.getElementById(id)
    const meme = getMeme()
    var memeStyle = meme.lines
    if (!meme.lines.length) resetMeme()
    document.querySelector('.gallery-main').classList.remove('show')
    document.querySelector('.header-gallery-btn').classList.remove('pressed')
    document.querySelector('.editor-main').classList.add('flex')
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners()
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
    clearTxtInput()
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
    clearTxtInput()
    gLinesNum++
    const meme = getMeme()
    if (gLinesNum > meme.lines.length - 1) gLinesNum = 0
}

function onAddLine() {
    clearTxtInput()
    const meme = getMeme()
    gLinesNum = meme.lines.length
    setTxtLocation()
    updateLinePos(gCurrXPos, gCurrYPos)
    var memeStyle = meme.lines[gLinesNum]
    drawText(memeStyle.txt, memeStyle.x, memeStyle.y, memeStyle.color, memeStyle.size)
}

function updateLineTxt(txt) {
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

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    debugger
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
    document.getElementById('input-txt').value = ''
}

function onDown(ev) {
    const meme = getMeme().lines
    var isHitLine = false
    const pos = getEvPos(ev)
    for (var i = 0; i < meme.length; i++) {
        if (isLineClicked(pos, i)) {
            gLinesNum = i;
            isHitLine = !isHitLine
            break
        }
    }
    if (!isHitLine) return
    setLinkDrag(true, gLinesNum)
    document.body.style.cursor = 'grabbing'
    gStartPos = pos
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function onMove(ev) {
    const meme = getMeme()
    if (meme.lines[gLinesNum].isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy, gLinesNum)
        gStartPos = pos
            // debugger
        renderMeme(meme.selectedImgId)
    }
    document.body.style.cursor = 'grab'
}

function onUp() {
    setLinkDrag(false, gLinesNum)
    document.body.style.cursor = 'grab'
}