import React, {useEffect} from 'react';
import { Divider, List, ListItem,ListItemText,ListSubheader,ListIcon,Box,CircularProgress, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { useGetGenreQuery } from '../../Services/TMDB';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';

const redLogo  = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';


const categories = [ 
    {label:'Popular', value:'popular'},
    {label:'Top Rated', value:'top_rated'},
    {label:'Upcoming', value:'upcoming'},
    ];


const Sidebar = ({setMobileOpen}) => {

    const {genreIDOrCategoryName} = useSelector( (state)=> state.currentGenreOrCategory );

    const { data , isFetching} = useGetGenreQuery();
    const classes = useStyles();
   
    const theme = useTheme();
    const dispatch = useDispatch();
    
    console.log(genreIDOrCategoryName);

    useEffect(() => {
      
    setMobileOpen(false);
    }, [genreIDOrCategoryName])
    
  
    return (
    <>
    <Link to="/" className={classes.imageLink}>
       <img 
        className={classes.image}
        src={ theme.palette.mode==='light' ? blueLogo : redLogo}
        alt = 'FilmPire Logo'
        />
    
    </Link>
    <Divider/>
    <List>
       <ListSubheader>CATEGORIES</ListSubheader>
       {
         categories.map( ({label,value}) => (
            <Link key={value} className={classes.links} to='/'>
              <ListItem onClick={()=> dispatch(selectGenreOrCategory(value)) } button>
               <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImages} height={30}/>
              </ListItemIcon> 
              <ListItemText primary={label}/>
              </ListItem>

            </Link>

         ))}
        
    </List>
    <Divider />
    <List>
       <ListSubheader>GENRES</ListSubheader>
       { isFetching ? (
            <Box display="flex" justifyContent="center">
            <CircularProgress  size='4rem'/>
            </Box>

       ):
         data.genres.map( ({name,id}) => (
            <Link key={name} className={classes.links} to='/'>
              <ListItem onClick={()=> dispatch(selectGenreOrCategory(id)) } button>
              {<ListItemIcon>
                <img src={genreIcons[name.toLowerCase()]} className={classes.genreImages} height={30}/>
              </ListItemIcon>}
              <ListItemText primary={name} />
              </ListItem>

            </Link>

         ))}
        
    </List>
    
    </>
  )
}

export default Sidebar