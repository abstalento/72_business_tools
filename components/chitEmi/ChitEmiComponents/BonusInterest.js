import React, { useState } from "react";


const BonusInterest = (props) => {

    // State Values
    const [inputs, setInputs] = useState({
        bchitValue: '',
        bcommPercent: 1,
        btMonth: '',
        bpMonth: '',
        auction: ''
    })
    const [val, setVal] = useState({})
    const [overalldata, setoveralldata] = useState([])
    //HandleChange 
    const handleChangeBonus = (e) => {
        let { name, value } = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    //HandleClear
    const handleClear = () => {
        setInputs({
            bchitValue: '',
            bcommPercent: '',
            btMonth: '',
            bpMonth: '',
            auction: ''
        })
        setVal('')
    }

    //HandleSubmit
    let bMap = {}
    const handleSubmitBonus = (e) => {
        e.preventDefault()
        let auctionVal = auctionValue()
        let val1 = bonusFirstIntallment()
        let val2 = bonusSecondInstallment()
        let val3 = bonusThirdInstallment()

        let bdisplay = [{ ...auctionVal }, { ...val1 }, { ...val2 }, ...val3];

        for (let i = 0; i < bdisplay.length; i++) {
            Object.assign(bMap, bdisplay[i]);

            if (inputs.bpMonth == bMap.id) {
                setVal({ ...bMap });

                let bonusValue = [{ ...bMap }]

                props.bonusdataFromChild(bonusValue)

            }
        }
    }

    //Calculating Auction Amount
    function auctionValue() {
        if (Number(inputs.auction)) {
            const auctionAmount = Number(inputs.bchitValue) - Number(inputs.auction)
            return auctionAmount
        }
        return null

    }

    //Calculating First Installment 
    function bonusFirstIntallment() {
        let id = 1
        let interest = 0;
        let installment = inputs.bchitValue / inputs.btMonth
        let commission = inputs.bchitValue * (parseInt(inputs.bcommPercent) / 100)
        let amountVal = inputs.bchitValue
        const auctionAmount = parseInt(inputs.bchitValue) - parseInt(inputs.auction)
        return { id, interest, installment, amountVal, commission }
    }

    //Calculating Second Installment
    function bonusSecondInstallment() {
        let id = 2
        let amount = inputs.bchitValue * (30 / 100);
        let amountVal = inputs.bchitValue - amount
        let commission = amountVal * (parseInt(inputs.bcommPercent) / 100)
        let interest = ((100 - ((amountVal / inputs.bchitValue) * 100)) / 100).toFixed(2)
        let installment = amountVal / inputs.btMonth
        const auctionAmount = parseInt(inputs.bchitValue) - parseInt(inputs.auction)
        return { id, interest, installment, amountVal, commission }
    }

    //Calculating Remining Installment
    function bonusThirdInstallment() {
        let amount = inputs.bchitValue * (30 / 100);
        let Value = amount / (inputs.btMonth - 2);
        let oldValue = inputs.bchitValue - amount;
        const arr = []
        for (let i = 1; i <= (inputs.btMonth - 2); i++) {
            let id = i + 2
            oldValue = oldValue + Value;
            let AmountVal = (oldValue * 100) / 100;
            let amountVal = Math.round(AmountVal)
            let install = ((AmountVal / inputs.btMonth) * 100) / 100;
            let installment = Math.round(install)
            let commis = ((AmountVal * (parseInt(inputs.bcommPercent) / 100)) * 100) / 100;
            let commission = Math.round(commis)
            let inter = ((100 - ((AmountVal / inputs.bchitValue) * 100)) / 100)
            let interest = inter.toFixed(2)
            let obj = { id, interest, installment, amountVal, commission }

            arr.push(obj)
        }
        return arr
    }
const bonusPdfClick =()=>{
    props.bonusPdfClick()
}

    return (
        <>
            <div className="h-[88vh] md:hidden w-full bg-white">
                <div className="w-full h-[100vh] flex flex-col items-center ">
                    <div className="flex items-start  justify-center border-b-[2px] border-solid border-opacity-[0.15] border-[#707070] h-[44vh] w-full">
                        <form className="h-[42vh] flex justify-between flex-col w-[90%] " onSubmit={handleSubmitBonus} >
                            <div className="flex flex-col">
                                <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Chit Value</h1>
                                <input className="pl-[10px] outline-none rounded-[4px] h-[6vh] w-full bg-[#F3F3F3]" required type='number' name="bchitValue" id="bonusValue" value={inputs.bchitValue} onChange={handleChangeBonus} />
                            </div>
                            <div className="flex w-full justify-between items-center">
                                <div className="flex flex-col">
                                    <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Total Months</h1>
                                    <input className="pl-[10px] outline-none rounded-[4px] h-[6vh] w-[95%] bg-[#F3F3F3]" required type='number' name="btMonth" id="bonusTotalMonth" value={inputs.btMonth} onChange={handleChangeBonus} />
                                </div>
                                <div className="flex flex-col justify-end items-end">
                                    <div className="w-[95%] flex justify-start items-start">
                                        <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Present Month</h1>
                                    </div>
                                    <input className="pl-[10px] outline-none rounded-[4px] h-[6vh] w-[95%] bg-[#F3F3F3]" type='number' required name="bpMonth" id="bonusPresentMonth" value={inputs.bpMonth} onChange={handleChangeBonus} />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Commission Percentage %</h1>
                                <select className=" rounded-[4px] outline-none h-[6vh] w-full bg-[#F3F3F3]" name="bcommPercent" id="bonusCommission" value={inputs.bcommPercent ? inputs.bcommPercent : 1} onChange={handleChangeBonus}>
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
                            <div className="flex flex-col">
                                <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Auction Amount (optional)</h1>
                                <input className="pl-[10px] outline-none rounded-[4px] h-[6vh] w-full bg-[#F3F3F3]" type='number' name="auction" value={inputs.auction} onChange={handleChangeBonus} />
                            </div>
                            <div className="flex justify-between">
                                <button className="bg-[#FF76B6] w-[50%] text-[#FF76B6] cursor-pointer h-[6vh] bg-opacity-[15%] rounded-[6px]" id="bonusClear" onClick={handleClear} >Clear</button>
                                <input className="bg-[#FF76B6] ml-[25px] h-[6vh] w-[50%] cursor-pointer text-[#F3F3F3] rounded-[6px]" type='submit' id="bonusCalculate" value='Calculate' />
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col items-center justify-center  h-[40vh] w-[90%]">
                        <div className="flex flex-col justify-between items-start w-full h-[35vh]">
                            <div className="h-[7vh] flex flex-col justify-around items-start w-full rounded-[4px] bg-[#F3F3F3]">
                                <h1 className="h-[10vh] w-full flex items-center pl-[15px] text-[#000000] text-opacity-[30%] font-[sfpro-medium]">Amount payable for current month</h1>
                                <h1 className="h-[10vh] w-full flex items-center pl-[15px] font-bold font-[sfpro-regular]">{props.currencySymbol} {Number(val.installment ? val.installment : 0).toFixed(2)}</h1>
                            </div>
                            <div className="h-[7vh] w-full flex flex-col justify-around items-start rounded-[4px] bg-[#F3F3F3]">
                                <h1 className="h-[10vh] w-full flex items-center pl-[15px] text-[#000000] text-opacity-[30%] font-[sfpro-medium]">Interest value</h1>
                                <h1 className="h-[10vh] w-full flex items-center pl-[15px] font-bold font-[sfpro-regular]">{val.interest === undefined ? 0.00 : val.interest}</h1>
                            </div>
                            <div className="h-[7vh] w-full flex flex-col justify-around items-start rounded-[4px] bg-[#F3F3F3]">
                                <h1 className="h-[10vh] w-full flex items-center pl-[15px] text-[#000000] text-opacity-[30%] font-[sfpro-medium]">Amount for auctioned person</h1>
                                <h1 className="h-[10vh] w-full flex items-center pl-[15px] font-bold font-[sfpro-regular]">{props.currencySymbol}{val.amountVal === undefined ? 0 : val.amountVal}</h1>
                            </div>
                            <div className="h-[7vh] w-full flex flex-col justify-around items-start rounded-[4px] bg-[#F3F3F3]">
                                <h1 className="h-[10vh] w-full flex items-center pl-[15px] text-[#000000] text-opacity-[30%] font-[sfpro-medium]">Bonus amount</h1>
                                <h1 className="h-[10vh] w-full flex items-center pl-[15px] font-bold font-[sfpro-regular]">{props.currencySymbol} {Number(val.commission ? val.commission : 0).toFixed(2)}</h1>
                            </div>
                        </div>
                        <div className=" fixed flex items-center justify-end bottom-[140px] top-[550px] right-[22px] h-[10vh] w-full">
                            <div onClick={bonusPdfClick} className="bg-[#FF76B6] h-[4rem] flex justify-center items-center rounded-full w-[4rem]">
                                <img src="/icons/Icon download.svg" height={20} width={20} alt="download" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:hidden md:block">
                <div className="h-[66vh] mb-[25px] w-full flex justify-center items-center">
                    <div className="bg-[#FFFFFF] rounded-[10px] h-[65vh] w-[90%] flex flex-row">
                        <div className="h-[65vh]  w-[53%] flex justify-center items-center">
                            <div className="h-[55vh] border-r-[2px] flex justify-start items-start border-solid border-opacity-[0.15] border-[#707070] w-full">
                                <div className=" mr-[25px]  mt-[10px] ml-[35px] w-full h-[40vh]">
                                    <div className="w-full h-[43vh]">
                                        <form className="w-full h-[40vh] flex justify-between flex-col " onSubmit={handleSubmitBonus}>
                                            <div className="flex flex-row justify-between">
                                                <div className="w-[49%] h-[30vh] flex flex-col justify-between">
                                                    <div className="flex flex-col">
                                                        <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Chit Value</h1>
                                                        <input className="pl-[10px] outline-none rounded-[4px] h-[6vh] w-full bg-[#F3F3F3]" required type='number' name="bchitValue" id="bonusValue" value={inputs.bchitValue} onChange={handleChangeBonus} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Total Months</h1>
                                                        <input className="pl-[10px] outline-none rounded-[4px] h-[6vh] w-full bg-[#F3F3F3]" required type='number' name="btMonth" id="bonusTotalMonth" value={inputs.btMonth} onChange={handleChangeBonus} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Commission Percentage %</h1>
                                                        <select className="outline-none rounded-[4px] h-[6vh] w-full bg-[#F3F3F3]" name="bcommPercent" id="bonusCommission" value={inputs.bcommPercent ? inputs.bcommPercent : 1} onChange={handleChangeBonus}>
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
                                                </div>
                                                <div className="w-[49%] h-[19vh] flex flex-col justify-between">
                                                    <div className="flex flex-col">
                                                        <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Present Month</h1>
                                                        <input className="pl-[10px] outline-none rounded-[4px] h-[6vh] w-full bg-[#F3F3F3]" type='number' required name="bpMonth" id="bonusPresentMonth" value={inputs.bpMonth} onChange={handleChangeBonus} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Auction Amount (optional)</h1>
                                                        <input className="pl-[10px] outline-none rounded-[4px] h-[6vh] w-full bg-[#F3F3F3]" type='number' name="auction" value={inputs.auction} onChange={handleChangeBonus} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <button className="bg-[#FF76B6] w-[20%] text-[#FF76B6] cursor-pointer h-[6vh] bg-opacity-[15%] rounded-[6px]" id="bonusClear" onClick={handleClear} >Clear</button>
                                                <input className="bg-[#FF76B6] ml-[25px] h-[6vh] md:w-[22%] xl:w-[20%] cursor-pointer text-[#F3F3F3] rounded-[6px]" type='submit' id="bonusCalculate" value='Calculate' />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[65vh] flex justify-center w-[47%]">
                            <div className=" flex flex-row border-[2px] rounded-[10px] border-solid border-opacity-[0.15] mt-[44px] h-[40vh] w-[85%]">
                                <div className="flex flex-col justify-between border-r-[2px] border-solid border-opacity-[0.15] w-[60%] h-[40vh]">
                                    <div className="h-[10vh] flex justify-around items-center border-b-[2px] border-solid border-opacity-[0.15]">
                                        <h1 className="h-[10vh] w-full flex items-center pl-[30px] text-[#000000] text-opacity-[30%] font-[sfpro-medium]">Amount payable for current month</h1>
                                    </div>
                                    <div className="h-[10vh] flex justify-around items-center border-b-[2px] border-solid border-opacity-[0.15]">
                                        <h1 className="h-[10vh] w-full flex items-center pl-[30px] text-[#000000] text-opacity-[30%] font-[sfpro-medium]">Interest value</h1>
                                    </div>
                                    <div className="h-[10vh] flex justify-around items-center border-b-[2px] border-solid border-opacity-[0.15]">
                                        <h1 className="h-[10vh] w-full flex items-center pl-[30px] text-[#000000] text-opacity-[30%] font-[sfpro-medium]">Amount for auctioned person</h1>
                                    </div>
                                    <div className="h-[10vh] flex justify-around items-center">
                                        <h1 className="h-[10vh] w-full flex items-center pl-[30px] text-[#000000] text-opacity-[30%] font-[sfpro-medium]">Bonus amount</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between w-[40%] h-[40vh]" ref={props.amountRef}>
                                    <div className="h-[10vh] flex justify-around items-center border-b-[2px] border-solid border-opacity-[0.15]">
                                        <h1 className="h-[10vh] w-full flex items-center pl-[30px] font-bold font-[sfpro-regular]">{props.currencySymbol} {Number(val.installment ? val.installment : 0).toFixed(2)}</h1>
                                    </div>
                                    <div className="h-[10vh] flex justify-around items-center border-b-[2px] border-solid border-opacity-[0.15]">
                                        <h1 className="h-[10vh] w-full flex items-center pl-[30px] font-bold font-[sfpro-regular]">{val.interest === undefined ? 0.00 : val.interest}</h1>
                                    </div>
                                    <div className="h-[10vh] flex justify-around items-center border-b-[2px] border-solid border-opacity-[0.15]">
                                        <h1 className="h-[10vh] w-full flex items-center pl-[30px] font-bold font-[sfpro-regular]">{props.currencySymbol}{val.amountVal === undefined ? 0 : val.amountVal}</h1>
                                    </div>
                                    <div className="h-[10vh] flex justify-around items-center">
                                        <h1 className="h-[10vh] w-full flex items-center pl-[30px] font-bold font-[sfpro-regular]">{props.currencySymbol} {Number(val.commission ? val.commission : 0).toFixed(2)}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default BonusInterest;


