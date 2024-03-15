import Header from "../components/Header";
import InputTab from "../components/InputTab";
import Result from "../components/Result";
import TopContainer from "../components/TopContainer";
import Feedback from "../components/Feedback";
import CurrencyPopUp from "../components/CurrencyPopUp";
import { useState } from "react";

export default function Home() {
  const [fixedCost, setFixedCost] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [quantity, setQuantity] = useState("");

  // const [currencySymbol, setCurrencySymbol] = useState("₹");
  // const [currencyId, setCurrencyId] = useState("INR");
  // const [currencyData, setCurrencyData] = useState({
  //   // currencySymbol:'₹',
  //   currencyId: "INR",
  //   currencyClose: false,
  // });

  // const CurrencyValue = (currencySymbols) => {
  //   setCurrencySymbol(currencySymbols);
  // };
  // const setCurrencyIdValue = (currencyIds) => {
  //   setCurrencyId(currencyIds);
  // };
  // const setClosePopUp = (closeCurrency) => {
  //   setCurrencyData({ ...currencyData, currencyClose: closeCurrency });
  // };
  // const openPopUp = (popupOpen) => {
  //   setCurrencyData({ ...currencyData, currencyClose: popupOpen });
  // };

  const inputs = (inFixedCost, inVariableCost, inPricePerUnit, inQuantity) => {
    setFixedCost(inFixedCost);
    setVariableCost(inVariableCost);
    setPricePerUnit(inPricePerUnit);
    setQuantity(inQuantity);
  };
  return (
    <>
      {/* {currencyData.currencyClose ? (
        <div className="">
          <CurrencyPopUp
            myCurrencySymbol={CurrencyValue}
            myCurrencyId={setCurrencyIdValue}
            closeCurrencyPopUp={setClosePopUp}
          />
        </div>
      ) : null} */}
      <div>
        <Header />
      </div>
      <div className="flex flex-col m-0 h-[60vh] bg-[#fddd9a] w-full">
        <div className="relative block w-[100%] h-[70vh]">
          <div className="h-[20vh] contents">
            <TopContainer />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col relative justify-center w-full">
          <div className="xl:w-[30%] md:w-[50%] lg:ml-[2%] md:ml-[25%] sm:ml-[25%] ml-[10%] flex relative md:justify-center md:place-items-center md:items-center">
            <InputTab
              inputValues={inputs}
              // finalCurrencySymbol={currencySymbol}
              // finalCurrencyId={currencyId}
            />
          </div>
          <div
            className="lg:w-[75%] h-auto md:w-[90%] lg:ml-[0] mt-[2%] lg:mt-[0] md:mt-[2%] md:ml-[5%] sm:ml-[25%] ml-[2%] flex relative md:justify-center md:place-items-center md:items-center
            lg:mr-[6%] mr-[5%]
            "
          >
            <Result
              fixedCost={fixedCost}
              variableCost={variableCost}
              pricePerUnit={pricePerUnit}
              quantity={quantity}
            />
          </div>
        </div>
      </div>
      <div className="relative contents">
        <Feedback />
      </div>
    </>
  );
}
