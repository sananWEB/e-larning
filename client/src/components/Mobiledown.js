import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import {BottomNavigationAction,Hidden} from '@material-ui/core';
import {Work,Home,HomeWork,LibraryBooks} from "@material-ui/icons"
import {Link} from "react-router-dom"
const useStyles = makeStyles((theme)=>(
    {
        root: {
          width: '100%',
          position: 'fixed',
          bottom:"0",
          backgroundColor:theme.palette.grey[300],
        zIndex:"2"
        },
      }
));

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (

    <Hidden only={["xs","sm","md","xl","lg"]}>
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction component={Link} to="/" label="Home" icon={<Home color="white" />} />
      <BottomNavigationAction component={Link} to="/jobs/all" label="Jobs" icon={<Work color="white" />} />
      <BottomNavigationAction component={Link} to="/interships/all" label="Interships" icon={<HomeWork />} />
      <BottomNavigationAction label="Courses" component={Link} to="/courses/all" icon={<LibraryBooks />} />
      
    </BottomNavigation>
    </Hidden>
  );
}
