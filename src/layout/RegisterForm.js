import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import {http_get, http_post} from './utils';


export default function RegisterForm(props) {

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [localPubK, setLocalPubK] = useState("");
  const [localPriK, setLocalPriK] = useState("");
  const [remotePubK, setRemotePubK] = useState("");
  const [seal1, setSeal1] = useState("");
  const [seal2, setSeal2] = useState("");
  const [seal3, setSeal3] = useState("");

  function generateKey() {
    window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 3072,
        publicExponent: new Uint8Array([0x00, 0x00, 0x03]), //长度为3的数组，每个数字有8位，共24位
        hash: "SHA-256"
      },
      true,
      ["encrypt", "decrypt"]
    ).then((keyPair) => {
      setLocalPriK(keyPair.privateKey);
      return exportCryptoKey(keyPair.publicKey);
    }).then((pubKey) => {
      setLocalPubK(pubKey);
      console.log(pubKey);
    })
  }

  function exchangeKey() {
    http_get("http://127.0.0.1:12345/exchange_key/" + localPubK, (text) => {
      console.log(text);
      setRemotePubK(text);
    });
  }

  function remoteSeal(safeMessage) {
    http_post("http://127.0.0.1:12345/seal", {
      'safeMessage': safeMessage
    });
  }

  function localEncrypt(pubk, cond, secret) {
    // encrypt secret with remotePubK
    // hash cond 
    return "";
  }

  function seal() {
    if (localPubK === "") {
      alert("Local Key is not ready, please refresh the page!");
      return;
    }
    if (privateKey === "") {
      alert("Please set private key to store.");
      return;
    }

    exchangeKey.then(() => {
      var shares = window.secrets.share(privateKey, 3, 2);
      setSeal1(localEncrypt(remotePubK, email, shares[0]));
      setSeal2(localEncrypt(remotePubK, mobile, shares[1]));
      setSeal3(localEncrypt(remotePubK, password, shares[3]));
      remoteSeal(seal1);
    }).then(() => {
      remoteSeal(seal2);
    }).then(() => {
      remoteSeal(seal3);
    })
  }

  useEffect(() => {
    generateKey();
    var key = window.secrets.random(512);
    var shares = window.secrets.share(key, 3, 2); 
    var comb = window.secrets.combine( shares.slice(0,2) );
    console.log(comb === key); // => false
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Register your private key to KeySafe
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Account"
            fullWidth
            autoComplete=""
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="cell"
            name="cell"
            label="Mobile N.O."
            fullWidth
            autoComplete=""
            variant="standard"
            onChange={(e) => setMobile(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            fullWidth
            autoComplete=""
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="privatekey"
            name="privatekey"
            label="Private Key"
            fullWidth
            autoComplete=""
            variant="standard"
            onChange={(e) => setPrivateKey(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={seal}>Submit</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


/*
Convert  an ArrayBuffer into a string
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

/*
Export the given key and write it into the "exported-key" space.
*/
async function exportCryptoKey(key) {
  const exported = await window.crypto.subtle.exportKey(
    "spki",
    key
  );
  const exportedAsString = ab2str(exported);
  const exportedAsBase64 = window.btoa(exportedAsString);
  const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
  return pemExported;
}
