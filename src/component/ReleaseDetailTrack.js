import "../style/ReleaseDetail.css";

import { joinArtists } from "../module/Util";

const ReleaseDetailTrack = ({ track }) => {
    const artist = joinArtists(track.artists);
    const title = artist !== "" ? `${artist} - ${track.title}` : track.title;

    if(track.type_ === "heading") {
        return(
            <div className="detail-track-container">
                <p className="detail-track-heading">{track.title}</p>
            </div>
        );
    } else {
        return(
            <div className="detail-track-container">
                <div className="detail-track-main">
                    <p className="detail-track-position">{track.position}</p>
                    <p className="detail-track-title">{title}</p>
                </div>
                {track.duration !== "" ? <p className="detail-track-duration">{track.duration}</p> : null}
            </div>
        );
    }
}

export default ReleaseDetailTrack;
