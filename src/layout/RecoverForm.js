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


export default function RecoverForm() {

  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileConfirm, setMobileConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [localPubKey, setLocalPubKey] = useState("");
  const [localKeyPair, setLocalKeyPair] = useState("");
  const [shareKey, setShareKey] = useState("");
  const [seal1, setSeal1] = useState("");
  const [seal2, setSeal2] = useState("");
  const [seal3, setSeal3] = useState("");

  function notify(t, cond) {
    const axios = require('axios').default;
    const data = {
      'pubkey': localPubKey,
      't': t,
      'cond': cond
    }
    axios.post('/notify', data)
      .then(result => {
        alert(result);
      })
  }

  function prove(t, cond, condCode, h) {
    const data = {
      'pubkey': localPubPem,
      't': t,
      'cond': cond,
      'code': remotePubKey.encrypt(condCode),
      'h': h
    }
    const axios = require('axios').default;
    axios.post('/prove', data)
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

  function hashCond(cond) {
    var md = window.forge.md.sha256.create();
    md.update(cond);
    return md.digest().toHex();
  }

  function prove_me(t, cond) {
    var h;
    if (t === 'password') {
      //TODO: remove hard code
      h = hashCond(email + password);
    } else {
      h = hashCond(cond);
    }
    if (t === 'email') {
      prove('email', cond, emailConfirm, h);
    } else if (t === 'mobile') {
      prove('mobile', cond, mobileConfirm, h);
    } else {
      prove('password', password, password, h);
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
          console.log(bn.toString(16));
          setShareKey(bn.toString(16));
        });
    }
  }

  useEffect(() => {
    exchangeKey();
  }, [localPubPem]);

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
                                onClick={()=>notify("email", email)}
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
                          autoComplete=""
                          variant="standard"
                          onChange={(e) => setEmailConfirm(e.target.value)}
                        />
                      </Grid>
                      <Grid container={true} xs={2}>
                        <Button sx={{ pb: 0 }} alignItems="stretch" style={{ display: "flex" }} variant="text">Submit</Button>
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
                        <Button sx={{ pb: 0 }} alignItems="stretch" style={{ display: "flex" }} variant="text">Submit</Button>
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
                      id="mobile"
                      name="mobile"
                      label="Enter your Mobile Phone Number registered for recovery verification"
                      fullWidth
                      autoComplete=""
                      variant="standard"
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    </Grid>
                    <Grid container={true} xs={2}>
                        <Button sx={{ pb: 0 }} alignItems="stretch" style={{ display: "flex" }} variant="text">Send Verification</Button>
                      </Grid>

                    </Grid>
                    <Grid container>
                      <Grid item xs={10}>
                    <TextField
                      required
                      id="mobileConfirm"
                      name="mobileConfirm"
                      label="Enter the verification code you received"
                      fullWidth
                      autoComplete=""
                      variant="standard"
                      onChange={(e) => setMobileConfirm(e.target.value)}
                    />
                    </Grid>
                    <Grid container={true} xs={2}>
                        <Button sx={{ pb: 0 }} alignItems="stretch" style={{ display: "flex" }} variant="text">Submit</Button>
                      </Grid>

                    </Grid>
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}>
            <Box sx={{ px: 2, pt: 0.5 }}>
                <Grid container alignItems="center" direction="row" justifyContent="center" spacing={16}>
                  <Grid item ><Tooltip title=""><Button variant="contained" disabled={true}>Recover</Button></Tooltip></Grid>
                  <Grid item ><Tooltip title=""><Button variant="contained" disabled={true} >Shard1</Button></Tooltip></Grid>
                  <Grid item><Tooltip title=""><Button variant="contained" disabled={true} >Shard2</Button></Tooltip></Grid>
                  <Grid item ><Tooltip title=""><Button variant="contained"  disabled={true}>Shard3</Button></Tooltip></Grid>
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
                      onChange={(e) => setSecretKey(e.target.value)}
                    />

            </Box>
            </Grid>
          </Grid>
        </React.Fragment>
      </Paper>
    </Container>
  );
}