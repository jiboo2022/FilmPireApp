import React from 'react';
import { Grid , Typography} from '@mui/material';
import useStyles from './styles';
import { Movie } from '../'

const MovieList = ({movies, numberofMovies, excludefirst}) => {

  const startFrom = excludefirst ? 1 : 0;

    const classes= useStyles();
    // console.log('Movie list');

  return (
    <Grid container className={classes.moviesContainer}>

        {
            movies.results.slice(startFrom,numberofMovies).map( (movie, i)=>(
                <Movie key={i} movie={movie} i={i}  />

            ))

        }
        
    </Grid>
  );
};

export default MovieList