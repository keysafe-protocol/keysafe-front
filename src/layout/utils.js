
export function encrypt(rawText, key) {
    console.log(key);
    if (key === "") {
        alert("Secure Channel to Keysafe Node is not setup correctly. Please refresh page and try again.");
        return;
    }
    try {
        var aesKey = window.forge.util.hexToBytes(key);
        var cipher = window.forge.cipher.createCipher('AES-GCM', aesKey);
        var iv = window.forge.random.getBytesSync(16);
        cipher.start({
            iv: iv,
            tagLength: 256
        });
        cipher.update(window.forge.util.createBuffer(rawText));
        cipher.finish();
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
        var decipher = window.forge.cipher.createDecipher('AES-GCM', aesKey);
        var iv = window.forge.random.getBytesSync(16);
        decipher.start({
            iv: iv,
            tagLength: 256,
            //tag?
        });
        decipher.update(window.forge.util.createBuffer(secretText));
        decipher.finish();
        return decipher.output.toHex();
    } catch (err) {
        console.log(err);
        return "";
    }
}
