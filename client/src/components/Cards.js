import React from 'react';
import {Avatar,CardHeader,makeStyles,Card,CardActions,Grid,Button,Typography  } from '@material-ui/core';
import {useRouteMatch, Link as LLink} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarAlt,faBriefcase,faMoneyBillWave,faClock} from '@fortawesome/free-solid-svg-icons'
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    boxShadow:"0px 0px 5px -1px rgba(0,0,0,0.75)"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
});

export default function CCard(props) {

  


  

  const classes = useStyles();
  
const url=useRouteMatch().url;

  return (
      <>
      <Grid container spacing={2}>
          

          
    {props.data.map((i)=>
        <Grid item xs={12} sm={6} md={4} >
<Card  className={classes.root}>
<CardHeader
avatar={
  <Avatar src={i.img}/>
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
<Button to={`${url}/${i._id}`} component={LLink}   size="small" variant="outlined" color="primary">SEE More</Button>
</CardActions>

</div>

</Card>
</Grid>
      
    )}
    </Grid>
    <br/>

   
    </>
  );
}



