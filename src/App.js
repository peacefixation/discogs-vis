import React from 'react';

import CollectionWall from "./component/CollectionWall";
import CollectionList from "./component/CollectionList";
import CollectionToolbar from "./component/CollectionToolbar";
import Modal from "./component/Modal";
import ReleaseDetail from "./component/ReleaseDetail";
// hooks
// https://blog.logrocket.com/modern-api-data-fetching-methods-react/
import { fetchCollection, fetchRelease } from './module/Api';
import { sortModes, sortModeInitial, collectionStyleInitial } from "./module/Collection";

const collectionComponents = {
    Wall: CollectionWall,
    List: CollectionList,
};

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            allReleases: [],
            filteredReleases: [],
            selectedRelease: null,
            sortCollection: sortModeInitial,
            collectionStyle: collectionStyleInitial,
        };

        this.onSearch = this.onSearch.bind(this);
        this.onSortSelectChange = this.onSortSelectChange.bind(this);
        this.onCollectionStyleSelect = this.onCollectionStyleSelect.bind(this);
        this.selectRelease = this.selectRelease.bind(this);
        this.closeViewReleaseModal = this.closeViewReleaseModal.bind(this);
    }

    async componentDidMount() {
        let resp = await fetchCollection();
        if(resp.error) {
            console.error("fetchCollection error", resp.error);
        } else {
            let releases = resp.sort(sortModes[sortModeInitial]);

            console.log(releases[0]);

            this.setState({
                allReleases: resp,
                filteredReleases: releases,
            });
        }
    }

    onSearch() {
        const searchField = document.getElementById("search-field");
        const searchTerm = searchField.value.toLowerCase();

        const filteredReleases = this.state.allReleases.filter(release => {
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

        this.setState({
            filteredReleases: filteredReleases,
        });
    }

    onSortSelectChange(value) {
        let filteredReleases = this.state.filteredReleases.sort(sortModes[value]);
        this.setState({
            sortCollection: value,
            filteredReleases: filteredReleases,
        });
    }

    onCollectionStyleSelect(value) {
        this.setState({collectionStyle: value});
    }

    async selectRelease(release) {
        console.log("selectRelease", release.id)
        let r = await fetchRelease(release.id);
        if(r.error) {
            console.log(r.error);
        } else {
            console.log(r);

            this.setState({
                selectedRelease: r,
            });
        }
    }

    closeViewReleaseModal() {
        this.setState({selectedRelease: null})
    }

    render() {
        const CollectionComponent = collectionComponents[this.state.collectionStyle];

        return(
            <React.Fragment>
                <CollectionToolbar
                    onSearch={this.onSearch}
                    numItems={this.state.filteredReleases.length}
                    sortCollection={this.state.sortCollection}
                    onSortSelectChange={this.onSortSelectChange}
                    collectionStyle={this.state.collectionStyle}
                    onCollectionStyleSelect={this.onCollectionStyleSelect}
                />

                <CollectionComponent
                    releases={this.state.filteredReleases}
                    selectRelease={this.selectRelease}
                />

                {this.state.selectedRelease !== null
                ?
                    <Modal
                        handleClose={this.closeViewReleaseModal}
                    >
                        <ReleaseDetail
                            release={this.state.selectedRelease}
                        />
                    </Modal>
                    
                :
                    null
                }
            </React.Fragment>
        );
    }
}

export default App;
