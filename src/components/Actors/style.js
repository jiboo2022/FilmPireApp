import { makeStyles } from "@mui/styles";

export default makeStyles( (theme) => ({

    image:{
        maxWidth: '90%',
        borderRadius:'20px',
        objectfit:'cover',
        boxshadow:'0.5em 0.5em 1em'

    },

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
        
        [theme.breakpoints.down('md')]:{
            margin:'0 auto',
            width:'50%',
            height:'350px', 

        },
        [theme.breakpoints.down('sm')]:{
            margin:'0 auto',
            width:'100%',
            height:'350px',
            marginBottom:'30px',  

        },


    },


}))