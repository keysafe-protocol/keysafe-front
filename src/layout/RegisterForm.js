import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';

export default function RegisterForm(props) {

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [localPubK, setLocalPubK] = useState("");
  const [localPriK, setLocalPriK] = useState("");
  const [remotePubK, setRemotePubK] = useState("");
  const [sealStep1, setSealStep1] = useState(0);
  const [sealStep2, setSealStep2] = useState(0);
  const [sealStep3, setSealStep3] = useState(0);

  function generateKey() {
    let keyPair = window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
      },
      true,
      ["encrypt", "decrypt"]
    );
    console.log(keyPair);
    keyPair.then((keyPair) => {
      const pubk = window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
      pubk.then(a => setLocalPubK(a));
      setLocalPriK(keyPair.privateKey);
    })
  }

  function seal() {
    if (localPubK === "") {
      alert("Local Key is not ready, please refresh the page!");
      return;
    }
    console.log(email, mobile, password, privateKey);
    const socket = new WebSocket('ws://127.0.0.1:12345');
    socket.onopen = function (event) {
      socket.send(localPubK);
    };
    socket.onmessage = function (event) {
      // when get enclave public key, encrypt 3 times and send 3 messages
      // when get error, alert error.
      console.log(event.data);
    }
    socket.onclose = function (event) {
      alert('Submit Completed!');
    }
  }

  useEffect(() => {
    generateKey();
  }, []);

  useEffect(() => {
    if (sealStep1 + sealStep2 + sealStep3 === 3) {
      alert("seal completed!");
    }
  }, [sealStep1, sealStep2, sealStep3])

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
