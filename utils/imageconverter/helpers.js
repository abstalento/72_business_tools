import jsPDF from "jspdf";
// import { CustomImage } from "./CustomImage";

const A4_PAPER_DIMENSIONS = {
  width: 210,
  height: 297,
};

const A4_PAPER_RATIO = A4_PAPER_DIMENSIONS.width / A4_PAPER_DIMENSIONS.height;


export const imageDimensionsOnA4 = (dimensions) => {
  const isLandscapeImage = dimensions.width >= dimensions.height;

  if (isLandscapeImage) {
    return {
      width: A4_PAPER_DIMENSIONS.width,
      height:
        A4_PAPER_DIMENSIONS.width / (dimensions.width / dimensions.height),
    };
  }

  const imageRatio = dimensions.width / dimensions.height;
  if (imageRatio > A4_PAPER_RATIO) {
    const imageScaleFactor =
      (A4_PAPER_RATIO * dimensions.height) / dimensions.width;

    const scaledImageHeight = A4_PAPER_DIMENSIONS.height * imageScaleFactor;

    return {
      height: scaledImageHeight,
      width: scaledImageHeight * imageRatio,
    };
  }

  return {
    width: A4_PAPER_DIMENSIONS.height / (dimensions.height / dimensions.width),
    height: A4_PAPER_DIMENSIONS.height,
  };
};

export const fileToImageURL = (file) => {
  return new Promise((resolve, reject) => {
    // const image = new CustomImage(file.type);
    const image = new Image()
    // image.onload = 
    image.onload = () => {
        let sizes = {
            width:image.width,
            height: image.height
        }
      resolve(image);
    };

    image.onerror = (err) => {
        console.log("Error", err)
      reject(new Error("Failed to convert File to Image"));
    };

    image.src = URL.createObjectURL(file);
    image.name = file.name
    image.type = file.type
    // resolve(image)
  });
};

export const generatePdfFromImages = (images) => {
  const doc = new jsPDF();
  doc.deletePage(1);

  images.forEach((image) => {
    let imageType = image.type.split("/")[1]
    const imageDimensions = imageDimensionsOnA4({
      width: image.width,
      height: image.height,
    });

    doc.addPage();
    doc.addImage(
      image.src,
      imageType,
      (A4_PAPER_DIMENSIONS.width - imageDimensions.width) / 2,
      (A4_PAPER_DIMENSIONS.height - imageDimensions.height) / 2,
      imageDimensions.width,
      imageDimensions.height
    );
  });

    // doc.addImage(image.src,'JPEG',5,22,200,160);
// });

  const pdfURL = doc.output("bloburl");
  // window.open(pdfURL, "_blank");
  return pdfURL;
};
