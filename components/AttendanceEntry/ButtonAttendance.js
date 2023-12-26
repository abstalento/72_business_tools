const ButtonAttendance = ({content,toggleButton, className, onClick,isDisabled}) => {
    return (
        <button disabled={isDisabled?isDisabled:false} className={className}
        onClick={onClick}>
            {content}
        </button>
    )
}
export default ButtonAttendance;