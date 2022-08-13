import "../style/Filter.css";

// a filter component
const Filter = ({ options, onChange }) => {
    return(
        <div className="filter-container">
            {options && options.map(option => (
                <Checkbox 
                    key={option.name}
                    name={option.name}
                    label={option.label}
                    checked={option.checked}
                    onChange={onChange}
                />
            ))}
        </div>
    );
}

export default Filter;

const Checkbox = ({ name, label, checked, onChange }) => {
    const checkedValue = checked ? "checked" : "";

    return(
        <div className="checkbox-container">
            <input type="checkbox" className="checkbox" id={name} name={name} value={name} checked={checkedValue} onChange={() => onChange(name)}/>
            <label className="checkbox-label" htmlFor={name}>{label}</label>
        </div>
    );
}
