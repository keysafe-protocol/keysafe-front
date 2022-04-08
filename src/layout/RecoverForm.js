import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { encrypt, hashCond, decrypt } from './utils'

export default function RecoverForm() {

  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [gauth, setGauth] = useState("");
  const [gauthConfirm, setGauthConfirm] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [localPubKey, setLocalPubKey] = useState("");
  const [localKeyPair, setLocalKeyPair] = useState("");
  const [shareKey, setShareKey] = useState("");
  const [share0, setShare0] = useState("");
  const [share1, setShare1] = useState("");
  const [share2, setShare2] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [recoverReady, setRecoverReady] = useState(false);

  function notify(t, cond) {
    var h;
    if (t === 'password') {
      //TODO: remove hard code
      h = hashCond(email + password);
    } else if (t === 'gauth') {
      h = hashCond(email + '.gauth');
    } else {
      h = hashCond(cond);
    }
    const axios = require('axios').default;
    const data = {
      'pubkey': localPubKey,
      't': t,
      'cond': cond,
      'h': h
    }
    axios.post('/notify', data)
      .then(result => {
        if (result.data === "seal not found") {
          alert("Condition not found in Keysafe Network, please corret it and try again.");
        } else {
          console.log('notify done');
          if (t === 'password') {
            setPasswordConfirm(result.data.toString());
          }
        }
      })
  }

  useEffect(() => {
    var a = 0;
    for (let i in [share0, share1, share2]) {
      if (i !== "") {
        a = a + 1;
      }
    }
    setRecoverReady(a < 2);
  }, [share0, share1, share2]);

  useEffect(() => {
    if (passwordConfirm !== "") {
      prove('password', '', passwordConfirm);
    }
  }, [passwordConfirm]);

  function validateShare(data) {
    // when wrong token provided, enclave will provide a long empty string as a result
    const d = data.replaceAll('\x00', '');
    return (d.length > 5);
  }

  function prove(t, cond, condCode) {
    const data = {
      'pubkey': localPubKey,
      't': t,
      'cond': cond,
      'code': encrypt(condCode, shareKey),
    }
    const axios = require('axios').default;
    axios.post('/prove', data)
      .then(result => {
        // alert(result.data);
        if (validateShare(result.data)) {
          const msg = decrypt(result.data.replaceAll('\x00', ''), shareKey);
          if (t === 'email') {
            setShare0(msg);
          } else if (t === 'password') {
            setShare1(msg);
          } else {
            setShare2(msg);
          }
        } else {
          alert("Wrong token, please try again.");
        }
      })
  }

  function recover() {
    var shares = [];
    for (let s in [share0, share1, share2]) {
      if (s !== "") {
        shares.push(s.replaceAll('\x00', ''));
      }
    }
    const comb = window.secrets.combine(shares);
    const secret = window.secrets.hex2str(comb);
    setSecretKey(secret);
    setTextOutput(secret);
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
          var skey = bn.toString(16);
          console.log(skey);
          setShareKey(skey);
        });
    }
  }

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
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box sx={{ px: 2, pt: 0.5 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Recovery
                </Typography>
                <Typography variant="h10" gutterBottom>
                  - Claim your registered Confidential Data from Keysafe Network
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
                  Fulfill Recovery Condition 1
                </Typography>
                <Paper variant='outlined' >
                  <Box sx={{ px: 2, py: 0.5 }}>
                    <Grid container>
                      <Grid item xs={10}>
                        <TextField
                          required
                          id="email"
                          name="email"
                          label="Enter your Email registered for recovery verification"
                          fullWidth
                          autoComplete=""
                          variant="standard"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid container={true} xs={2}>
                        <Button sx={{ pb: 0 }} alignItems="stretch" style={{ display: "flex" }} variant="text"
                          onClick={() => notify("email", email)}
                        >
                          Send Verification
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={10}>
                        <TextField
                          required
                          id="emailConfirm"
                          name="emailConfirm"
                          label="Enter the verification code you received"
                          fullWidth
                          data autoComplete=""
                          variant="standard"
                          onChange={(e) => setEmailConfirm(e.target.value)}
                        />
                      </Grid>
                      <Grid container={true} xs={2}>
                        <Button sx={{ pb: 0 }} alignItems="stretch" style={{ display: "flex" }}
                          onClick={() => prove('email', email, emailConfirm)}
                          variant="text">
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ px: 2, pt: 0.5 }}>
                <Typography variant="h10" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Fulfill Recovery Condition 2
                </Typography>
                <Paper variant='outlined' >
                  <Box sx={{ px: 2, py: 0.5 }}>
                    <Grid container>
                      <Grid item xs={10}>
                        <TextField
                          required
                          id="password"
                          name="password"
                          label="Enter your Passphrase for recovery verification"
                          fullWidth
                          autoComplete=""
                          variant="standard"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Grid>
                      <Grid container={true} xs={2}>
                        <Button sx={{ pb: 0 }} alignItems="stretch" style={{ display: "flex" }}
                          onClick={() => notify('password', '')}
                          variant="text">
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ px: 2, pt: 0.5 }}>
                <Typography variant="h10" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Fulfill Recovery Condition 3
                </Typography>
                <Paper variant='outlined' >
                  <Box sx={{ px: 2, py: 0.5 }}>
                    <Grid container>
                      <Grid item xs={10}>
                        <TextField
                          required
                          id="gauth"
                          name="gauth"
                          label="Enter Token from Google Authenticator"
                          fullWidth
                          autoComplete=""
                          variant="standard"
                          onChange={(e) => setGauth(e.target.value)}
                        />
                      </Grid>
                      <Grid container={true} xs={2}>
                        <Button sx={{ pb: 0 }} alignItems="stretch" style={{ display: "flex" }}
                          onClick={() => notify('gauth', '')}
                          variant="text">
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ px: 2, pt: 0.5 }}>
                <Grid container alignItems="center" direction="row" justifyContent="center" spacing={16}>
                  <Grid item >
                    <Button variant="contained" disabled={recoverReady}
                      onClick={recover}>
                      Recover
                    </Button>
                  </Grid>
                  <Grid item >
                    <Button variant="contained" disabled={share0 === ""}
                      onClick={() => setTextOutput(share0)}>
                      Shard1
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" disabled={share1 === ""}
                      onClick={() => setTextOutput(share1)}>
                      Shard2
                    </Button>
                  </Grid>
                  <Grid item >
                    <Button variant="contained" disabled={share2 === ""}
                      onClick={() => setTextOutput(share2)}>
                      Shard3
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ px: 2, pt: 0.5 }}>
                <TextField
                  id="privatekey"
                  name="privatekey"
                  label="Recover Data will be displayed here."
                  fullWidth
                  multiline
                  autoComplete=""
                  variant="outlined"
                  value={textOutput}
                />
              </Box>
            </Grid>
          </Grid>
        </React.Fragment>
      </Paper>
    </Container>
  );
}
