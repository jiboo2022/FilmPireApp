import React, {useRef} from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import useStyles from './Styles'
import { Actors,MovieInformation, Movies, NavBar, Profile } from './';
import useAlan from '../AlanAI/Alan';


const App = () => {

  
  const alanBtnContainer = useRef();
  useAlan();

  const classes = useStyles();

  return(
  <div className={classes.root}>
    <CssBaseline />
    <NavBar />
    <main className={classes.content}>
    <div  className={classes.toolbar}/>
      <Switch>

        <Route exact path="/"> 
        <Movies />
          </Route>
        <Route exact path="/movies/:id"> 
        <MovieInformation />
        </Route>
        <Route exact path="/actor/:id"> 
          <Actors />
        </Route>
        <Route exact path="/profile/:id"> 
          <Profile />
        </Route>
        <Route exact path="/MovieInformation/:id">
          <MovieInformation />
        </Route>


      </Switch>
    </main>
     <div ref={alanBtnContainer}/>
  </div>
)};


export default App;
