import Image from "next/image"

const MyImage = ({src, height, width, alt, onClick, style,id}) => {
    return (
        <Image
            id={id}
            src={src}
            className={style}
            height={height}
            width={width}
            alt={alt}
            onClick={onClick}
        />
    )
}

export default MyImage;