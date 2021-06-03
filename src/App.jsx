import React, { useState,useEffect } from 'react'
 import Movie from './components/movie/Movie'
import './App.css'
import Searchbar from './components/Searchbar';
import BookmarkList from './components/BookmarkList/BookmarkList';
import {BrowserRouter as Router,Link,Route, Switch,useHistory} from "react-router-dom";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import MovieDetails from './components/MovieDetails/MovieDetails';


function App() {
  let history = useHistory();
  const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f56668e9c8ca57a5df685488c65eaca5&page=1";

  const[movies,setMovies] = useState([]);
  const[bookmarkList,setBookmarkList] = useState([]);
  const[showBookmarks,setShowBookmarks] = useState(false);
  
  const handleClick = ()=>{
    history.push('/');
  }
  

  useEffect(() => {
    fetch(FEATURED_API)
    .then(res => res.json())
    .then(data =>{
      console.log(data);
      setMovies(data.results);
    })
  }, [])

  useEffect(() => {
    const localbookmarks =localStorage.getItem('bookmarked');
    console.log(localbookmarks);
    const movieBookmarks = JSON.parse(
      localbookmarks
    );
      console.log('moviebookmark',movieBookmarks);

    if (movieBookmarks?.length > 0) {
      setBookmarkList(movieBookmarks);
    }else{
      setBookmarkList([]);
    }
    }, [])

    
  return (
    <div className="App">
      <Router>
      <nav className="navigation d-inline">
              <a href='/' onClick={()=>{window.history.back()}}  >Rmovies</a>

              <Link to='/bookmarks' style={{float:'right'}}> 
                <IconButton onClick={()=>setShowBookmarks(!showBookmarks)}>
                  <BookmarkIcon style={{color:'white'}} />
                </IconButton>
              </Link>  

            <span><Searchbar setMovies={setMovies} /></span>
         
        
    </nav>
     
    <Switch>
    {/* {showBookmarks ? */}
      <Route exact path='/'>
        <div className='movie-container'>
          {movies.length > 0 && movies.map(movie=>(
            <Movie key={movie.id} {...movie} bookmarkList={bookmarkList}  />
          ))}
        </div>
      </Route>

      <Route path='/bookmarks'>
      <div className='bookmarks'>
        {/* <button type='button' className='bckbtn' onClick={handleClick}>Back</button> */}
        <a href='/' className='bckbtn' onClick={handleClick}>Back</a>
        <div className='bookmark-container'>
        
          {bookmarkList.length > 0 && bookmarkList.map(bkList=>(
            <BookmarkList key={bkList.id} {...bkList} /> 
            
          ))} 
        </div>
      </div> 
      </Route>
      {/* :   */}
      
      
      <Route path={'/details/:id'}>
        <div className='movie-details'> 
          <MovieDetails />
        </div>
      </Route>
      
      
      
      </Switch>
      </Router>
    </div>
  )
  
}

export default App
