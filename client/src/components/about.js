import React from 'react'
import {Breadcrumbs,Link,Typography,Container} from '@material-ui/core';
import {Navbar} from "./Home"
import {Link as LLink} from "react-router-dom"


function BBreadcrumbs() {
    return (
        <Breadcrumbs aria-label="breadcrumb">
  <Link style={{textDecoration:"none"}} component={LLink} to="/" color="inherit">Home</Link>
  <Typography color="textPrimary">About us</Typography>
</Breadcrumbs>
    )
}



function About() {
    return (
        <>
        <Navbar/>
        <Container>
        <Typography component="div" style={{paddingTop:"15px",backgroundColor: '#cfe8fc', height: '100vh' }}>
        <div style={{display:"flex",justifyContent:"center"}}><BBreadcrumbs/></div>
        
        </Typography>
        </Container>
         
        </>
    )
}

export default About
