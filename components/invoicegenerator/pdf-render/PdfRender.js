import React, { useEffect } from "react";
// import { useState } from "react";
import PdfContent from "../pdf-content/PdfContent";
import { PDFViewer } from '@react-pdf/renderer'
import Router from "next/router";
import { useRouter } from "next/router";

const PdfRender = (props) => {
const router = useRouter();

  return (
    <div className="flex flex-col h-[100vh]">
      <div className="bg-[#E6E9ED] border-t-2 border-[#707070]/5 flex justify-around p-6">
        <div className="flex w-[80%]">hi
          <PDFViewer height={"800px"} width={"650px"} showToolbar={true}>
            <PdfContent {...props} location={router.query}/>
          </PDFViewer>
        </div>
      </div>
    </div>
  )
}

export default PdfRender
