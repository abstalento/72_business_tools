import Image from "next/image";

const Myimage = (src, alt, height, width, className) => {
  return (
    <Image
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  );
};

export default Myimage;
