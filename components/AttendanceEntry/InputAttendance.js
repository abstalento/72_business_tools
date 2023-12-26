const InputAttendance = ({type, name, placeholder, value, className, onChange, onKeyPress, readOnly, maxText,id,pattern,required}) => {
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
            pattern={pattern}
            onKeyPress={onKeyPress}
        />
    )
}

export default InputAttendance;