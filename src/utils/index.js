import axios from "axios";

export const movieApi = axios.create({
    baseURL:'https://api.themoviedb.org/3',
    params:{
        api_key: process.env.REACT_APP_TMDB_KEY,
    },

})

export const fetchToken = async () =>{

    try {

        const { data } = await movieApi.get('/authentication/token/new');

        const token = data.request_token;
        //console.log(token);

        if(data.success){
           
             localStorage.setItem('request_token', token);

             console.log(token);
             window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;

        }
        
    } catch (error) {
        console.log('sorry token could not be created');
        
    }

};



 export const createSessionID = async () => {

    const oldtoken = localStorage.getItem('request_token') ;
     //const token1 = localStorage.setItem('session_id', 'its showing efter conodition is added');

                
                if(oldtoken){
    
                    try {
                        
                        const {data:{ session_id}} = await movieApi.get('/authentication/session/new', {
                            request_token:oldtoken,
                        });
                    
    
                        localStorage.setItem('session_id', session_id);
                        return session_id;
                    }
    

                     catch (error) {

                        console.log(error);
                        
                    }     
                    

                    
                };

    

 };