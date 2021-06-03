import React from 'react'
import Bookmark from '../Bookmark';
import './Movie.css'
import {Link} from 'react-router-dom'


export default function movie({id,title,poster_path,vote_average,bookmarkList}) {
    
    const IMAGE_API ="https://image.tmdb.org/t/p/w1280";
    return (
        
        <div className='card-wrap-inner'>
           
            <div className="movie-card">
                <Link to={`/details/${id}`}> 
                    <img src={poster_path ?  (IMAGE_API + poster_path) : 
                    'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=740&q=80'}
                    alt={title}/>
                 </Link> 
                <div className="movie-info">
                    <h4>{title}</h4>
                    
                </div>
                <div className='m-5'>
                    <p style={{color:'goldenrod'}}>{vote_average}</p>
                    <Bookmark bookmarkList={bookmarkList} id={id} title={title} poster_path={poster_path} vote_average={vote_average} />
                </div>
                
            </div>
        </div>
        
      
    )
}
