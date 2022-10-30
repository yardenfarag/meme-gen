'use strict'

const STORAGE_KEY = 'savedMemesDB'

let gIdxLine = 2
let gMeme
let gSavedMemes = []
let gKeywordsSearchCountMap

function getMeme() {
    return gMeme
}

function getSavedMemes() {
    return loadFromStorage(STORAGE_KEY)
    
}

function setMeme(selectedMeme) {
    gMeme = selectedMeme
}

function setImg(imgId) {
    _createMeme()
    gMeme.currImgId = imgId
    gIdxLine = 2
    clearInputs()
}

function setLineTxt(lineIdx, txt) {
    gMeme.lines[lineIdx].text = txt
}

function setTextColor(lineIdx ,color) {
    gMeme.lines[lineIdx].color = color
}

function setShadowoColor(lineIdx ,color) {
    gMeme.lines[lineIdx].shadowColor = color
}

function changeFontSize(lineIdx, sign) {
    sign === '-' ? gMeme.lines[lineIdx].size -= 5 : gMeme.lines[lineIdx].size += 5
}

function _createMeme() {
    const canvas = getCanvas()

    return gMeme = {
        currImgId: 1,
        lines: [
            {
                idx: 0,
                text: 'TOP',
                pos: 
                {
                    x: canvas.width/2,
                    y: canvas.height + 50 - canvas.height
                },
                color: '#fff',
                shadowColor: '#000000',
                size: 40,
                font: 'impact',
                direction: 'center'
            },
            {
                idx: 1,
                text: 'BOTTOM',
                pos: 
                {
                    x: canvas.width/2,
                    y: null
                },
                color: '#fff',
                shadowColor: '#000000',
                size: 40,
                font: 'impact',
                direction: 'center'
            }
        ]
    }
}

function addNewLine() {
    const canvas = getCanvas()
    const newLine = 
    {
        idx: gIdxLine++,
        text: 'NEW',
        pos: 
        {
            x: canvas.width/2,
            y: canvas.height/2
        },
        color: '#fff',
        size: 40,
        font: 'impact'
    }

    gMeme.lines.push(newLine)
}

function deleteLine(lineIdx) {
    gMeme.lines.splice([lineIdx], 1)
}

function changeLineFont(lineIdx, font) {
    gMeme.lines[lineIdx].font = font
}

function alignText(lineIdx, direction) {
    gMeme.lines[lineIdx].direction = direction
}

function saveMeme(meme) {
    meme.id = makeId()
    gSavedMemes.push(meme)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)
  
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
      if (XHR.readyState !== XMLHttpRequest.DONE) return
      if (XHR.status !== 200) return console.error('Error uploading image')
      const { responseText: url } = XHR

    //   console.log('Got back live url:', url)
      onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
      console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

function addStickerLine(sticker) {
    const canvas = getCanvas()
    const newLine = 
    {
        idx: gIdxLine++,
        text: sticker,
        pos: 
        {
            x: canvas.width/2,
            y: canvas.height/2
        },
        color: '#fff',
        size: 40,
        font: 'impact'
    }

    gMeme.lines.push(newLine)
}

function determineKeywordPopularity() {
    gKeywordsSearchCountMap = getKeywords().reduce((prevVal, currVal) =>
        {prevVal[currVal] = getRandomIntInclusive(13, 22)
        return prevVal
    }, {})
}

function getKeywordVal(word) {
    return gKeywordsSearchCountMap[word]
}

function increaseKeywordPopularity(word) {
    gKeywordsSearchCountMap[word]++
}





