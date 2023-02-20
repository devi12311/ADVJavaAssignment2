import React, {useEffect, useState} from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import PlayCard from "./PlayCard";

const MyCarousel = ({ plays }) => {
    const [clickedPlay, setClickedPlay] = useState(plays[0]);

    return (
        <div style={CarouselStyle}>
            <Carousel plugins={['arrows', 'centered']}>
                {
                    plays.map(play => { return <img src={play.url} id={play.id} width={500} height={300} onClick={(event) => {setClickedPlay(play)}}/> })
                }
            </Carousel>
            <div>
                <PlayCard play={clickedPlay}/>
            </div>
        </div>
    )
};

const CarouselStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
    alignContent: 'center',
    textAlign: 'center',
}

export default MyCarousel;
