
export function encrypt(rawText, key) {
    console.log("encrypt content", rawText, " with ", key);
    if (key === "") {
        alert("Secure Channel to Keysafe Node is not setup correctly. Please refresh page and try again.");
        return;
    }
    try {
        console.log("prepare key");
        var aesKey = window.forge.util.hexToBytes(key);
        var cipher = window.forge.cipher.createCipher('AES-GCM', aesKey);
        const iv =  new Uint8Array(12);
        console.log("prepare iv");
        cipher.start({
            iv: iv,
            tagLength: 0
        });
        console.log(cipher);
        cipher.update(window.forge.util.createBuffer(rawText, 'raw'));
        console.log("finish.");
        cipher.finish();
        const a = cipher.output.toHex();
        console.log("encrypted ", a);
        cipher.output.getBytes();
        return a;
    } catch (err) {
        console.log("failing");
        console.log("error happening ", err);
        return "";
    }
}


export function decrypt(secretText, key) {
    //TODO: check if secretText is hex or binary
    console.log("decrypt content ", secretText, " with ", key);
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
        const a = decipher.output.toHex();
        console.log("decrypted hex ", a);
        const o = decipher.output.data;
        console.log("decrypted output ", o);
        return o;
    } catch (err) {
        console.log(err);
        return "";
    }
}


export  function hashCond(cond) {
    var md = window.forge.md.sha256.create();
    md.update(cond);
    return md.digest().toHex();
  }
