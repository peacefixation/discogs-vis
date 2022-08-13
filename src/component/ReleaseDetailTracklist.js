import "../style/ReleaseDetail.css";

import React from "react";

import ReleaseDetailTrack from "./ReleaseDetailTrack";

const ReleaseDetailTracklist = ({ tracklist }) => {
    return(
        <React.Fragment>
            <div className="detail-element">
                <p className="detail-heading">Tracklist</p>
            </div>
            {tracklist.map(track => 
                <ReleaseDetailTrack
                    key={`${track.position} ${track.title}`}
                    track={track}
                />
            )}
        </React.Fragment>
    );
}

export default ReleaseDetailTracklist;
