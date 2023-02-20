import React, {useEffect, useState} from 'react'
import Reservations from "../macros/Reservations";
import UserInfo from "../macros/UserInfo";
import jwt_decode from "jwt-decode";
import {getAll} from "../../services/playService";
import {getReservations} from "../../services/reservationService";
import {info, login} from "../../services/loginService";
import CreateReservation from "../macros/CreateReservation";

export default function HomePage() {

    const [userInfo, setUserInfo] = useState({});
    const [plays, setPlays] = useState([]);
    const [loading, setLoading] = useState(true) // set some state for loading

    async function getData () {
        const token = localStorage.getItem('token');
        await info({token}).then(info => {
            setUserInfo(info)
        });
        await getReservations({token}).then(plays => setPlays(plays));
        setLoading(false)
    }
    useEffect(() => {
        getData().catch(e => console.log(e))
    },[]);

    if (loading) {
        return 'loading'
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: '100px', flexWrap: 'wrap' }}>
                <Reservations plays={plays}/>
                <UserInfo userInfo={userInfo}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: '100px', flexWrap: 'wrap' }}>
                <CreateReservation/>
            </div>
        </div>

    )
}
