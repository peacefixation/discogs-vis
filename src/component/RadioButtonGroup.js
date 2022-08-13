import "../style/RadioButtonGroup.css";

const RadioButtonGroup = ({ options, selected, onClick }) => {
    return(
        <div className="radio-button-container">
            {options.map(option => (
                <button
                    key={option + selected}
                    className={option === selected ? "radio-button radio-button-selected" : "radio-button"}
                    onClick={() => onClick(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default RadioButtonGroup;
