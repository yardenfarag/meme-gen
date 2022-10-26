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
            color: '#fff'
        },
        {
            idx: 1,
            text: 'BOTTOM',
            pos: 
            {
                x: 250,
                y: 450
            },
            color: '#fff'
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