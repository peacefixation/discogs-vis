import "../style/ErrorMessage.css";

const Error = ({ text }) => {
    return(
        <div className="error-container">
            <p className="error-text">{text}</p>
        </div>
    );
}

export default Error;
