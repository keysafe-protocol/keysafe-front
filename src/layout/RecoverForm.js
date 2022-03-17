import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';


export default function RecoverForm() {

  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileConfirm, setMobileConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [localPubPem, setLocalPubPem] = useState("");
  const [localPriKey, setLocalPriKey] = useState("");
  const [remotePubKey, setRemotePubKey] = useState("");
  const [seal1, setSeal1] = useState("");
  const [seal2, setSeal2] = useState("");
  const [seal3, setSeal3] = useState("");

  function notify(cond, value) {
    const axios = require('axios').default;
    const data = {
      'cond': cond,
      'value': value
    }
    axios.post('/notify_me', data)
      .then(result => {
        alert(result);
      })
  }

  function notify_me(cond) {
    if (cond === 'email') {
      notify('email', email);
    } else if (cond === 'mobile') {
      notify('mobile', mobile);
    } else {
    }
  }

  function prove(cond, condCode) {
    const data = {
      'cond': cond,
      'code': condCode
    }
    const axios = require('axios').default;
    axios.post('/prove_me', data)
      .then(result => {
        alert(result);
        const msg = localPriKey.decrypt(result);
        if (cond === 'email') {
          setSeal1(msg);
        } else if (cond === 'mobile') {
          setSeal2(msg);
        } else {
          setSeal3(msg);
        }
      })
  }

  function exchangeKey() {
    if (localPubPem !== "") {
      const axios = require('axios').default;
      axios.post('/exchange_key', { 'data': localPubPem })
        .then((remotePem) => {
          console.log("remote pub pem ", remotePem.data);
          const remotePub = window.forge.pki.publicKeyFromPem(remotePem.data);
          console.log("remote pub", remotePub);
          setRemotePubKey(remotePub);
        });
    }
  }

  function prove_me(cond) {
    if (cond === 'email') {
      prove('email', emailConfirm);
    } else if (cond === 'mobile') {
      prove('mobile', mobileConfirm);
    } else {
      prove('password', password);
    }
  }

  function recover(share1, share2, share3) {
    var s1, s2;
    if (share1 === "") {
      s1 = share2;
      s2 = share3;
    } else if (share2 === "") {
      s1 = share1;
      s2 = share3;
    } else {
      s1 = share1;
      s2 = share2;
    }
    const comb = window.secrets.combine(s1, s2);
    setSecretKey(comb);
  }

  useEffect(() => {
    exchangeKey();
  }, [localPubPem]);

  useEffect(() => {
    var rsa = window.forge.pki.rsa;
    console.log("rsa is ", rsa);
    rsa.generateKeyPair({ bits: 2048, e: 0x10001, workers: 2 }, (error, keypair) => {
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
  }, []);


  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Recover your private key from KeySafe
          </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
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
              <Grid item xs={12} sm={2} style={{ display: "flex", justifyContent: "flex-bottom" }} >
                <Button variant="outlined" onClick={() => notify_me('email')}>
                  Notify Me
                </Button>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  required
                  id="emailAuthCode"
                  name="emailAuthCode"
                  label="Email Confirmation Code"
                  fullWidth
                  autoComplete=""
                  variant="standard"
                  onChange={(e) => setEmailConfirm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2} style={{ display: "flex", justifyContent: "flex-bottom" }} >
                <Button variant="outlined" onClick={() => prove_me('email')}>
                  Prove Me
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="piece1"
                  name="piece1"
                  label="Private Key Piece1"
                  fullWidth
                  autoComplete=""
                  multiline
                  variant="standard"
                  value={seal1}
                  onChange={(e) => (e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <TextField
                  required
                  id="mobile"
                  name="mobile"
                  label="Mobile N.O."
                  fullWidth
                  autoComplete=""
                  variant="standard"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2} style={{ display: "flex", justifyContent: "flex-bottom" }} >
                <Button variant="outlined" onClick={() => notify_me('mobile')}>
                  Notify Me
                </Button>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  required
                  id="mobileConfirmCode"
                  name="mobileConfirmCode"
                  label="Mobile Confirmation Code"
                  fullWidth
                  autoComplete=""
                  variant="standard"
                  onChange={(e) => setMobileConfirm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2} style={{ display: "flex", justifyContent: "flex-bottom" }} >
                <Button variant="outlined" onClick={() => prove_me('mobile')}>
                  Prove Me
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="piece2"
                  name="piece2"
                  label="Private Key Piece2"
                  fullWidth
                  autoComplete=""
                  variant="standard"
                  value={seal2}
                  onChange={(e) => (e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
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
              <Grid item xs={12} sm={2} style={{ display: "flex", justifyContent: "flex-bottom" }}> 
                <Button variant="outlined" onClick={() => prove_me('password')}>
                  Prove Me
                </Button>
              </Grid>
              <Grid item xs={12} sm={2}>
              </Grid>
              <Grid item xs={12} sm={2}>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="piece1"
                  name="piece1"
                  label="Private Key Piece3"
                  fullWidth
                  autoComplete=""
                  variant="standard"
                  value={seal3}
                  onChange={(e) => (e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  id="privatekey"
                  name="privatekey"
                  label="Private Key"
                  fullWidth
                  multiline
                  autoComplete=""
                  variant="standard"
                  value={secretKey}
                  onChange={(e) => (e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "flex-bottom" }}>
                <Button variant="outlined" onClick={() => recover(seal1, seal2, seal3)}>
                  Recover
                </Button>
              </Grid>
            </Grid>
        </React.Fragment>
      </Paper>
    </Container>
  );
}