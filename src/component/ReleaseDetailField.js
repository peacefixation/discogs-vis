
import "../style/ReleaseDetail.css";

const ReleaseDetailField = ({ label, text }) => {
    return(
        <div className="detail-field">
            <p className="detail-field-label">{label}</p>
            <p className="detail-field-text">{text}</p>
        </div>
    );
}

export default ReleaseDetailField;
