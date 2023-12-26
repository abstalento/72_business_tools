const MyHeader = ({headerText, headerSpan}) => {
    return (
        <div className="flex flex-col">
            <h1 className="font-bold text-lg">{headerText}</h1>
            <span className="text-[6px] text-[#353535]">{headerSpan}</span>
        </div>
    )
}

export default MyHeader;