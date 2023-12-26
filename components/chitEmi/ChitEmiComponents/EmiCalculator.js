import React, { useState } from "react";


const EmiCalculator = (props) => {

    const [loan, setLoan] = useState({
        loanAmount: '',
        interestRate: '',
        loanTenure: ''
    })
    const [emiVal, setEmival] = useState({})
    const [emiTable, setEmiTable] = useState([])

    const emiHandleChange = (event) => {
        let { name, value } = event.target
        setLoan({ ...loan, [name]: value })
    }
    const emiHandleClear = () => {
        setLoan({
            loanAmount: '',
            interestRate: '',
            loanTenure: ''
        })
        setEmiTable([])
        setEmival({})
    }

    const emihandleSubmit = (event) => {
        event.preventDefault()
        setEmival()
        let data = emiCalculator()
        setEmival(data)
        let emiMonth = getMonthinYear()
        let emiData1 = firstEmiCalulation()
        let emiData2 = secondEmiCalculation()
        let emidata3 = [{ ...emiData1 }, ...emiData2]

        let filteredData = emidata3.filter((emi, emiIndex) => {
            return emiMonth.map((mon, monthIndex) => {
                if (emiIndex == monthIndex) {
                    return emi.month = mon
                }

            })
        })
        setEmiTable(filteredData)

        //let excelvalue = filteredData

        props.emidataFromChild(emidata3)

    }




    function getMonthinYear() {
        let date = new Date()
        let month = date.getMonth()
        //  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let myMonths = []
        for (let i = 0; i < loan.loanTenure; i++) {
            myMonths.push(months[month])
            ++month
            if (month > 11) {
                month = 0
            }
        }
        return myMonths;
        //   let newmonthValue = Object.assign({},myMonths)
        // const separateObject = newmonthValue => {
        //     const res = [];
        //     const keys = Object.keys(newmonthValue);
        //     keys.forEach(key => {
        //        res.push({
        //           key: newmonthValue[key]
        //        });
        //     });
        //     return res;
        //  };

        //  let emiMonthValue = separateObject(newmonthValue)
        //    return emiMonthValue
    }



    function emiCalculator() {
        let rateOfInterest = (parseFloat(loan.interestRate) / 12 / 100)
        let emiValue=parseInt(loan.loanAmount) * rateOfInterest*(Math.pow(1 + rateOfInterest,parseInt(loan.loanTenure)))/(Math.pow(1 + rateOfInterest,parseInt(loan.loanTenure))-1)
        // let rate = 1 + rateOfInterest
        // let constValue = Math.pow((rate), parseInt(loan.loanTenure))
        // let emiValue1 = parseInt(loan.loanAmount) * rateOfInterest * (constValue / (constValue - 1))
        let LoanEmi = Math.round(emiValue)
        let totalPayment = emiValue * parseInt(loan.loanTenure);
        let Totalpayment = Math.round(totalPayment)
        let emiInterest = totalPayment - parseInt(loan.loanAmount);
        let EmiInterest = Math.round(emiInterest)
        return { LoanEmi, Totalpayment, EmiInterest }
    }
    function firstEmiCalulation() {
        let rateOfInterest = (parseFloat(loan.interestRate) / 12 / 100)
        let totalpayment=parseInt(loan.loanAmount) * rateOfInterest*(Math.pow(1 + rateOfInterest,parseInt(loan.loanTenure)))/(Math.pow(1 + rateOfInterest,parseInt(loan.loanTenure))-1)
        // let rate = 1 + rateOfInterest
        // let constValue = Math.pow((rate), loan.loanTenure)
        // let totalpayment = parseInt(loan.loanAmount) * rateOfInterest * (constValue / (constValue - 1))
        let TotalPaymentValue = Math.round(totalpayment)
        let interestValue = loan.loanAmount * ((loan.interestRate / 100) / 12)
        let InterestEmiValue = Math.round(interestValue)
        let principalValue = totalpayment - interestValue
        let PrincipalEmiValue = Math.round(principalValue)
        let balanceValue = loan.loanAmount - principalValue
        let BalanceEmiValue = Math.round(balanceValue)
        let loanPaid = 100 - (balanceValue / loan.loanAmount) * 100
        let LoanPaid = loanPaid.toFixed(2)

        return { PrincipalEmiValue, InterestEmiValue, TotalPaymentValue, BalanceEmiValue, LoanPaid }
    }
    function secondEmiCalculation() {
        let rateOfInterest = (parseFloat(loan.interestRate) / 12 / 100)
        let totalpayment=parseInt(loan.loanAmount) * rateOfInterest*(Math.pow(1 + rateOfInterest,parseInt(loan.loanTenure)))/(Math.pow(1 + rateOfInterest,parseInt(loan.loanTenure))-1)
        // let rateOfInterest = (loan.interestRate / 12 / 100)
        // let constValue = Math.pow((1 + rateOfInterest), loan.loanTenure)
        // let totalpayment = loan.loanAmount * rateOfInterest * (constValue / (constValue - 1))
        let TotalPaymentValue = Math.round(totalpayment)
        let oldvalue = loan.loanAmount
        let arr = []
        for (let i = 0; i < loan.loanTenure - 1; i++) {
            let interestValue = oldvalue * ((loan.interestRate / 100) / 12)
            oldvalue = oldvalue - (totalpayment - interestValue)
            interestValue = oldvalue * ((loan.interestRate / 100) / 12)
            let InterestEmiValue = Math.round(interestValue)
            let principalValue = totalpayment - interestValue
            let PrincipalEmiValue = Math.round(principalValue)
            let balanceValue = oldvalue - principalValue;
            let BalanceEmiValue = Math.round(balanceValue)
            let loanPaidValue = 100 - (balanceValue / loan.loanAmount) * 100
            let LoanPaid = loanPaidValue.toFixed(2)
            let object = { PrincipalEmiValue, InterestEmiValue, TotalPaymentValue, BalanceEmiValue, LoanPaid }
            arr.push(object)

        }

        return arr

    }
 const handlePopupClick=()=>{
    props.handlePopupClick(true)
 }

    return (
        <>
            <div className="h-[100vh] md:hidden  w-full flex justify-around items-center">
                <div className=" flex flex-col w-full h-[100vh]">
                    <div className="w-full h-[36vh] border-b-[2px] border-solid border-opacity-[0.15] border-[#707070] flex justify-center">
                        <form onSubmit={emihandleSubmit} className="w-[90%]  h-[33.3vh] flex justify-between flex-col">
                            <div>
                                <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Loan Amount</h1>
                                <div className="h-[6vh] flex w-full bg-[#f3f3f3] rounded-[3px] outline-none">
                                    <input type='number' required className="h-[6vh] w-[85%] bg-[#F3F3F3] rounded-[3px] pl-[10px] outline-none" id="emiValue" name="loanAmount" value={loan.loanAmount} onChange={emiHandleChange} />
                                    <h1 className="h-[6vh] flex justify-center items-center w-[15%]" >{props.currencySymbol}</h1>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Interest Rate</h1>
                                <div className="h-[6vh] flex w-full bg-[#f3f3f3] rounded-[3px] outline-none">
                                    <input required className="h-[6vh] pl-[10px] w-[85%] bg-[#f3f3f3] rounded-[3px] outline-none" type='number' id="emiRate" name="interestRate" value={loan.interestRate} onChange={emiHandleChange} />
                                    <h1 className="h-[6vh] flex justify-center items-center w-[15%]" >%</h1>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Loan Tenure</h1>
                                <div className="h-[6vh] flex w-full bg-[#f3f3f3] rounded-[3px] outline-none">
                                    <input required className="h-[6vh] pl-[10px] w-[85%] bg-[#f3f3f3] rounded-[3px] outline-none" type='number' id="emiLoan" name="loanTenure" value={loan.loanTenure} onChange={emiHandleChange} />
                                    <h1 className="h-[6vh] flex justify-center items-center w-[15%]">Mo</h1>
                                </div>
                            </div>
                            <div className="flex justify-between ">
                                <input type='button' value='Clear' id="emiClear" className="bg-[#FF76B6] w-[50%] text-[#FF76B6] cursor-pointer h-[6vh] bg-opacity-[15%] rounded-[6px]" onClick={emiHandleClear} />
                                <input type='submit' value='Calculate' id="emiCalculate" className="bg-[#FF76B6] ml-[25px] h-[6vh] cursor-pointer rounded-[6px] w-[50%] text-[#F3F3F3]" />
                            </div>

                        </form>
                    </div>

                    <div className="w-full h-[25vh] flex justify-around items-center">
                        <div className=" h-[25vh] flex justify-around items-center w-full">
                            <div className="flex justify-center flex-col items-center h-[20vh] w-[75%] rounded-[10px] border-[2px] border-solid border-opacity-[0.15] border-[#707070]">
                                <div className="border-b-[2px] border-solid border-opacity-[0.15] border-[#707070] w-full h-[6.6vh] flex flex-col justify-around items-center">
                                    <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Loan EMI</h1>
                                    <h1 className=" font-bold">{props.currencySymbol} {emiVal.LoanEmi == undefined ? 0 : emiVal.LoanEmi}</h1>
                                </div>
                                <div className=" border-b-[2px] border-solid border-opacity-[0.15] border-[#707070] w-full h-[6.6vh] flex flex-col justify-around items-center">
                                    <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">Total Interest Payable</h1>
                                    <h1 className=" font-bold">{props.currencySymbol} {emiVal.EmiInterest == undefined ? 0 : emiVal.EmiInterest}</h1>
                                </div>
                                <div className="w-full h-[6.6vh] flex flex-col justify-around items-center">
                                    <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[30%] font-[sfpro-regular]">(Principal + Interest)</h1>
                                    <h1 className=" font-bold">{props.currencySymbol} {emiVal.Totalpayment == undefined ? 0 : emiVal.Totalpayment}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[35vh] flex justify-center border-t-[2px] border-solid border-opacity-[0.15] border-[#707070]">
                        <div className="flex items-center justify-center  h-[40vh] w-[90%]">
                            <div className="w-full h-[35vh]">
                            <div className="scroll-smooth w-full max-h-[100%] overflow-scroll overflow-y-auto">
                                <div className="h-[35vh] border-[2px] rounded-[10px] border-solid border-opacity-[0.15] border-[#707070] w-[750px]">
                                    <div className="bg-[#F3F3F3] h-[7vh] w-full flex justify-around items-center" >
                                        <div className="w-[95%] flex  items-center">
                                            <p className="w-[17%] flex justify-center items-center font-[sfpro-medium]">Month</p>
                                            <p className="w-[27%] flex justify-center items-center font-[sfpro-medium]">Principal</p>
                                            <p className="w-[24%] flex justify-center items-center font-[sfpro-medium]">Interest</p>
                                            <p className="w-[32%] flex justify-center items-center font-[sfpro-medium]">Total Payment</p>
                                            <p className="w-[27%]  flex justify-center items-center font-[sfpro-medium]">Balance</p>
                                            <p className="w-[16%] flex justify-center items-center font-[sfpro-medium]">Loan Paid To Date</p>
                                        </div>
                                    </div>
                                    <div className="h-[27vh] overflow-auto scrollBar ">
                                        {
                                            emiTable.map((data1, index) => (
                                                <div className="h-[7vh] w-full flex justify-around items-center" >
                                                    <div key={index} className="w-[95%] flex flex-row items-center">
                                                        <p className="w-[11%] flex items-center h-[4vh] font-[sfpro-regular]">{data1.month}</p>
                                                        <p className="w-[18%] flex justify-around items-center h-[4vh]  font-[sfpro-regular]">{Number(data1.PrincipalEmiValue).toFixed(2)}</p>
                                                        <p className="w-[15%] flex justify-around items-center h-[4vh] font-[sfpro-regular] ">{Number(data1.InterestEmiValue).toFixed(2)}</p>
                                                        <p className="w-[22%] flex justify-around items-center h-[4vh] font-[sfpro-regular]">{Number(data1.TotalPaymentValue).toFixed(2)}</p>
                                                        <p className="w-[19%] flex justify-around items-center h-[4vh] font-[sfpro-regular]">{Number(data1.BalanceEmiValue).toFixed(2)}</p>
                                                        <p className="w-[20%] flex justify-around items-center h-[4vh] font-[sfpro-regular]">{Number(data1.LoanPaid).toFixed(2)}</p><i class="fa fa-percent" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            ))

                                        }

                                    </div>
                                    </div>


                                    <div className=" fixed flex items-center justify-end bottom-[140px] top-[550px] right-[22px] h-[10vh] w-full">
                                        <div onClick={handlePopupClick} className="bg-[#FF76B6] h-[4rem] flex justify-center items-center rounded-full w-[4rem]">
                                            <img src="/icons/Icon download.svg" height={20} width={20} alt="download" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:hidden md:block" >
                <div className="h-[66vh] mb-[25px] w-full flex justify-center items-center">
                    <div className="bg-[#FFFFFF] rounded-[10px] h-[65vh] w-[90%] flex flex-row justify-between">
                        <div className="h-[65vh] w-[30%] flex justify-center items-center rounded-tl-[10px] rounded-bl-[10px]">
                            <div className=" flex flex-col items-center h-[60vh] w-full border-r-[2px] border-solid border-opacity-[0.15] border-[#707070]">
                                <div className="flex justify-start h-[37vh] w-full">
                                    <form onSubmit={emihandleSubmit} className="ml-[44px] flex justify-between flex-col h-[35vh] w-[75%]">
                                        <div>
                                            <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[20%] font-[sfpro-regular]">Loan Amount</h1>
                                            <div className="h-[6vh] flex w-full bg-[#f3f3f3] rounded-[3px] outline-none">
                                                <input type='number' required className="h-[6vh] pl-[10px] w-[85%] bg-[#f3f3f3] rounded-[3px] outline-none" id="emiValue" name="loanAmount" value={loan.loanAmount} onChange={emiHandleChange} />
                                                <h1 className="h-[6vh] flex justify-center items-center w-[15%]" >{props.currencySymbol}</h1>
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[20%] font-[sfpro-regular]">Interest Rate</h1>
                                            <div className="h-[6vh] flex w-full bg-[#f3f3f3] rounded-[3px] outline-none">
                                                <input required className="h-[6vh] pl-[10px] w-[85%] bg-[#f3f3f3] rounded-[3px] outline-none" type='number' id="emiRate" name="interestRate" value={loan.interestRate} onChange={emiHandleChange} />
                                                <h1 className="h-[6vh] flex justify-center items-center w-[15%]" >%</h1>
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[20%] font-[sfpro-regular]">Loan Tenure</h1>
                                            <div className="h-[6vh] flex w-full bg-[#f3f3f3] rounded-[3px] outline-none">
                                                <input required className="h-[6vh] pl-[10px] w-[85%] bg-[#f3f3f3] rounded-[3px] outline-none" type='number' id="emiLoan" name="loanTenure" value={loan.loanTenure} onChange={emiHandleChange} />
                                                <h1 className="h-[6vh] flex justify-center items-center w-[15%]">Mo</h1>
                                            </div>
                                        </div>
                                        <div>
                                            <input type='button' value='Clear' id="emiClear" className="bg-[#FF76B6] w-[35%] text-[#FF76B6] cursor-pointer h-[6vh] bg-opacity-[15%] rounded-[6px]" onClick={emiHandleClear} />
                                            <input type='submit' value='Calculate' id="emiCalculate" className="bg-[#FF76B6] ml-[25px] h-[6vh] cursor-pointer rounded-[6px] md:w-[41%] xl:w-[35%] text-[#F3F3F3]" />
                                        </div>

                                    </form>
                                </div>
                                <div className=" h-[25vh] flex justify-start items-center w-full">
                                    <div className="flex justify-center flex-col items-center h-[20vh] w-[75%] ml-[44px] rounded-[10px] border-[2px] border-solid border-opacity-[0.15] border-[#707070]">
                                        <div className="border-b-[2px] border-solid border-opacity-[0.15] border-[#707070] w-full h-[6.6vh] flex flex-col justify-around items-center">
                                            <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[20%] font-[sfpro-regular]">Loan EMI</h1>
                                            <h1>{props.currencySymbol} {emiVal.LoanEmi == undefined ? 0 : emiVal.LoanEmi}</h1>
                                        </div>
                                        <div className=" border-b-[2px] border-solid border-opacity-[0.15] border-[#707070] w-full h-[6.6vh] flex flex-col justify-around items-center">
                                            <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[20%] font-[sfpro-regular]">Total Interest Payable</h1>
                                            <h1>{props.currencySymbol} {emiVal.EmiInterest == undefined ? 0 : emiVal.EmiInterest}</h1>
                                        </div>
                                        <div className="w-full h-[6.6vh] flex flex-col justify-around items-center">
                                            <h1 className="text-[14px] font-bold text-[#000000] text-opacity-[20%] font-[sfpro-regular]">(Principal + Interest)</h1>
                                            <h1>{props.currencySymbol} {emiVal.Totalpayment == undefined ? 0 : emiVal.Totalpayment}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-center items-center h-[65vh] w-[70%] ">
                            <div className="h-[56vh] border-[2px] rounded-[10px] border-solid border-opacity-[0.15] border-[#707070] w-[86%] ">
                                <div className="bg-[#F3F3F3] h-[7vh] w-full flex justify-around items-center" >
                                    <div className="w-[95%] flex justify-between items-center">
                                        <p className="w-[5%] font-[sfpro-medium]">Month</p>
                                        <p className="w-[7%] font-[sfpro-medium]">Principal</p>
                                        <p className="w-[7%] font-[sfpro-medium]">Interest</p>
                                        <p className="w-[14%] font-[sfpro-medium]">Total Payment</p>
                                        <p className="w-[8%] font-[sfpro-medium]">Balance</p>
                                        <p className="w-[16%] font-[sfpro-medium]">Loan Paid To Date</p>
                                    </div>
                                </div>
                                <div className="h-[48vh] overflow-auto scrollBar ">
                                    {
                                        emiTable.map((data1, index) => (
                                            <div className="h-[7vh] w-full flex justify-around items-center" >
                                                <div key={index} className="w-[95%] flex flex-row items-center">
                                                    <p className="w-[11%] flex items-center h-[4vh] font-[sfpro-regular]">{data1.month}</p>
                                                    <p className="w-[13%] flex justify-around items-center h-[4vh]  font-[sfpro-regular]">{Number(data1.PrincipalEmiValue).toFixed(2)}</p>
                                                    <p className="w-[15%] flex justify-around items-center h-[4vh] font-[sfpro-regular] ">{Number(data1.InterestEmiValue).toFixed(2)}</p>
                                                    <p className="w-[22%] flex justify-around items-center h-[4vh] font-[sfpro-regular]">{Number(data1.TotalPaymentValue).toFixed(2)}</p>
                                                    <p className="w-[19%] flex justify-around items-center h-[4vh] font-[sfpro-regular]">{Number(data1.BalanceEmiValue).toFixed(2)}</p>
                                                    <p className="w-[20%] flex justify-around items-center h-[4vh] font-[sfpro-regular]">{Number(data1.LoanPaid).toFixed(2)}</p><i class="fa fa-percent" aria-hidden="true"></i>
                                                </div>
                                            </div>

                                        ))

                                    }
                                </div>

                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmiCalculator;