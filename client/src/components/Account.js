import React,{useContext,useEffect, useState} from 'react'
import {BrowserRouter as Router,Route, Switch, useHistory,useRouteMatch,Link as LLink, useParams} from "react-router-dom"
import {Context} from "../App"
import {Navbar} from "./Home"
import MuiAlert from '@material-ui/lab/Alert';
import {CssBaseline,Card,CardHeader,CardActions,Container,Select,Snackbar,InputLabel,FormControl,TextField,Grid,CardMedia,CardContent,Box,Typography,makeStyles,Button,MenuItem,Menu,Avatar, Paper} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import {faCalendarAlt,faBriefcase,faMoneyBillWave,faClock} from '@fortawesome/free-solid-svg-icons'



export function Account() {   
    const {userdata,setuserdata}=useContext(Context)
const history=useHistory();
if(userdata.login==false){
    history.push("/signin")
}

const useStyles = makeStyles((theme) => ({
    container:{
       // backgroundColor:"#cfe8fc" ,
        height:"calc(100vh - 64px)" ,
        display:"flex",
       
        alignItems:"center",
        flexDirection:"column",
        paddingTop:"80px"
    },
    large: {
      width: theme.spacing(19),
      height: theme.spacing(19),
    },
  }));

  const classes = useStyles();


     // this is for edit/view
     const [anchorEl, setAnchorEl] = React.useState(null);
    
     const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
     };
   
     const handleClose = () => {
       setAnchorEl(null);
     };

// this is for add services
     const [anchorEl1, setAnchorEl1] = React.useState(null);
   
     const handleClick1 = (event) => {
       setAnchorEl1(event.currentTarget);
     };
   
     const handleClose1 = () => {
       setAnchorEl1(null);
     };


    
        const path=useRouteMatch().path;
        const url=useRouteMatch().url;
  
    
    return (
    <>
<Navbar/>
<Route exact  path={`${path}`}>
<React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
<Typography component="div" className={classes.container}>

<Avatar alt="Remy Sharp" src={userdata.img} className={classes.large} />
<center>
<Typography variant="h3" style={{fontWeight:"bold",margin:"20px"}}>Welcome <span style={{textDecoration:"underline",textDecorationColor:"#011842"}}>{userdata.companyname}</span></Typography>
</center>

<Grid container spacing={3}>
    <Grid item xs={12} sm={6} md={4} >
        <Button component={LLink} to={`${url}/profileedit`} fullWidth variant="contained" color="primary">Profile</Button>
    </Grid >
    <Grid item xs={12} sm={6} md={4}>
        <Button onClick={handleClick} endIcon={<FontAwesomeIcon style={{paddingBottom:"5px"}} icon={faSortDown}/>} fullWidth variant="contained" color="primary">Add Service</Button>

        <Menu            
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
        <MenuItem component={LLink} to={`${url}/addjobs`} onClick={handleClose}>Jobs</MenuItem>
      <MenuItem component={LLink} to={`${url}/addinterships`}  onClick={handleClose}>Interships</MenuItem>
        <MenuItem component={LLink} to={`${url}/addcourse`}  onClick={handleClose}>Courses</MenuItem>
      </Menu>
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
        <Button onClick={handleClick1} endIcon={<FontAwesomeIcon style={{paddingBottom:"5px"}} icon={faSortDown}/>}  fullWidth variant="contained" color="primary">Edit/View Service</Button>


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
        <MenuItem to={`${url}/editjob`} component={LLink} onClick={handleClose1}>Jobs</MenuItem>
        <MenuItem to={`${url}/editintership`} component={LLink} onClick={handleClose1}>Interships</MenuItem>
        <MenuItem to={`${url}/coursepage`} component={LLink} onClick={handleClose1}>Courses</MenuItem>
      </Menu>
    </Grid>
    
</Grid>
</Typography>
      </Container>   
    </React.Fragment>
    </Route>
          <Route exact  path={`${path}/profileedit`}>
          <EditProfile/>
          </Route>

          <Route exact  path={`${path}/addjobs`}>
          <Addjobs/>
          </Route>
          <Route exact  path={`${path}/addinterships`}>
          <Addinterships/>
          </Route>
          <Route exact  path={`${path}/addcourse`}>
          <Addcourse/>
          </Route>
          
          <Route exact  path={`${path}/editjob`}>
          <Editjob/>
          </Route>
          

          <Route exact  path={`${path}/editjob/:id`}>
          <Editjobform/>
          </Route>

          <Route exact  path={`${path}/editintership`}>
          <Editintership/>
          </Route>

          <Route exact  path={`${path}/editintership/:id`}>
          <Intershipformedit/>
          </Route>
          
          <Route exact  path={`${path}/coursepage`}>
          <Coursepage/>
          </Route>

          <Route exact  path={`${path}/coursepage/:id`}>
          <Courseform/>
          </Route>

           </>
    )
}

 

 function EditProfile() {
    const {userdata,setuserdata}=useContext(Context)
     const [state, setstate] = useState({
         email:userdata.email,
         password:userdata.password,
         companyname:userdata.companyname,
         userID:userdata.id
     })

     const change=(e)=>{
        setstate({
            ...state,
            [e.target.name]:e.target.value
        })
     }
     const history=useHistory();
   const [msg, setmsg] = useState("")
   const [img, setimg] = useState("")
     const submit= (e)=>{
        e.preventDefault();
        const formData = new FormData();

        formData.append("companyname",state.companyname)
        formData.append("email",state.email)
        formData.append("password",state.password)
        formData.append("img",img)
        formData.append("userid",state.userID)
         
     
         axios.post("/updateuser",formData)
        .then((res)=>{setmsg(res.data.msg);
        localStorage.setItem("Ltoken",res.data.token);
        history.push("/account")
        window.location.reload();
        
        })

     }

     const imageChange=(e)=>{
        setimg(e.target.files[0])
     }
     
    return (
        <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xs">
        <Typography component="div" style={{ marginTop:"100px", height: '100vh' }}>
            <Typography variant="h4" style={{padding:"20px",fontWeight:"bold",textDecorationColor:"#011842",color:"#011842",textDecoration:"underline"}}>EDIT PROFILE</Typography>

            <form onSubmit={submit}>




            <TextField name="companyname" onChange={change} required type="text" margin="normal" fullWidth  InputLabelProps={{shrink: true,
          }} label="CompanyName" variant="outlined" value={state.companyname} />



        
            <TextField name="password" onChange={change} required type="password" fullWidth margin="normal"  InputLabelProps={{
            shrink: true,
          }} label="Password" variant="outlined" value={state.password} />
            
          
   <TextField disabled type="email" fullWidth  margin="normal" InputLabelProps={{  shrink: true,
          }} label="Email" variant="outlined" value={state.email} />
          <label>Update image</label><br/>
        <input onChange={imageChange} type="file"/>

<Button type="submit" style={{marginTop:"10px"}} variant="contained" color="secondary" fullWidth>UPDATE</Button>
            </form>
        </Typography>
      </Container>
    </React.Fragment>
    )
}







