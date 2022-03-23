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


export default function RegisterForm(props) {

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [localPubKey, setLocalPubKey] = useState("");
  const [localKeyPair, setLocalKeyPair] = useState("");
  const [shareKey, setShareKey] = useState("");
  const [seal1, setSeal1] = useState("");
  const [seal2, setSeal2] = useState("");
  const [seal3, setSeal3] = useState("");
  const [submitText, setSubmitText] = useState("Submit");

  function hashCond(cond) {
    var md = window.forge.md.sha256.create();
    md.update(cond);
    return md.digest().toHex();
  }

  function encrypt(share, shareKey) {
    console.log(shareKey);
    try {
      var aesKey = window.forge.util.hexToBytes(shareKey);
      var cipher = window.forge.cipher.createCipher('AES-ECB', aesKey);
      var iv = window.forge.random.getBytesSync(16);
      cipher.start({
        tagLength: 256
      });
      cipher.update(window.forge.util.createBuffer(share));
      cipher.finish();
      return cipher.output.toHex();  
    } catch (err) {
      console.log(err);
      return "";
    }
  }

  function sealPiece(t, cond, share) {
    console.log("piece ", share);
    console.log("share Key ", shareKey);
    var h;
    if (t === 'password') {
      //TODO: remove hard code
      h = hashCond(email + password);
    } else {
      h = hashCond(cond);
    }
    var data = {
      'pubkey': localPubKey,
      'h': h,
      'secret': encrypt(share, shareKey),
      'text': share
    }
    const axios = require('axios').default;
    axios.post('/seal', data)
      .then((result) => {
        if (t === 'email') {
          setSeal1(1);
        } else if (t === 'mobile') {
          setSeal2(1);
        } else {
          setSeal3(1);
        }
      });
  }

  function seal() {
    if (localPubKey === "") {
      alert("Local Key is not ready, please refresh the page!");
      return;
    }
    if (secretKey === "") {
      alert("Please set private key to store.");
      return;
    }
    const secretHex = window.secrets.str2hex(secretKey);
    var shares = window.secrets.share(secretHex, 3, 2);
    sealPiece('email', email, shares[0]);
    sealPiece('mobile', mobile, shares[1]);
    sealPiece('password', password, shares[2]);
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
    if (seal1 + seal2 + seal3 == 3) {
      setSubmitText("Submit Completed!")
      alert("Seal Completed.");
    }    
  }, [seal1, seal2, seal3]);

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
            <Box sx={{px:2 , pt:0.5}}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
            Registration
          </Typography>
          <Typography variant="h10" gutterBottom>
            - Register your private keys to Keysafe Network. After registered, 
              you can always recover your confidential data with any 2 of 3
              conditions fulfilled. Remember your conditions.
          </Typography>
          </Box>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <Box sx={{px:2, pt:0.5}}>
              <Chip label="2-of-3 Threshold Mode" size="large" color="warning" variant="outlined"/>
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
                    <TextField
                      required
                      id="cell"
                      name="cell"
                      label="Please input your Mobile Phone Number here"
                      fullWidth
                      autoComplete=""
                      variant="standard"
                      onChange={(e) => setMobile(e.target.value)}
                    />
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
                    <Button variant="contained" disabled={seal1+seal2+seal3===3}
                      onClick={seal}>
                        {submitText}
                    </Button>
                  </Grid>
                  <Grid item >
                    <Button variant="contained" disabled={seal1===""}>
                        Shard1
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" disabled={seal2===""}>
                      Shard2
                    </Button>
                  </Grid>
                  <Grid item >
                    <Button variant="contained"  disabled={seal3===""}>
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


