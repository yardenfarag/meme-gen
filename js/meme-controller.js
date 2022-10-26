'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
}

function uploadImgToCanvas(imgId) {

	const img = new Image()
	img.src = `img/${imgId}.jpg`

	img.onload = () => {
        renderImg(img)
    }
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  }