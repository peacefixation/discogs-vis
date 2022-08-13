
import "../style/ReleaseDetail.css";

import DiscogsLink from "./DiscogsLink";
import ReleaseDetailField from "./ReleaseDetailField";
import ReleaseDetailTracklist from "./ReleaseDetailTracklist";
import { joinArtists,
         joinFormats,
         joinGenres,
         joinLabels,
         joinSeries,
         joinStyles,
         primaryImageURL,
    } from "../module/Util";

const ReleaseDetail = ({ release }) => {
    if(release === null) {
        return <div id="detail"></div>
    }

    const artist = joinArtists(release.artists);
    const imageURL = primaryImageURL(release.images);
    const label = joinLabels(release.labels);
    const series = joinSeries(release.series);
    const format = joinFormats(release.formats)
    const genre = joinGenres(release.genres);
    const style = joinStyles(release.styles);

    return(
        <div className="release-detail">
            <div id="detail-title-container">
                <p id="detail-title">{artist} - {release.title}</p>
                {/* <DiscogsLink releaseURI={release.uri} /> */}
            </div>
        
            <img
                className="detail-cover-image"
                src={imageURL}
                key={imageURL}
                alt={`${artist} - ${release.title} cover`}
            />

            <ReleaseDetailField label="Label:" text={label}/>
            {series !== "" ? <ReleaseDetailField label="Series:" text={series}/> : null}
            <ReleaseDetailField label="Format:" text={format}/>
            <ReleaseDetailField label="Released:" text={release.released_formatted}/>
            <ReleaseDetailField label="Genre:" text={genre}/>
            <ReleaseDetailField label="Style:" text={style}/>
            <div className="vertical-spacer"></div>
            <ReleaseDetailTracklist tracklist={release.tracklist}/>
        </div>
    );
}

export default ReleaseDetail;
