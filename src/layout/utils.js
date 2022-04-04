
export function encrypt(rawText, key) {
    console.log(key);
    if (key === "") {
        alert("Secure Channel to Keysafe Node is not setup correctly. Please refresh page and try again.");
        return;
    }
    try {
        var aesKey = window.forge.util.hexToBytes(key);
        var cipher = window.forge.cipher.createCipher('AES-GCM', aesKey);
        var iv =  [0x99,0xaa,0x3e,0x68,0xed,0x81,0x73,0xa0,0xee,0xd0,0x66,0x84];
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
        var iv = [0x99,0xaa,0x3e,0x68,0xed,0x81,0x73,0xa0,0xee,0xd0,0x66,0x84];
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
