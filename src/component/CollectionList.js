import "../style/CollectionList.css";

import ReleaseListItem from "./ReleaseListItem";

const CollectionList = ({ releases, selectRelease }) => {
    return (
        <ul
            key="collection"
            id="collection-list"
        >
            {releases.map(release => (
                <ReleaseListItem
                    key={release.instance_id}
                    release={release}
                    onClick={() => selectRelease(release)}
                />
            ))}
        </ul>
    );
}

export default CollectionList;
