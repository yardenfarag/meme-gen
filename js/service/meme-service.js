'use strict'

const STORAGE_KEY = 'savedMemesDB'

let gIdxLine = 2
let gMeme
let gSavedMemes = []


function getMeme() {
    return gMeme
}

function getSavedMemes() {
    const savedMemes = loadFromStorage(STORAGE_KEY)
    return savedMemes
}

function setImg(imgId) {
    _createMeme()
    gMeme.currImgId = imgId
    gIdxLine = 2
    clearInputs() // does not supposed to be here, will be taken care of
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
                isDrag: false,
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
                isDrag: false,
                text: 'BOTTOM',
                pos: 
                {
                    x: canvas.width/2,
                    y: canvas.height - 25
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

function getRandomMeme() {
    const canvas = getCanvas()

    return gMeme = {
        currImgId: getRandomIntInclusive(1, 18),
        lines: [
            {
                idx: 0,
                isDrag: false,
                text: getRandomSentence(),
                pos: 
                {
                    x: canvas.width/2,
                    y: canvas.height + 50 - canvas.height
                },
                color: getRandomColor(),
                shadowColor: getRandomColor(),
                size: 40,
                font: 'impact',
                direction: 'center'
            },
            {
                idx: 1,
                isDrag: false,
                text: getRandomSentence(),
                pos: 
                {
                    x: canvas.width/2,
                    y: canvas.height - 25
                },
                color: getRandomColor(),
                shadowColor: getRandomColor(),
                size: 40,
                font: 'impact',
                direction: 'center'
            }
        ]
    }
}

function saveMeme(meme) {
    gSavedMemes.unshift(meme)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

