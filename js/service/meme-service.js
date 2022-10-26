'use strict'

var gMeme = {
	currImgId: 1,
	lines: [
        {
            idx: 0,
            text: 'TOP',
            pos: 
            {
                x: 250,
                y: 50
            },
            color: '#fff',
            size: 40,
            font: 'impact'
        },
        {
            idx: 1,
            text: 'BOTTOM',
            pos: 
            {
                x: 250,
                y: 450
            },
            color: '#fff',
            size: 40,
            font: 'impact'
        }
    ]
}


function getMeme() {
    return gMeme
}

function setImg(imgId) {
    gMeme.currImgId = imgId
}

function setLineTxt(idx, txt) {
    gMeme.lines[idx].text = txt
}

function setTextColor(idx ,color) {
    gMeme.lines[idx].color = color
}

function lowerFontSize(gLineIdx) {
    gMeme.lines[gLineIdx].size -= 5
}

function raiseFontSize(gLineIdx) {
    gMeme.lines[gLineIdx].size += 5
}