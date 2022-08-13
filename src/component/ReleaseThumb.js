import "../style/ReleaseThumb.css";

import { joinArtists } from "../module/Util";

// ReleaseThumb renders the release thumbnail
const ReleaseThumb = ({ release, onClick }) => {
    const thumb = release.basic_information.thumb;
    const title = release.basic_information.title;
    const artist = joinArtists(release.basic_information.artists);
    const imgTitle = `${artist} - ${title}`;

    return (
        <li
            onClick={onClick}
        >
            <img
                className="release-thumb"
                src={thumb}
                title={imgTitle}
                alt={imgTitle}
            />
        </li>
    );
}

export default ReleaseThumb;
