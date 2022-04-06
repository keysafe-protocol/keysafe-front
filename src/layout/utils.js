
export function encrypt(rawText, key) {
    console.log("encrypt content: {} with {}.", rawText, key);
    if (key === "") {
        alert("Secure Channel to Keysafe Node is not setup correctly. Please refresh page and try again.");
        return;
    }
    try {
        var aesKey = window.forge.util.hexToBytes(key);
        var cipher = window.forge.cipher.createCipher('AES-GCM', aesKey);
        var iv =  new Uint8Array(12);
        cipher.start({
            iv: iv,
            tagLength: 0
        });
        cipher.update(window.forge.util.createBuffer(rawText, 'raw'));
        cipher.finish();
        console.log(cipher.output.toHex());
        return cipher.output.toHex();
    } catch (err) {
        console.log(err);
        return "";
    }
}

export function decrypt(secretText, key) {
    console.log(key);
    if (key === "") {
        alert("Secure Channel to Keysafe Node is not setup correctly. Please refresh page and try again.");
        return;
    }
    try {
        var aesKey = window.forge.util.hexToBytes(key);
        var rawText = window.forge.util.hexToBytes(secretText);
        var decipher = window.forge.cipher.createDecipher('AES-GCM', aesKey);
        var iv =  new Uint8Array(12);
        decipher.start({
            iv: iv,
            tagLength: 0,
        });
        decipher.update(window.forge.util.createBuffer(rawText, 'raw'));
        decipher.finish();
        return decipher.output.data;
    } catch (err) {
        console.log(err);
        return "";
    }
}
