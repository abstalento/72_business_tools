const MyButton = ({content, styles, onClick}) => {
    return (
        <button
         className={styles}
        onClick={onClick}>
            {content}
        </button>
    )
}

export default MyButton;