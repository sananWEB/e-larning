import React,{useContext} from 'react';
import {Context} from "../App"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import {Typography,Box} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars } from '@fortawesome/free-solid-svg-icons'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {Avatar} from "@material-ui/core"
import {Work,HomeWork,Create,DesktopWindows,Label,MultilineChart,Code,DeveloperMode,LibraryBooks,PersonAdd,AccountCircle,ContactMail,Info,VpnKey} from "@material-ui/icons"
import {Link,useHistory} from "react-router-dom"
const useStyles = makeStyles((theme)=>({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Mobilenav() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
const history=useHistory();
  const routee=(a,b)=>{

    history.push(`/${b}/${a}`)
    //console.log(a,b)

  }

  const {userdata,setuserdata}=useContext(Context)
  //console.log(userdata)
  //console.log(localStorage.getItem("Ltoken"))
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      style={{display:"flex",flexDirection:"column"}}
      //onClick={()=>{setOpen(!open)}}
    // onKeyDown={()=>{setOpen(!open)}}
   
    >
 <Typography variant="h5" style={{fontWeight:"bold",textAlign:"center",padding:"10px 0px 10px 0px"}}>LOGO</Typography>
        <Divider/>
        {userdata.login==true && localStorage.getItem("Ltoken")?
        <Box m={2}>
        <center>
      <Avatar  src={userdata.img} className={classes.large} /><br/>
      <Box display="flex" justifyContent="space-around" >
      <Button component={Link} to="account" startIcon={<AccountCircle/>} variant="contained" color="secondary" size="small">Profile</Button>
      <Button onClick={()=>{

      
        if(window.confirm("Are you sure to log out?")){
          localStorage.setItem("Ltoken","")
          setuserdata({
            email: "",
            id: "",
            companyname:"",
            password: "",
            img:"",
            login:false,
          })
          history.push("/")
        }
        else{
          return null
        }
          
        }} startIcon={<VpnKey/>} variant="contained" color="primary" size="small">logout</Button>
      </Box>
      </center>
      </Box>:
      <Box m={2} display="flex" justifyContent="space-around">
       
      <Button component={Link} to="signin"  startIcon={<AccountCircle/>} variant="contained" color="secondary" size="small">Sign in</Button>
      <Button component={Link} to="signup" startIcon={<PersonAdd/>} variant="contained" color="primary" size="small">sign up</Button>
      </Box>
      }
        
        <Divider/>
     

        {[{main:"Jobs",arry:[{icon:Code,title:"Web Developer",main:"jobs"},
{icon:MultilineChart,title:"Graphic Designer",main:"jobs"},
{icon:Label,title:"SEO",main:"jobs"},
{icon:Create,title:"Content Writer",main:"jobs"},
{icon:DesktopWindows,title:"Desktop Developer",main:"jobs"},
{icon:DeveloperMode,title:"mobile Developer",main:"jobs"},

],
        opeeen:open,fun:()=>{setOpen(!open)},icon:Work},



      ,{main:"Interships",arry:[{icon:Code,title:"Web Developer",main:"interships",},
      {icon:MultilineChart,title:"Graphic Designer",main:"interships"},
      {icon:Label,title:"SEO",main:"interships"},
      {icon:Create,title:"Content Writer",main:"interships"},
      {icon:DesktopWindows,title:"desktop Developer",main:"interships"},
      {icon:DeveloperMode,title:"Mobile Developer",main:"interships"},
      
      ],opeeen:open2,fun:()=>{setOpen2(!open2)},icon:HomeWork      },
      
      
      
      {main:"Courses",arry:[{icon:Code,title:"Web Developer",main:"courses"},
      {icon:MultilineChart,title:"Graphic Designer",main:"courses"},
      {icon:Label,title:"SEO",main:"courses"},
      {icon:Create,title:"Content Writer",main:"courses"},
      {icon:DesktopWindows,title:"desktop Developer",main:"courses"},
      {icon:DeveloperMode,title:"Mobile Developer",main:"courses"},
      
      ]
      ,opeeen:open3,fun:()=>{setOpen3(!open3)},icon:LibraryBooks     }


      


      ].map((i)=>
           <List >
                <ListItem button 
                
                onClick={i.fun}
                >
                <ListItemIcon>
                  <i.icon />
                </ListItemIcon>
                <ListItemText primary={i.main} />
                {i.opeeen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
             
 <Collapse in={i.opeeen} timeout="auto" unmountOnExit>
 <List component="div" disablePadding>
   {i.arry.map((r)=>
     <ListItem button onClick={()=>routee(r.title,r.main)}  className={classes.nested}>
  <ListItemIcon>
    <r.icon />
  </ListItemIcon>
  <ListItemText   primary={r.title} />
  
  </ListItem>
   )}

</List>
</Collapse> 
 </List>
        )}


{[{title:"About",icon:Info},{icon:ContactMail,title:"Contact"}].map((t)=>

<List>   
<ListItem button >
<ListItemIcon>
<t.icon />
</ListItemIcon>
<ListItemText primary={t.title} />
</ListItem>
</List>

)}
  

  {/* <Typography component="div">LOGO</Typography> */}
      
      </div>
  );

  return (
    <div>
    
        <React.Fragment>
         
          <FontAwesomeIcon style={{fontSize:"20px"}} onClick={toggleDrawer("left", true)} icon={faBars}/>
          <Drawer  anchor="left" 
          open={state["left"]} 
          onClose={toggleDrawer("left", false)}
        >
            {list("left")}
          </Drawer>
        </React.Fragment>
    
    </div>
  );
}
