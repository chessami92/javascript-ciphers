var a = 1;
var b = 0;

listener('plaintext', encrypt);
listener('ciphertext', decrypt);
listener('a', aListener);

function flashColor(elementId) {
    var element = document.getElementById(elementId);
    element.classList.remove('colorFlash');
    element.offsetWidth = element.offsetWidth;
    element.classList.add('colorFlash');
}

function encrypt() {
    flashColor('ciphertextTd');
}

function decrypt() {
    flashColor('plaintextTd');
}

function aListener() {
    var intRegex = /^\d+$/;
    var aTd = document.getElementById('aTd');
    var aValue = document.getElementById('a').value;
    var aError = document.getElementById('aError');
    aTd.style.backgroundColor = 'red';
    if( !intRegex.test(aValue) ) {
        aError.innerHTML = '\'a\' must be a positive integer.';
        return;
    } else if( aValue % 2 == 0 || aValue % 13 == 0 ) {
        aError.innerHTML = '\'a\' should not have a common multiple with 26.';
        return;
    }
    aTd.style.backgroundColor = 'transparent';
    aError.innerHTML = '';
    a = aValue;
}

function bListener() {
    b = document.getElementById('b').value;
}

function listener(listenTo, handler) {
    var element = document.getElementById(listenTo);
    element.addEventListener('input', handler, false);
}
