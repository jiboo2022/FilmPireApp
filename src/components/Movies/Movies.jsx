import React ,{useState, useEffect} from 'react';
import { Box,CircularProgress,useMediaQuery,Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetMoviesQuery } from '../../Services/TMDB';
import  {FeaturedMovies, MovieList, Pagination} from '../';




const Movies = () => {

   const [page, setPage] = useState(1); 
   const {genreIDOrCategoryName, searchQuery} = useSelector( (state)=> state.currentGenreOrCategory );
   const {data, error , isFetching} = useGetMoviesQuery({genreIDOrCategoryName, page, searchQuery});
   const lg = useMediaQuery( (theme) => theme.breakpoints.only('lg'));
   const numberofMovies = lg ? 17 : 19;

   if(isFetching){
    return(
      <Box display="flex" justifyContent="center">
        <CircularProgress  size='4rem'/>
      </Box>

    );
   }

   if(!data.results.length){
    return(
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">No information found for the name search
        <br />
        Please select another name, thanks
        
        </Typography>
        
      </Box>

    )
   }

   if(error) return 'an error has occured';

   // console.log(data);

return (
    <div>
      <FeaturedMovies  movie={data.results[0]}/>
      <MovieList movies={data} numberofMovies = {numberofMovies}  excludefirst/>
      <Pagination  currentpage={page} setPage ={setPage} totalPages={data.total_pages}/>
      
    </div>
  );
};

export default Movies