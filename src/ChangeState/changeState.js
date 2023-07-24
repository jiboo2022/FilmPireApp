export const changeState = (state) =>{

    if(state === true){

      // alert('Congratulations! you have successfully logged on to TMDB site');
      localStorage.setItem('Authentication Status', 'Logged-In');
      window.location.href="/";
      console.log('Authenticated')
      
       }
       else{

        console.log('Un-Authenticated');
        localStorage.clear();
        window.location.href = '/';

       }
      
   }