'use strict'

function getRandomSentence() {
    const sentences = [
        'Me',
        'Look, a distraction',
        'You\'re welcome',
        'Sure. It\'s 5:10PM',
        'Wrong',
        'For 50 years',
        'For 2 years',
        'Right',
        'After the Sprint',
        'What if I told you',
        'Shame',
        'So tell me more',
        'So you\'re tellling me',
        'You',
        'When you see it',
    ]

    return sentences[getRandomIntInclusive(0, sentences.length-1)]
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function makeId(length = 4) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
  