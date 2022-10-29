'use strict'

const gTrans = {
    'memes': {
        en: 'Memes',
        he: 'מימים'
    },
    'gallery': {
        en: 'Gallery',
        he: 'גלריה'
    },
    'about': {
        en: 'About',
        he: 'אודות'
    },
    'default': {
        en: 'Default',
        he: 'ברירת מחדל'
    },
    'dark': {
        eh: 'Darky',
        he: 'חשוכי'
    },
    'search': {
        en: 'Search',
        he: 'חיפוש'
    },
    'random-meme': {
        en: 'Random Meme',
        he: 'הגרל מימ'
    },
    'back-to-gallery': {
        en: '←Back to Gallery',
        he: '→חזור לגלריה'
    },
    'edit-text-lines': {
        en: 'Edit Text Lines',
        he: 'ערוך טקסט'
    },
    'download': {
        en: 'Download',
        he: 'הורד'
    },
    'upload': {
        en: 'Upload to Web',
        he: 'העלה לרשת'
    },
    'share': {
        en: 'Share to Facebook',
        he: 'שתף בפייסבוק'
    },
    'save': {
        en: 'Save',
        he: 'שמור'
    }

}

let gCurrLang = 'en'

function getCurrLang() {
    return gCurrLang
}

function getTrans(transKey) {
    let transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'

    let trans = transMap[gCurrLang]
    if (!trans) trans = transMap['en']
    return trans
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach( el => {
        const transKey = el.dataset.trans
        el.innerText = getTrans(transKey)
        if (el.placeholder) el.placeholder = getTrans(transKey) 
    })
}

function setLang(lang) {
    gCurrLang = lang
}
