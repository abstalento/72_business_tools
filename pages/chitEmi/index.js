import React, { useEffect, useState } from "react";
import AmountInterest from "../../components/chitEmi/ChitEmiComponents/AmountInterest";
import BonusInterest from "../../components/chitEmi/ChitEmiComponents/BonusInterest";
import styles from "../../styles/chitEmi.module.css"
import { CSVLink } from "react-csv";
import path from '../../public/icons/Path.svg'
import download from '../../public/icons/Icon download.svg'
import EmiCalculator from "../../components/chitEmi/ChitEmiComponents/EmiCalculator";
import PdfContent from "../../components/chitEmi/PdfContent/PdfContent";
import { PDFViewer } from "@react-pdf/renderer"
import BonusPdfContent from "../../components/chitEmi/PdfContent/BonusPdfContent";
import EmiPdfContent from "../../components/chitEmi/PdfContent/EmiPdfContent";
import PdfProvider from '../../components/chitEmi/PdfProvider/PdfProvider'
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";
import BtoolsFooter from "../../container/72BTfooter/BToolsFooter";
import FeedBackButton from "../../container/72FeedBackButton/feedBackButton";
import CurrencyPopUp from "../billHive/currency-popup/CurrencyPopUp";
import Image from "next/image";



const Header = () => {

    //State Value
    const [isLogging, setIsLogging] = useState('amount')
    const [dropdown, setDropDown] = useState(false)
    const [excel, setExcel] = useState([])
    const [isDownload, setIsdownload] = useState(false)
    const [dropdownli, setDropDownli] = useState(false)
    const [amountpdf, setAmountPdf] = useState([])
    const [bonuspdf, setBonusPdf] = useState([])
    const [emipdf, setEmiPdf] = useState([])
    const [pdfDownload, setPdfDownload] = useState(false)
    const [mobilePopup, setMobilePopup] = useState(false)
    const [openPopUp, setOpenPopup] = useState(false)
    const [currencySymbol, setCurrencySymbol] = useState("₹");
    const [currencyId, setCurrencyId] = useState("INR");
    const [buttonClick, setButtonClick] = useState(true)
    const [currencyData, setCurrencyData] = useState({
        // currencySymbol:'₹',
        currencyId: "INR",
        currencyClose: false,
    });

    useEffect(() => {
        if (amountpdf.length > 0 || bonuspdf.length > 0 || emipdf.length > 0) {
            setButtonClick(false)
        } else {
            setButtonClick(true)
        }


    }, [amountpdf, bonuspdf, emipdf])

    //Data from Child
    const amountgetDataFromChild = (arr) => {
        setExcel(arr)
        setAmountPdf(arr)
    }


    const bonusgetDataFromChild = (brr) => {
        setExcel(brr)
        setBonusPdf(brr)
    }

    const emigetDataFromChild = (crr) => {
        setExcel(crr)
        setEmiPdf(crr)
    }
    const handleOpenPopup = () => {
        setOpenPopup(true)
    }
    // HandleChange Download
    const handleDownload = () => {
        // console.log("excel");
        // if(isDownload===true){
        //     amountgetDataFromChild()
        //     setDropDown(false)
        // }
        // else if(isDownload ===false){
        //     bonusgetDataFromChild()
        //     setDropDown(false)
        // }
        // else{
        //     emigetDataFromChild()
        //     setDropDown(false)
        // }
        setDropDown(false)
    }
    const handleExcelClick = () => {
        handleDownload()
    }

    //HandleClick For Page Toggle
    const handleClick = (e) => {
        const { name } = e.target;
        setIsLogging(name)
        setButtonClick(true)
        setDropDown(false)
    }


    const printDocument = () => {
        // setPdfDownload(!pdfDownload)
        setDropDown(false)
    }

    const downloadComplete = () => {
        // console.log(dropdown, 'lll');
        setDropDown(false)
    }

    const CurrencyValue = (currencySymbols) => {
        setCurrencySymbol(currencySymbols);
    };
    const setCurrencyIdValue = (currencyIds) => {
        setCurrencyId(currencyIds);
    };
    const setClosePopUp = (closeCurrency) => {
        setCurrencyData({ ...currencyData, currencyClose: closeCurrency });
        setOpenPopup(false)
    };
    const handlePopupClick = (data) => {
        setMobilePopup(data)
    };
    const handleClosePopup = () => {
        setMobilePopup(false)
    };
    const bonusPdfClick=()=>{
        setMobilePopup(true)
    };
    const amountPdfClick=()=>{
        setMobilePopup(true)
    }
    return (
        <>
            {
                openPopUp ? (<div>
                    <CurrencyPopUp
                        myCurrencySymbol={CurrencyValue}
                        myCurrencyId={setCurrencyIdValue}
                        closeCurrencyPopUp={setClosePopUp} />
                </div>) : null
            }
            <div className="w-full h-[100vh] md:bg-[#F3F3F3] sm:bg-[#FFFFFF] bg-[#FFFFFF]">
                <div className="bg-white shadow-sm items-center shadow-[#00000026] h-[7vh] w-full flex justify-between">
                    <div>
                        <BtoolsHeader Src="/images/Chit Calculator.png" Height="45" Width="100" />
                    </div>
                    <div className="flex flex-row items-center md:mr-[85px] sm:mr-[5px] mr-[5px] h-[7vh]">
                        <div className="font-[sfpro-Regular]"><label>Currency :</label></div>
                        <div><select
                            id="currencyPopUp"
                            className={
                                "text-[12px] bg-transparent font-[sfpro-Regular] cursor-pointer"
                            }
                            onClick={handleOpenPopup}
                        ><option> {currencyId}({currencySymbol})</option></select></div>
                    </div>
                </div>

                <div className="w-full md:h-[15vh] sm:h-[11vh] h-[11vh] flex justify-around items-center">
                    <div className="w-[90%] flex md:justify-between justify-around sm:justify-around items-center ">
                        <div className="flex justify-around flex-row rounded-[6px] md:w-[50%] sm:w-full w-full sm:h-[9vh] items-center h-[8vh] md:bg-white sm:bg-[#F3F3F3] bg-[#F3F3F3]">
                            <div className="w-[97%] h-[5vh] flex flex-row justify-center items-center">
                                <button className={`m-[2px] p-1 md:h-[7vh] sm:h-[7vh] h-[6vh] w-[43%] text-[13px] sm:text-[13px] md:text-[15px] cursor-pointer rounded-[6px] font-[sfpro-medium] ${isLogging == 'amount' ? 'bg-[#FF76B6] md:text-[15px] sm:h-[7vh] md:h-[6vh] text-[13px] sm:text-[13px] w-[50%] text-white font-[sfpro-medium]' : ' text-[13px] md:text-[15px] sm:h-[7vh] md:h-[6vh] sm:text-[13px] text-[#FF76B6] font-[sfpro-medium]'}`} name='amount' id="amount" onClick={handleClick}>Auctioned Amount & Interest</button>
                                <button className={`m-[2px] p-1 md:h-[7vh] sm:h-[7vh] h-[6vh] w-[30%] cursor-pointer rounded-[6px] text-[13px] sm:text-[13px] md:text-[16px] font-[sfpro-medium] ${isLogging == 'bonus' ? 'bg-[#FF76B6] text-[13px] sm:h-[7vh] md:h-[6vh] sm:text-[13px] md:text-[16px] text-white font-[sfpro-medium]' : ' text-[#FF76B6] text-[13px] md:h-[6vh] sm:h-[7vh] md:text-[16px] sm:text-[13px] font-[sfpro-medium]'}`} name="bonus" id="bonus" onClick={handleClick}>Bonus & Interest</button>
                                <button className={`m-[2px] p-1 md:h-[7vh] sm:h-[7vh] h-[6vh] w-[30%] cursor-pointer rounded-[6px] text-[13px] sm:text-[13px] md:text-[16px] font-[sfpro-medium] ${isLogging == 'emi' ? 'bg-[#FF76B6] text-[13px] sm:h-[7vh] md:h-[6vh] sm:text-[13px] md:text-[16px] text-white font-[sfpro-medium]' : ' text-[13px] sm:text-[13px] md:h-[6vh] sm:h-[7vh] md:text-[16px] text-[#FF76B6] font-[sfpro-medium]'}`} name="emi" id="emi" onClick={handleClick}>Emi Calculator</button>
                            </div>

                        </div>

                        <div className="hidden sm:hidden md:block">
                            <div className={styles.download}>
                                <div className={styles.downloadicon}>
                                    <img src="/icons/Icon download.svg" alt="download" /></div>
                                <button className={styles.button3} id="download" disabled={buttonClick} onClick={() => setDropDown(!dropdown)}>Download</button>
                                {
                                    dropdown ? (
                                        <div className={styles.dropdown}>
                                            <ul className={styles.dropdownButtons}>

                                                <PdfProvider
                                                    ButtonComponent={(props) => (
                                                        <button id="pdf" onClick={isLogging ? props.onClick : printDocument}>PDF</button>

                                                    )}
                                                    disabled={isLogging ? false : true}
                                                    onDownloadComplete={downloadComplete}
                                                    pdfDocument={
                                                        //   amountpdf ? <PdfContent amountPDf={amountpdf}/> : <></>
                                                        isLogging === 'amount' ? (<PdfContent amountPDf={amountpdf} />) :
                                                            (isLogging === 'bonus') ? (<BonusPdfContent bonusPDF={bonuspdf} />) : <EmiPdfContent emiPdf={emipdf} />
                                                    }
                                                ></PdfProvider>
                                                {/* <button onClick={printDocument}>PDF</button> */}
                                                <div onClick={handleDownload}>
                                                    <CSVLink data={excel} id='excel'
                                                        style={{ textDecoration: 'none', color: 'gray', fontSize: '12px', marginLeft: '3px' }}

                                                    >CSV(Excel)</CSVLink>
                                                </div>
                                            </ul>
                                        </div>
                                    ) : null
                                }

                            </div>
                        </div>

                    </div>
                </div>
                {

                    isLogging === 'amount' ? (<AmountInterest amountPdfClick={amountPdfClick} currencySymbol={currencySymbol} amountdataFromChild={amountgetDataFromChild}
                        isDownload={isDownload} />) :
                        (isLogging === 'bonus') ?
                            (<BonusInterest currencySymbol={currencySymbol} bonusPdfClick={bonusPdfClick} bonusdataFromChild={bonusgetDataFromChild}
                                isDownload={isDownload} />) : <EmiCalculator handlePopupClick={handlePopupClick} emidataFromChild={emigetDataFromChild} currencySymbol={currencySymbol} />


                }
                {
                    pdfDownload ?
                        (<PDFViewer height={"800px"} width={"850px"} showToolbar={true}>
                            {
                                isLogging === 'amount' ? (<PdfContent amountPDf={amountpdf} />) :
                                    (isLogging === 'bonus') ? (<BonusPdfContent bonusPDF={bonuspdf} />) : <EmiPdfContent emiPdf={emipdf} />
                            }

                        </PDFViewer>) : null
                }
                {
                    mobilePopup == true ? <div onClick={handleClosePopup} className="bg-[#000000] backdrop-blur-[2px] flex items-end h-[100vh] fixed bottom-0 bg-opacity-[30%] w-full">
                        <div className="bg-white h-[30vh] rounded-t-[20px] flex justify-around items-center w-full">
                            <div className="h-[25vh] flex flex-col w-[80%]">
                                <div className="flex justify-end  w-full h-[6vh]">
                                    <div className="flex w-[64%] items-center h-[6vh] flex-row justify-between">
                                        <h1 className="text-[20px] font-[sfpro-bold]">Download</h1>
                                        <Image onClick={handleClosePopup} src='/icons/Close-button.svg' height={20} width={20}></Image>
                                    </div>
                                </div>
                                <div className="h-[19vh] flex items-center justify-center w-full">
                                    <div className="flex h-[16vh] w-full justify-between flex-col">
                                        <PdfProvider
                                            ButtonComponent={(props) => (
                                                <button id="pdf" onClick={isLogging ? props.onClick : printDocument} className="bg-[#FF76B6] rounded-[10px] font-[sfpro-medium] text-[#FFFFFF] w-full h-[7vh]">PDF</button>

                                            )}
                                            disabled={isLogging ? false : true}
                                            onDownloadComplete={downloadComplete}
                                            pdfDocument={
                                                //   amountpdf ? <PdfContent amountPDf={amountpdf}/> : <></>
                                                isLogging === 'amount' ? (<PdfContent amountPDf={amountpdf} />) :
                                                    (isLogging === 'bonus') ? (<BonusPdfContent bonusPDF={bonuspdf} />) : <EmiPdfContent emiPdf={emipdf} />
                                            }
                                        ></PdfProvider>

                                        <button onClick={handleExcelClick} className="bg-[#FF76B6] rounded-[10px] font-[sfpro-medium] text-[#FFFFFF] w-full h-[7vh]"><CSVLink data={excel} id='excel'
                                                        style={{ textDecoration: 'none', color: 'white', fontSize: '15px', marginLeft: '3px' }}

                                                    >CSV(Excel)</CSVLink></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null
                }
                <FeedBackButton />
                <BtoolsFooter />
            </div>
        </>
    )
}
export default Header;