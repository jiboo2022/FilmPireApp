import React, {useState} from 'react';
import { Link, useParams,useHistory } from 'react-router-dom';
import { Typography,Grid, Box ,ButtonGroup,Button,Modal,CircularProgress,useMediaQuery, Rating} from '@mui/material';
import { useGetActorinfoQuery, useGetActorMoviesQuery } from '../../Services/TMDB';
import useStyles from './style';
import { ArrowBack } from '@mui/icons-material';
import { MovieList, Pagination } from '..';




const Actors = () => { 
   const history = useHistory(); 
   const classes = useStyles();
   const {id} = useParams();
   const { data :actorsDetail, isFetching, error} = useGetActorinfoQuery(id);
   const  [page, setPage] = useState(1);
   const { data:actormovies, isFetching:actorMoviesIsFetching } = useGetActorMoviesQuery({id, page}) ;
   


   if (actorMoviesIsFetching){
    return(

      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress  size='8rem'/>
      </Box>
    );
  }


   if (isFetching){
    return(

      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress  size='8rem'/>
      </Box>
    );
  }

  if (error){
    return(

      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link to='/'>Something Went wrong go back </Link>
      </Box>
    );
  };

  console.log(actormovies,actormovies.total_pages);
     
  return (
     <>
        <Grid container className={classes.image}>
           <Grid item xs={12} lg={4}>

           <img 

                className={classes.poster}
                src={`https://image.tmdb.org/t/p/w780/${actorsDetail.profile_path}`}
                alt={actorsDetail.name}
              

                />

           </Grid>

           <Grid item lg={7} xl={8} style={{ display:'flex', justifyContent:'center',flexDirection:'column'}}>
           <Typography variant='h3' > {
            actorsDetail.name
           }</Typography>

           <Typography variant='h5' > Born: {
            new Date(actorsDetail.birthday).toDateString()
           }</Typography>
           
           <Typography variant='body1' align='justify' paragraph>
           { actorsDetail.biography || 'Sorry no Biography at the Moment'}

           </Typography>
           
           <Box marginTop='2rem' display='flex' justifyContent='space-around'>

           <Button variant='contained' color='primary' target='_blank' href={`https://www.imdb.com/name/${actorsDetail.imdb_id}`}>
            IMDB
           </Button>
           <Button variant='' startIcon={<ArrowBack />} onClick={ () => history.goBack()} color='primary'>
            Back
           </Button>


           </Box>



           </Grid>


        </Grid>

        <Box margin='2rem'>
          <Typography variant='h2' align='center' gutterBottom>Movies</Typography>

           { actormovies ? <MovieList movies={actormovies} numberofMovies={12} /> : <Typography variant='h2'>No Movies available</Typography>}
            
            <Pagination  currentpage={page} setPage={setPage} totalPages={actormovies.total_pages}  />
        </Box>

        </>
        
      )
};

export default Actors;