function Addjobs() {
  


  const {userdata,setdatauser}=useContext(Context)
  
  const [data, setdata] = useState({
    jobtitle:"",
city:"",
catogary:"",
experience:"",
timing:"",
salary:"",
gender:"",
education:"",
position:"",
apply:"",
skills:"",
discription:"",
companyname:userdata.companyname,
accountID:userdata.id,
img:userdata.img,
  })
  const change=(e)=>{
    setdata({
      ...data,
      [e.target.name]:e.target.value
    })

  }
const [msg, setmsg] = useState("")
const [open, setopen] = useState(false)
const handleClose = () => {

  setopen(false)
};
  const submit= async(e)=>{
e.preventDefault();

 await axios.post("/addjob",data).then((res)=>{setmsg(res.data);setopen(true)})
  }



  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
      <Typography component="div" style={{minHeight: 'calc(100vh - 64px)'}}>

      <Typography variant="h4" style={{padding:"20px",fontWeight:"bold",textDecorationColor:"#011842",color:"#011842",textDecoration:"underline"}}>ADD JOBS</Typography>

      <form onSubmit={submit}>
<Grid container spacing={2}>

  <Grid item md={8} sm={8} xs={12}>
  <TextField value={data.jobtitle} name="jobtitle" onChange={change} fullWidth label="Job Title" required variant="outlined"/>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <TextField value={userdata.companyname} disabled name="companyname" fullWidth label="CompanyName" required variant="outlined"/>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Select City</InputLabel>
        <Select
        value={data.city}
          native
          name="city" onChange={change}
          inputProps={{
            name: 'city',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value="Peshawar">Peshawar</option>
          <option value="lahore">lahore</option>
          <option value="Karachi">Karachi</option>
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Catogary</InputLabel>
        <Select
          native
          value={data.catogary}
          name="catogary" onChange={change}
          inputProps={{
            name: 'catogary',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="Web Developer">Web Developer</option>
          <option  value="mobile Developer">mobile Developer</option>
          <option  value="Desktop Developer">Desktop Developer</option>
          <option  value="SEO">SEO</option>
          <option  value="Graphic Desiger">Graphic Desiger</option>
          <option  value="Content Writer">Content Writer</option>
          
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Experience</InputLabel>
        <Select
        
          native
          value={data.experience}
          name="experience" onChange={change}
          inputProps={{
            name: 'experience',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          {[1,2,3,4,5,6,7,8,9,10].map((i)=>
   
   i==1?<option aria-label="None" value={`${i} Year`}>{i} Year</option>:<option aria-label="None" value={`${i} Years`}>{i} Years</option>
  
            )}
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Timimg</InputLabel>
        <Select
          native
          value={data.timing}
          name="timing" onChange={change}
          inputProps={{
            name: 'timing',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="fulltime" >Full-Time</option>
          <option  value="halftime" >Half-Time</option>
          
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Salary</InputLabel>
        <Select
          native
          value={data.salary}
          name="salary" onChange={change}
          inputProps={{
            name: 'salary',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="10k-20k">10k-20k</option>
          <option  value="20k-40k">20k-40k</option>
          <option  value="50k-70k">50k-70k</option>
          <option  value="80k-100k">80k-100k</option>
          <option  value="110k-140k">110k-140k</option>
          <option  value="150k-180k">150k-180k  </option>
          
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
        <Select
          native
          value={data.gender}
          name="gender" onChange={change}
          inputProps={{
            name: 'gender',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="No Preference">No Preference</option>
          <option  value="Man">Man</option>
          <option  value="Woman">Woman</option>
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Minimum Education</InputLabel>
        <Select
          native
          value={data.education}
          name="education" onChange={change}
          inputProps={{
            name: 'education',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="Bachelors">Bachelors</option>
          <option  value="Master">Master</option>
          <option  value="PhD">PhD</option>
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <TextField name="position" value={data  .position} onChange={change} fullWidth label="Total Positions" required variant="outlined"/>
  </Grid>
  <Grid item md={4} sm={4} xs={12}>
  <TextField name="apply" onChange={change} type="date" fullWidth label="Apply Before"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>
  
  <Grid item md={12} sm={12} xs={12}>
  <TextField
value={data.skills}
name="skills" onChange={change}
  helperText="Note:-HTML,CSS,JS"
  type="text" fullWidth label="Skills"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>


  <Grid item md={12} sm={12} xs={12}>
  <TextField
  multiline
  value={data.discription}
  margin="normal"
  required
  rows={6}
  
  name="discription" onChange={change}
  type="text" fullWidth label="Discription"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>
</Grid>
<div style={{display:"flex",justifyContent:"flex-end"}}>
<Button type="submit" style={{marginBottom:"10px"}} color="secondary" variant="contained">Create Job</Button>
</div>


</form>   
      </Typography>
    </Container>

    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
  <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
      {msg}
    </MuiAlert>
    </Snackbar>

  </React.Fragment>
  )
}





  function Addinterships() {
  


  const {userdata,setdatauser}=useContext(Context)
  
  const [data, setdata] = useState({
    intershiptitle:null,
city:null,
catogary:null,
Intershiptype:null,
timing:null,
salary:null,
gender:null,
position:null,
apply:null,
skills:null,
discription:null,
companyname:userdata.companyname,
accountID:userdata.id,
img:userdata.img,
  })
  const change=(e)=>{
    setdata({
      ...data,
      [e.target.name]:e.target.value
    })
  }



  const [msg, setmsg] = useState("")
const [open, setopen] = useState(false)
const handleClose = () => {

  setopen(false)
};


  const submit= async(e)=>{
e.preventDefault();
console.log(data)

 await axios.post("/Addinterships",data).then((res)=>{setmsg(res.data);setopen(true)})
  }

const [salary, setsalary] = useState(false)


  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
      <Typography component="div" style={{minHeight: 'calc(100vh - 64px)'}}>

      <Typography variant="h4" style={{padding:"20px",fontWeight:"bold",textDecorationColor:"#011842",color:"#011842",textDecoration:"underline"}}>ADD INTERSHIP</Typography>

      <form onSubmit={submit}>
<Grid container spacing={2}>

  <Grid item md={8} sm={8} xs={12}>
  <TextField value={data.intershiptitle} name="intershiptitle" onChange={change} fullWidth label="Intership Title" required variant="outlined"/>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <TextField value={userdata.companyname} disabled name="companyname" fullWidth label="CompanyName" required variant="outlined"/>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Select City</InputLabel>
        <Select
        value={data.city}
          native
          name="city" onChange={change}
          inputProps={{
            name: 'city',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value="Peshawar">Peshawar</option>
          <option value="lahore">lahore</option>
          <option value="Karachi">Karachi</option>
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Catogary</InputLabel>
        <Select
          native
          value={data.catogary}
          name="catogary" onChange={change}
          inputProps={{
            name: 'catogary',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="Web Developer">Web Developer</option>
          <option  value="mobile Developer">mobile Developer</option>
          <option  value="Desktop Developer">Desktop Developer</option>
          <option  value="SEO">SEO</option>
          <option  value="Graphic Desiger">Graphic Desiger</option>
          <option  value="Content Writer">Content Writer</option>
          
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Intership Type</InputLabel>
        <Select
        
          native
          value={data.Intershiptype}
          name="Intershiptype" onChange={(e)=>{change(e);
            if(e.target.value=="UnPaid"){
              setsalary(true)
            }
            else{
              setsalary(false)
            }
            
          }}
          inputProps={{
            name: 'Intershiptype',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  aria-label="None" value="Paid">Paid</option>
          <option  aria-label="None" value="UnPaid">UnPaid</option>
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Timimg</InputLabel>
        <Select
          native
          value={data.timing}
          name="timing" onChange={change}
          inputProps={{
            name: 'timing',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="8AM-2PM" >8AM-2PM</option>
          <option  value="3PM-8PM" >3PM-8PM</option>
          
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Salary</InputLabel>
        <Select
        disabled={salary}
          native
          value={data.salary}
          name="salary" onChange={change}
          inputProps={{
            name: 'salary',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="10k">10k</option>
          <option  value="20k">20k</option>
          <option  value="30k">30k</option>
          <option  value="40k">40k</option>
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
        <Select
          native
          value={data.gender}
          name="gender" onChange={change}
          inputProps={{
            name: 'gender',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="No Preference">No Preference</option>
          <option  value="Man">Man</option>
          <option  value="Woman">Woman</option>
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={6} sm={6} xs={12}>
  <TextField name="position" value={data  .position} onChange={change} fullWidth label="Total Positions" required variant="outlined"/>
  </Grid>
  <Grid item md={6} sm={6} xs={12}>
  <TextField name="apply" onChange={change} type="date" fullWidth label="Apply Before"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>
  
  <Grid item md={12} sm={12} xs={12}>
  <TextField
value={data.skills}
name="skills" onChange={change}
  helperText="Note:-HTML,CSS,JS"
  type="text" fullWidth label="Skills"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>


  <Grid item md={12} sm={12} xs={12}>
  <TextField
  multiline
  value={data.discription}
  margin="normal"
  required
  rows={6}
  
  name="discription" onChange={change}
  type="text" fullWidth label="Discription"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>
</Grid>
<div style={{display:"flex",justifyContent:"flex-end"}}>
<Button type="submit" style={{marginBottom:"10px"}} color="secondary" variant="contained">Create Interships</Button>
</div>


</form>   
        


      </Typography>
    </Container>
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
  <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
      {msg}
    </MuiAlert>
    </Snackbar>
    
  </React.Fragment>
  )
}







function Addcourse() {
  


  const {userdata,setdatauser}=useContext(Context)
  
  const [data, setdata] = useState({
    coursetitle:null,
city:null,
catogary:null,
price:null,
timing:null,
instractorname:null,
Requirements:null,
learn:null,
content:null,
discription:null,
accountID:userdata.id,
number:null,
  })
  const change=(e)=>{
    setdata({
      ...data,
      [e.target.name]:e.target.value
    })
  }



  const [msg, setmsg] = useState("")
const [open, setopen] = useState(false)
const [selectimg, setselectimg] = useState({})


const img=(e)=>{
setselectimg(e.target.files[0])
  //console.log(e.target.files[0])
}
const handleClose = () => {
  setopen(false)
};


  const submit= async(e)=>{
e.preventDefault();
const formData=new FormData();
formData.append("coursetitle",data.coursetitle)
formData.append("city",data.city)
formData.append("catogary",data.catogary)
formData.append("price",data.price)
formData.append("timing",data.timing)
formData.append("instractorname",data.instractorname)
formData.append("Requirements",data.Requirements)
formData.append("learn",data.learn)
formData.append("content",data.content)
formData.append("discription",data.discription)
formData.append("accountID",userdata.id)
formData.append("companyname",userdata.companyname)
formData.append("selectimg",selectimg)
formData.append("number",userdata.number)



 await axios.post("/addcourse",formData).then((res)=>{setmsg(res.data);setopen(true)})
  }



  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
      <Typography component="div" style={{minHeight: 'calc(100vh - 64px)'}}>

      <Typography variant="h4" style={{padding:"20px",fontWeight:"bold",textDecorationColor:"#011842",color:"#011842",textDecoration:"underline"}}>ADD COURSE</Typography>

      <form onSubmit={submit}>
<Grid container spacing={2}>

  <Grid item md={8} sm={8} xs={12}>
  <TextField value={data.coursetitle} name="coursetitle" onChange={change} fullWidth label="Course Title" required variant="outlined"/>
  </Grid>
  
  <Grid item md={4} sm={4} xs={12}>
  <TextField value={userdata.companyname} disabled name="companyname" fullWidth label="CompanyName" required variant="outlined"/>
  </Grid>
  <Grid item md={4} sm={4} xs={12}>
  <TextField onChange={change} value={userdata.instractorname}  name="instractorname" fullWidth label="Instractor Name" required variant="outlined"/>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <TextField onChange={change} value={userdata.price}  name="price" fullWidth label="Price" required variant="outlined" helperText=" Example:-10000 PKR"/>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Select City</InputLabel>
        <Select
        value={data.city}
          native
          name="city" onChange={change}
          inputProps={{
            name: 'city',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value="Peshawar">Peshawar</option>
          <option value="lahore">lahore</option>
          <option value="Karachi">Karachi</option>
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Catogary</InputLabel>
        <Select
          native
          value={data.catogary}
          name="catogary" onChange={change}
          inputProps={{
            name: 'catogary',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="Web Developer">Web Developer</option>
          <option  value="mobile Developer">mobile Developer</option>
          <option  value="Desktop Developer">Desktop Developer</option>
          <option  value="SEO">SEO</option>
          <option  value="Graphic Desiger">Graphic Desiger</option>
          <option  value="Content Writer">Content Writer</option>
          
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Timimg</InputLabel>
        <Select
          native
          value={data.timing}
          name="timing" onChange={change}
          inputProps={{
            name: 'timing',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="10AM-11AM" >10AM-11AM</option>
          <option  value="3PM-4PM" >3PM-4PM</option>
          
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
    <TextField  value={data.number}
          name="number" onChange={change} fullWidth variant="outlined" helperText="Example:- +923217836328" label="WhatsApp Number" required type="number"/>
  </Grid>
  

  <Grid item md={12} sm={12} xs={12}>
  <TextField
  multiline
  value={data.discription}
  margin="normal"
  required
  rows={6}
  
  name="discription" onChange={change}
  type="text" fullWidth label="Discription"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>

  <Grid item md={12} sm={12} xs={12}>
  <TextField
  multiline
  value={data.learn}
  margin="normal"
  required
  rows={6}
  
  name="learn" onChange={change}
  type="text" fullWidth label=" What you'll learn"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>



  <Grid item md={12} sm={12} xs={12}>
  <TextField
  multiline
  value={data.content}
  margin="normal"
  required
  rows={6}
  
  name="content" onChange={change}
  type="text" fullWidth label="Course Content"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>

  


  <Grid item md={12} sm={12} xs={12}>
  <TextField
  multiline
  value={data.Requirements}
  margin="normal"
  required
  rows={6}
  
  name="Requirements" onChange={change}
  type="text" fullWidth label="Requirements"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>

</Grid>
<div style={{display:"flex",justifyContent:"space-between"}}>
<input required accept="image/*" type="file" onChange={img}/>
<Button type="submit" style={{marginBottom:"10px"}} color="secondary" variant="contained">Create Course</Button>
</div>


</form>   
        


      </Typography>
    </Container>
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
  <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
      {msg}
    </MuiAlert>
    </Snackbar>
    
  </React.Fragment>
  )
}




function Editjob() {

const [jobs, setjobs] = useState([])
  useEffect(()=>{
    axios.get("/getjobs").then((res)=>{setjobs(res.data.filter((i)=>{
      return i.accountID==userdata.id
    }))})
  
  },[])
  const {userdata,setuserdata}=useContext(Context)
  

  
  // var jobss=jobs.filter((i)=>{
  //   return i.accountID==userdata.id
  // })


  const path=useRouteMatch().path
  const url=useRouteMatch().url

  const ddelete=(id)=>{

  axios.post("/deletejob",{id:id})
 axios.get("/getjobs").then((res)=>{setjobs(res.data.filter((i)=>{
  return i.accountID==userdata.id
}))})
  }
  return (
    <>
   
    <Container maxWidth="xl">
        <Typography component="div" style={{ height: '100vh' }}>
          <Typography variant="h5" style={{paddingTop:"15px"}}><b>View/Edit/Delete Jobs</b></Typography>
          <br/>

          {jobs.length==0?
          <Container maxWidth="sm">
          <Paper component={Box} p="12px">
          <Typography align="center" variant="body2">No Jobs has have Register</Typography>
          </Paper>
          </Container>
          :
          
          <Grid container spacing={2}>
          {jobs.map((i)=>
        <Grid item xs={12} sm={6} md={4} >
<Card  >
<CardHeader
avatar={
  <Avatar>R</Avatar>
}
title={i.jobtitle}
subheader={`${i.companyname} ${i.city}`}
/>

<Typography style={{paddingLeft:"15px"}} variant="body2" component="p">
{i.discription.slice(0,219)}....
</Typography>
<div>

   <div style={{display:"flex",marginTop:"5px"}}>
<Typography title="last Date" style={{paddingLeft:"15px"}} color="textSecondary" variant="body2" component="p"><FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp;{i.apply}</Typography>

<Typography title="Experience" style={{paddingLeft:"15px"}} color="textSecondary" variant="body2" component="p"><FontAwesomeIcon icon={faBriefcase}/>&nbsp;&nbsp;{i.experience}</Typography>

<Typography title="Salary" style={{paddingLeft:"15px"}} color="textSecondary" variant="body2" component="p"><FontAwesomeIcon icon={faMoneyBillWave}/>&nbsp;&nbsp;{i.salary}</Typography>

<Typography title="Timming" style={{paddingLeft:"15px"}} color="textSecondary" variant="body2" component="p"><FontAwesomeIcon icon={faClock}/>&nbsp;&nbsp;{i.timing}</Typography>  
   </div>
  <CardActions style={{display:"flex",justifyContent:"flex-end"}}>
<Button to={`${url}/${i._id}`}  component={LLink}   size="small" variant="outlined" color="primary">Edit</Button>
<Button  onClick={()=>ddelete(i._id)}  size="small" variant="contained" color="primary">Delete</Button>
</CardActions>

</div>

</Card>
</Grid>
      
    )}
    </Grid>        
          
          }
           
        </Typography>
      </Container>
      

    
    </>
  )
}


function Editjobform() {

  const id=useParams().id
  const {userdata,setdatauser}=useContext(Context)




  useEffect( async()=>{
   await axios.post("/jobdataput",{id:id}).then((ress)=>{
     
    setdata({
      jobtitle:ress.data[0].jobtitle,
      city:ress.data[0].city,
      catogary:ress.data[0].catogary,
      experience:ress.data[0].experience,
      timing:ress.data[0].timing,
      salary:ress.data[0].salary,
      gender:ress.data[0].gender,
      education:ress.data[0].education,
      position:ress.data[0].position,
      apply:ress.data[0].apply,
      skills:ress.data[0].skills,
      discription:ress.data[0].discription,
      companyname:userdata.companyname,
      accountID:userdata.id,
      img:userdata.img,
      productID:id
    })
  
  })
  },[])


  const [data, setdata] = useState({
    jobtitle:"",
city:"",
catogary:"",
experience:"",
timing:"",
salary:"",
gender:"",
education:"",
position:"",
apply:"",
skills:"",
discription:"",
companyname:userdata.companyname,
accountID:userdata.id,
img:userdata.img,
productID:id
  })


  //console.log(data)

  const change=(e)=>{
    setdata({
      ...data,
      [e.target.name]:e.target.value
    })

  }
const [msg, setmsg] = useState("")
const [open, setopen] = useState(false)
const handleClose = () => {

  setopen(false)
};
  const submit= async(e)=>{
e.preventDefault();

 await axios.post("/updatejob",data).then((res)=>{setmsg(res.data);setopen(true)})
  }



  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
      <Typography component="div" style={{minHeight: 'calc(100vh - 64px)'}}>

      <Typography variant="h4" style={{padding:"20px",fontWeight:"bold",textDecorationColor:"#011842",color:"#011842",textDecoration:"underline"}}>UPDATE JOB</Typography>

      <form onSubmit={submit}>
<Grid container spacing={2}>

  <Grid item md={8} sm={8} xs={12}>
  <TextField value={data.jobtitle} name="jobtitle" onChange={change} fullWidth label="Job Title" required variant="outlined"/>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <TextField value={userdata.companyname} disabled name="companyname" fullWidth label="CompanyName" required variant="outlined"/>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Select City</InputLabel>
        <Select
        value={data.city}
          native
          name="city" onChange={change}
          inputProps={{
            name: 'city',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value="Peshawar">Peshawar</option>
          <option value="lahore">lahore</option>
          <option value="Karachi">Karachi</option>
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Catogary</InputLabel>
        <Select
          native
          value={data.catogary}
          name="catogary" onChange={change}
          inputProps={{
            name: 'catogary',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="Web Developer">Web Developer</option>
          <option  value="mobile Developer">mobile Developer</option>
          <option  value="Desktop Developer">Desktop Developer</option>
          <option  value="SEO">SEO</option>
          <option  value="Graphic Desiger">Graphic Desiger</option>
          <option  value="Content Writer">Content Writer</option>
          
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Experience</InputLabel>
        <Select
        
          native
          value={data.experience}
          name="experience" onChange={change}
          inputProps={{
            name: 'experience',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          {[1,2,3,4,5,6,7,8,9,10].map((i)=>
   
   i==1?<option aria-label="None" value={`${i} Year`}>{i} Year</option>:<option aria-label="None" value={`${i} Years`}>{i} Years</option>
  
            )}
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Timimg</InputLabel>
        <Select
          native
          value={data.timing}
          name="timing" onChange={change}
          inputProps={{
            name: 'timing',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="fulltime" >Full-Time</option>
          <option  value="halftime" >Half-Time</option>
          
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Salary</InputLabel>
        <Select
          native
          value={data.salary}
          name="salary" onChange={change}
          inputProps={{
            name: 'salary',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="10k-20k">10k-20k</option>
          <option  value="20k-40k">20k-40k</option>
          <option  value="50k-70k">50k-70k</option>
          <option  value="80k-100k">80k-100k</option>
          <option  value="110k-140k">110k-140k</option>
          <option  value="150k-180k">150k-180k  </option>
          
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
        <Select
          native
          value={data.gender}
          name="gender" onChange={change}
          inputProps={{
            name: 'gender',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="No Preference">No Preference</option>
          <option  value="Man">Man</option>
          <option  value="Woman">Woman</option>
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Minimum Education</InputLabel>
        <Select
          native
          value={data.education}
          name="education" onChange={change}
          inputProps={{
            name: 'education',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="Bachelors">Bachelors</option>
          <option  value="Master">Master</option>
          <option  value="PhD">PhD</option>
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <TextField name="position" value={data  .position} onChange={change} fullWidth label="Total Positions" required variant="outlined"/>
  </Grid>
  <Grid item md={4} sm={4} xs={12}>
  <TextField name="apply" onChange={change} type="date" fullWidth label="Apply Before"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>
  
  <Grid item md={12} sm={12} xs={12}>
  <TextField
value={data.skills}
name="skills" onChange={change}
  helperText="Note:-HTML,CSS,JS"
  type="text" fullWidth label="Skills"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>


  <Grid item md={12} sm={12} xs={12}>
  <TextField
  multiline
  value={data.discription}
  margin="normal"
  required
  rows={6}
  
  name="discription" onChange={change}
  type="text" fullWidth label="Discription"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>
</Grid>
<div style={{display:"flex",justifyContent:"flex-end"}}>
<Button type="submit" style={{marginBottom:"10px"}} color="secondary" variant="contained">UPDATE Job</Button>
</div>


</form>   
      </Typography>
    </Container>

    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
  <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
      {msg}
    </MuiAlert>
    </Snackbar>

  </React.Fragment>
  )
}




function Editintership() {

const {userdata,setuserdata}=useContext(Context)
const url=useRouteMatch().url
const [intership, setintership] = useState([])
  useEffect(()=>{

    axios.get("/getintership").then((res)=>{setintership(res.data.filter((i)=>{
      return i.accountID==userdata.id
     })
   )})
  },[])



  const ddelete=(id)=>{

    axios.post("/deleteintersgip",{id:id})
   axios.get("/getintership").then((res)=>{setintership(res.data.filter((i)=>{
    return i.accountID==userdata.id
   })
 )})

  }
  

  return (
    <>
      <Container maxWidth="xl">
        <Typography component="div" style={{ height: '100vh' }}>
          <Typography variant="h5" style={{paddingTop:"15px"}}><b>View/Edit/Delete INTERSHIP</b></Typography>
          <br/>

          {intership.length==0?
          <Container maxWidth="sm">
          <Paper component={Box} p="12px">
          <Typography align="center" variant="body2">No Intership has have Register</Typography>
          </Paper>
          </Container>
          :

          <Grid container spacing={2}>
          
          {intership.map((i)=>
              <Grid item xs={12} sm={6} md={4} >
      <Card >
      <CardHeader
      avatar={
        <Avatar src={i.img}/>
      }
      title={i.intershiptitle}
      subheader={`${i.companyname} ${i.city}`}
      />
      
      <Typography style={{paddingLeft:"15px"}} variant="body2" component="p">
      {i.discription.slice(0,219)}....
      </Typography>
      <div>
      
         <div style={{display:"flex",marginTop:"5px"}}>
      <Typography title="last Date" style={{paddingLeft:"15px"}} color="textSecondary" variant="body2" component="p"><FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp;{i.apply}</Typography>
      
      <Typography title="Experience" style={{paddingLeft:"15px"}} color="textSecondary" variant="body2" component="p"><FontAwesomeIcon icon={faBriefcase}/>&nbsp;&nbsp;{i.Intershiptype}</Typography>
      
      <Typography title="Timming" style={{paddingLeft:"15px"}} color="textSecondary" variant="body2" component="p"><FontAwesomeIcon icon={faClock}/>&nbsp;&nbsp;{i.timing}</Typography>  
         </div>
        <CardActions style={{display:"flex",justifyContent:"flex-end"}}>
      <Button to={`${url}/${i._id}`} component={LLink}   size="small" variant="outlined" color="primary">edit</Button>
      <Button   onClick={()=>{ddelete(i._id)}}  size="small" variant="contained" color="primary">DELETE</Button>
      </CardActions>
      
      </div>
      
      </Card>
      </Grid>
            
          )}
          </Grid>

}


        </Typography>
      </Container>
    </>
  )
}



function Intershipformedit() {
  
const id=useParams().id

  const {userdata,setdatauser}=useContext(Context)  
  const [data, setdata] = useState({
    intershiptitle:"",
city:"",
catogary:"",
Intershiptype:"",
timing:"",
salary:"",
gender:"",
position:"",
apply:"",
skills:"",
discription:"",
companyname:userdata.companyname,
accountID:userdata.id,
img:userdata.img,
productID:id
  })
  const change=(e)=>{
    setdata({
      ...data,
      [e.target.name]:e.target.value
    })
  }

  useEffect(()=>{
    axios.get("/getintership").then((ress)=>{


    const arry=ress.data.find((i)=>{
        return i._id==id
      })

      setdata(
        {
          intershiptitle:arry.intershiptitle,
      city:arry.city,
      catogary:arry.catogary,
      Intershiptype:arry.Intershiptype,
      timing:arry.timing,
      salary:arry.salary,
      gender:arry.gender,
      position:arry.position,
      apply:arry.apply,
      skills:arry.skills,
      discription:arry.discription,
      companyname:userdata.companyname,
      accountID:userdata.id,
      img:userdata.img,
      productID:id
        }
      )
  })
  },[])
  
  

  const [msg, setmsg] = useState("")
const [open, setopen] = useState(false)
const handleClose = () => {

  setopen(false)
};


  const submit= async(e)=>{
e.preventDefault();
console.log(data)

 await axios.post("/editintershtip",data).then((res)=>{setmsg(res.data);setopen(true)})
  }

const [salary, setsalary] = useState(false)


  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
      <Typography component="div" style={{minHeight: 'calc(100vh - 64px)'}}>

      <Typography variant="h4" style={{padding:"20px",fontWeight:"bold",textDecorationColor:"#011842",color:"#011842",textDecoration:"underline"}}>EDIT INTERSHIP</Typography>

      <form onSubmit={submit}>
<Grid container spacing={2}>

  <Grid item md={8} sm={8} xs={12}>
  <TextField value={data.intershiptitle} name="intershiptitle" onChange={change} fullWidth label="Intership Title" required variant="outlined"/>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <TextField value={userdata.companyname} disabled name="companyname" fullWidth label="CompanyName" required variant="outlined"/>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Select City</InputLabel>
        <Select
        value={data.city}
          native
          name="city" onChange={change}
          inputProps={{
            name: 'city',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value="Peshawar">Peshawar</option>
          <option value="lahore">lahore</option>
          <option value="Karachi">Karachi</option>
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Catogary</InputLabel>
        <Select
          native
          value={data.catogary}
          name="catogary" onChange={change}
          inputProps={{
            name: 'catogary',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="Web Developer">Web Developer</option>
          <option  value="mobile Developer">mobile Developer</option>
          <option  value="Desktop Developer">Desktop Developer</option>
          <option  value="SEO">SEO</option>
          <option  value="Graphic Desiger">Graphic Desiger</option>
          <option  value="Content Writer">Content Writer</option>
          
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Intership Type</InputLabel>
        <Select
        
          native
          value={data.Intershiptype}
          name="Intershiptype" onChange={(e)=>{change(e);
            if(e.target.value=="UnPaid"){
              setsalary(true)
            }
            else{
              setsalary(false)
            }
            
          }}
          inputProps={{
            name: 'Intershiptype',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  aria-label="None" value="Paid">Paid</option>
          <option  aria-label="None" value="UnPaid">UnPaid</option>
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Timimg</InputLabel>
        <Select
          native
          value={data.timing}
          name="timing" onChange={change}
          inputProps={{
            name: 'timing',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="8AM-2PM" >8AM-2PM</option>
          <option  value="3PM-8PM" >3PM-8PM</option>
          
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Salary</InputLabel>
        <Select
        disabled={salary}
          native
          value={data.salary}
          name="salary" onChange={change}
          inputProps={{
            name: 'salary',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="10k">10k</option>
          <option  value="20k">20k</option>
          <option  value="30k">30k</option>
          <option  value="40k">40k</option>
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
        <Select
          native
          value={data.gender}
          name="gender" onChange={change}
          inputProps={{
            name: 'gender',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="No Preference">No Preference</option>
          <option  value="Man">Man</option>
          <option  value="Woman">Woman</option>
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={6} sm={6} xs={12}>
  <TextField name="position" value={data  .position} onChange={change} fullWidth label="Total Positions" required variant="outlined"/>
  </Grid>
  <Grid item md={6} sm={6} xs={12}>
  <TextField name="apply" onChange={change} type="date" fullWidth label="Apply Before"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>
  
  <Grid item md={12} sm={12} xs={12}>
  <TextField
value={data.skills}
name="skills" onChange={change}
  helperText="Note:-HTML,CSS,JS"
  type="text" fullWidth label="Skills"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>


  <Grid item md={12} sm={12} xs={12}>
  <TextField
  multiline
  value={data.discription}
  margin="normal"
  required
  rows={6}
  
  name="discription" onChange={change}
  type="text" fullWidth label="Discription"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>
</Grid>
<div style={{display:"flex",justifyContent:"flex-end"}}>
<Button type="submit" style={{marginBottom:"10px"}} color="secondary" variant="contained">Update Interships</Button>
</div>


</form>   
        


      </Typography>
    </Container>
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
  <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
      {msg}
    </MuiAlert>
    </Snackbar>
    
  </React.Fragment>
  )
}




function Coursepage() {
  const url=useRouteMatch().url;

  const {userdata,setuserdata}=useContext(Context)
  const useStyles = makeStyles({
    root: {
     
      boxShadow:"0px 0px 5px -1px rgba(0,0,0,0.75)"
    },
    media: {
      height: 200,
    },
  });
  const classes = useStyles();  

const [dataa, setcourese] = useState([])
  // useEffect(()=>{

  //   axios.get("/getcourse").then((ress)=>{setcourese(ress.data)})

  // },[])

  useEffect(()=>{

    axios.get("/getcourse").then((res)=>{setcourese(res.data.filter((i)=>{
      return i.accountID==userdata.id
     })
   )})
  },[])
  const ddelete=(id)=>{

    axios.post("/deletecourse",{id:id})
   axios.get("/getcourse").then((res)=>{setcourese(res.data.filter((i)=>{
    return i.accountID==userdata.id
   })
 )})

  }


  return (
    <Container maxWidth="xl">
    <Typography component="div" style={{ backgroundColor: '#cfe8fc', minHeight: '100vh' }}>
<Typography variant="h5" style={{paddingTop:"15px"}}><b>View/Delete/Edit Course</b></Typography>


<br/>


{dataa.length==0?
          <Container maxWidth="sm">
          <Paper component={Box} p="12px">
          <Typography align="center" variant="body2">No Course has have Register</Typography>
          </Paper>
          </Container>
          :
          <Grid container spacing={2}>
{dataa.map((i)=>

<Grid item xs={12} md={4}>
<Card className={classes.root}>

<CardMedia
className={classes.media}
image={i.img}
title="Contemplative Reptile"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
{i.coursetitle}
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
{i.companyname}  {i.city}
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
  {i.instractorname}
</Typography>
<br/>
<Typography style={{fontWeight:"bold"}} variant="body2" color="textPrimary" component="p">
  Discription:-<br/>
  
</Typography>
<Typography variant="body2" color="textPrimary" component="p">
{i.discription.slice(0,200)}.....
  
</Typography>

</CardContent>

<CardActions style={{display:"flex",justifyContent:"space-between"}}>

<Box fontWeight="bold" fontSize="h5.fontSize">{i.price}</Box>
  
<div>
<Button to={`${url}/${i._id}`} style={{marginRight:"10px"}} component={LLink} variant="contained" size="small" color="primary">
Learn More
</Button>

<Button onClick={()=>{ddelete(i._id)}}  variant="outlined" size="small" color="primary">
 Delete
</Button>


</div>
</CardActions>
</Card>

</Grid>

 )} 
      </Grid>
          }

    </Typography>
  </Container>
  )
}

export default Account






function Courseform() {
  
const id=useParams().id;



  const {userdata,setdatauser}=useContext(Context)
  
  const [data, setdata] = useState({
    coursetitle:null,
city:"",
catogary:"",
price:"",
timing:"",
instractorname:"",
Requirements:"",
learn:"",
content:"",
discription:"",
accountID:userdata.id,
number:"",
  })
  const change=(e)=>{
    setdata({
      ...data,
      [e.target.name]:e.target.value
    })
  }



  const [msg, setmsg] = useState("")
const [open, setopen] = useState(false)
const [selectimg, setselectimg] = useState({})


const img=(e)=>{
setselectimg(e.target.files[0])
  //console.log(e.target.files[0])
}
const handleClose = () => {
  setopen(false)
};


  const submit= async(e)=>{
e.preventDefault();
const formData=new FormData();
formData.append("coursetitle",data.coursetitle)
formData.append("city",data.city)
formData.append("catogary",data.catogary)
formData.append("price",data.price)
formData.append("timing",data.timing)
formData.append("instractorname",data.instractorname)
formData.append("Requirements",data.Requirements)
formData.append("learn",data.learn)
formData.append("content",data.content)
formData.append("discription",data.discription)
formData.append("accountID",userdata.id)
formData.append("companyname",userdata.companyname)
formData.append("selectimg",selectimg)
formData.append("number",userdata.number)
formData.append("productID",id)


 await axios.post("/updatecourse",formData).then((res)=>{setmsg(res.data);setopen(true)})
  }


  useEffect(()=>{
  
    axios.get("/getcourse").then((res)=>{
     const arry= res.data.find((i)=>{
            return i._id==id
      })

      console.log(arry.instractorname)
      console.log(arry)
    setdata({
      coursetitle:arry.coursetitle,
      city:arry.city,
      catogary:arry.catogary,
      price:arry.price,
      timing:arry.timing,
      instractorname:arry.instractorname,
      Requirements:arry.Requirements,
      learn:arry.learn,
      content:arry.content,
      discription:arry.discription,
      accountID:userdata.id,
      number:arry.number,
    })
    })
  },[])
  
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
      <Typography component="div" style={{minHeight: 'calc(100vh - 64px)'}}>

      <Typography variant="h4" style={{padding:"20px",fontWeight:"bold",textDecorationColor:"#011842",color:"#011842",textDecoration:"underline"}}>ADD COURSE</Typography>

      <form onSubmit={submit}>
<Grid container spacing={2}>

  <Grid item md={8} sm={8} xs={12}>
  <TextField value={data.coursetitle} name="coursetitle" onChange={change} fullWidth label="Course Title" required variant="outlined"/>
  </Grid>
  
  <Grid item md={4} sm={4} xs={12}>
  <TextField value={userdata.companyname} disabled name="companyname" fullWidth label="CompanyName" required variant="outlined"/>
  </Grid>
  <Grid item md={4} sm={4} xs={12}>
  <TextField onChange={change} value={data.instractorname}  name="instractorname" fullWidth label="Instractor Name" required variant="outlined"/>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
  <TextField onChange={change} value={data.price}  name="price" fullWidth label="Price" required variant="outlined" helperText=" Example:-10000 PKR"/>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Select City</InputLabel>
        <Select
        value={data.city}
          native
          name="city" onChange={change}
          inputProps={{
            name: 'city',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value="Peshawar">Peshawar</option>
          <option value="lahore">lahore</option>
          <option value="Karachi">Karachi</option>
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Catogary</InputLabel>
        <Select
          native
          value={data.catogary}
          name="catogary" onChange={change}
          inputProps={{
            name: 'catogary',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="Web Developer">Web Developer</option>
          <option  value="mobile Developer">mobile Developer</option>
          <option  value="Desktop Developer">Desktop Developer</option>
          <option  value="SEO">SEO</option>
          <option  value="Graphic Desiger">Graphic Desiger</option>
          <option  value="Content Writer">Content Writer</option>
          
        </Select>
      </FormControl>
  </Grid>


  <Grid item md={4} sm={4} xs={12}>
  <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Timimg</InputLabel>
        <Select
          native
          value={data.timing}
          name="timing" onChange={change}
          inputProps={{
            name: 'timing',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option  value="10AM-11AM" >10AM-11AM</option>
          <option  value="3PM-4PM" >3PM-4PM</option>
          
        </Select>
      </FormControl>
  </Grid>

  <Grid item md={4} sm={4} xs={12}>
    <TextField  value={data.number}
          name="number" onChange={change} fullWidth variant="outlined" helperText="Example:- +923217836328" label="WhatsApp Number" required type="number"/>
  </Grid>
  

  <Grid item md={12} sm={12} xs={12}>
  <TextField
  multiline
  value={data.discription}
  margin="normal"
  required
  rows={6}
  
  name="discription" onChange={change}
  type="text" fullWidth label="Discription"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>

  <Grid item md={12} sm={12} xs={12}>
  <TextField
  multiline
  value={data.learn}
  margin="normal"
  required
  rows={6}
  
  name="learn" onChange={change}
  type="text" fullWidth label=" What you'll learn"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>



  <Grid item md={12} sm={12} xs={12}>
  <TextField
  multiline
  value={data.content}
  margin="normal"
  required
  rows={6}
  
  name="content" onChange={change}
  type="text" fullWidth label="Course Content"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>

  


  <Grid item md={12} sm={12} xs={12}>
  <TextField
  multiline
  value={data.Requirements}
  margin="normal"
  required
  rows={6}
  
  name="Requirements" onChange={change}
  type="text" fullWidth label="Requirements"
   InputLabelProps={{
    shrink: true,
  }}
  required variant="outlined"/>
  </Grid>

</Grid>
<div style={{display:"flex",justifyContent:"space-between"}}>
<input accept="image/*" type="file" onChange={img}/>
<Button type="submit" style={{marginBottom:"10px"}} color="secondary" variant="contained">Update Course</Button>
</div>


</form>   
        


      </Typography>
    </Container>
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
  <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
      {msg}
    </MuiAlert>
    </Snackbar>
    
  </React.Fragment>
  )
}




