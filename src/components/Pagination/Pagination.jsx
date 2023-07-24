import React ,{useState, useEffect} from 'react';
import useStyles from './style';
import { Typography, Button } from '@mui/material';





const Pagination = ({ currentpage, setPage, totalPages}) => {

    const classes = useStyles();
    //let [currentpage , setCurrentPage] =  useState(1);
    let  cpage;


    if(totalPages === 0) return null;

  console.log(currentpage,totalPages);
    
     const NextPage = ()=>{

        if(currentpage > 0 && currentpage < totalPages){

            setPage(currentpage + 1);
            console.log(cpage, currentpage,totalPages);    

        }
        
    }

    const PrevPage = ()=>{

        if(currentpage > 1 ){

            setPage((prev)=>prev - 1);
            console.log(cpage, currentpage);
        }
    }


 
    return (
    <div className={classes.container}>
    
   <Button className={classes.button} variant='contained' color='primary' type='button' onClick={PrevPage}>Prev</Button>
   <Typography variant='h4' className={classes.pageNumber}>{currentpage} Of {totalPages}</Typography>
   <Button className={classes.button} variant='contained' color='primary' type='button' onClick={NextPage }>Next</Button>
    </div>
  )
}

export default Pagination