import "../style/Select.css";

// a select component
// TODO: doesn't handle label yet, implement if needed
const Select = ({ name, options, onChange }) => {
    return(
        <select
            name={name}
            id={name}
            onChange={e => onChange(e.target.value)}
        >
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
}

export default Select;
