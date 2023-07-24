import React, { useState, useEffect, useContext } from 'react';
import {AppBar, IconButton, Toolbar, Drawer, Button, Avatar,useMediaQuery} from '@mui/material';
import {Menu, AccountCircle, Brightness4, Brightness7} from '@mui/icons-material';
import {Search, Sidebar} from '../';
import useStyles from './styles';
import {useTheme} from '@mui/material/styles';
import { fetchToken , movieApi } from '../../utils';
import { createSessionID } from '../../utils';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import { setUser, userSelector } from '../../features/auth';

const NavBar = () => {

  const {sAuthenticated, user}= useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme(); 
  const colorMode = useContext(ColorModeContext);

  const [isAuthenticated , setIsAuthenticated] = useState();
  const profileid =  1002;
  const dispatch = useDispatch();

  const token = localStorage.getItem('request_token');
  const sessionidFromLocalStorage = localStorage.getItem('session_id')
  console.log(token,sessionidFromLocalStorage,isAuthenticated);

     
  
  useEffect(() => {
     
            const getLoginStatus = localStorage.getItem('Authentication Status');
              
            if(getLoginStatus === 'Logged-In'){ 
                setIsAuthenticated(true);   
                
                console.log(isAuthenticated);
                    } 
                    if(getLoginStatus !== 'Logged-In'){ 
                      setIsAuthenticated(false);   
                      
                      console.log(isAuthenticated);
                          } 
               
          }, [isAuthenticated])


     const changeState = (state) =>{

      if(state === true){

        // alert('Congratulations! you have successfully logged on to TMDB site');
        localStorage.setItem('Authentication Status', 'Logged-In');
        console.log('Authenticated')
         

         }
         
         /*
         else{
        localStorage.setItem('Authentication Status', 'Logged-Out');
        console.log('Not Authenticated')

         }
         */


     }





  return (
    <>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar} >
        {
          isMobile && (
            <IconButton
             color='inherit'
             edge ='start'
             style = {{outline:'none'}}
             onClick={ ()=>setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
             className={classes.menuButton}
            >
              
              <Menu />
            </IconButton>
  
          )}
          <IconButton
           color="inherit"
           sx={{ml:1}}
           onClick ={colorMode.toggleColorMode }
          >

          {
            theme.palette.mode==='dark' ? <Brightness7/> : <Brightness4/> 
          }
          </IconButton>

          {!isMobile && <Search /> }

          <div color='inherit' onClick= { ()=>{}}>
          {
            !isAuthenticated ?(
            <Button color="inherit" onClick= { ()=>setIsAuthenticated(true)}>
              Login &nbsp; <AccountCircle />
            </Button>
            ):(  <Link  className={classes.InnerLink} to={`/profile/:${profileid}`}>
              <Button color="inherit"
              
              className={classes.linkButton}
              onClick= {changeState(isAuthenticated)}
              >
                { !isMobile && <>My Movies &nbsp;</>}
                <Avatar
                style={{width:30, height:30}}
                alt='profile'
                src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fpreviews.123rf.com%2Fimages%2Fhappyvector071%2Fhappyvector0711904%2Fhappyvector071190414500%2F120957417-creative-illustration-of-default-avatar-profile-placeholder-isolated-on-background-art-design-grey-p.jpg&imgrefurl=https%3A%2F%2Fwww.123rf.com%2Fphoto_120957417_stock-illustration-creative-illustration-of-default-avatar-profile-placeholder-isolated-on-background-art-design-grey-p.html&tbnid=vtWZRy9U7P7lOM&vet=12ahUKEwiWxtutgr38AhWWRqQEHZiyDNQQMygaegUIARCTAg..i&docid=aMJjqeUWFLz7wM&w=1300&h=1300&q=avatar%20placeholder%20image&client=firefox-b-d&ved=2ahUKEwiWxtutgr38AhWWRqQEHZiyDNQQMygaegUIARCTAg"
                
                 />
            </Button>
            </Link>
            )


          }


          </div>
       
          {isMobile && <Search />}

        </Toolbar>
      </AppBar>

       <div>
        <nav className={classes.drawer}>
         { isMobile ? (
          <Drawer
             variant='temporary'
             anchor='right'
             open={mobileOpen}
             onClose ={ ()=>setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
             classes = {{ paper: classes.drawerPaper}}
             ModalProps={{keepMounted: true}}
          >

          <Sidebar  setMobileOpen= {setMobileOpen} />

          </Drawer>

         ):(
          <Drawer
          classes = {{ paper: classes.drawerPaper}}
          variant='permanent'
          anchor='left'
          open
          >

            <Sidebar  setMobileOpen= {setMobileOpen} />

          </Drawer>

         )}


        </nav>
       </div>
    </>
  );
};

export default NavBar