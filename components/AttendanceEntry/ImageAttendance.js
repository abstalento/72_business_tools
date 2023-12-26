import Image from "next/image"

const ImageAttendance = ({src, height, width, alt, onClick, className,id}) => {
    return (
        <Image
            id={id}
            src={src}
            className={className}
            height={height}
            width={width}
            alt={alt}
            
        />
    )
}

export default ImageAttendance;