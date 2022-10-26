'use strict'

const LINE_WIDTH = 50
const LINE_HEIGHT = 25

let gElCanvas
let gCtx
let gLineIdx = 0

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
}

function renderMeme() {
    const meme = getMeme()

	const img = new Image()

	img.src = `img/${meme.currImgId}.jpg`

	img.onload = () => {
        renderImg(img)
        meme.lines.forEach(line => {
            gCtx.lineWidth = 2
            gCtx.strokeStyle = 'black'
            gCtx.fillStyle = line.color
            gCtx.font = line.size + 'px ' + line.font
            gCtx.textAlign = 'center'
            drawText(line.text, line.pos.x, line.pos.y)

        })
    }

}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
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
    console.log(clickedLine)
  }

 function onChangeTextColor(color) {
    setTextColor(gLineIdx ,color)
    renderMeme()
 }

 function onLowerFontSize() {
    lowerFontSize(gLineIdx)
    renderMeme()
 }

 function onRaiseFontSize() {
    raiseFontSize(gLineIdx)
    renderMeme()
 }

 function onSwitchTextLines() {
    const meme = getMeme()
    gLineIdx += 1

    if (gLineIdx >= meme.lines.length) gLineIdx = 0


    const elTextInput = document.querySelector('[name=text-line]')
    elTextInput.value =  meme.lines[gLineIdx].text

 }