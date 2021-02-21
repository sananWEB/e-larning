import React,{createContext,useState,useEffect} from 'react'
import "./App.css"
import { createMuiTheme,ThemeProvider, responsiveFontSizes } from '@material-ui/core';
import {Navbar,Search,Cards} from "./components/Home"
import Jobs from "./components/Jobs"
import Intership from "./components/Intership"
import SignIn from "./components/Signin"
import SignUp from "./components/Signup"
import Courses from "./components/Courses"
import axios from "axios"
import SimpleBottomNavigation from "./components/Mobiledown"
import About from "./components/about"
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Account} from "./components/Account"
let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#334667',
      main: '#011842',
      dark: '#00102e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#005a2c',
      main: '#008140',
      dark: '#339a66',
      contrastText: '#fff',
    },
  },
  shape:"0px",
 // shadows:["none"]
});



theme = responsiveFontSizes(theme);
export const Context=createContext(null)
function App() {
  const [userdata, setuserdata] = useState({
    email: "",
        id: "",
        companyname:"",
        password: "",
        img:"",
        login:false,
  })

  useEffect( ()=>{
   
      if(!localStorage.getItem("Ltoken")){
       localStorage.setItem("Ltoken","")
      }
else{
  axios.get("/getdata",{headers:{token:localStorage.getItem("Ltoken")}})
  .then(res=>{
    //console.log(res.data)
    setuserdata({
    
      email: res.data.email,
      id: res.data.id,
      companyname: res.data.companyname,
      password: res.data.password,
      login:res.data.login,
      img:res.data.img,
    });
    })
}
},[])
  
  return (
    <Router>
    <ThemeProvider theme={theme}>
     
<Context.Provider value={{userdata,setuserdata}}>

  <SimpleBottomNavigation/>
       <Route exact path="/">
    <Navbar/>
    <Search name="FIND A JOB YOU LOVE."/>
    <Cards/>
    </Route>

    <Route path="/jobs/:id">
    <Jobs/>
    </Route>

    <Route path="/interships/:id">
<Intership/>
</Route>

<Route path="/signin">
<SignIn/>
</Route>
<Route path="/signup">
<SignUp/>
</Route>

<Route path="/courses/:id">
<Courses/>
</Route>


<Route  path="/account">
<Account/>
</Route>

<Route  path="/aboutus">
<About/>
</Route>


</Context.Provider>
    </ThemeProvider>
    </Router>
  )
}

export default App
