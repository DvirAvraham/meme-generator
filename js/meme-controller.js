'use strict'
var gElCanvas
var gCtx
var gCurrLineIdx = 0
var gCurrXPos = 100
var gCurrYPos = 100
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gStartPos
var gImg
var gIsExternalImg = false


function renderMeme(id) {
    updateMemeImg(id)
    var img
    if (gIsExternalImg) img = gImg
    else img = document.getElementById(id)
    const meme = getMeme()
    var memeStyle = meme.lines
    if (!meme.lines.length) resetMeme()
    document.querySelector('.gallery-main').classList.remove('show')
    document.querySelector('.saved-memes').classList.remove('grid')
    document.querySelector('.header-gallery-btn').classList.remove('pressed')
    document.querySelector('.header-saved-memes').classList.remove('pressed')
    document.querySelector('.editor-main').classList.add('flex')
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners()
        // resizeCanvas()
    renderImg(img)
    for (let i = 0; i < memeStyle.length; i++) {
        var currMeme = memeStyle[i]
        drawText(currMeme.txt, currMeme.x, currMeme.y, currMeme.color, currMeme.size, currMeme.align, currMeme.font)
    }
}

function reRender() {
    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function setTxtLocation() {
    if (!gCurrLineIdx) return
    if (gCurrLineIdx === 1) {
        gCurrYPos = gElCanvas.height - 100
    } else {
        gCurrYPos = gElCanvas.width / 2
    }
}

function onRemoveLine() {
    clearTxtInput()
    setTxtLocation()
    removeLine(gCurrLineIdx)
    gCurrLineIdx--
    reRender()
    const meme = getMeme()
    if (gCurrLineIdx < meme.lines.length - 1 || gCurrLineIdx < 0) {
        gCurrLineIdx = 0
        gCurrYPos = 100
        gCurrXPos = 100
    }
    drawMarker()
}

function onRightText() {
    setTxtLocation()
    setTxtRight(gCurrLineIdx)
    reRender()

}

function onCenterText() {
    setTxtLocation()
    setTxtCenter(gCurrLineIdx)
    reRender()
}

function onLeftText() {
    setTxtLocation()
    setTxtLeft(gCurrLineIdx)
    reRender()
}

function onSwitchLine() {
    clearTxtInput()
    gCurrLineIdx++
    const meme = getMeme()
    if (gCurrLineIdx > meme.lines.length - 1) gCurrLineIdx = 0
    drawMarker()
}

function onAddLine(emoji) {
    clearTxtInput()
    const meme = getMeme()
    gCurrLineIdx = meme.lines.length
    setTxtLocation()
    updateLinePos(gCurrXPos, gCurrYPos, emoji)
    var memeStyle = meme.lines[gCurrLineIdx]
    drawText(memeStyle.txt, memeStyle.x, memeStyle.y, memeStyle.color, memeStyle.size, memeStyle.align, memeStyle.font)
    drawMarker()
}

function updateLineTxt(txt) {
    setTxtLocation()
    setLineTxt(txt, gCurrLineIdx)
    reRender()
}

function updateColorTxt(color) {
    setTxtLocation()
    setColorTxt(color, gCurrLineIdx)
    reRender()
}

function onReduceFontSize() {
    setTxtLocation()
    lowerFont(gCurrLineIdx)
    reRender()
}

function onIncreaseFontSize() {
    setTxtLocation()
    increaseFont(gCurrLineIdx)
    reRender()
}

// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container');
//     gElCanvas.width = elContainer.offsetWidth - 20
// }

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        // resizeCanvas()
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
    gIsExternalImg = !gIsExternalImg
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function(event) {
        console.log('onload');
        var img = new Image()
            // Render on canvas
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    console.log('after');
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function drawText(text, x, y, color, fontSize, align, font = 'Ariel') {
    gCtx.beginPath()
    gCtx.lineWidth = 0.3;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.textAlign = align
    gCtx.font = `${fontSize}px ${font}`;
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
            gCurrLineIdx = i;
            isHitLine = !isHitLine
            break
        }
    }
    if (!isHitLine) return
    drawMarker(meme[gCurrLineIdx].x, meme[gCurrLineIdx].y)
    setLinkDrag(true, gCurrLineIdx)
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
    drawMarker()
    const meme = getMeme()
    if (meme.lines[gCurrLineIdx].isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy, gCurrLineIdx)
        gStartPos = pos
            // debugger
        renderMeme(meme.selectedImgId)
    }
}

function onUp() {
    drawMarker()
    setLinkDrag(false, gCurrLineIdx)
    document.body.style.cursor = 'grab'
}

function drawMarker() {
    var meme = getMeme()
    renderMeme(meme.selectedImgId)
    var x = meme.lines[gCurrLineIdx].x
    var y = meme.lines[gCurrLineIdx].y
    gCtx.beginPath()
    gCtx.fillStyle = 'red'
    gCtx.rect(x, y, 10, 10)
    gCtx.fillRect(x, y, 10, 10)
    gCtx.strokeStyle = 'red'
    gCtx.stroke()
}

// function saveMeme() {
//     var meme = getMeme()
//     updateCreatedMemes(meme)
// }

function onChangeFont(font) {
    setTxtLocation()
    setFont(gCurrLineIdx, font)
    reRender()
}

function onDownloadImg(elLink) {
    console.log(elLink);
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
    updateCreatedMemes(imgContent)
}