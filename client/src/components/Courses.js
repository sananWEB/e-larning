import React,{useEffect,useState} from 'react'
import {Navbar,Search} from "./Home"
import {FormControl,InputLabel,Select, Button,Link,Box,Breadcrumbs,Grid,Paper,Typography,Container } from '@material-ui/core';
import CourseCard from "./CourseCard"
// import Filters from "./Filters"
import { BrowserRouter as Router, Switch,useRouteMatch,useParams, Route, Link as LLink} from "react-router-dom";
import axios from "axios"
import Segisstion3 from "./Segisstion3"
function Breadcrumb(){
    return (
        <Breadcrumbs style={{display:"flex",justifyContent:"center",margin:"10px 0px 10px 0px"}}>    
           <Typography component={LLink} to="/" style={{textDecoration:"none"}} color="inherit">Home</Typography>
      <Typography color="textPrimary">Courses</Typography>
    
    </Breadcrumbs> 
    )
}



function Courses() {

  

  const params=useParams()
    const [jobs, setjobs] = useState([])
    useEffect(async()=>{
  

      if(params.id=="all"){
        await  axios.get("/getcourse").then((ress)=>{setjobs(ress.data)})
      }
      else{
        await axios.get("/getcourse").then((ress)=>{setjobs(ress.data.filter((i)=>
          i.catogary.toLowerCase().includes(params.id.toLowerCase())
               ))})
      }
    //  await axios.get("/getcourse").then((ress)=>{setjobs(ress.data)})
    },[params.id])
    const path=useRouteMatch().path
    //console.log(path)

    const [state, setState] = useState({
      jobs: "",
      timing:"",
    });
  

    const props=[{
      Jobs:["All Courses","Web Developer","mobile Developer","Desktop Developer",
      "SEO","Graphic Desiger","Content Writer"],

  timing:["Timing","10AM-11AM","3PM-4PM"]
  
  }]


  var searchbtn=async()=>{

    

    
  await axios.get("/getcourse").then((ress)=>{setjobs(ress.data.filter((i)=>
    i.catogary==state.jobs && i.timing==state.timing
   ))})
   
   console.log(jobs)
    }
   
    return (
        <>
        <Navbar/>
        <Route exact path={`${path}`}>
        <Search name="ALL COURSES"/>

        <Container>
        <Breadcrumb/>
        {/* <Filters Catogary={[{
              Jobs:["All Courses","Web developer","Mobile developer","Desktop developer",
          "SEO","Graphic Desginer","Content Writer"],
          salary:["Price","Low","high"],
          timing:["Timing","10AM-11AM","3PM-4PM"]
          
          }]}/> */}



<Grid container spacing={1}>

<Grid item xs={12} sm={4} md={5} >
<FormControl fullWidth variant="outlined" >
<InputLabel >{props[0].Jobs[0]}</InputLabel>
<Select
 native
 value={state.jobs}
 onChange={(e)=>{

   setState({
     ...state,
     [e.target.name]:e.target.value
   })
 }}
 label="jobs"
 inputProps={{
   name: 'jobs',
  
 }}
>
 <option aria-label="None" value="" />

 {props[0].Jobs.slice(1).map((i)=>

<option value={i}>{i}</option>
 )}
 
 
</Select>
</FormControl>
</Grid>






<Grid item xs={12} sm={4} md={4} >
<FormControl fullWidth variant="outlined" >
<InputLabel >{props[0].timing[0]}</InputLabel>
<Select
 native
 value={state.timing}
 onChange={(e)=>{

   setState({
     ...state,
     [e.target.name]:e.target.value
   })
 }}
 label="timing"
 inputProps={{
   name: 'timing',
  
 }}
>
 <option aria-label="None" value="" />

 {props[0].timing.slice(1).map((i)=>

<option value={i}>{i}</option>
 )} 
 
 
</Select>
</FormControl>
</Grid>
<Grid style={{display:"flex",justifyContent:"center"}} item xs={12} sm={3} md={3} >

{state.jobs.length>0 && state.timing.length>0?<Button   onClick={()=>searchbtn()} size="large" fullWidth variant="contained" color="secondary">Search</Button>
:

<Button disabled   size="large" fullWidth variant="contained" color="secondary">Search</Button>
}





</Grid>
</Grid>  






          <br/>
        <CourseCard data={jobs}/>
        </Container>
        </Route>

<Route exact path={`${path}/:id`}>
<CoursePage  path={path}/>
</Route>
                </>
    )
}

export default Courses


function CoursePage(props) {


  

    const jobid=useParams().id
    const arry=props.data;

    const jobdata=arry.find((i)=>{
      return i._id==jobid;
    })


    const [similar, setsimilar] = useState([])
    useEffect(()=>{
    
      axios.get("/getcourse").then((ress)=>{
        setsimilar(ress.data.filter((i)=>
                
        jobdata.catogary==i.catogary
        ))
      
      
      })
    },[])
    
     const filterarray= similar.filter((i)=>{
      
    
        return jobid!==i._id
      
      })
    
    return (
        <React.Fragment>
        <Breadcrumb2 id={jobdata.coursetitle}/>
        <Container maxWidth="xl" >
          <Typography component="div" style={{height: '100vh' }} >


<Grid container spacing={2} >
    <Grid item xs={12} sm={12} md={9}>
        <Paper style={{padding:"20px"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}>

                <div>
          <Typography variant="h5"> <b>{jobdata.coursetitle}</b> </Typography>
          <Typography color="textSecondary" variant="body2" >{jobdata.companyname} {jobdata.city} </Typography>

          
          <Typography color="textSecondary" variant="body2">{jobdata.instractorname}</Typography>
          </div>
          <Typography variant="h6"> <b>{jobdata.price}</b> </Typography>
          </div>
          <br/>
          <hr/>
          <br/>
          <Typography varient="body1"><b>Discription:-</b></Typography>
          <Typography variant="body2">{jobdata.discription}</Typography><br/>
          <Typography varient="body1"><b>What You'll Learn:-</b></Typography>
          <Typography variant="body2">{jobdata.learn}</Typography><br/>
          <Typography varient="body1"><b>Course Content:-</b></Typography>
          <Typography variant="body2">{jobdata.content}</Typography><br/>
          <Typography varient="body1"><b>Requirements:-</b></Typography>
          <Typography variant="body2">{jobdata.Requirements}</Typography><br/>
          <Typography varient="body1"><b>Class Timing:-</b></Typography>
          <Typography variant="body2">{jobdata.timing}</Typography><br/>
          <div style={{display:"flex",justifyContent:"flex-end"}}>
              <Button variant="contained" color="secondary">Contact</Button>
          </div>
          


        </Paper>
    </Grid>

    <Grid item xs={12} sm={12} md={3}>
  
    <Segisstion3 arrry={filterarray} path={props.path} />
    </Grid>


</Grid>
             
          </Typography>
        </Container>
      </React.Fragment>
    )
}




function Breadcrumb2(props){
    return (
        <Breadcrumbs style={{display:"flex",justifyContent:"center",margin:"10px 0px 10px 0px"}}>    
           <Typography component={LLink} to="/" style={{textDecoration:"none"}} color="inherit">Home</Typography>
      <Typography component={LLink} to="/courses" style={{textDecoration:"none"}}  color="inherit">courses</Typography>
      <Typography  color="textPrimary">{props.id}</Typography>
    
    </Breadcrumbs> 
    )
  }
  