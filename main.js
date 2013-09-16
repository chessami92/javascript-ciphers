var a = 1;
var aInverse = 1;
var b = 0;
var lastDone = encrypt;

listener('plaintext', encrypt);
listener('ciphertext', decrypt);
listener('a', function () { 
    a = smallIntListener('a', true, a);
    aInverse = inverse(a);
    lastDone();
});
listener('b', function () {
    b = smallIntListener('b', false, b);
    lastDone();
});

function inverse(number) {
    for(var i = 1; i < 26; i++) {
        if((number * i) % 26 == 1) {
            return i;
        }
    }
}

function flashColor(elementId) {
    var element = document.getElementById(elementId);
    element.classList.remove('colorFlash');
    element.offsetWidth = element.offsetWidth;
    element.classList.add('colorFlash');
}

function changeOther(source, target, modifyFunction) {
    var value = document.getElementById(source).value;
    var targetInput = document.getElementById(target);
    var newValue = [];
    for(var i = 0; i < value.length; i++) {
        var character = value.charAt(i);
        var scaled = character.toUpperCase().charCodeAt() - 65;
        if(scaled >= 0 && scaled <=25 ) {
            var newCharCode = modifyFunction(scaled);
            var modifyBy = (character.toUpperCase() == character ? 65 : 97);
            var newCharacter = String.fromCharCode(newCharCode + modifyBy);
            newValue.push(newCharacter);
        } else {
            newValue.push(character);
        }
    }
    targetInput.value = newValue.join('');
    flashColor(target + 'Td');
}

function toCipherchar(character) {
    return (a * character + b) % 26;
}

function encrypt() {
    changeOther('plaintext', 'ciphertext', toCipherchar);
    lastDone = encrypt;
}

function toPlainchar(character) {
    return (aInverse * (character - b + 26)) % 26;
}

function decrypt() {
    changeOther('ciphertext', 'plaintext',  toPlainchar);
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
    }
    value = parseInt(value);
    if( checkLCM == true && ( value % 2 == 0 || value % 13 == 0 ) ) {
        error.innerHTML = '\'' + prefix + '\' should not have a common multiple with 26.';
        return targetValue;
    }
    td.style.backgroundColor = 'transparent';
    error.innerHTML = '';
    return value;
}

function listener(listenTo, handler) {
    var element = document.getElementById(listenTo);
    element.addEventListener('input', handler, false);
}
