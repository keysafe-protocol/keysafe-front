import forge from "node-forge";

export function encrypt2(text: string) {
  return text;
}

export function decrypt2(text: string) {
  return text;
}

export function encrypt(rawText: string, key: string) {
  console.log("encrypt content", rawText, " with ", key);
  if (key === "") {
    alert(
      "Secure Channel to Keysafe Node is not setup correctly. Please refresh page and try again."
    );
    return;
  }
  try {
    console.log("prepare key");
    var aesKey = forge.util.hexToBytes(key);
    var cipher = forge.cipher.createCipher("AES-GCM", aesKey);
    const iv = new Uint8Array(12);
    console.log("prepare iv");
    cipher.start({
      iv: iv as any,
      tagLength: 0,
    });
    console.log(cipher);
    cipher.update(forge.util.createBuffer(rawText, "raw"));
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

export function decrypt(secretText: string, key: string) {
  //TODO: check if secretText is hex or binary
  console.log("decrypt content ", secretText, " with ", key);
  if (key === "") {
    alert(
      "Secure Channel to Keysafe Node is not setup correctly. Please refresh page and try again."
    );
    return;
  }
  try {
    var aesKey = forge.util.hexToBytes(key);
    var rawText = forge.util.hexToBytes(secretText);
    var decipher = forge.cipher.createDecipher("AES-GCM", aesKey);
    var iv = new Uint8Array(12);
    decipher.start({
      iv: iv as any,
      tagLength: 0,
    });
    decipher.update(forge.util.createBuffer(rawText, "raw"));
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

export function hashStr(cond: string) {
  var md = forge.md.sha256.create();
  md.update(cond);
  return md.digest().toHex();
}

export function hashCond(t: string, cond: string, condBase: string) {
  if (condBase === "") {
    alert("Please setup your email first");
    return "";
  }
  if (t === "email") {
    return hashStr(cond);
  } else if (t === "password") {
    return hashStr(condBase + cond);
  } else if (t === "gauth") {
    return hashStr(condBase + ".gauth");
  } else {
    alert("Wrong condition type");
    return "";
  }
}
