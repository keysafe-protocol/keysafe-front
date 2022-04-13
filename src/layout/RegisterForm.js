import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import Chip from '@mui/material/Chip';
import aes from 'crypto-js/aes';
import { encrypt, decrypt, hashCond } from './utils'

export default function RegisterForm(props) {

  const [email, setEmail] = useState(""); // piece0, seal0, shard1
  const [password, setPassword] = useState(""); // piece1, seal1, shard2
  const [gauth, setGauth] = useState(""); // piece2, seal2, shard3
  const [secretKey, setSecretKey] = useState("");
  const [localPubKey, setLocalPubKey] = useState("");
  const [localKeyPair, setLocalKeyPair] = useState("");
  const [shareKey, setShareKey] = useState("");
  const [share0, setShare0] = useState("");
  const [share1, setShare1] = useState("");
  const [share2, setShare2] = useState("");
  const [seal0, setSeal0] = useState(false);
  const [seal1, setSeal1] = useState(false);
  const [seal2, setSeal2] = useState(false);
  const [sealComplete, setSealComplete] = useState(false);
  const [submitText, setSubmitText] = useState("Submit");


  function sealPiece(t, cond, share) {
    // t -> type, cond -> value, share -> slice of secret
    console.log("sealing share ", share);
    var h;
    if (t === 'password') {
      h = hashCond(email + password);
    } else if (t == 'gauth') {
      h = hashCond(email + ".gauth");
    } else {
      h = hashCond(cond);
    }
    var data = {
      'pubkey': localPubKey,
      'h': h,
      'secret': encrypt(share, shareKey),
      'text': share  //TODO: delete
    }
    const axios = require('axios').default;
    return axios.post('/seal', data);
  }

  function seal() {
    if (localPubKey === "") {
      alert("Local Key is not ready, please refresh the page!");
      return;
    }
    if (secretKey === "") {
      alert("Input your secret key!");
      return;
    }
    // cut secret into 3 pieces
    const secretKeyHex = window.secrets.str2hex(secretKey);
    const shares = window.secrets.share(secretKeyHex, 3, 2);
    setShare0(shares[0]);
    setShare1(shares[1]);
    setShare2(shares[2]);
  }

  // after local pub key generated, exchange for remote pub key
  function exchangeKey() {
    if (localPubKey !== "") {
      const axios = require('axios').default;
      axios.post('/exchange_key', { 'pubkey': localPubKey })
        .then((remoteKey) => {
          console.log("remote pub hex ", remoteKey.data);
          var ec = new window.elliptic.ec('p256');
          var remoteKeyObj = ec.keyFromPublic(remoteKey.data, 'hex');
          var bn = localKeyPair.derive(remoteKeyObj.getPublic());
          console.log(bn);
          setShareKey(bn.toString(16));
        });
    }
  }

  function requireSecret() {
    if (localPubKey !== "") {
      const axios = require('axios').default;
      const data = {
        'pubkey': localPubKey,
        'email': email,
        'h': hashCond(email + 'gauth')
      }
      axios.post('/require_secret', data)
        .then((totpSecret) => {
          console.log("totpSecret ", totpSecret.data);
          const tmp = totpSecret.data.replaceAll(/0{10,}/g, '');
          const originSecret = decrypt(tmp, shareKey);
          //const originSecret = totpSecret.data;
          console.log(originSecret.slice(0, 26));
          const qrText = `otpauth://totp/Keysafe:${email}?secret=${originSecret.slice(0,26)}&issuer=Keysafe.network`;
          console.log(qrText);
          document.getElementById("qrcode").innerHTML = "";
          new window.QRCode(
            document.getElementById("qrcode"),
            qrText
          )
        });
    }
  }

  /* mapping sequence: 
      seal0, email, share0
      seal1, password, share1
      seal2, gauth, share2
      sealComplete
  */
  useEffect(() => {
    if(share0 !== "") {
      sealPiece('email', email, share0).then((result) => {
        setSeal0(true);
      })
    }
  }, [share0]);

  useEffect(() => {
    // after seal0 complete, and share1 ready, do seal1
    if (seal0 && share1 !== "") {
      sealPiece('password', password, share1).then((result) => {
        setSeal1(true);
      })
    }
  }, [seal0, share1]);

  useEffect(() => {
    // after seal1 complete, and share2 ready, do seal2
    if (seal1 && share2 !== "") {
      sealPiece('gauth', gauth, share2).then(() => {
        setSeal2(true);
      })
    }
  }, [seal1, share2]);

  useEffect(() => {
    if (seal0 && seal1 && seal2) {
      setSealComplete(true);
    }
  }, [seal0, seal1, seal2]);

  useEffect(() => {
    if (sealComplete) {
      setSubmitText("Submit Completed");
      alert("Register Completed.")
    }
  }, [sealComplete]);

  useEffect(() => {
    exchangeKey();
  }, [localPubKey]);

  useEffect(() => {
    var ec = new window.elliptic.ec('p256');
    var keypair = ec.genKeyPair();
    setLocalPubKey(keypair.getPublic().encode('hex'));
    setLocalKeyPair(keypair);
    console.log(keypair.getPublic().encode('hex'));
  }, []);

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box sx={{ px: 2, pt: 0.5 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Registration
                </Typography>
                <Typography variant="h10" gutterBottom>
                  - Register your private keys to Keysafe Network. After registered, you can always recover
                  your confidential data with any 2 of 3 conditions fulfilled. Remember your conditions.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Box sx={{ px: 2, pt: 0.5 }}>
                <Chip label="2-of-3 Threshold Mode" size="large" color="warning" variant="outlined" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ px: 2, pt: 0.5 }}>
                <Typography variant="h10" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Set Recovery Condition 1
                </Typography>
                <Paper variant='outlined' >
                  <Box sx={{ px: 2, py: 0.5 }}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Please input your Email here"
                      fullWidth
                      autoComplete=""
                      variant="standard"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ px: 2, pt: 0.5 }}>
                <Typography variant="h10" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Set Recovery Condition 2
                </Typography>
                <Paper variant='outlined' >
                  <Box sx={{ px: 2, py: 0.5 }}>
                    <TextField
                      required
                      id="password"
                      name="password"
                      label="Please input your Passphrase here"
                      fullWidth
                      autoComplete=""
                      variant="standard"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ px: 2, pt: 0.5 }}>
                <Typography variant="h10" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Set Recovery Condition 3
                </Typography>
                <Paper variant='outlined' >
                  <Box sx={{ px: 2, py: 0.5 }}>
                    <Grid container>
                      <Grid container={true} xs={2}>
                        <Button sx={{ pb: 0 }} alignItems="stretch" style={{ display: "flex" }} variant="text"
                          onClick={() => requireSecret()}
                        >
                          Enable Google Authenticator
                        </Button>
                      </Grid>
                      <Grid item xs={10}>
                        <div id="qrcode">
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ px: 2, pt: 0.5 }}>
                <Typography variant="h10" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Confidential Data
                </Typography>
                <Paper variant='outlined' >
                  <Box sx={{ px: 2, py: 0.5 }}>
                    <TextField
                      id="privatekey"
                      name="privatekey"
                      label="Please input your Confidential Data here"
                      fullWidth
                      multiline
                      autoComplete=""
                      variant="standard"
                      onChange={(e) => setSecretKey(e.target.value)}
                    />
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ px: 2, py: 1 }} >
                <Grid container alignItems="center" direction="row" justifyContent="center" spacing={16}>
                  <Grid item >
                    <Button variant="contained" disabled={sealComplete}
                      onClick={seal}>
                      {submitText}
                    </Button>
                  </Grid>
                  <Grid item >
                    <Button variant="contained" disabled={!seal0}>
                      Shard1
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" disabled={!seal1}>
                      Shard2
                    </Button>
                  </Grid>
                  <Grid item >
                    <Button variant="contained" disabled={!seal2}>
                      Shard3
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </React.Fragment>
      </Paper>
    </Container>
  );
}


