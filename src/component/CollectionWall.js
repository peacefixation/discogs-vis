import "../style/CollectionWall.css";

import ReleaseThumb from "./ReleaseThumb";

const CollectionWall = ({ releases, selectRelease }) => {
    return(
        <ul
            key="collection"
            id="collection-wall"
        >
            {releases.map(release => (
                <ReleaseThumb
                    key={release.instance_id}
                    release={release}
                    onClick={() => selectRelease(release)}
                />
            ))}
        </ul>
    );
}

export default CollectionWall;
