const MyInput = ({type, name, placeholder, value, className, onChange, onKeyPress, readOnly, maxText,id }) => {
    return (
        <input 
            id={id}
            readOnly={readOnly}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            className={className}
            onChange={onChange}
            maxLength={maxText}
            onKeyPress={onKeyPress}
        />
    )
}

export default MyInput;