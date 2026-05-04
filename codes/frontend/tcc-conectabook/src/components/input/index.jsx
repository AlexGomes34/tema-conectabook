import './input.css'

function Input({ label, placeholder, value, onChange, type = "text", name, required }) {
    return (
        <div className='input-group'>
            <label>{label}</label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}

export default Input