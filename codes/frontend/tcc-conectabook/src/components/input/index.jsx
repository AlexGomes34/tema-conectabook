import './input.css'

function Input({label, placeholder}){
    return(
        <div className='input-group'>
            <label htmlFor="Email">{label}</label>
            <input type="text" placeholder={placeholder} />
        </div>
    )
}

export default Input