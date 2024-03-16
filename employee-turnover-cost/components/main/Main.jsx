import React, { useState } from "react";
import Result from "./Result";
import Input from "./Input";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Export from "./Export";

const Main = () => {
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);

    const dataHandler = (datas) => {
        setData(datas);
    }

    return (
        <div className="h-[85vh] w-full flex bg-[#F8FAFC]"> 
            <div className="w-[55%] px-[5%] pt-[2%] border-r border-gray-300">
                <Input
                    total={total}
                    setTotal={setTotal}
                    setData={dataHandler}
                />
            </div>
            <div className="w-1/2">
                <Result 
                    total={total}
                />
                {data.length > 0 && (
                    <PDFDownloadLink
                        document={<Export props={data} />}
                        fileName="document.pdf"
                    >
                        {({ loading }) => (loading ? <button className="bg-[#B31bA6] text-white w-[40%] h-[7vh] rounded-lg text-2xl absolute ml-[20%]">Loading Document...</button> : <button className="bg-[#B31bA6] text-white w-[30%] h-[7vh] rounded-lg text-2xl absolute mt-[-22%] ml-[9%]">Download</button>)}
                    </PDFDownloadLink>
                )}
            </div>
        </div>
    );
}

export default Main;
