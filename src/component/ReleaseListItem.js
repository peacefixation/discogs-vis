import "../style/ReleaseListItem.css";

import { joinArtists, joinLabels, joinFormats } from "../module/Util";

const ReleaseListItem = ({ release, onClick }) => {
    const thumb = release.basic_information.thumb;
    const title = release.basic_information.title;
    const artist = joinArtists(release.basic_information.artists);
    const label = joinLabels(release.basic_information.labels, true);
    const format = joinFormats(release.basic_information.formats, true);
    const year = release.basic_information.year === 0 ? "" : ` - ${release.basic_information.year}`;

    return (
        <li
            onClick={onClick}
        >
            <div className="release-list-item">
                <img
                    className="release-list-item-thumb"
                    src={thumb}
                    key={thumb}
                    title={`${artist} - ${title}`}
                    alt={`${artist} - ${release.title} cover`}
                />
                <div>
                    <p className="release-list-item-title">{`${artist} - ${title}`}</p>
                    <p className="release-list-item-sub">{`${format} - ${label}${year}`}</p>
                </div>
            </div>
        </li>
    );
}

export default ReleaseListItem;
