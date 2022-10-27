'use strict'

let gFilterBy = { txt: '' }
let gImgs = [
    {
        id: 1, 
        url: 'img/1.jpg', 
        keywords: 'funny trump politics'
    },
    {
        id: 2, 
        url: 'img/2.jpg', 
        keywords: 'cute dog'
    },
    {
        id: 3, 
        url: 'img/3.jpg', 
        keywords: 'cute sleep dog'
    },
    {
        id: 4, 
        url: 'img/4.jpg', 
        keywords: 'cute cat sleep'
    },
    {
        id: 5, 
        url: 'img/5.jpg', 
        keywords: 'funny success'
    },
    {
        id: 6, 
        url: 'img/6.jpg', 
        keywords: 'funny'
    },
    {
        id: 7, 
        url: 'img/7.jpg', 
        keywords: 'funny cute'
    }, {
        id: 8, 
        url: 'img/8.jpg', 
        keywords: 'funny'
    },
    {
        id: 9, 
        url: 'img/9.jpg', 
        keywords: 'funny cute'
    },
    {
        id: 10, 
        url: 'img/10.jpg', 
        keywords: 'funny obama politics'
    },
    {
        id: 11, 
        url: 'img/11.jpg', 
        keywords: 'funny'
    },
    {
        id: 12, 
        url: 'img/12.jpg', 
        keywords: 'funny'
    },
    {
        id: 13, 
        url: 'img/13.jpg', 
        keywords: 'funny success'
    },
    {
        id: 14, 
        url: 'img/14.jpg', 
        keywords: 'matrix'
    },
    {
        id: 15, 
        url: 'img/15.jpg', 
        keywords: 'funny'
    },
    {
        id: 16, 
        url: 'img/16.jpg', 
        keywords: 'funny'
    },
    {
        id: 17, 
        url: 'img/17.jpg', 
        keywords: 'funny politics'
    },
    {
        id: 18, 
        url: 'img/18.jpg', 
        keywords: 'funny cute'
    },
    {
        id: 19, 
        url: 'img/19.jpg', 
        keywords: 'funny oprah'
    },
    {
        id: 20, 
        url: 'img/20.jpg', 
        keywords: 'funny field'
    },
    {
        id: 21, 
        url: 'img/21.jpg', 
        keywords: 'funny africa'
    },
    {
        id: 22, 
        url: 'img/22.jpg', 
        keywords: 'funny'
    },
    {
        id: 23, 
        url: 'img/23.jpg', 
        keywords: 'trump politics'
    },
    {
        id: 24, 
        url: 'img/24.jpg', 
        keywords: 'jersey pauly funny'
    },
    {
        id: 25, 
        url: 'img/25.jpg', 
        keywords: 'funny cute dog'
    }
]


function getImgs() {
    let imgs = gImgs.filter(img => img.keywords.split(' ').some( s => img.keywords.includes(gFilterBy.txt.toLowerCase())))
    if (!gFilterBy.txt) imgs = gImgs
    return imgs
}

function renderGallery() {
    hideEditor()
    hideMemes()
    showGallery()

    const imgs = getImgs()

    const elImages = document.querySelector('.images')

    const strHTMLs = imgs.map(img => {
        return `<img src="img/${img.id}.jpg" alt="" onclick="onImgSelect(${img.id})">`
    }).join('')

    elImages.innerHTML = strHTMLs
}

function showGallery() {
    const elGallery = document.querySelector('.main-content')
    elGallery.style.display = 'block'
}

function hideGallery() {
    const elGallery = document.querySelector('.main-content')
    elGallery.style.display = 'none'
}

function hideEditor() {
    const elEditor = document.querySelector('.editor')
    elEditor.style.display = 'none'
}

function onImgSelect(imgId) {
    
    setImg(imgId)
    renderMeme()
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
    const elMenuBtn = document.querySelector('.btn-menu')
    if (elMenuBtn.innerText === '☰') elMenuBtn.innerText = 'X'
    else elMenuBtn.innerText = '☰'
}

function setFilterByTxt(txt) {
    gFilterBy.txt = txt
}
