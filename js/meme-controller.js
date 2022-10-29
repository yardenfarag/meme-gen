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
    doTrans()
    renderGallery()
    addEventListeners()
}


function getCanvas() {
    return gElCanvas
}

function renderMeme() {
    showMemeEditor()
    const meme = getMeme()

	const img = new Image()

    if (meme.currImgId.length > 3) {
        img.src = meme.currImgId
    }

    else img.src = `img/${meme.currImgId}.jpg`

	img.onload = () => {
        renderImg(img)
        meme.lines.forEach(line => {
            if (line.pos.y === null) line.pos.y = gElCanvas.height - 40
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

function showMemeEditor() {
    hideGallery()
    hideMemes()
    const elEditor = document.querySelector('.editor')
    elEditor.style.display = 'flex'
}

function showSavedMemes() {
    const elSavedMemes = document.querySelector('.saved-memes')
    elSavedMemes.style.display = 'grid'
}

function renderRandomMeme() {
    showMemeEditor()
    const meme = getMeme()
	const img = new Image()
	img.src = `img/${meme.currImgId}.jpg`

	img.onload = () => {
        renderImg(img)
        meme.lines.forEach(line => {
            if (line.pos.y === null) line.pos.y = gElCanvas.height - 40
            line.text = getRandomSentence()
            line.color = getRandomColor()
            line.shadowColor = getRandomColor()
            gCtx.lineWidth = 2
            gCtx.fillStyle = line.color
            gCtx.shadowColor = line.shadowColor
            gCtx.strokeStyle = line.shadowColor
            gCtx.shadowBlur = 2
            gCtx.font = line.size + 'px ' + line.font
            gCtx.textAlign = line.direction
            drawText(line.text, line.pos.x, line.pos.y)

        })
    }
    
}

function renderSavedMeme(meme) {
    showMemeEditor()
	const img = new Image()
	img.src = `img/${meme.currImgId}.jpg`

	img.onload = () => {
        renderImg(img)
        meme.lines.forEach(line => {
            if (line.pos.y === null) line.pos.y = gElCanvas.height - 40
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

function renderSavedMemes() {
    hideEditor()
    hideGallery()
    showSavedMemes()

    const savedMemes = getSavedMemes()
    const elMemes = document.querySelector('.saved-memes')

    const strHTMLs = savedMemes.map(meme => {
        return `<img src="img/${meme.currImgId}.jpg" alt="" onclick="onSavedMemeSelect('${meme.id}')">`
    }).join('')

    elMemes.innerHTML = strHTMLs

}

function renderImg(img) {
    gElCanvas.height = (img.height * gElCanvas.width) / img.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onSavedMemeSelect(memeId) {
    const savedMemes = getSavedMemes()
    const selectedMeme = savedMemes.find(meme => meme.id === memeId)
    setImg(selectedMeme.currImgId)
    renderSavedMeme(selectedMeme)
    setMeme(selectedMeme)
}

function clearInputs() {
    clearTextLine()
    clearColorInputs()
    clearShareBtn()
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

function clearShareBtn() {
    const shareBtn = document.querySelector('.share-container')
    shareBtn.innerHTML = ``
}

function onImgText(txt) {
    setLineTxt(gLineIdx, txt)
    const meme = getMeme()
    drawText(txt, meme.lines[gLineIdx].pos.x,  meme.lines[gLineIdx].pos.y)
    renderMeme()
}

function drawText(text, x, y) { 
    gCtx.fillText(text, x, y) 
    gCtx.strokeText(text, x, y)
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

function hideMemes() {
    const elSavedMemes = document.querySelector('.saved-memes')
    elSavedMemes.style.display = 'none'
}

function onSetFilterByTxt(txt) {
    setFilterByTxt(txt)
    renderGallery()
}

function onFilterBy(filter) {
    filterBy(filter.innerText)
    renderGallery()
    raiseFontSize(filter.innerText)
}

function raiseFontSize(keyword) {
    const elKeyword = document.querySelector(`a.${keyword}`)
    let style = window.getComputedStyle(elKeyword, null).getPropertyValue('font-size')
    let fontSize = parseFloat(style)
    elKeyword.style.fontSize = (fontSize + 3) + 'px'
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
    gElCanvas.addEventListener("touchstart", onTouchStart)
    gElCanvas.addEventListener("touchmove", onTouchMove)
    gElCanvas.addEventListener("touchend", onTouchEnd)
}

function onMouseDown(ev) {
    // ev.preventDefault()
    gSelectedLine = getSelectedLine(ev)
    if (gSelectedLine !== null) {
            gSelectedLine.offset = {
            x: ev.offsetX - gSelectedLine.pos.x,
            y: ev.offsetY - gSelectedLine.pos.y}
    }
}

function onMouseMove(ev) {
    const meme = getMeme()
    if (gSelectedLine !== null) {
        meme.lines[gLineIdx].pos.x = gSelectedLine.pos.x = ev.offsetX - gSelectedLine.offset.x
        meme.lines[gLineIdx].pos.y = gSelectedLine.pos.y = ev.offsetY - gSelectedLine.offset.y
    }

    renderMeme()
}

function onMouseUp() {
    gSelectedLine = null
}

function onTouchStart(ev) {
    ev.preventDefault()
    gSelectedLine = getTouchedLine(ev)
    if (gSelectedLine !== null) {
        gSelectedLine.offset = {
            x: ev.touches[0].clientX - gSelectedLine.pos.x,
            y: ev.touches[0].clientY - gSelectedLine.pos.y
        }
    }
}

function onTouchMove(ev) {
    ev.preventDefault()
    const meme = getMeme()
    if (gSelectedLine !== null) {
        meme.lines[gLineIdx].pos.x = gSelectedLine.pos.x = ev.touches[0].clientX - gSelectedLine.offset.x
        meme.lines[gLineIdx].pos.y = gSelectedLine.pos.y = ev.touches[0].clientY - gSelectedLine.offset.y
    }

    renderMeme()
    
}

function onTouchEnd() {
    gSelectedLine = null
}

function getTouchedLine(ev) {
    const memeLines = getMeme().lines

    const clickedLine = memeLines.find(line => {
        return ev.touches[0].clientX - 200 > line.pos.x - gCtx.measureText(line.text).width/2 && 
        ev.touches[0].clientX - 200 < line.pos.x + gCtx.measureText(line.text).width/2 &&
        ev.touches[0].clientY - 160 > line.pos.y - LINE_HEIGHT && ev.touches[0].clientY - 160 < line.pos.y + LINE_HEIGHT
    })
    console.log(clickedLine.idx);
    gLineIdx = clickedLine.idx
    if (clickedLine) return clickedLine
    else return null
}

function getSelectedLine(ev) {
    const memeLines = getMeme().lines
    const clickedLine = memeLines.find(line => {
        return ev.offsetX > line.pos.x - gCtx.measureText(line.text).width/2 && 
        ev.offsetX < line.pos.x + gCtx.measureText(line.text).width/2 &&
        ev.offsetY > line.pos.y - LINE_HEIGHT && ev.offsetY < line.pos.y + LINE_HEIGHT
    })
    gLineIdx = clickedLine.idx
    if (clickedLine) return clickedLine
    else return null
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL('image/jpg')
    elLink.href = data
    elLink.download = 'my-meme'
}

function upLoadImg() {
const imgDataUrl = gElCanvas.toDataURL("image/jpeg")

  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    document.querySelector('.share-container').innerHTML = `
        <a data-trans="share" class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share to facebook  
        </a>`
  }
  doUploadImg(imgDataUrl, onSuccess)
  doTrans()
}

function onAddStickerLine(sticker) {
    addStickerLine(sticker.innerText)
    renderMeme()
}

function onSetLang(lang) {
    setLang(lang)
    lang === 'he' ? document.body.classList.add('hebrew') : document.body.classList.remove('hebrew')
    renderGallery()
    doTrans()
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderMeme)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
      let img = new Image()
      img.src = event.target.result 
      setImg(event.target.result)
      img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0])
}


// themes

initThemeSelector()

function initThemeSelector(){
    const themeSelector = document.querySelector('.theme')
    const themeCss = document.querySelector('.theme-css')
    const currTheme = loadFromStorage('theme') || 'default'
    
    
    themeSelector.addEventListener("change", () => {
        themeCss.setAttribute('href', `css/themes/${themeSelector.value}.css`)
        saveToStorage('theme', themeSelector.value)
    })

    themeSelector.value = currTheme
    themeCss.setAttribute('href', `css/themes/${currTheme}.css`)
}

