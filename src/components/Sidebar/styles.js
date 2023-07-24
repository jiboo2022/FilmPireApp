import { makeStyles } from "@mui/styles";

export default makeStyles( (theme)=>({

    imageLink:{
        display:'flex',
        justifyContent:'center',
        padding: '10%  0'
    },

    image:{
        width:'70%',  
    },

    links:{
        width:'100%',
       color: theme.palette.text.primary,
       textDecoration:'none'
    },
    genreImages:{
        filter:theme.palette.mode ==='dark' &&  'Invert(1)',
    }



}))