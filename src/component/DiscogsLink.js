
import "../style/ReleaseDetail.css";

const DiscogsLink = ({ releaseURI }) => {
    return(
        <a id="detail-discogs-link" title="View release on Discogs" href={releaseURI} target="_blank" rel="noreferrer">
            <img width="24" height="24" alt="Discogs record icon" src="64px-Discogs_record_icon.svg.png" />
        </a>
    );
}

export default DiscogsLink;
