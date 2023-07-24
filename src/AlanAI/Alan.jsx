import React, {useEffect, useContext} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from '../utils/ToggleColorMode';
import { changeState } from '../ChangeState/changeState';
import { selectGenreOrCategory, searchMovie } from '../features/currentGenreOrCategory';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useAlan = () => {

  const {setMode} = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const history = useHistory();


    useEffect(() => {
        alanBtn({
            key: 'f9d583e6fc66640826fbb7e2807523e92e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({command, mode, genres,genreOrCategory,query}) => {

              if (command === 'chooseGenre'){

                const foundGenre = genres.find( (g) =>g.name.toLowerCase()=== genreOrCategory.toLowerCase());
                if(foundGenre){

                  history.push('/');
                  dispatch(selectGenreOrCategory(foundGenre.id));

                }else{
                  const category = genreOrCategory.startsWith('top') ? 'top_rated': genreOrCategory  ;

                  history.push('/');
                  dispatch(selectGenreOrCategory(category));
                }


              }

             else if (command === 'changeMode') {
                if (mode === 'light'){

                  setMode('light');

                }
                else{

                  setMode('dark');

                }
                // Call the client code that will react to the received command
              }

              else if (command === 'Login'){


                changeState(true);
                 /*
                localStorage.setItem('Authentication Status', 'Logged-In');
                console.log('Authenticated');
                window.location.href="/";
                    */
              }

              else if (command === 'Logout'){

              changeState(false);
            

              }
              else if(command === 'search'){
                dispatch(searchMovie(query))



              }
              

            }
        });
      }, []);



  return (
    <div>Alan</div>
  )
}

export default useAlan