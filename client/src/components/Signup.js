import React,{useState,useContext} from 'react';
import {Context} from "../App"
import {useHistory} from "react-router-dom"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles,Snackbar } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {Navbar} from "./Home"
import { Link as LLink} from "react-router-dom";
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();


  const [formdara, setformdara] = useState({
    CompanyName:"",
    password:"",
    cpassword:"",
    email:"",
    weblink:""
    

  })
  const [file, setfile] = useState({})

  const change=(e)=>{
    setformdara({
      ...formdara,
      [e.target.name]:e.target.value
    })
  }

  const image=(e)=>{
    setfile(e.target.files[0])
  }


  const [response, setresponse] = React.useState({
    open:false,
    msg:null,
    msgscreen:null
  });
  const submit=(e)=>{
e.preventDefault();
//console.log(formdara)
const formData = new FormData();
formData.append('file', file);
formData.append('CompanyName',formdara.CompanyName);
formData.append('password',formdara.password);
formData.append('cpassword',formdara.cpassword);
formData.append('email',formdara.email);
formData.append('weblink',formdara.weblink);

axios.post("/signup",formData).then((res)=>{setresponse({
  open:true,
  msg:res.data.msg,
  msgscreen:res.data.msgscreen

})})

  }

  const handleClose = () => {

    setresponse({
      ...response,
      open:false
    });
  };
const history=useHistory();
  const {userdata,setuserdata}=useContext(Context)
  if(userdata.login==true){
history.push("/account")
  }
  return (
      <>
      <Navbar/>
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={submit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="CompanyName"
                value={formdara.CompanyName}
                onChange={change}
                variant="outlined"
                required
                fullWidth
                id="Company Name"
                label="Company Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={formdara.email}
                onChange={change}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                value={formdara.password}
                onChange={change}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                value={formdara.cpassword}
                onChange={change}
                label="ConfirmPassword"
                type="password"
                id="cpassword"
                autoComplete="current-password"
              />
              
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="weblink"
                value={formdara.weblink}
                onChange={change}
                label="WebSite link"
                type="text"
                
        
              />
            </Grid>
            <Grid item xs={12}>
              <label>
                Choose image
                </label>
                <br/>
                
            <input      
        accept="image/*"
        required
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={image}
      />
     

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={LLink} to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    <Snackbar open={response.open} autoHideDuration={4000} onClose={handleClose}>
  <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={response.msgscreen}>
      {response.msg}
    </MuiAlert>
    </Snackbar>
    </>
  );
}