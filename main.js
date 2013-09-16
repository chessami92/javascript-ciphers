var a = 1;
var b = 0;
var lastDone = encrypt;

listener('plaintext', encrypt);
listener('ciphertext', decrypt);
listener('a', function () { a =smallIntListener('a', true, a); });
listener('b', function () { b = smallIntListener('b', false, b); });

function flashColor(elementId) {
    var element = document.getElementById(elementId);
    element.classList.remove('colorFlash');
    element.offsetWidth = element.offsetWidth;
    element.classList.add('colorFlash');
}

function encrypt() {
    flashColor('ciphertextTd');
    lastDone = encrypt;
}

function decrypt() {
    flashColor('plaintextTd');
    lastDone = decrypt;
}

function validInt(value) {
    var intRegex = /^\d+$/;
    return intRegex.test(value);
}

function smallIntListener(prefix, checkLCM, targetValue) {
    var td = document.getElementById(prefix + 'Td');
    var value = document.getElementById(prefix).value;
    var error = document.getElementById(prefix + 'Error');
    td.style.backgroundColor = 'red';
    if( !validInt(value) ) {
        error.innerHTML = '\'' + prefix + '\' must be a positive integer.';
        return targetValue;
    } else if( checkLCM == true && ( value % 2 == 0 || value % 13 == 0 ) ) {
        error.innerHTML = '\'' + prefix + '\' should not have a common multiple with 26.';
        return targetValue;
    }
    td.style.backgroundColor = 'transparent';
    error.innerHTML = '';
    lastDone();
    return value;
}

function listener(listenTo, handler) {
    var element = document.getElementById(listenTo);
    element.addEventListener('input', handler, false);
}
