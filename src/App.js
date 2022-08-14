import "./App.css";

import React, { useState, useEffect } from 'react';

import CollectionWall from "./component/CollectionWall";
import CollectionList from "./component/CollectionList";
import CollectionToolbar from "./component/CollectionToolbar";
import ErrorMessage from "./component/ErrorMessage";
import Footer from "./component/Footer";
import Loading from "./component/Loading";
import Modal from "./component/Modal";
import ReleaseDetail from "./component/ReleaseDetail";
import { fetchCollection, fetchRelease } from './module/Api';
import { sortModes, sortModeInitial, collectionStyleInitial } from "./module/Collection";

const collectionComponents = {
    Wall: CollectionWall,
    List: CollectionList,
};

const App = () => {

    const [ allReleases, setAllReleases ] = useState([]);
    const [ filteredReleases, setFilteredReleases ] = useState([]);
    const [ selectedRelease, setSelectedRelease ] = useState(null);
    const [ sortMode, setSortMode ] = useState(sortModeInitial);
    const [ collectionStyle, setCollectionStyle ] = useState(collectionStyleInitial);
    const [ loadingCollection, setLoadingCollection ] = useState(true);
    const [ error, setError ] = useState(null); 


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetchCollection();
                if(resp.error) {
                    throw new Error(resp.error);
                } else {
                    setAllReleases(resp);
                    setFilteredReleases(resp.sort(sortModes[sortModeInitial]));
                    setError(null);
                }
            } catch(error) {
                console.log(error)
                setError(error.message);
            } finally {
                setLoadingCollection(false);
            }
        };

        fetchData();
    }, []);

    const selectRelease = async (release) => {
        let resp = await fetchRelease(release.id);
        if(resp.error) {
            console.log(resp.error);
        } else {
            console.log(resp);
            setSelectedRelease(resp);
        }
    }

    const onSearch = () => {
        const searchField = document.getElementById("search-field");
        const searchTerm = searchField.value.toLowerCase();

        const filteredReleases = allReleases.filter(release => {
            if(release.basic_information.title.toLowerCase().includes(searchTerm)) {
                return true;
            }
            
            for(let i = 0; i < release.basic_information.artists.length; i++) {
                if(release.basic_information.artists[i].name.toLowerCase().includes(searchTerm)) {
                    return true;
                }
            }

            for(let i = 0; i < release.basic_information.labels.length; i++) {
                if(release.basic_information.labels[i].name.toLowerCase().includes(searchTerm)) {
                    return true;
                }
            }

            return false;
        });

        setFilteredReleases(filteredReleases);
    }

    const onSortSelectChange = (value) => {
        setSortMode(value);
        setFilteredReleases(filteredReleases.sort(sortModes[value]));
    }

    const onCollectionStyleSelect = (value) => {
        setCollectionStyle(value);
    }

    const closeViewReleaseModal = () => {
        setSelectedRelease(null);
    }

    const CollectionComponent = collectionComponents[collectionStyle];

    if(loadingCollection) {
        return <Loading/>
    } else {
        return (
            <div id="content">
                <CollectionToolbar
                    onSearch={onSearch}
                    numItems={filteredReleases.length}
                    sortMode={sortMode}
                    onSortSelectChange={onSortSelectChange}
                    collectionStyle={collectionStyle}
                    onCollectionStyleSelect={onCollectionStyleSelect}
                />
    
                {error !== null
                ?
                    <ErrorMessage text={error}/>
                :
                    <CollectionComponent
                        releases={filteredReleases}
                        selectRelease={selectRelease}
                    />
                }
    
                {selectedRelease !== null
                ?
                    <Modal
                        handleClose={closeViewReleaseModal}
                    >
                        <ReleaseDetail
                            release={selectedRelease}
                        />
                    </Modal>
                    
                :
                    null
                }

                <Footer/>
            </div>
        );
    }
}

export default App;
