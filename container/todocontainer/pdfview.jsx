import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { PdfDocument } from "./Pdfdesign";
export default function Pdfview({ arrayaddtodo }) {
  return (
    <div>
      <div className="flex flex-col h-[10vh]">
        <div className="bg-[#E6E9ED] border-t-2 border-[#707070]/5 flex justify-around p-6">
          <div className="flex w-[80%]">
            <PDFViewer height={"1191px"} width={"842px"} z-index={2}>
              <PdfDocument arrayaddtodo={arrayaddtodo} />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
}
