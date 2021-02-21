import React,{useState,useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles,Snackbar } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {Navbar} from "./Home"
import { Link as LLink} from "react-router-dom";
import axios from "axios"
import MuiAlert from '@material-ui/lab/Alert';
import {Context} from "../App.js"

import {useHistory} from "react-router-dom";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const {userdata,setuserdata}=useContext(Context)

  const classes = useStyles();

  const [user, setuser] = useState({
    email:"",
    password:""
  })
  const [response, setresponse] = React.useState({
    open:false,
    msg:null,
    msgscreen:null
  });
  const change=(e)=>{
         setuser({
           ...user,
           [e.target.name]:e.target.value
         })
  }


 const history=useHistory();
const submit= async(e)=>{
  e.preventDefault();
  //console.log(user)
  await axios.post("/signin",user).then((res)=>{
    
    if(res.data.token){
      setresponse({
        open:true,
        msg:res.data.msg,
        msgscreen:res.data.msgscreen
      });
      
      setuserdata({
email: res.data.email,
        id:  res.data.id,
        companyname: res.data.companyname,
        password:  res.data.password,
        img:res.data.img,
        login:res.data.login,
      })

      localStorage.setItem("Ltoken",res.data.token)
      history.push("/account")

    }
    else{
      setresponse({
        open:true,
        msg:res.data.msg,
        msgscreen:res.data.msgscreen
      });
    }
    
})
}

const handleClose = () => {

  setresponse({
    ...response,
    open:false
  });
};
  
if(userdata.login==true){
  history.push("/account")

}
  return (
      <>
      <Navbar/>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={submit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={user.email}
            onChange={change}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={user.password}
            onChange={change}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {/* Forgot password? */}
              </Link>
            </Grid>
            <Grid item>
              <Link component={LLink} to="/signup" href="#" variant="body2">
                {"Don't have an account? Sign Up"}
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