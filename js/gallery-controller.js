'use strict'


let gImgs = [
    {
        id: 1, 
        url: 'img/1.jpg', 
        keywords: ['funny', 'trump', 'politics']
    },
    {
        id: 2, 
        url: 'img/2.jpg', 
        keywords: ['cute', 'dog']
    },
    {
        id: 3, 
        url: 'img/3.jpg', 
        keywords: ['cute', 'sleep', 'dog']
    },
    {
        id: 4, 
        url: 'img/4.jpg', 
        keywords: ['cute', 'cat', 'sleep']
    },
    {
        id: 5, 
        url: 'img/5.jpg', 
        keywords: ['funny', 'success']
    },
    {
        id: 6, 
        url: 'img/6.jpg', 
        keywords: ['funny']
    },
    {
        id: 7, 
        url: 'img/7.jpg', 
        keywords: ['funny', 'cute']
    }, {
        id: 8, 
        url: 'img/8.jpg', 
        keywords: ['funny']
    },
    {
        id: 9, 
        url: 'img/9.jpg', 
        keywords: ['funny', 'cute']
    },
    {
        id: 10, 
        url: 'img/10.jpg', 
        keywords: ['funny', 'obama', 'politics']
    },
    {
        id: 11, 
        url: 'img/11.jpg', 
        keywords: ['funny']
    },
    {
        id: 12, 
        url: 'img/12.jpg', 
        keywords: ['funny']
    },
    {
        id: 13, 
        url: 'img/13.jpg', 
        keywords: ['funny', 'success']
    },
    {
        id: 14, 
        url: 'img/14.jpg', 
        keywords: ['matrix']
    },
    {
        id: 15, 
        url: 'img/15.jpg', 
        keywords: ['funny']
    },
    {
        id: 16, 
        url: 'img/16.jpg', 
        keywords: ['funny']
    },
    {
        id: 17, 
        url: 'img/17.jpg', 
        keywords: ['funny', 'politics']
    },
    {
        id: 18, 
        url: 'img/18.jpg', 
        keywords: ['funny', 'cute']
    }
]

function renderGallery() {
    const elImages = document.querySelector('.images')

    const strHTMLs = gImgs.map(img => {
        return `<img src="img/${img.id}.jpg" alt="" onclick="uploadImgToCanvas(${img.id})">`
    }).join('')

    elImages.innerHTML = strHTMLs
}