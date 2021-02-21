import React,{useEffect,useState,useContext} from 'react'
import {Navbar,Search} from "./Home"
// import Filters from "./Filters"
import { BrowserRouter as Router, Switch,useRouteMatch,useParams, Route, Link as LLink} from "react-router-dom";
import {Link,FormControl,Box,InputLabel,Select,Breadcrumbs,Grid,Avatar,Paper,Typography,Container, Button } from '@material-ui/core';
import Ccard from "./Cards"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarAlt,faBriefcase,faMoneyBillWave,faClock} from '@fortawesome/free-solid-svg-icons'
import Segisstion from "./Segisstion"

function Breadcrumb(){


    return (
        <Breadcrumbs style={{display:"flex",justifyContent:"center",margin:"10px 0px 10px 0px"}}>    
           <Typography component={LLink} to="/" style={{textDecoration:"none"}} color="inherit">Home</Typography>
      <Typography color="textPrimary">
        jobs
      </Typography>
    
    </Breadcrumbs> 
    )
}







function Jobs() {

  var params=useParams()
  
 
  var [state, setState] = useState({
   jobs: "",
   salary:"",
   timing:"",
 });

  const path =useRouteMatch().path

  const [jobs, setjobs] = useState([])
  
  useEffect(async()=>{

    if(params.id=="all"){
      await  axios.get("/getjobs").then((ress)=>{setjobs(ress.data)})
   
    }
  

    else{
     
  await axios.get("/getjobs").then((ress)=>{setjobs(ress.data.filter((i)=>
    i.catogary.toLowerCase().includes(params.id.toLowerCase())
         ))})

   
    }
    
  },[params.id])

//console.log(jobs)



  // console.log(jobs.map((i)=>
  // console.log(i.catogary)
  // ))
  




  var searchbtn=async()=>{

    

  //   console.log(jobs.filter((i)=>
  //   i.catogary==state.jobs && i.salary==state.salary && i.timing==state.timing
  //  ))
await axios.get("/getjobs").then((ress)=>{setjobs(ress.data.filter((i)=>
  i.catogary==state.jobs && i.salary==state.salary && i.timing==state.timing
 ))})
 //console.log(jobs)
  }

  var props=[{
    Jobs:["Jobs","Web Developer","mobile Developer","Desktop Developer",
"SEO","Graphic Desiger","Content Writer"],
salary:["Salary","10k-20k","20k-40k","50k-70k","80-100k","110-140k","150k-180k"],
timing:["Timing","fulltime","halftime"]

}]
   
    return (
        <>
        <Navbar/>
        <Route exact path={`${useRouteMatch().path}`}>
          
          
          <Search name="ALL JOBS"/> 
          <Container >
        <Breadcrumb/>
        


          
         <Grid container spacing={1}>

<Grid item xs={12} sm={3} md={3} >
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



<Grid item xs={12} sm={3} md={3} >
<FormControl fullWidth variant="outlined" >
<InputLabel >{props[0].salary[0]}</InputLabel>
<Select
 native
 value={state.salary}
 onChange={(e)=>{

   setState({
     ...state,
     [e.target.name]:e.target.value
   })
 }}
 label="salary"
 inputProps={{
   name: 'salary',
  
 }}
>
 <option aria-label="None" value="" />

 {props[0].salary.slice(1).map((i)=>

<option value={i}>{i}</option>
 )}
 
 
</Select>
</FormControl>
</Grid>


<Grid item xs={12} sm={3} md={3} >
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

{state.jobs.length>0 && state.salary.length>0 && state.timing.length>0?<Button   onClick={()=>{searchbtn(state)}} size="large" fullWidth variant="contained" color="secondary">Search</Button>
:

<Button disabled   size="large" fullWidth variant="contained" color="secondary">Search</Button>
}





</Grid>
</Grid>  


          <br/>
          <Ccard data={jobs} />
          </Container>
          </Route>

          <Route exact path={`${useRouteMatch().path}/:id`}>
          <Jobpage data={jobs} path={path}  />
          </Route>
        </>
    )
}

