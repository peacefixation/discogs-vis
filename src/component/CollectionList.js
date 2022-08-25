import "../style/ReleaseListItem.css";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from 'react-window';
import { useViewport, widthBreakpoint } from "./ViewportProvider"; 
import { joinArtists, joinLabels, joinFormats } from "../module/Util";

const CollectionList = ({ releases, selectRelease }) => {
    const itemData = createItemData(releases, selectRelease);

    const { width } = useViewport();

    // autosizer gives a height that is about 30px too long
    // responsive page increases toolbar height by 50px after the width breakpoint
    const baseReduceHeight = 30;
    const responsiveHeight = width < widthBreakpoint ? 50 : 0;
    const reduceHeight = baseReduceHeight + responsiveHeight;

    return (
        <AutoSizer
            style={{flex: 1}}
        >
            {({ height, width }) => {
                return(
                    <List
                        outerElementType ="ul"
                        style={{listStyleType: "none", margin: 0, padding: 0}}
                        height={height - reduceHeight}
                        itemCount={releases.length}
                        itemData={itemData}
                        itemKey={itemKey}
                        itemSize={85}
                        width={width}
                    >
                        {ReleaseListItem}
                    </List>
                );
            }}
        </AutoSizer>
    );
}

export default CollectionList;

const createItemData = (items, selectRelease) => ({
    items,
    selectRelease,
});

function itemKey(index, data) {
    const { items } = data;
    const release = items[index];

    return release.instance_id;
}

const ReleaseListItem = ({ data, index, style }) => {
    const { items, selectRelease } = data;
    const release = items[index];

    const thumb = release.basic_information.thumb;
    const title = release.basic_information.title;
    const artist = joinArtists(release.basic_information.artists);
    const label = joinLabels(release.basic_information.labels, true);
    const format = joinFormats(release.basic_information.formats, true);
    const year = release.basic_information.year === 0 ? "" : ` - ${release.basic_information.year}`;

    return (
        <li
            style={style}
            onClick={() => selectRelease(release)}
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
