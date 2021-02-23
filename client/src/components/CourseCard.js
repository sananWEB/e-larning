import React from 'react';
import { makeStyles,CircularProgress } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useRouteMatch,Link as LLink} from "react-router-dom";

const useStyles = makeStyles({
  root: {
   
    boxShadow:"0px 0px 5px -1px rgba(0,0,0,0.75)"
  },
  media: {
    height: 200,
  },
});

export default function CourseCard(props) {

  // const [dataa,setdataa ] = useState([])

const url=useRouteMatch().url;


  const classes = useStyles();
  // useEffect(async()=>{

  //  await axios.get("/getcourse").then((res)=>{setdataa(res.data)})

  // },[])

  
  return (
      <>
      <Grid container spacing={2}>

      {props.data.length>0?
props.data.map((i)=>

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
{i.discription.slice(0,140)}.....
  
</Typography>

</CardContent>

<CardActions style={{display:"flex",justifyContent:"space-between"}}>

<Box fontWeight="bold" fontSize="h5.fontSize">{i.price}</Box>
  

<Button to={`${url}/${i._id}`} component={LLink} variant="outlined" size="small" color="primary">
Learn More
</Button>
</CardActions>
</Card>

</Grid>

 ):
 <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
   <br/>
<CircularProgress color="primary" />

 </div>
}
  
      </Grid>
      <br/>
      </>
  );
}
