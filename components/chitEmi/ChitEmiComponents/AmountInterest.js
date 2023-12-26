import React, { useState } from "react";


const AmountInterest = (props) => {

    //State Value
    const [values, setValues] = useState({
        ChitValue: '',
        commPercent: 1,
        tMonth: '',
        pMonth: ''
    })
    const [display, setDisplay] = useState([])

    //HandleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    //HandleClear
    const handleClear = () => {
        setValues({
            ChitValue: '',
            commPercent: 1,
            tMonth: '',
            pMonth: ''
        })
        setDisplay([])
    }


    //HandleSubmit
    const handleSubmit = (e) => {
        e.preventDefault()
        setDisplay([])

        let data1 = firstIntallment()
        let data2 = secondInstallment()
        let data3 = thirdInstallment()
        setDisplay([{ ...data1 }, { ...data2 }, ...data3])

        let amountValue = [{ ...data1 }, { ...data2 }, ...data3]

        props.amountdataFromChild(amountValue)
    }

    //Calculating First Installment
    function firstIntallment() {
        let Installment = values.ChitValue / values.tMonth;
        let Commission = values.ChitValue * (parseInt(values.commPercent) / 100)
        // console.log(parseInt(values.commPercent));
        let interestVal = 0
        let AmountVal = parseInt(values.ChitValue)
        return { interestVal, AmountVal, Installment, Commission }
    }

    //Calculating Second Installment
    function secondInstallment() {
        let Amounts = values.ChitValue * (30 / 100);
        let AmountValue = values.ChitValue - Amounts;
        let Installment = AmountValue / values.tMonth;
        let Commission = AmountValue * (parseInt(values.commPercent) / 100);
        let interestVal = (100 - ((AmountValue / values.ChitValue) * 100)) / 100
        let AmountVal = parseInt(AmountValue)
        return { interestVal, AmountVal, Installment, Commission }
    }
 



    //Calculating Remaining Installment
    function thirdInstallment() {
        let length = values.tMonth - 2
        let Amounts = values.ChitValue * (30 / 100);
        let Value = Amounts / (length);
        let oldValue = values.ChitValue - Amounts;
        const arr = []
        for (let i = 1; i <= length; i++) {
            oldValue = oldValue + Value;
            let AmountVal = parseInt((Math.round(oldValue) * 100) / 100);
            let Installment = ((Math.round(AmountVal / values.tMonth)) * 100) / 100;
            let Commission = ((Math.round(AmountVal * (parseInt(values.commPercent) / 100))) * 100) / 100
            let Interst = (parseInt(100 - ((AmountVal / values.ChitValue) * 100)) / 100)
            let interestVal = Interst.toFixed(2)
            let obj = { interestVal, AmountVal, Installment, Commission }
            arr.push(obj)
        }
        return arr
    }
const amountPdfClick=()=>{
    props.amountPdfClick()
}
    return (
        <>
            <div className="min-h-screen md:hidden w-full bg-white">
                <div className="w-full h-[100vh] flex flex-col items-center ">
                    <div className="flex items-start justify-center border-b-[2px] border-solid border-opacity-[0.15] border-[#707070] h-[38vh] w-full">
                        <form className="h-[35vh] flex justify-between  flex-col w-[90%]" onSubmit={handleSubmit}>
                            <div>
                                <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Chit Value</h1>
                                <input type='number' className=" rounded-[4px] pl-[10px] outline-none h-[6vh] w-full bg-[#F3F3F3]" required name="ChitValue" id="amountValue" value={values.ChitValue} onChange={handleChange} />
                            </div>
                            <div className="w-full flex flex-row items-center justify-between">
                                <div>
                                    <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Total Months</h1>
                                    <input className="h-[6vh] pl-[10px] outline-none w-[95%] rounded-[4px] bg-[#F3F3F3]" required type='number' id="amountTotalMonth" name="tMonth" value={values.tMonth} onChange={handleChange} /></div>


                                <div className="flex flex-col justify-end items-end">
                                    <h1 className="text-[14px] font-bold text-[#000000] mr-[68px] text-opacity-[30%] font-[sfpro-regular]">Present Month</h1>
                                    <input className="h-[6vh]  outline-none pl-[10px] w-[95%] rounded-[4px] bg-[#F3F3F3]" required type='number' id="amountPresentMonth" name="pMonth" value={values.pMonth} onChange={handleChange} /></div>
                            </div>
                            <div >
                                <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Commission Percentage %</h1>
                                <select className="h-[6vh]  outline-none w-full rounded-[4px] bg-[#F3F3F3]" name="commPercent" id="amountCommission" value={values.commPercent ? values.commPercent : 1} onChange={handleChange}>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                    <option value='6'>6</option>
                                    <option value='7'>7</option>
                                    <option value='8'>8</option>
                                    <option value='9'>9</option>
                                    <option value='10'>10</option>
                                </select>
                            </div>
                            <div className="flex justify-between items-center">
                                <input className="bg-[#FF76B6] w-[50%] text-[#FF76B6] h-[6vh] cursor-pointer bg-opacity-[15%] rounded-[6px]" type="button" id="amountClear" name="Clear" value="Clear" onClick={handleClear} />
                                <input type='submit' className="bg-[#FF76B6] ml-[25px] h-[6vh] cursor-pointer w-[50%] text-[#F3F3F3] rounded-[6px]" value="Calculate" id="amountCalculate" />
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center justify-center  h-[40vh] w-[90%]">
                        <div className="w-full h-[35vh]">
                            <div className="h-[35vh] border-[2px] rounded-[10px] border-solid border-opacity-[0.15] border-[#707070] w-full">
                                <div className="bg-[#F3F3F3] h-[7vh] w-full flex justify-around items-center" >
                                    <div className="w-[95%] flex  items-center">
                                        <p className="w-[17%] text-[12px] flex justify-center items-center font-[sfpro-medium]">Interest</p>
                                        <p className="w-[27%] text-[12px] flex justify-around pl-[12px] items-center font-[sfpro-medium]">Auctionated Amount</p>
                                        <p className="w-[24%] text-[12px] flex justify-center items-center font-[sfpro-medium]">Installment</p>
                                        <p className="w-[32%] text-[12px] flex justify-center items-center font-[sfpro-medium]">Commission</p>
                                    </div>
                                </div>
                                <div className="h-[27vh] overflow-auto scrollBar ">
                                    {
                                        display.map((data1, index) => (
                                            <div className="h-[7vh] w-full flex justify-around items-center" >
                                                <div key={index} className="w-[95%] flex justify-between items-center">
                                                    <p className="w-[21%] text-[12px] font-[sfpro-regular]">{Number(data1.interestVal).toFixed(2)}</p>
                                                    <p className="w-[30%] text-[12px] font-[sfpro-regular] ">{props.currencySymbol} {Number(data1.AmountVal).toFixed(2)}</p>
                                                    <p className="w-[28%] text-[12px] font-[sfpro-regular]">{props.currencySymbol} {Number(data1.Installment).toFixed(2)}</p>
                                                    <p className="w-[30%] text-[12px] font-[sfpro-regular]">{props.currencySymbol} {Number(data1.Commission).toFixed(2)}</p>
                                                </div>
                                            </div>
                                            // <div>
                                            // <div key={index}>
                                            //     <p className="w-[5%]">{index + 1}</p>
                                            //     <p className="w-[7%]">{Number(data1.interestVal).toFixed(2)}</p>
                                            //     <p className="w-[20%]">{Number(data1.AmountVal).toFixed(2)}</p>
                                            //     <p className="w-[5%]">{Number(data1.Installment).toFixed(2)}</p>
                                            //     <p className="w-[7%]">{Number(data1.Commission).toFixed(2)}</p>
                                            // </div>
                                            // </div>
                                        ))

                                    }

                                </div>
                                <div className=" fixed flex items-center justify-end bottom-[142
                                    0px] top-[550px]  right-[22px] h-[10vh] w-full">
                                    <div onClick={amountPdfClick} className="bg-[#FF76B6] h-[4rem] flex justify-center items-center rounded-full w-[4rem]">
                                        <img src="/icons/Icon download.svg" height={20} width={20} alt="download" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:block">
                <div className="h-[66vh] mb-[25px] w-full flex justify-center items-center">
                    <div className="bg-[#FFFFFF] rounded-[10px] h-[65vh] w-[90%] flex flex-row justify-between">
                        <div className="h-[65vh] w-[30%] flex justify-center items-center rounded-tl-[10px] rounded-bl-[10px]">
                            <div className=" flex flex-row justify-start items-center h-[56vh] w-full border-r-[2px] border-solid border-opacity-[0.15] border-[#707070]">
                                <div className=" ml-[44px] h-[55vh] w-[75%] ">
                                    <form className="h-[50vh] w-full flex flex-col justify-between" onSubmit={handleSubmit}>
                                        <div className="h-[38vh] flex flex-col justify-between">
                                            <div>
                                                <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[20%] font-[sfpro-regular]">Chit Value</h1>
                                                <input type='number' className="pl-[10px] outline-none rounded-[4px] h-[6vh] w-full bg-[#F3F3F3]" required name="ChitValue" id="amountValue" value={values.ChitValue} onChange={handleChange} />
                                            </div>
                                            <div >
                                                <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[20%] font-[sfpro-regular]">Commission Percentage %</h1>
                                                <select className="h-[6vh] outline-none w-full rounded-[4px] bg-[#F3F3F3]" name="commPercent" id="amountCommission" value={values.commPercent ? values.commPercent : 1} onChange={handleChange}>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>4</option>
                                                    <option value='5'>5</option>
                                                    <option value='6'>6</option>
                                                    <option value='7'>7</option>
                                                    <option value='8'>8</option>
                                                    <option value='9'>9</option>
                                                    <option value='10'>10</option>
                                                </select></div>


                                            <div >
                                                <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[20%] font-[sfpro-regular]">Total Months</h1>
                                                <input className="h-[6vh] outline-none pl-[10px] w-full rounded-[4px] bg-[#F3F3F3]" required type='number' id="amountTotalMonth" name="tMonth" value={values.tMonth} onChange={handleChange} /></div>


                                            <div >
                                                <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[20%] font-[sfpro-regular]">Present Month</h1>
                                                <input className="h-[6vh] outline-none pl-[10px] w-full rounded-[4px] bg-[#F3F3F3]" required type='number' id="amountPresentMonth" name="pMonth" value={values.pMonth} onChange={handleChange} /></div>
                                        </div>


                                        <div className="">
                                            <input className="bg-[#FF76B6] w-[35%] text-[#FF76B6] h-[6vh] cursor-pointer bg-opacity-[15%] rounded-[6px]" type="button" id="amountClear" name="Clear" value="Clear" onClick={handleClear} />
                                            <input type='submit' className="bg-[#FF76B6] ml-[25px] h-[6vh] cursor-pointer md:w-[41%] xl:w-[35%] text-[#F3F3F3] rounded-[6px]" value="Calculate" id="amountCalculate" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center h-[65vh] w-[70%] ">
                            {
                                display.length == 0 ? <>
                                    <div className="h-[56vh] border-[2px] rounded-[10px] flex justify-around items-center border-solid border-opacity-[0.15] border-[#707070] w-[86%]">
                                        <div>
                                            <h1 className="text-[20px] font-[sfpro-medium] text-[#000000] text-opacity-[20%]">Enter the values to Calculate!</h1>
                                        </div>
                                    </div>
                                </> :
                                    <>
                                        <div className="h-[56vh] border-[2px] rounded-[10px] border-solid border-opacity-[0.15] border-[#707070] w-[86%]">
                                            <div className="bg-[#F3F3F3] h-[7vh] w-full flex justify-around items-center" >
                                                <div className="w-[95%] text-[15px] flex justify-between items-center">
                                                    <p className="w-[5%] font-[sfpro-medium]">S.No</p>
                                                    <p className="w-[10%] font-[sfpro-medium]">Interest</p>
                                                    <p className="w-[20%] font-[sfpro-medium]">Auctionated Amount</p>
                                                    <p className="xl:w-[11%]  font-[sfpro-medium]">Installment</p>
                                                    <p className="xl:w-[15%]  font-[sfpro-medium]">Commission</p>
                                                </div>
                                            </div>
                                            <div className="h-[48vh] overflow-auto scrollBar ">
                                                {
                                                    display.map((data1, index) => (
                                                        <div className="h-[7vh] w-full flex justify-around items-center" >
                                                            <div key={index} className="w-[95%] flex justify-between items-center">
                                                                <p className="w-[5%]  font-[sfpro-regular]">{index + 1}</p>
                                                                <p className="w-[10%]  font-[sfpro-regular]">{Number(data1.interestVal).toFixed(2)}</p>
                                                                <p className="xl:w-[20%]  font-[sfpro-regular] ">{props.currencySymbol} {Number(data1.AmountVal).toFixed(2)}</p>
                                                                <p className="xl:w-[16%] lg:w-[15%] md:w-[24%] font-[sfpro-regular]">{props.currencySymbol} {Number(data1.Installment).toFixed(2)}</p>
                                                                <p className="xl:w-[16%] md:w[24%] font-[sfpro-regular]">{props.currencySymbol} {Number(data1.Commission).toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                        // <div>
                                                        // <div key={index}>
                                                        //     <p className="w-[5%]">{index + 1}</p>
                                                        //     <p className="w-[7%]">{Number(data1.interestVal).toFixed(2)}</p>
                                                        //     <p className="w-[20%]">{Number(data1.AmountVal).toFixed(2)}</p>
                                                        //     <p className="w-[5%]">{Number(data1.Installment).toFixed(2)}</p>
                                                        //     <p className="w-[7%]">{Number(data1.Commission).toFixed(2)}</p>
                                                        // </div>
                                                        // </div>
                                                    ))

                                                }

                                            </div>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AmountInterest