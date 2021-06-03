import React,{ useState } from 'react'

export default function Searchbar({setMovies}) {
    const [searchInput,setSearchInput] = useState('');
    const SEARCH_API="https://api.themoviedb.org/3/search/movie?api_key=f56668e9c8ca57a5df685488c65eaca5&query=";
  

    const search = (e)=>{
        e.preventDefault();
        fetch(SEARCH_API+searchInput)
        .then(res => res.json())
        .then(data =>{
        console.log(data);
        setMovies(data.results);
        })

        setSearchInput('');
    }
    return (
        <div>
                
            <form>
                <input type='search' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} 
                className='searchbar' placeholder='search..' />
                <button type='submit' onClick={search} style={{display:'none'}}></button>
            </form>
        </div>
    )
}
