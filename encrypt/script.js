document.getElementById('encode-btn').addEventListener('click', () => {
    const inputText = document.getElementById('input-text').value;
    const shift = parseInt(document.getElementById('shift').value);
    const cipherType = document.getElementById('cipher-select').value;

    if (cipherType === 'caesar') {
        document.getElementById('output-text').value = caesarCipher(inputText, shift);
    } else if (cipherType === 'base64') {
        document.getElementById('output-text').value = btoa(inputText);
    }

});



document.getElementById('decode-btn').addEventListener('click', () => {
    const inputText = document.getElementById('input-text').value;
    const cipherType = document.getElementById('cipher-select').value;
    const output = [];
    
    if (cipherType === 'caesar') {
        for (let shift = 1; shift <= 25; shift++) {
            output.push(`Shift ${shift}: ${caesarCipher(inputText, -shift)}`);
        }
        document.getElementById('output-text').value = output.join('\n');
    } else if (cipherType === 'base64') {
        try {
            document.getElementById('output-text').value = atob(inputText);
        } catch (e) {
            document.getElementById('output-text').value = 'Invalid Base64 string';
        }
    }
});



function caesarCipher(str, shift) {
    return str.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            let shiftedCode = code;
            if (code >= 65 && code <= 90) {
                shiftedCode = ((code - 65 + shift) % 26 + 26) % 26 + 65;
            } else if (code >= 97 && code <= 122) {
                shiftedCode = ((code - 97 + shift) % 26 + 26) % 26 + 97;
            }
            return String.fromCharCode(shiftedCode);
        }
        return char;
    }).join('');
}

function base64Encode(str) {
    return btoa(str);
}

function base64Decode(str) {
    return atob(str);
}

function accessBruteForce() {
    window.location.href = '../index.html';
}

function toggleShiftLabel() {
    var cipherType = document.getElementById("cipherType");
    var shiftLabel = document.getElementById("shiftLabel");

    if (cipherType.value === "caesar") {
        shiftLabel.style.display = "block";
    } else {
        shiftLabel.style.display = "none";
    }
}