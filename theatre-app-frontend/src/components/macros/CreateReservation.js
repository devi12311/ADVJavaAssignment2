import React, {useEffect, useState} from "react";
import {makeReservation} from "../../services/reservationService";
import {getAll} from "../../services/playService";
import jwt_decode from "jwt-decode";

const CreateReservation = () => {
    const [plays, setPlays] = useState();
    const [loading, setLoading] = useState(true) // set some state for loading
    const [playId, setPLayId] = useState(null);
    const [hallId, setHallId] = useState(null)

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const decoded = jwt_decode(token);
            const loginResponse = await makeReservation({ playId, hallId, email: decoded.email, token });
            if (!loginResponse.status) {
                alert("Reservation made!")
            } else {
                alert("Input types may not be proper");
            }
        } catch (err) {
            console.log(err);
        }
    };
    async function getData () {
        await getAll().then(plays => setPlays(plays));
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
            <h1>Make Reservation</h1>
            <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center'}}>
                <select onChange={(e) => setPLayId(e.target.value)}>
                    {plays.map(play => (<option value={play.id}>{play.title}</option>))}
                </select>
                <select  onChange={(e) => setHallId(e.target.value)}>
                    {plays.map(play => (<option value={play.halls[0].id}>{play.halls[0].name}</option>))}
                </select>
                <button id="sub_btn" type="submit" onClick={handleClick}>Reserve</button>
            </div>
        </div>
    )
}

export default CreateReservation
