import React, { useState } from 'react';
import { Typography,Grid, Box ,ButtonGroup,Button,Modal,CircularProgress,useMediaQuery, Rating} from '@mui/material';
import {Movie as MovieIcon, Theaters,Language,PlusOne,Favorite,FavoriteBorderOutlined, Remove, ArrowBack} from '@mui/icons-material';
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import axios from 'axios';
import  useStyles from './styles';
import genreIcons from '../../assets/genres';
import { useGetMovieQuery } from '../../Services/TMDB';
import { useGetRecommendationsQuery } from '../../Services/TMDB';
import MovieList from '../MovieList/MovieList';




const MovieInformation = () => {
  
  const { id } = useParams();
  const classes = useStyles();
  const { data, isFetching, error} = useGetMovieQuery(id);
  //const {genreIDOrCategoryName} = useSelector( (state)=> state.currentGenreOrCategory );
  const dispatch = useDispatch();
  const {data: recommendations , isFetching:isRecommendationFetching } = useGetRecommendationsQuery({ list:'/recommendations', movie_id:id })
  const [open,setOpen] = useState(false);
  const isMovieFavorited = false;
  const isMovieWatchlisted = false;

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



     const addTofavorite = () => {
       // await axios.get(`https://api.themoviedb.org/`)


     }

     const addToWatchList = () =>{


     }


console.log(data.videos.results[0].key)


 return(
        <Grid container className={classes.containerSapceAround}>
            <Grid item sm={12} lg={4} style={{display:'flex', marginBottom:'30px'}}>
              <img  
                className={classes.poster}
                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                alt={data.title}
              />

            </Grid>
            <Grid item container  direction='column' lg={7}>
              
              <Typography variant='h3' align='center' gutterBottom>{data.title}&nbsp;({data.release_date.split('-')[0]})</Typography>
              <Typography variant='h5' align='center' gutterBottom>{data.tagline ? data.tagline: ' '}</Typography>
              
              <Grid item className={classes.containerSapceAround}>
               <Box display='flex' align='center'>

               <Rating  readOnly value={data.vote_average/2} />
               <Typography variant='subtitle1' gutterBottom style={{marginLeft:'10px'}}>{data.vote_average} /10 </Typography>

               </Box>

               <Typography variant='h6' align='center' gutterBottom>
                {data.runtime}Min | Language: {data.spoken_languages[0].name}
                </Typography>
            </Grid>
            
               <Grid item className={classes.genreContainer}>

            { data.genres.map((genre, i) =>(
              <Link key={i} className={classes.Links} to='/' onClick={ ()=>dispatch(selectGenreOrCategory(genre.id)) }>

              <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30}/>
              <Typography variant='subtitle1' color='textPrimary' >
                {genre.name}
              </Typography>

              </Link>


            )) }


            </Grid>

            <Typography variant='h5' gutterBottom style={{ marginTop: '10px'}}>
             OverView

            </Typography>

            <Typography  style={{ marginBottom: '2rem'}}>
            {data.overview.length > 0 ? data.overview :''}

            </Typography>

            <Typography variant = 'h5' gutterBottom> Top cast</Typography>
              
              <Grid item container spacing={2} >

               { data.credits.cast.map( (character, i) => ( 


                  character.profile_path && (
                  <Grid item xs={4} md={2} key={i} component={Link} to={`/actor/${character.id}`} style={{textDecoration :'none'}}>
                    <img 

                      className={classes.castImages}
                      alt ={character.name}
                      src ={ `https://image.tmdb.org/t/p/w500/${character.profile_path}`}

                    />
                    <Typography color="textPrimary">{character.name}</Typography>
                    <Typography color="textSecondary">
                      {
                        character.character.split('/')[0]
                      }
                    </Typography>
                  </Grid>
                  
                  )
               )).slice(0, 6) } 
              </Grid>
                <Grid item containerstyle={{marginTop:'2rem'}}>
                  <div className={classes.buttonContainer}>

                   <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                   <ButtonGroup size="small" variant = 'outlined'>
                     <Button target="_blank" rel="noopener noreferrer" href={data.homepage} endIcon={<Language />}>
                        Website
                     </Button>
                     <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data.imdb_id}`} endIcon={<MovieIcon />}>
                        IMDB
                     </Button>
                     <Button href='#' onClick={ ()=>setOpen(true) } endIcon={<Theaters/>}>Trailer</Button>
                   </ButtonGroup>
                   </Grid>

                   <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                   <ButtonGroup size="medium" variant = 'outlined'>
                     <Button href='#' onClick={addTofavorite} endIcon={isMovieFavorited ? <FavoriteBorderOutlined/> :<Favorite/>}>
                     { isMovieFavorited ? 'Unfavorite':'Favorite'}</Button>

                     <Button href='#' onClick={addToWatchList} endIcon={isMovieWatchlisted ? <Remove/> :<PlusOne/>}>
                     { isMovieWatchlisted ? 'Remove ':'WatchList'}</Button>

                     <Button endIcon={<ArrowBack/>} sx={{borderColor: 'primary.main' }}>
                       <Typography style={{ textDecoration : 'none'}} component={Link} to="/" color='inherit' variant = 'subtitle2'> Back </Typography>
                      </Button>

                   </ButtonGroup>
                   </Grid>


                  </div>

                </Grid>

            </Grid>

            <Box width ='100%' marginTop='5rem'>

                 <Typography variant = 'h3' align ='center'  gutterBottom >
                  you Might also like
                 </Typography>
                 { recommendations ? <MovieList movies={recommendations} numberofMovies={12}/>: <Box> Sorry No Movie was Found</Box>}     
              
            </Box>

         
              <Modal
              closeAfterTransition
              className={classes.modal}
              open={open}
              onClose={() => setOpen(false)}

              
              >

              {
                  data.videos.results.length > 0 ? (

                      <iframe 
                      autoPlay
                      className={classes.videos}
                     frameBorder ="0"
                      title ='Trailer'
                      src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                      allow='autoPlay'



                      />

                  ):( 'Sorry ! No trailer Video for this ') 

              }
              </Modal>
           
        </Grid>
  );
 }

export default MovieInformation