import React,{ useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

import './Carousel.css'
import SwiperCore, {Pagination,Navigation,Autoplay} from 'swiper/core';

import { useParams } from 'react-router-dom';

SwiperCore.use([Pagination,Navigation,Autoplay]);



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
                className="carouselItem__img"
            />
            <b className="carouselItem__txt">{item?.name}</b>
        </div>
    ));

   

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
          
            <Swiper spaceBetween={30} slidesPerView={4} navigation={true} loop={true} 
                autoplay={{"delay": 1000,"disableOnInteraction": false}}  className="mySwiper">
                {items.map((slideContent) => ( 
                    <SwiperSlide key={slideContent} >
                    {slideContent}
                    </SwiperSlide>
                ))} 
            </Swiper>
        </div>
    )
}
