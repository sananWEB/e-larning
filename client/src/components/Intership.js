import React,{useEffect,useState} from 'react'
import {Navbar,Search} from "./Home"
import axios from "axios"
import Segisstion2 from "./Segueestion2"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarAlt,faBriefcase,faMoneyBillWave} from '@fortawesome/free-solid-svg-icons'
import {FormControl,InputLabel,Select,Breadcrumbs,Grid,Avatar,Paper,Typography,Container, Button } from '@material-ui/core';
import { useParams,useRouteMatch, Route, Link as LLink} from "react-router-dom";
import IntershipsCards from "./IntershipsCards"

function Breadcrumb(){
    return (
        <Breadcrumbs style={{display:"flex",justifyContent:"center",margin:"10px 0px 10px 0px"}}>    
           <Typography component={LLink} to="/" style={{textDecoration:"none"}} color="inherit">Home</Typography>
      <Typography color="textPrimary">Interships</Typography>
    
    </Breadcrumbs> 
    )
}



function Intership() {


  const params=useParams()
  //console.log(params.id)
  const [jobs, setjobs] = useState([])
  useEffect(async()=>{

    if(params.id=="all"){
      await  axios.get("/getintership").then((ress)=>{setjobs(ress.data)})
    }
    else{
      await axios.get("/getintership").then((ress)=>{setjobs(ress.data.filter((i)=>
        i.catogary.toLowerCase().includes(params.id.toLowerCase())
             ))})
    
    }
    
   // await axios.get("/getintership").then((ress)=>{setjobs(ress.data)})
  },[params.id])


  const path=useRouteMatch().path;
  const url=useRouteMatch().url;


  const props=[{
    Jobs:["All Intership","Web Developer","mobile Developer","Desktop Developer",
    "SEO","Graphic Desiger","Content Writer"],
salary:["Payment","Paid","UnPaid"],
timing:["Timing","3PM-8PM","8AM-2PM"]

}]

const [state, setState] = useState({
  jobs: "",
  salary:"",
  timing:"",
});



var searchbtn=async()=>{

    

  
await axios.get("/getintership").then((ress)=>{setjobs(ress.data.filter((i)=>
  i.catogary==state.jobs && i.Intershiptype==state.salary && i.timing==state.timing
 ))})
 



  }

    return (
        <>
          <Navbar/>
          <Route exact path={`${path}`}>
          <Search name="ALL INTERSHIP"/> 

          <Container >
        <Breadcrumb/>
          {/* <Filters Catogary={[{
              Jobs:["All Intership","Web Developer","mobile Developer","Desktop Developer",
"SEO","Graphic Desiger","Content Writer"],
          salary:["Payment","Paid","Unpaid"],
          timing:["Timing","PartTime","FullTime"]
          
          }]}/> */}




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

{state.jobs.length>0 && state.salary.length>0 && state.timing.length>0?<Button   onClick={()=>{searchbtn()}} size="large" fullWidth variant="contained" color="secondary">Search</Button>
:

<Button disabled   onClick={()=>{console.log(state)}} size="large" fullWidth variant="contained" color="secondary">Search</Button>
}





</Grid>
</Grid>  











          <br/>
         <IntershipsCards data={jobs}/>
          </Container>
</Route>

              <Route exact path={`${path}/:id`}>
        <IntershipPage data={jobs} path={path}/>
        </Route>
        </>
    )
}

export default Intership




function IntershipPage(props) {


  
  const jobid=useParams().id;
  const arry=props.data;

  const jobdata=arry.find((i)=>{
    return i._id==jobid;
  })


  const [similar, setsimilar] = useState([])
  useEffect(()=>{
  
    axios.get("/getintership").then((ress)=>{
      setsimilar(ress.data.filter((i)=>
              
      jobdata.catogary==i.catogary
      ))
    
    
    })
  },[])
  
  
    
  
   const filterarray= similar.filter((i)=>{
    
  
      return jobid!==i._id
    
    })

  //console.log(jobdata)

  const path=useRouteMatch().path;
  return (
    <React.Fragment>
    
    <Container maxWidth="xl" >
    <Typography component="div" style={{marginTop:"10px", height: 'calc(100vh - 64px)' }}>
      <Breadcrumb2 id={jobdata.intershiptitle}/>
<Grid container spacing={1} >
  <Grid item xs={12} sm={12} md={9} >
<Paper style={{height:"auto",padding:"20px"}}>

  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>


    <div>
<Typography variant="h5" style={{fontWeight:"bold"}}>{jobdata.intershiptitle}</Typography>
<Typography color="textSecondary" variant="body2" >{jobdata.companyname} {jobdata.city} </Typography>
</div>
<Avatar  src={jobdata.img}/>
</div>


<div style={{display:"flex",marginTop:"5px"}}>
<Typography title="last Date" color="textSecondary" variant="body2" component="p"><FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp;{jobdata.apply}</Typography>

<Typography title="Experience" style={{paddingLeft:"15px"}} color="textSecondary" variant="body2" component="p"><FontAwesomeIcon icon={faBriefcase}/>&nbsp;&nbsp;{jobdata.Intershiptype}</Typography>

{jobdata.Intershiptype=="UnPaid"?null:
<Typography title="Salary" style={{paddingLeft:"15px"}} color="textSecondary" variant="body2" component="p"><FontAwesomeIcon icon={faMoneyBillWave}/>&nbsp;&nbsp;{jobdata.salary}</Typography>}

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


   <Typography varient="h6" style={{paddingLeft:"10px"}} ><b>Position:-</b> {jobdata.position}</Typography>




   <Typography varient="h6" style={{paddingLeft:"10px"}} ><b>Timing:-</b> {jobdata.timing}</Typography>
   </span>
<br/>
<div style={{display:"flex",justifyContent:"flex-end"}}>
<Button variant="contained" color="secondary">Apply Now</Button>
</div>
</Paper>

  </Grid>



 
 <Grid item xs={12} sm={12} md={3}>

<Segisstion2 arrry={filterarray} path={props.path}/>
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
    <Typography component={LLink} to="/interships" style={{textDecoration:"none"}}  color="inherit">interships</Typography>
    <Typography  color="textPrimary">{props.id}</Typography>
  
  </Breadcrumbs> 
  )
}
