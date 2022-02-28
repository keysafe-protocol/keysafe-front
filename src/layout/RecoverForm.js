import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';


export default function RecoverForm() {

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
                onChange={(e) => (e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant="outlined">Alert me</Button>
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
                onChange={(e) => (e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant="outlined">Prove me</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="piece1"
                name="piece1"
                label="Private Key Piece1"
                fullWidth
                autoComplete=""
                variant="standard"
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
                onChange={(e) => (e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant="outlined">Alert me</Button>
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
                onChange={(e) => (e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant="outlined">Prove me</Button>
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
                onChange={(e) => (e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant="outlined">Prove me</Button>
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
                onChange={(e) => (e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined">Recover</Button>
            </Grid>
          </Grid>
        </React.Fragment>
      </Paper>
    </Container>
  );
}