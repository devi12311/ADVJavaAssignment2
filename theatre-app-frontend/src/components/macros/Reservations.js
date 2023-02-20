import React from "react";
import { Link } from "react-router-dom";

const Reservations = ({ plays }) => {
    return (
        <>
            <div>
                <h1>Past Reservations</h1>
                {plays.map(play => {
                    return (
                        <div key={play.id} style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div>
                                <h3>
                                    <h2>{play.title}</h2>
                                </h3>
                            </div>
                            <div>
                                <h5> {play.startDate}</h5>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Reservations;
