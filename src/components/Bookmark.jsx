import React, { useEffect, useState } from 'react'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Bookmark({id,title,poster_path,vote_average,bookmarkList}) {
    const [bookmark,setBookmark] = useState({});
    const[toggleBookmark,setToggleBookmark] = useState(localStorage.getItem('togglebk') === 'true');
    // const [bookmark,setBookmark] = useState(localStorage.getItem('bookmarked') === 'true');
    
    useEffect(() => {
        localStorage.setItem('bmId',id);
    }, [id])

    const onBookMarked =()=>{
        const BookMarkData = {
            id,title,poster_path,vote_average
        };
        console.log(BookMarkData);
        localStorage.setItem('togglebk',toggleBookmark);
        setBookmark(BookMarkData);
        saveToLocalStorage(BookMarkData);
        setToggleBookmark(!toggleBookmark);
        
    }

    const saveToLocalStorage = (BookMarkData) => { 
        // let bookMarkList = localStorage.getItem('bookmarked',BookMarkData);
        console.log('bookmarkdata',BookMarkData);
        bookmarkList.push(BookMarkData);
        console.log('list',bookmarkList);
		localStorage.setItem('bookmarked', JSON.stringify(bookmarkList));
        // console.log('bookMarkList',BookmarkList);
	};

    const removeBookmark = (bmk)=>{
        //  BookMarkData = bookmark.filter((bk)=>{bk.id !== bmk.id})
        setBookmark(BookMarkData);
        localStorage.removeItem('bookmarked');
    }
    


    return (
        <>
        <IconButton onClick={onBookMarked} disabled={toggleBookmark}>
            {toggleBookmark ? <BookmarkIcon style={{color:'white'}} /> : <BookmarkBorderIcon style={{color:'white'}}  />}
        </IconButton>
        </>
        // {/*<div onClick={onBookMarked}>
            // <button className='savemovie'>{toggleBookmark ? <i className="fas fa-bookmark"></i>
            //  : <i className="far fa-bookmark"></i>}</button> 
            // {/* <button onClick={onBookMarked}><i className="fas fa-bookmark"></i></button> */}
    // </div>*/}
    )
}

