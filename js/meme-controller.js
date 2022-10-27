'use strict'

const LINE_HEIGHT = 30
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx
let gLineIdx = 0
let gSelectedLine = null


function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    addEventListeners()
}

function getCanvas() {
    return gElCanvas
}

function renderMemeEditor() {
    hideGallery()
    hideMemes()
    const elEditor = document.querySelector('.editor')
    elEditor.style.display = 'flex'
}

function renderMeme() {
    renderMemeEditor()
    const meme = getMeme()

	const img = new Image()

	img.src = `img/${meme.currImgId}.jpg`

	img.onload = () => {
        renderImg(img)
        meme.lines.forEach(line => {
            gCtx.lineWidth = 2
            gCtx.strokeStyle = line.shadowColor
            gCtx.fillStyle = line.color
            gCtx.shadowColor = line.shadowColor
            gCtx.shadowBlur = 2
            gCtx.font = line.size + 'px ' + line.font
            gCtx.textAlign = line.direction
            drawText(line.text, line.pos.x, line.pos.y)

        })
    }

}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function clearInputs() {
    clearTextLine()
    clearColorInputs()
}

function clearTextLine() {
    const elTextLine = document.querySelector('[name=text-line]')
    elTextLine.value = ''
}

function clearColorInputs() {
    const elFontColor = document.querySelector('[name=font-color]')
    const elShadowColor = document.querySelector('[name=shadow-color]')
    elFontColor.value = '#ffffff'
    elShadowColor.value = '#000000'
}

function onImgText(txt) {
    setLineTxt(gLineIdx, txt)
    const meme = getMeme()
    drawText(txt, meme.lines[gLineIdx].pos.x,  meme.lines[gLineIdx].pos.y)
    renderMeme()
}

function drawText(text, x, y) {

    
    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function onAddTextLine() {

}

function canvasClicked(ev) {
    const memeLines = getMeme().lines

    const elTextInput = document.querySelector('[name=text-line]')


    const clickedLine = memeLines.find(line => {
      return ev.offsetX > line.pos.x - gCtx.measureText(line.text).width/2 && 
        ev.offsetX < line.pos.x + gCtx.measureText(line.text).width/2 &&
        ev.offsetY > line.pos.y - LINE_HEIGHT && ev.offsetY < line.pos.y + LINE_HEIGHT 
    })
    gLineIdx = clickedLine.idx
    if (clickedLine) {
        elTextInput.value = clickedLine.text
    }

}

function onChangeTextColor(color) {
    setTextColor(gLineIdx ,color)
    renderMeme()
}

function onChangeShadowColor(color) {
    setShadowoColor(gLineIdx ,color)
    renderMeme()
}

function onChangeFontSize(sign) {
    changeFontSize(gLineIdx, sign)
    renderMeme()
}

function onSwitchTextLines() {
    const meme = getMeme()
    gLineIdx += 1

    if (gLineIdx >= meme.lines.length) gLineIdx = 0


    const elTextInput = document.querySelector('[name=text-line]')
    elTextInput.value =  meme.lines[gLineIdx].text

}

function onAddNewLine() {
    addNewLine(gLineIdx)
    renderMeme()
}

function onDeleteLine() {
    deleteLine(gLineIdx)
    renderMeme()
}

function onChangeLineFont(font) {
    changeLineFont(gLineIdx, font)
    renderMeme()
}

function onAlignText(direction) {
    alignText(gLineIdx, direction)
    renderMeme()
}

function onGetRandomMeme() {
    getRandomMeme() 
    renderMeme()
}

function onSaveMeme() {
    const meme = getMeme()
    saveMeme(meme)
}

function displaySavedMemes() {
    hideEditor()
    hideGallery()
    const savedMemes = getSavedMemes()

    const elSavedMemes = document.querySelector('.saved-memes')
    elSavedMemes.style.display = 'block'

    const strHTMLs = savedMemes.map(meme => {
        return `<img src="img/${meme.id}.jpg" alt="" onclick="">`
    }).join('')

    elSavedMemes.innerHTML = strHTMLs
}

function hideMemes() {
    const elSavedMemes = document.querySelector('.saved-memes')
    elSavedMemes.style.display = 'none'
}

function onSetFilterByTxt(txt) {
    setFilterByTxt(txt)
    renderGallery()
}

function getEvPos(ev) {

    let pos = {
      x: ev.offsetX,
      y: ev.offsetY
    }

    if (TOUCH_EVS.includes(ev.type)) {

      ev.preventDefault()

      ev = ev.changedTouches[0]

      pos = {
        x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
      }
    }
    return pos
}

function addEventListeners() {
    gElCanvas.addEventListener("mousedown", onMouseDown)
    gElCanvas.addEventListener("mousemove", onMouseMove)
    gElCanvas.addEventListener("mouseup", onMouseUp)
}

function onMouseDown(ev) {
    ev.preventDefault()
    gSelectedLine = getSelectedLine(ev)
    if (gSelectedLine !== null) {
        gSelectedLine.offset = {
            x: ev.offsetX - gSelectedLine.pos.x,
            y: ev.offsetY - gSelectedLine.pos.y
        }
    }
}

function onMouseMove(ev) {
    if (gSelectedLine !== null) {
        gSelectedLine.pos.x = ev.offsetX - gSelectedLine.offset.x
        gSelectedLine.pos.y = ev.offsetY - gSelectedLine.offset.y
    }

    const meme = getMeme()
    meme.lines[gLineIdx].pos.x = gSelectedLine.pos.x
    meme.lines[gLineIdx].pos.y = gSelectedLine.pos.y

    renderMeme()
}

function onMouseUp(ev) {
    gSelectedLine = null
}

function getSelectedLine(ev) {
    const memeLines = getMeme().lines

    const clickedLine = memeLines.find(line => {
      return ev.offsetX > line.pos.x - gCtx.measureText(line.text).width/2 && 
        ev.offsetX < line.pos.x + gCtx.measureText(line.text).width/2 &&
        ev.offsetY > line.pos.y - LINE_HEIGHT && ev.offsetY < line.pos.y + LINE_HEIGHT 
    })

    if (clickedLine) return clickedLine
    else return null
}