import { makeStyles } from "@mui/styles";

export default makeStyles( (theme) =>({

    containerSapceAround:{
        display:'flex',
        justifyContent:'space-around',
        margin: '10px 0 ! important',
        [theme.breakpoints.down('sm')]:{
            flexDirection:'column',
            flexWrap:'wrap',

        }


    },

    poster:{
        borderRadius:'20px',
        boxShadow:'0.5em 1em 1em rgb(64 64 70)',
        width:'80%',
        height:'80%',
        
        [theme.breakpoints.down('md')]:{
            margin:'0 auto',
            width:'50%',
           

        },
        [theme.breakpoints.down('sm')]:{
            margin:'0 auto',
            width:'100%',
            height:'350px',
            marginBottom:'30px',  

        },


    },

    genreContainer:{
        margin:'10px 0 ! important',
        display:'flex',
        justifyContent:'space-between',
        flexWrap:'wrap'
        

    },
    genreImage:{
        filter: theme.palette.mode === 'dark' && 'invert(1)',
        marginRight:'10px' ,
    },

    Links:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        textDecoration:'none',
        [theme.breakpoints.down('sm')]:{
            padding : '0.5em 1rem'
        }
        
    },

    castImages:{
        width:'100%',
        maxWidth:'7rem',
        height:'8rem',
        objectFit:'cover',
        boderRadius:'10px',

    },

    buttonContainer:{
        display:'flex',
        justifyContent :'space-between',
        width : '100%',
        [theme.breakpoints.down('sm')]:{
            flexDirection:'column',

        }

    },

    modal:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'

    },

    videos:{
        width:'50%',
        height:'50%',
        [theme.breakpoints.down('sm')]:{
            width:'90%',
            height:'90%',
        }
    }



}))