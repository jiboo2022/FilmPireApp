import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const tmdbApikey = process.env.REACT_APP_TMDB_KEY;
// const page =1;

//  /movie/popular?api_key=de74bcda8532697a6a05f975b7941084&language=en-US&page=1

export const tmdbApi = createApi({
    reducerPath:'tmdbApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://api.themoviedb.org/3'}),
    endpoints:(builder)=>({

        // * GET MOVIE GENRE
         getGenre:builder.query({
            query:()=>`genre/movie/list?api_key=${tmdbApikey}`
         }),

        // * GET MOVIES BY TYPE
        getMovies:builder.query({

            query:({genreIDOrCategoryName, page,searchQuery}) => {

                   // get movie by search
                if (searchQuery){

                    return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApikey}`;
                }

                  // * Get movies by category popular endPoint
                 
                if (genreIDOrCategoryName  && typeof genreIDOrCategoryName === 'string'){

                    return `movie/${genreIDOrCategoryName}?page=${page}&api_key=${tmdbApikey}`;

                }

                // * Get movies by category endPoint

                if (genreIDOrCategoryName && typeof genreIDOrCategoryName === 'number'){

                    return `discover/movie?with_genres=${genreIDOrCategoryName}&page=${page}&api_key=${tmdbApikey}`;

                }

                // * GET popular movies endPoint

                return `movie/popular?page=${page}&api_key=${tmdbApikey}`;

            },
            

        }),

        // get individual movies endPoint

         getMovie:builder.query({
            query : (id)=>`/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApikey}`
         }),


         // get user specific list

         getRecommendations:builder.query({

            query:({movie_id, list})=>`/movie/${movie_id}/${list}?api_key=${tmdbApikey}`

         }),


         // get actors information 
         getActorinfo:builder.query({

            query:(id)=> `/person/${id}?api_key=${tmdbApikey}`
         }),

         // get Movies by actors id

         getActorMovies:builder.query({

            query:({id, page}) =>`/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApikey}`
         })


    }),
});

export const {
    useGetGenreQuery,
    useGetMoviesQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetActorinfoQuery,
    useGetActorMoviesQuery,
} = tmdbApi;