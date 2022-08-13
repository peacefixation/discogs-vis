import "../style/CollectionToolbar.css";

import PropTypes from 'prop-types';

const Search = ({ onChange }) => {
    return(
        <input type="text" id="search-field" name="search" placeholder="Search" onChange={onChange}/>
    );
}

Search.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default Search;
