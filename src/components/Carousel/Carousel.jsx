import React,{ useEffect, useState } from 'react'
import './Carousel.css'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useParams } from 'react-router-dom';

const handleDragStart = (e) => e.preventDefault();

export default function Carousel() {
    const {id} = useParams();
    const[cast,setCast] = useState([]);
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=f56668e9c8ca57a5df685488c65eaca5`;
    const img_200 = "https://image.tmdb.org/t/p/w200";         //image size
    const noPicture ="https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

    const items = cast.map((item) => (
        <div className='carouselItem'>
            <img 
                src={item.profile_path ? `${img_200}/${item.profile_path}` : noPicture} 
                alt={item?.name}
                onDragStart={handleDragStart}
                className="carouselItem__img"
            />
            <b className="carouselItem__txt">{item?.name}</b>
        </div>
    ));

    const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 5,
        },
        1024: {
          items: 7,
        },
      };

    const fetchCast = async() =>{
         await fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setCast(data.cast);
        })
        
    }

    useEffect(() => {
        fetchCast();
    }, [])

    return (
        <div>
            <AliceCarousel 
            mouseTracking
            infinite
            disableDotsControls
            disableButtonsControls 
            responsive={responsive}
            items={items} 
            autoPlay/>
        </div>
    )
}
