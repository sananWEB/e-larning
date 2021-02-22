import React from 'react'
import {Grid,Paper, Typography,Button,} from "@material-ui/core"
import {Link,useParams} from "react-router-dom"
function Segisstion(props) {

 // console.log(props.path2)

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array; 
      }
      
      // Used like so
      var arr = [2, 11, 37, 42];
      shuffle(props.arrry);



      
        const  ary=props.arrry

 const aynew= ary.filter((i,v)=>{
        return v<=2
   })
    
    //console.log(props.path2)
    //console.log(useParams())
    
    return (
        <>

<Grid container spacing={2} >

{aynew.map((i)=>


<Grid item xs={12}  >
<Paper  style={{height:"auto",padding:"10px",boxSizing:"border-box"}}>
<Typography style={{fontSize:"15px"}}><b>{i.jobtitle}</b></Typography>
<Typography variant="body2" color="textSecondary">{i.companyname}</Typography><br/>
<Typography variant="body2" color="textSecondary"><b>Skills:-</b>{i.skills }</Typography>
<div style={{display:"flex",justifyContent:"flex-end"}}>
<Button  
 component={Link} to={`/jobs/all/${i._id}`}
 textAlign="center" mt="10px" variant="contained" color="secondary" size="small">See More</Button>
</div>
</Paper>
</Grid>



)}


</Grid>
            
        </>
    )
}

export default Segisstion
