import React,{useState} from 'react'
import {Grid,FormControl,InputLabel,Select, Button} from '@material-ui/core';



  




function Filters(props) {
  var aa=props.Catogary[0].Jobs
 
   const [state, setState] = useState({
    jobs: "",
    salary:"",
    timing:"",
  });

 
    return (
        <>
     
         <Grid container spacing={1}>

         <Grid item xs={12} sm={3} md={3} >
         <FormControl fullWidth variant="outlined" >
        <InputLabel >{props.Catogary[0].Jobs[0]}</InputLabel>
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

          {props.Catogary[0].Jobs.map((i)=>

<option value={i}>{i}</option>
          )}
          
          
        </Select>
      </FormControl>
      </Grid>



      <Grid item xs={12} sm={3} md={3} >
         <FormControl fullWidth variant="outlined" >
        <InputLabel >{props.Catogary[0].salary[0]}</InputLabel>
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

          {props.Catogary[0].salary.map((i)=>

<option value={i}>{i}</option>
          )}
          
          
        </Select>
      </FormControl>
      </Grid>


      <Grid item xs={12} sm={3} md={3} >
         <FormControl fullWidth variant="outlined" >
        <InputLabel >{props.Catogary[0].timing[0]}</InputLabel>
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

          {props.Catogary[0].timing.map((i)=>

<option value={i}>{i}</option>
          )}
          
          
        </Select>
      </FormControl>
      </Grid>
 <Grid style={{display:"flex",justifyContent:"center"}} item xs={12} sm={3} md={3} >

{state.jobs.length>0 && state.salary.length>0 && state.timing.length>0?<Button   onClick={()=>{console.log(state)}} size="large" fullWidth variant="contained" color="secondary">Search</Button>
:

<Button disabled   onClick={()=>{console.log(state)}} size="large" fullWidth variant="contained" color="secondary">Search</Button>
}



  
   
 </Grid>
   </Grid>  
  
  
        </>
    )
}

export default Filters




