import "../style/CollectionToolbar.css"

import Search from "./Search";
import Select from "./Select";
import RadioButtonGroup from "./RadioButtonGroup";
import NumItems from "./NumItems";
import { useViewport } from "./ViewportProvider"; 
import { sortModes, collectionStyles } from "../module/Collection";

const CollectionToolbar = ({ onSearch, numItems, filterOptions, onFilterChange, onSortSelectChange, collectionStyle, onCollectionStyleSelect }) => {
    const { width } = useViewport();
    const breakpoint = 620;
    
    const containerStyle = width < breakpoint ? "collection-toolbar-compact" : 'collection-toolbar';

    return(
        <div className={containerStyle}>
            <div className="collection-toolbar-section">
                <Search
                    onChange={onSearch}
                />
                <NumItems numItems={numItems}/>
            </div>

            <div className={"collection-toolbar-section"}>
                <Select
                    name={"collection-sort-select"}
                    options={Object.keys(sortModes)}
                    onChange={onSortSelectChange}
                />
                <RadioButtonGroup
                    options={collectionStyles}
                    selected={collectionStyle}
                    onClick={onCollectionStyleSelect}
                />
            </div>
        </div>
    );
}

export default CollectionToolbar;
