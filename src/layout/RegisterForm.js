import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { http_get, http_post } from './utils';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';


export default function RegisterForm(props) {

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [localPubPem, setLocalPubPem] = useState("");
  const [localPriKey, setLocalPriKey] = useState("");
  const [remotePubKey, setRemotePubKey] = useState("");
  const [seal1, setSeal1] = useState("");
  const [seal2, setSeal2] = useState("");
  const [seal3, setSeal3] = useState("");

function hashCond(cond) {
    var md = window.forge.md.sha256.create();
    md.update(cond);
    return md.digest().toHex();
  }

  function sealPiece(cond, share, t) {
    var h;
    if (t === 'password') {
      //TODO: remove hard code
      h = hashCond(email + password);
    } else {
      h = hashCond(cond);
    }
    var data = {
      'pubkey': localPubPem,
      'h': h,
      'secret': remotePubKey.encrypt(share)
    }
    const axios = require('axios').default;
    axios.post('/seal', data)
      .then((result)=> {
        if(t === 'email') {
          setSeal1(1);
        } else if (t === 'mobile') {
          setSeal2(1);
        } else {
          setSeal3(1);
        }
      });
  }

  function seal() {
    if (localPubPem === "") {
      alert("Local Key is not ready, please refresh the page!");
      return;
    }
    if (secretKey === "") {
      alert("Please set private key to store.");
      return;
    }
    const secretHex = window.secrets.str2hex(secretKey);
    var shares = window.secrets.share(secretHex, 3, 2);
    sealPiece(email, shares[0], 'email');
    sealPiece(mobile, shares[1], 'mobile');
    sealPiece(password, shares[2], 'password');
  }
  
  // after local pub key generated, exchange for remote pub key
  function exchangeKey() {
    if (localPubPem !== "") {
      const axios = require('axios').default;
      axios.post('/exchange_key', {'data': localPubPem})
        .then((remotePem)=> {
          console.log("remote pub pem ", remotePem.data);
          const remotePub = window.forge.pki.publicKeyFromPem(remotePem.data);
          console.log("remote pub", remotePub);
          setRemotePubKey(remotePub);  
        });
    }
  }
  
  useEffect(() => {
    exchangeKey();
  }, [localPubPem]);

  useEffect(() => {
    if(seal1 + seal2 + seal3 >= 2) {
      alert("Seal Completed.");
    }
  }, [seal1, seal2, seal3]);

  // init local rsa key pair when page loaded
  useEffect(() => {
    var rsa = window.forge.pki.rsa;
    console.log("rsa is ", rsa);
    rsa.generateKeyPair({bits: 2048, e: 0x10001, workers: 2}, (error, keypair)=> {
      console.log(keypair);
      var pubKey = keypair.publicKey;
      var priKey = keypair.privateKey;
      console.log("forge pub key is ", pubKey);
      console.log("forge private key is ", priKey);
      setLocalPriKey(priKey);
      var pubKeyPem = window.forge.pki.publicKeyToPem(pubKey);
      console.log("forge pub key in PEM ", pubKeyPem);
      setLocalPubPem(pubKeyPem);  
    });
    // var key = window.secrets.random(512);
    // var shares = window.secrets.share(key, 3, 2);
    // var comb = window.secrets.combine(shares.slice(0, 2));
    // console.log(comb === key); // => false
  }, []);

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
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
                multiline
                autoComplete=""
                variant="standard"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" onClick={seal}>Submit</Button>
            </Grid>
          </Grid>
        </React.Fragment>
      </Paper>
    </Container>
  );
}


