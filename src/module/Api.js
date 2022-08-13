
// baseURL the base URL for API requests
const baseURL = "http://localhost:8080";

// getJSON send a GET request that expects a JSON response
function getJSON(path) {
    const url = `${baseURL}${path}`;

    return fetch(url, {
        method: "GET",
    }).then(response => {
        const contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
            return response.json();
        } else {
            throw new Error("");
        }
    }).then(data => {
        return data;
    }).catch(error => {
        console.error(error);
        return {error: error};
    });
}

/**
 * Fetch a user's Discogs collection.
 * 
 * @returns an array of releases with only basic information
 */
export async function fetchCollection() {
    const resp = await getJSON("/collection/releases");
    return resp;
}

/**
 * Fetch a Discogs release.
 * 
 * @param {*} releaseID the ID of the release
 * @returns the release with extended information
 */
export async function fetchRelease(releaseID) {
    const resp = await getJSON(`/release?id=${releaseID}`);
    return resp;
}