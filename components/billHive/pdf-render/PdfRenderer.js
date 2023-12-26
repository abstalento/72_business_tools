import React from "react";
import PdfContent from "../../billHive/pdf-content/PdfContent";
import { PDFViewer } from '@react-pdf/renderer'

const PdfRender = (props) => {

  return (
    <div className="flex flex-col h-[100vh]">
      <div className="bg-[#E6E9ED] border-t-2 border-[#707070]/5 flex justify-around p-6">
        <div className="flex w-[80%]">
          <PDFViewer height={"800px"} width={"650px"} showToolbar={true}>
            <PdfContent {...props} location={location.state}/>
          </PDFViewer>
        </div>
      </div>
    </div>
  )
}

export default PdfRender
