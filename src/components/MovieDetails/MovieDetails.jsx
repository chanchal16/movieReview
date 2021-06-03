import React,{useState,useEffect} from 'react'
import './MovieDetails.css'
import { useParams,useHistory } from 'react-router-dom';
import { Button} from '@material-ui/core';
import { YouTube } from '@material-ui/icons';
import Carousel from '../Carousel/Carousel';



export default function MovieDetails() {
    const {id} = useParams();
    let history = useHistory();
    
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=f56668e9c8ca57a5df685488c65eaca5&append_to_response=videos`;
    
    const[details,setDetails] = useState();
    const[videos,setVideos] = useState();

    function handleBack() {
        history.push("/");
      }
    

    const fetchDetails = async()=>{
        const data= await fetch(url)
        .then(res=>res.json())
        setDetails(data);
        setVideos(data.videos.results[0]?.key);
            console.log('details',data);
     
    }


    useEffect(() => {

        fetchDetails();
        console.log('details -- ',id);

    }, [id])

    
    return (
        <div className='details' >
            <button type='button' onClick={handleBack} className='bck-btn'>Go Back</button>
            <div className="movie-info">
                <h2>{details?.title}</h2>
                <p style={{color:'goldenrod',backgroundColor:'hsl(264, 67%, 35%)'}}>{details?.vote_average}</p>
            </div>
            <div className='movie-overview'>
                <h3>Overview</h3>
                <p>{details?.overview}</p>
                <p><span>Released on:</span> {details?.release_date}</p>
                <p><span>Runtime:</span> {details?.runtime ? details?.runtime : '-'} mins</p>
            </div>

            <div className='carouselDiv'>
                <Carousel id={id} />
            </div>

            <Button className='ubtn'
                    variant="contained"
                    startIcon={<YouTube/>}
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${videos}`}
                    >
                        Watch Trailer
                    </Button>
        </div>
    )
}
