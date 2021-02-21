import React,{useState,useContext} from 'react'
import {Context} from "../App"
import {Link as LLink,Hidden,Grid,MenuItem,TextField ,Select,Menu,Paper, Box,Container,makeStyles,AppBar ,Toolbar ,Avatar ,Typography ,Button,FormControl,InputLabel} from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link,useHistory} from "react-router-dom";

import "./searchbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faSortDown } from '@fortawesome/free-solid-svg-icons'
import {EmailIcon,FacebookIcon,LinkedinIcon, TwitterIcon,WhatsappIcon,} from "react-share";
import Mobilenav from "./mobilenav"
import {Work,Home,HomeWork,LibraryBooks,Info} from "@material-ui/icons"
const useStyles = makeStyles({
toolbar:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
},

list:{
    listStyle:"none",
    display:"flex",
    "& li":{
        padding:"0px 20px 0px 20px",
    },

},
search:{
    backgroundColor: '#272727',
     minHeight: '50vh',
     backgroundImage:"url("+process.env.PUBLIC_URL+"/searchbg1.jpg)",
     backgroundRepeat:"no-repeat",
     backgroundSize:"cover",
     backgroundPosition:"center",
     backgroundBlendMode:"multiply",
     display:"flex",
     justifyContent:"space-evenly",
     alignItems:"center",
     flexDirection:"column"
     
}
  });
  
export function Navbar() {
  const history=useHistory();
    const classes = useStyles();

    // this is for JOBS manu
      const [anchorEl, setAnchorEl] = React.useState(null);
    
      const handleClick = (event) => {

       
        setAnchorEl(event.currentTarget);

       
        
      };
    
      const handleClose = (title) => {

        setAnchorEl(null);
        
        if(typeof(title)!="object"){
          history.push(`/jobs/${title}`)
        }
        
        

      };

// this is for intership manu
      const [anchorEl1, setAnchorEl1] = React.useState(null);
    
      const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
      };
    
      const handleClose1 = (title) => {
        setAnchorEl1(null);

        if(typeof(title)!="object"){

          history.push(`/interships/${title}`)
        }
        
        
      };

// this is for courses manu
      const [anchorEl2, setAnchorEl2] = React.useState(null);
    
      const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
      };
    
      const handleClose2 = (title) => {
        setAnchorEl2(null);

        if(typeof(title)!="object"){
        history.push(`/courses/${title}`)
        }
      };

      // this is for Signin/signup btn
      const [anchorEl3, setAnchorEl3] = React.useState(null);
    
      const handleClick3 = (event) => {
        setAnchorEl3(event.currentTarget);
      };
    
      const handleClose3 = () => {
        setAnchorEl3(null);
      };


      // this is for user account
      const [anchorEl4, setAnchorEl4] = React.useState(null);
    
      const handleClick4 = (event) => {
        setAnchorEl4(event.currentTarget);
      };
    
      const handleClose4 = () => {
        setAnchorEl4(null);
      };

      const {userdata,setuserdata}=useContext(Context)
      
