import React from 'react'
import './BookmarkList.css'



export default function BookmarkList({title,poster_path,vote_average}) {

    const IMAGE_API ="https://image.tmdb.org/t/p/w1280";

    
    return (

        <div className='card-wrap-inner ext-sp'>
            <div className="bkmovie-card">
                <img src={poster_path ?  (IMAGE_API + poster_path) : 
                    'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=740&q=80'}
                    alt={title} />
                        
                <div className="bkmovie-info">
                    <h4>{title}</h4>
                    <p style={{color:'goldenrod'}}>{vote_average}</p>            
                </div>
                
            </div>
            
        </div>
        
    )
}
