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
        isDrag: false

    }]
}

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
        isDrag: false
    }]
}

function updateLinePos(x, y) {
    var line = {
        txt: 'I sometimes eat Falafel',
        size: 20,
        align: 'left',
        color: 'black',
        x,
        y
    }
    gMeme.lines.push(line)
}

function createImgs() {
    gImgs = [
        createImg(1, ['funny', 'sweet']),
        createImg(2, ['funny', 'scary']),
        createImg(3, ['funny', 'sweet']),
        createImg(4, ['funny', 'sweet']),
        createImg(5, ['funny', 'scary']),
        createImg(6, ['funny', 'sweet']),
        createImg(7, ['funny', 'sweet']),
        createImg(8, ['funny', 'scary']),
        createImg(9, ['funny', 'sweet']),
        createImg(10, ['funny', 'sweet']),
        createImg(11, ['funny', 'scary']),
        createImg(12, ['funny', 'sweet']),
        createImg(13, ['funny', 'sweet']),
        createImg(14, ['funny', 'scary']),
        createImg(15, ['funny', 'sweet']),
        createImg(16, ['funny', 'sweet']),
        createImg(17, ['funny', 'scary']),
        createImg(18, ['funny', 'sweet'])
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