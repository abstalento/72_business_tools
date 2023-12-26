import Image from "next/image"

const BtImage = ({src, height, width, alt, onClick, style}) => {
    return (
        <Image
            src={src}
            className={style}
            height={height}
            width={width}
            alt={alt}
            onClick={onClick}
            
        />
    )
}

export default BtImage;