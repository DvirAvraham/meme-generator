'use strict'

var gImgs
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I sometimes eat Falafel',
        size: 20,
        align: 'left',
        color: 'black',
        x: 100,
        y: 100,
        isDrag: false,
        align: 'left',
        font: 'Ariel'
    }]
}
var gCreatedMemes = []
const STORAGE_KEY = 'imgs'

createImgs()

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function resetMeme() {
    gMeme.lines = [{
        txt: 'I sometimes eat Falafel',
        size: 20,
        align: 'left',
        color: 'black',
        x: 100,
        y: 100,
        isDrag: false,
        align: 'left',
        font: 'Ariel'

    }]
}

function updateLinePos(x, y) {
    var line = {
        txt: 'I sometimes eat Falafel',
        size: 20,
        align: 'left',
        color: 'black',
        x,
        y,
        align: 'left',
        font: 'Ariel'
    }
    gMeme.lines.push(line)
}

function createImgs() {
    gImgs = [
        createImg(1, ['politics']),
        createImg(2, ['love', 'cute']),
        createImg(3, ['calm', 'cute']),
        createImg(4, ['calm', 'cute']),
        createImg(5, ['got it', 'cute']),
        createImg(6, ['funny', 'wrong']),
        createImg(7, ['funny', 'cute']),
        createImg(8, ['funny', 'tell me more']),
        createImg(9, ['funny', 'cute']),
        createImg(10, ['politics', 'funny']),
        createImg(11, ['funny', 'sport']),
        createImg(12, ['funny', 'tv']),
        createImg(13, ['funny', 'movies']),
        createImg(14, ['funny', 'movies']),
        createImg(15, ['funny', 'movies']),
        createImg(16, ['funny', 'movies']),
        createImg(17, ['politics', 'scary']),
        createImg(18, ['funny', 'movies'])
    ]
}

function createImg(id, keywords) {
    var img = {
        id,
        url: `img/${id}.jpg`,
        keywords
    }
    return img
}

function updateMemeImg(id) {
    gMeme.selectedImgId = id
}

function updateTxtLocation(xLoc, yLoc, idx) {
    gMeme.lines[idx].x = xLoc
    gMeme.lines[idx].y = yLoc
}

function removeLine(idx) {
    gMeme.lines.splice(idx, 1)
}

function lowerFont(idx) {
    gMeme.lines[idx].size--
}

function increaseFont(idx) {
    gMeme.lines[idx].size++
}

function setLineTxt(txt, idx) {
    gMeme.lines[idx].txt = txt
}

function setColorTxt(color, idx) {
    gMeme.lines[idx].color = color
}

function isLineClicked(clickedPos, idx) {
    const posX = gMeme.lines[idx].x
    const posY = gMeme.lines[idx].y
    var txtLength = gCtx.measureText(gMeme.lines[idx].txt).width
    const distanceX = Math.sqrt((posX + txtLength - clickedPos.x) ** 2)
    const distanceY = Math.sqrt((posY - clickedPos.y) ** 2)
    return (distanceY <= gMeme.lines[idx].size && distanceX <= gMeme.lines[idx].size + txtLength)
}

function setLinkDrag(isDrag, idx) {
    gMeme.lines[idx].isDrag = isDrag
}

function moveLine(dx, dy, idx) {
    gMeme.lines[idx].x += dx
    gMeme.lines[idx].y += dy
}

function setTxtRight(idx) {
    gMeme.lines[idx].align = 'right'
}

function setTxtCenter(idx) {
    gMeme.lines[idx].align = 'center'
}

function setTxtLeft(idx) {
    gMeme.lines[idx].align = 'left'
}

// function updateCreatedMemes(meme) {
//     gCreatedMemes.push(meme)
//     saveToStorage(STORAGE_KEY, gCreatedMemes)
// }

function setFont(idx) {
    var currFont = gMeme.lines[idx].font
    debugger
    if (currFont === 'Ariel') gMeme.lines[idx].font = "Courier New"
    else gMeme.lines[idx].font = 'Ariel'
}