//console.log(userdata)
    return (
      <React.Fragment>

            {/* ....................navbar.....................  */}
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
              <Typography component={Link} to="/" variant="h5" style={{color:"white",fontWeight:"bold",textDecoration:"none"}}>LOGO</Typography>
<Hidden only={["xs","sm"]}>
              <ul className={classes.list}>
   <li><LLink onClick={handleClick} style={{textDecoration:"none",cursor:"pointer"}} color="inherit">JOBS &nbsp;<FontAwesomeIcon style={{paddingBottom:"3px"}} icon={faSortDown}/></LLink></li>
  <li><LLink onClick={handleClick1} style={{textDecoration:"none",cursor:"pointer"}} color="inherit">INTERSHIPS &nbsp;<FontAwesomeIcon style={{paddingBottom:"3px"}} icon={faSortDown}/></LLink></li>
<li><LLink onClick={handleClick2} style={{textDecoration:"none",cursor:"pointer"}}  color="inherit">COURSES &nbsp;<FontAwesomeIcon style={{paddingBottom:"3px"}} icon={faSortDown}/></LLink></li>
<li><LLink component={Link} to="aboutus" style={{textDecoration:"none",cursor:"pointer"}} color="inherit">ABOUT</LLink></li>
              </ul>

              <Menu
                elevation={3}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
            
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>handleClose("Web Developer")}>Web Developer</MenuItem>
        <MenuItem onClick={()=>handleClose("mobile Developer")}>Mobile Developer</MenuItem>
        <MenuItem onClick={()=>handleClose("Desktop Developer")}>desktop Developer</MenuItem>
        <MenuItem onClick={()=>handleClose("SEO")}>SEO</MenuItem>
        <MenuItem onClick={()=>handleClose("Graphic Desiger")}>Graphic Designer</MenuItem>
        <MenuItem onClick={()=>handleClose("Content Writer")}>Content Writer</MenuItem>
      </Menu>


      <Menu
                elevation={3}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
            
        id="simple-menu"
        anchorEl={anchorEl1}
        keepMounted
        open={Boolean(anchorEl1)}
        onClose={handleClose1}
      >
          <MenuItem onClick={()=>handleClose1("Graphic Desiger")}>Graphic Designer</MenuItem>
        <MenuItem onClick={()=>handleClose1("Content Writer")}>Content Writer</MenuItem>
        <MenuItem onClick={()=>handleClose1("Web Developer")}>Web Developer</MenuItem>
        <MenuItem onClick={()=>handleClose1("Desktop Developer")}>desktop Developer</MenuItem>
        <MenuItem onClick={()=>handleClose1("mobile Developer")}>Mobile Developer</MenuItem>
        <MenuItem onClick={()=>handleClose1("SEO")}>SEO</MenuItem>
      
      </Menu>




      <Menu
                elevation={3}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
            
        id="simple-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
      >
          
        <MenuItem onClick={()=>handleClose2("Desktop Developer")}>desktop Developer</MenuItem>
        <MenuItem onClick={()=>handleClose2("Desktop Developer")}>Graphic Designer</MenuItem>
        <MenuItem onClick={()=>handleClose2("Content Writer")}>Content Writer</MenuItem>
        <MenuItem onClick={()=>handleClose2("mobile Developer")}>Mobile Developer</MenuItem>
        <MenuItem onClick={()=>handleClose2("SEO")}>SEO</MenuItem>
        <MenuItem onClick={()=>handleClose2("Web Developer")}>Web Developer</MenuItem>
      
      
      </Menu>

         {userdata.login==true?
         <>
          <Avatar onClick={handleClick4} style={{cursor:"pointer"}}  src={userdata.img}/>

          <Menu
                elevation={3}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
            
        id="simple-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
      >
          
        <MenuItem component={Link} to="/account" onClick={handleClose4}>Profile</MenuItem>
        <MenuItem 
        onClick={handleClose4,()=>{
          localStorage.setItem("Ltoken","")
          setuserdata({
            email: "",
            id: "",
            companyname:"",
            password: "",
            img:"",
            login:false,
          })
        }}
        >Logout</MenuItem>
      
      
      </Menu>

          </>
        :
        <Button
        size="small"
          variant="contained" 
          color="secondary"
          onClick={handleClick3}
          endIcon={<FontAwesomeIcon style={{paddingBottom:"6px"}} icon={faSortDown}/>}
          >Software House</Button>
        
        }
             

<Menu
                elevation={3}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
            
        id="simple-menu"
        anchorEl={anchorEl3}
        keepMounted
        open={Boolean(anchorEl3)}
        onClose={handleClose3}
      >
          
        <MenuItem component={Link} to="/signin" onClick={handleClose3}>Sign in</MenuItem>
        <MenuItem component={Link} to="/signup" onClick={handleClose3}>Sign up</MenuItem>
     
      
      </Menu>

</Hidden>