export default Jobs



function Jobpage(props) {
console.log(props.path)

  console.log(props.filtersearch)
  const jobid=useParams().id
    const arry=props.data;





    const jobdata=arry.find((i)=>{
      return i._id==jobid;
    })  
//console.log(jobdata.catogary)

 const [similar, setsimilar] = useState([])
useEffect(()=>{

  axios.get("/getjobs").then((ress)=>{
    setsimilar(ress.data.filter((i)=>
            
    jobdata.catogary==i.catogary
    ))
  
  
  })
},[])


  

 const filterarray= similar.filter((i)=>{
  

    return jobid!==i._id
  
  })






  return (
    <>
      
      
      <Container maxWidth="xl" >
    <Typography component="div" style={{marginTop:"10px", height: 'calc(100vh - 64px)' }}>
      <Breadcrumb2 id={jobdata.jobtitle}/>
<Grid container spacing={1} >
  <Grid item xs={12} sm={12} md={9} >
<Paper style={{height:"auto",padding:"20px"}}>

  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>


    <div>
<Typography variant="h5" style={{fontWeight:"bold"}}>{jobdata.jobtitle}</Typography>
<Typography color="textSecondary" variant="body2" >{jobdata.companyname} {jobdata.city} </Typography>
</div>
<Avatar  src={jobdata.img}/>
</div>


<div style={{display:"flex",marginTop:"5px"}}>
<Typography title="last Date" color="textSecondary" variant="body2" component="p"><FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp;{jobdata.apply}</Typography>

<Typography title="Experience" style={{paddingLeft:"15px"}} color="textSecondary" variant="body2" component="p"><FontAwesomeIcon icon={faBriefcase}/>&nbsp;&nbsp;{jobdata.experience}</Typography>

<Typography title="Salary" style={{paddingLeft:"15px"}} color="textSecondary" variant="body2" component="p"><FontAwesomeIcon icon={faMoneyBillWave}/>&nbsp;&nbsp;{jobdata.salary}</Typography>
   </div>
   <br/>
   <hr/>
   <br/>
<Typography varient="h6" style={{fontWeight:"bold"}}>Job Description:-</Typography>
   <Typography color="textsecondary" variant="body1">{jobdata.discription}</Typography>
<br/>
<Typography varient="h6" style={{fontWeight:"bold"}}>Skills:-</Typography>
   <Typography >{jobdata.skills}</Typography>
   <br/>

   <span>


   <Typography varient="h6" style={{paddingLeft:"10px"}} ><b>Gender:-</b> {jobdata.gender}</Typography>

   <Typography varient="h6" style={{paddingLeft:"10px"}} ><b>Education:-</b> {jobdata.education}</Typography>
   <Typography varient="h6" style={{paddingLeft:"10px"}} ><b>Position:-</b> {jobdata.position}</Typography>


   <Typography varient="h6" style={{paddingLeft:"10px"}} ><b>experience:-</b> {jobdata.experience}</Typography>

   <Typography varient="h6" style={{paddingLeft:"10px"}} ><b>Timing:-</b> {jobdata.timing}</Typography>
   </span>
<br/>
<br/>
<div style={{display:"flex",justifyContent:"flex-end"}}>
<Button variant="contained" color="secondary">Apply Now</Button>
</div>
</Paper>

  </Grid>



  <Grid item xs={12} sm={12} md={3}>

    <Segisstion arrry={filterarray}  path2={props.path}/>
  </Grid>
</Grid>
        </Typography>
      </Container>
    </>
  )
}


function Breadcrumb2(props){
  return (
      <Breadcrumbs style={{display:"flex",justifyContent:"center",margin:"10px 0px 10px 0px"}}>    
         <Typography component={LLink} to="/" style={{textDecoration:"none"}} color="inherit">Home</Typography>
    <Typography component={LLink} to="/jobs" style={{textDecoration:"none"}}  color="inherit">Jobs</Typography>
    <Typography  color="textPrimary">{props.id}</Typography>
  
  </Breadcrumbs> 
  )
}





