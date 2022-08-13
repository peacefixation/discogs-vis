import "../style/NumItems.css";

import PropTypes from 'prop-types';

const NumItems = ({ numItems }) => {
    return(
        <p id="num-items">{`${numItems} items`}</p>
    );
}

NumItems.propTypes = {
    numItems: PropTypes.number.isRequired,
};

export default NumItems;
