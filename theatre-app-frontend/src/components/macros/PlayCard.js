import React from "react";
import "../../assets/customCss/playCard.css";

const PlayCard = ({ play }) => {
    return (
        <div>
            <div className="wrapper">
                <div className="cols">
                    <div className="col" onTouchStart="this.classList.toggle('hover');">
                        <div className="container">
                            <div className="front" style={{ backgroundImage: play.url}}>
                                <div className="inner">
                                    <p>{play.title}</p>
                                    <span>{play.writer}</span>
                                </div>
                            </div>
                            <div className="back">
                                <div className="inner">
                                    <p>Cast</p>
                                    <span>
                                        {play.actors}
                                    </span>
                                    <p>{play.startDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayCard;