<Hidden only={["xl","lg","md"]}>
<Mobilenav/>
</Hidden>



          </Toolbar>
        </AppBar>
        </React.Fragment>
    )
}




 export function Search(props) {

  var history=useHistory();
    const classes = useStyles();
    const [searchCatogary, setsearchCatogary] = useState("jobs")
    const [searchCatogary1, setsearchCatogary1] = useState("")

    var searchbtn=()=>{

      //console.log({input:searchCatogary,list:searchCatogary1})
      history.push(`/${searchCatogary}/${searchCatogary1}`)
    }
    return (
        <React.Fragment>
        <Container maxWidth="xl" disableGutters>
          <Typography component="div" className={classes.search} >

       <Typography variant="h3" style={{color:"white",fontWeight:"bold"}}>
         
         {/* FIND A JOB YOU <span style={{color:"#008140"}}>LOVE</span>. */}
         {props.name}
         </Typography>
      


     <Container maxWidth="md">
    <Grid container spacing={3} >
      <Grid item xs={12} md={6}>
        <Paper>
        <TextField size="small" value={searchCatogary1}  onChange={(event)=>{setsearchCatogary1(event.target.value);}}  fullWidth style={{backgroundColor:"white",padding:"2px"}} variant="outlined" placeholder="jobs,interships or courses" />
        </Paper>
      </Grid>   

      <Grid item xs={12} md={4}>
        <Paper>
        {/* <TextField size="small" fullWidth style={{backgroundColor:"white",padding:"5px"}} variant="outlined" placeholder="jobs,interships or courses" /> */}

        <FormControl size="small" variant="outlined" style={{padding:"2px"}} fullWidth >
        <Select
        
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
         value={searchCatogary}
          onChange={(event)=>{setsearchCatogary(event.target.value);}}
        >
          <MenuItem value="jobs">jobs</MenuItem>
          <MenuItem value="interships">interships</MenuItem>
          <MenuItem value="courses">courses</MenuItem>
        </Select>
        </FormControl>
        </Paper>
      </Grid>   

      <Grid item xs={12} md={2}>
        <Button onClick={searchbtn} fullWidth variant="contained" color="secondary" size="large">Search</Button>
      </Grid>   
      </Grid>  
      </Container>
    
     
       </Typography>
        </Container>
      </React.Fragment>
  
    )
}


export function Cards() {
  
  return (
    <React.Fragment>
    <Container maxWidth="xl">
      <Typography component="div" style={{ height: 'auto',paddingTop:"20px" }} >
      <Box fontWeight="700"  fontSize="h4.fontSize">WHAT IS YOUR DESTINATION
      &nbsp; <FontAwesomeIcon icon={faArrowRight}/>
        </Box>
        <br/>

               <Grid container spacing={2}>
                 
                   {[{icon:"https://www.svgrepo.com/show/190657/computer-mouse-mouse.svg",name:"JOBS" ,btn:"SEE JOBS",size:6,to:"/Jobs" },
                   {icon:"https://www.svgrepo.com/show/190738/learning-student.svg ",name:"INTERSHIPS" ,btn:"SEE INTERSHIPS", size:6,to:"/interships" },
                   {icon:"https://www.svgrepo.com/show/190651/graduation.svg",name:"COURSES" ,btn:"SEE COURSES" ,size:12 ,to:"/courses"}]
                   .map((i)=>
                   <Grid item xs={12} sm={i.size} md={4}>
                   <Paper  style={{ border:"5px solid #011842",paddingTop:"40px",height:"350px",borderRadius:"10px"}}>
                   <center>
                                        <Box >
                                     <img src={i.icon} width="150px" /></Box>
                                     <br/>
                                     <Box  fontWeight="700"  fontSize="h4.fontSize">{i.name}</Box>
                                     <br/>
                                     <Button component={Link} to={`${i.to}/all`} variant="contained" size="large" style={{borderRadius:"5px"}} color="secondary">{i.btn}</Button>
                                     </center>
                                        </Paper>
                                    </Grid>
                   )}
               </Grid>
<br/>
<hr/>

<Grid container component={Box} p={1}>

  <Grid item xs={12} sm={6} md={4}>
  <Box  fontWeight="700"  fontSize="h4.fontSize">LOGO</Box>
  </Grid>

  <Grid item xs={12} sm={6} md={4}>
  <Box  textAlign="center" fontSize="body1.fontSize">© 2020 Indeed
Accessibility at Indeed
</Box>
  </Grid>

  <Grid style={{display:"flex" ,justifyContent:"center"}} item xs={12} sm={12} md={4}>
  <TwitterIcon style={{marginRight:"20px"}} size={32} round={true} />
<FacebookIcon style={{marginRight:"20px"}} size={32} round={true} />
<WhatsappIcon style={{marginRight:"20px"}} size={32} round={true} />
<EmailIcon style={{marginRight:"20px"}} size={32} round={true} />
  </Grid>

</Grid>

      </Typography>


    </Container>
  </React.Fragment>
  )
}
