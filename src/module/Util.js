
/**
 * Join artist names.
 * 
 * remove the numeric identifier if it exists (used to disambiguate artists with the same name)
 * and use the join field as delimiter if it exists, otherwise use a ', '
 * 
 * @param {*} artists an array of artists
 * @returns a string of delimited artist names
 */
export function joinArtists(artists) {
    let names = "";

    if(artists) {
        let join = "";
        for(let i = 0; i < artists.length; i++) {
            let name = trimNumericIdentifier(artists[i].name);
            names += join;
            names += name;
            join = artists[i].join !== "" ? ` ${artists[i].join} ` : ", ";
        }
    }

    return names;
}

/**
 * Join label names.
 * 
 * remove the numeric identifier if it exists (used to disambiguate artists with the same name)
 * if short is true, only show the first label name and no catno
 * if short is false, render each "name - catno" in a comma delimited string
 * 
 * @param {*} labels an array of labels
 * @param {*} short short version
 * @returns a string of delimited label names
 */
export function joinLabels(labels, short = false) {
    let names = "";

    if(labels && labels.length > 0) {
        if(short) {
            names = trimNumericIdentifier(labels[0].name);
        } else {
            names = labels
                .map(label => {
                    let name = trimNumericIdentifier(label.name);
                    return `${name} - ${label.catno}`;
                })
                .join(", ");
        }
    }

    return names;
}

// joinFormats join elements of the first format in the list
// only show qty if > 1
// if short is true, show qty and name fields
// if short is false, also show (joined) descriptions field elements and text field
export function joinFormats(formats, short = false) {
    if(formats && formats.length > 0) {
        let format = formats[0];
        let parts = [];

        if(format.qty && format.qty > 1) {
            parts.push(`${format.qty} x ${format.name}`);
        } else {
            parts.push(format.name);
        }

        if(format.descriptions && !short) {
            parts.push(...format.descriptions);
        }

        if(format.text && !short) {
            parts.push(format.text);
        }

        return parts.join(", ")
    }

    return "";
}

// joinGenres join elements of the genres list using comma delimiter
export function joinGenres(genres) {
    if(genres) {
        return genres.join(", ");
    }

    return "";
}

// joinStyles join elements of the styles list using comma delimiter
export function joinStyles(styles) {
    if(styles) {
        return styles.join(", ");
    }

    return "";
}

/**
 * Join elements of the series list.
 * 
 * Format as "name - catno" using comma delimiter
 * 
 * @param {*} series the list of series
 * @returns a string with formatted series delimited with comma
 */
export function joinSeries(series) {
    if(series) {
        return series
            .map(s => {
                return `${s.name} - ${s.catno}`;
            })
            .join(", ");
    }

    return "";
}

// primaryImageURL find the primary image and return the URL, fallback to
// the first image in the list if no primary exists
export function primaryImageURL(images) {
    if(images && images.length > 0) {
        for(let i = 0; i < images.length; i++) {
            if(images[i].type === "Primary") {
                return images[i].uri;
            }
        }
    
        return images[0].uri;
    }

    return "";
}

/**
 * Trim the trailing numeric identifier i.e. " (3)"  from a string
 * 
 * Used to disambiguate artists and labels
 * 
 * @param {*} s the string
 * @returns the string s with the numeric identifier removed
 */
function trimNumericIdentifier(s) {
    return s.replace(/ \(\d+\)$/, '');
}

/**
 * Extract filters from a list of releases.
 * 
 * Filters: genres, styles
 * 
 * @param {*} releases a list of releases
 * @returns the filters as an object
 */
export function extractFilters(releases) {
    let genres = new Set();

    for(let i = 0; i < releases.length; i++) {
        for(let j = 0; j < releases[i].basic_information.genres.length; j++) {
            genres.add(releases[i].basic_information.genres[j]);
        }
    }

    return {
        genres: Array.from(genres),
    };
}

export function generateFilterOptions(filters) {
    let filterOptions = [];

    for(let i = 0; i < filters.genres.length; i++) {
        filterOptions.push({
            name: filters.genres[i],
            label: filters.genres[i],
            checked: false,
        });
    }

    return filterOptions;
}
