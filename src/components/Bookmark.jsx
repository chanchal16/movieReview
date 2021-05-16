import React, { useEffect, useState,useRef } from 'react'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';


export default function Bookmark({id,title,poster_path,vote_average,bookmarkList}) {
   const[isBookmark,setisBookmark] = useState(false);
    
  
    useEffect(() => {
        //check whether the movie is bk or not
        const found = bookmarkList.find(movie => movie.id ==  id);
        // console.log('Movie: '+title+'   isBookmarkd: ', !!found); 
        setisBookmark(found);
    }, [])
  

    const onBookMarked =()=>{
        //saving the obj
        const BookMarkData = {
            id,title,poster_path,vote_average
        };
        console.log(BookMarkData);
        // setBookmark(BookMarkData);
        saveToLocalStorage(BookMarkData);
        setisBookmark(!isBookmark);
        
    }

    const saveToLocalStorage = (BookMarkData) => { 
        // let bookMarkList = localStorage.getItem('bookmarked',BookMarkData);
        console.log('bookmarkdata',BookMarkData);

        if(isBookmark){
            // console.log('bookmark remove in bk',isBookmark);
            //check whether the movie is in bklist,if so delete it and update the localstorage
            const index = bookmarkList.findIndex(bk=>bk.id === id);
            bookmarkList.splice(index,1);
            localStorage.setItem('bookmarked', JSON.stringify(bookmarkList));
        }else{
            // console.log('adding bk');
            //if not in bklist thn save as bk in localstorage
            bookmarkList.push(BookMarkData);
            localStorage.setItem('bookmarked', JSON.stringify(bookmarkList));
        }
	};

  


    return (
        <>
        <IconButton onClick={onBookMarked} >
            {isBookmark ? 
                <BookmarkIcon style={{color:'white'}} /> 
                : 
                <BookmarkBorderIcon style={{color:'white'}}  />}
        </IconButton>

        </>
    )
}

