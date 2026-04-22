import './button.css'

function Button({text, onClick}){
return(
    <button onClick={onclick}>
        {text}
    </button>
)
}

export default Button