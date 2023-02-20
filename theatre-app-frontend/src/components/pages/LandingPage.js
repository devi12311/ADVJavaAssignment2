import React, {useEffect, useState} from 'react'

import '../../App.css'
import BackgroundImage from '../../assets/images/bg.png'
import Navbar from "../layout/Navbar";
import Carousel from "../macros/Carousel";
import { getAll, getOne } from '../../services/playService';

export default function LandingPage() {
    const [plays, setPlays] = useState([1,1,1,1,1,1,1,1,1]);

    useEffect( () => {
        const getPlays = () => {
            getAll().then(plays => setPlays(plays));
        }
        getPlays()
    },[]);

    return (
        <div>
            <Navbar/>
            <h1 style={H1Style}> Show that are going to play </h1>
            <Carousel plays={plays}/>
        </div>
    )
}

const H1Style = {
    marginTop: 0,
    paddingBottom: '200px',
    paddingTop: '100px'
}
