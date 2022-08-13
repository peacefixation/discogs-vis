import { joinArtists, joinLabels } from "./Util"; 

// sortModes sorting modes for collection releases with the corresponding comparator
export const sortModes = {
    "Artist A-Z": (a, b) => joinArtists(a.basic_information.artists).toLowerCase().localeCompare(joinArtists(b.basic_information.artists).toLowerCase()),
    "Artist Z-A": (a, b) => joinArtists(b.basic_information.artists).toLowerCase().localeCompare(joinArtists(a.basic_information.artists).toLowerCase()),
    "Title A-Z": (a, b) => a.basic_information.title.toLowerCase().localeCompare(b.basic_information.title.toLowerCase()),
    "Title Z-A": (a, b) => b.basic_information.title.toLowerCase().localeCompare(a.basic_information.title.toLowerCase()),
    "Label A-Z": (a, b) => joinLabels(a.basic_information.labels, true).toLowerCase().localeCompare(joinLabels(b.basic_information.labels, true).toLowerCase()),
    "Label Z-A": (a, b) => joinLabels(b.basic_information.labels, true).toLowerCase().localeCompare(joinLabels(a.basic_information.labels, true).toLowerCase()),
    "Year 0-9": (a, b) => {
        if(a.basic_information.year > b.basic_information.year) {
            return 1
        } else if(a.basic_information.year < b.basic_information.year) {
            return -1
        } else {
            return 0;
        }
    },
    "Year 9-0": (a, b) => {
        if(b.basic_information.year > a.basic_information.year) {
            return 1
        } else if(b.basic_information.year < a.basic_information.year) {
            return -1
        } else {
            return 0;
        }
    },
};

// sortModeInitial the initial sort mode for the collection
export const sortModeInitial = "Artist A-Z";

// collectionStyles the view styles for the collection
export const collectionStyles = ["Wall", "List"];

// collectionStyleInitial the initial view style for the collection
export const collectionStyleInitial = "Wall";
