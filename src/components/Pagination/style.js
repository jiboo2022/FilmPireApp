import { ThemeContext } from "@emotion/react";
import { makeStyles } from "@mui/styles";

export default makeStyles( (theme) => ({
     container:{
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
     },

     button:{
        margin: '30px 2px '
     },

     pageNumber:{
         marginRight:'20px !important',
         marginLeft:'20px !important',
        color:theme.palette.text.primary,
     }, 



    
}))