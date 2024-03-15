import React, { useEffect, useState } from "react";
import CurrencyPopUp from "./CurrencyPopUp";
import Reload from "../public/icons/refresh-arrow.png";
import Image from "next/image";

const InputTab = (inputs) => {
  const [itemList, setItemList] = useState({
    fixedCost: "",
    variableCost: "",
    pricePerUnit: "",
    quantity: "",
  });
  const [selectedTab, setSelectedTab] = useState("unit");
  const [openCurrencyDialog, setOpenCurrencyDialog] = useState(false);

  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [currencyId, setCurrencyId] = useState("INR");

  const handleCurrencySelection = (symbol, id) => {
    setCurrencySymbol(symbol);
    setCurrencyId(id);
    setOpenCurrencyDialog(false);
  };

  const removeCharacter = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItemList((prevState) => ({ ...prevState, [name]: value }));
  };
  const inputHandler = () => {
    inputs.inputValues(
      itemList.fixedCost,
      itemList.variableCost,
      itemList.pricePerUnit,
      itemList.quantity
    );
  };
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (
      ((tab === "price" || tab === "unit") &&
        itemList.variableCost.trim() !== "") ||
      itemList.fixedCost.trim() !== "" ||
      itemList.pricePerUnit.trim() !== "" ||
      itemList.quantity.trim() !== ""
    ) {
      setItemList((prevState) => ({
        ...prevState,
        fixedCost: "",
        variableCost: "",
        pricePerUnit: "",
        quantity: "",
      }));
      inputs.inputValues("", "", "", "");
    }
  };
  const clearInputs = () => {
    if (
      itemList.fixedCost !== "" ||
      itemList.variableCost !== "" ||
      itemList.pricePerUnit !== "" ||
      itemList.quantity !== ""
    ) {
      inputs.inputValues("", "", "", "");
      const reload = document.getElementById("reload");
      reload.classList.add("animate-spin");

      setTimeout(function () {
        reload.classList.remove("animate-spin");
        setItemList({
          fixedCost: "",
          variableCost: "",
          pricePerUnit: "",
          quantity: "",
        });
      }, 1000);
    }
  };

  const currencyPopUpOpen = () => {
    setOpenCurrencyDialog(true);
  };
  return (
    <>
      <div className="w-[350px] bg-white h-[55vh] rounded-3xl shadow-lg shadow-slate-700/40 relative block justify-center items-center">
        <div className="rounded-tl-3xl rounded-tr-3xl bg-slate-500/15 h-[8vh] flex items-center justify-center leading-3">
          <h1 className="text-center font-bold text-[30px] font-sans break-words">
            BEP Calculator
          </h1>
        </div>
        <div className="h-[45vh] rounded-bl-3xl rounded-br-3xl mt-3 relative">
          <div className="flex justify-evenly w-full h-auto">
            <span className="relative flex w-[30%] ml-5 left-2 ">
              <input
                type="radio"
                name="tab"
                id="unit"
                className="p-1 outline-none cursor-pointer accent-green-600/20"
                defaultChecked
                onClick={() => handleTabChange("unit")}
              />
              <label
                htmlFor="unit"
                className={`m-1 text-sm cursor-pointer ${
                  selectedTab === "unit" ? "font-bold" : "font-bold opacity-50 "
                }`}
              >
                Unit
              </label>
            </span>
            <span className="relative flex w-[30%] -ml-4">
              <input
                type="radio"
                name="tab"
                id="price"
                className="p-1 outline-none cursor-pointer accent-green-600/20"
                onClick={() => handleTabChange("price")}
              />
              <label
                className={`m-1 text-sm text-[sm-pro-medium] cursor-pointer ${
                  selectedTab === "price"
                    ? "font-bold"
                    : " font-bold opacity-50"
                }`}
                htmlFor="price"
              >
                Price
              </label>
            </span>
            <span className="relative flex w-[40%] -ml-8">
              <input
                className="w-[45%] font-semibold outline-none font-[sm-pro-medium] text-[14px]"
                value="Currency:"
              />
              <select
                id="currencyPopUp"
                className={
                  "text-[12px] font-semibold ml-0 bg-transparent font-[sm-pro-medium] cursor-pointer outline-none"
                }
                onClick={currencyPopUpOpen}
              >
                <option>
                  {currencyId}({currencySymbol})
                </option>
              </select>
              {/* <button onClick={currencyPopUpOpen} className="outline-none">
                <label className="font-[sm-pro-medium] text-sm m-1 mt-2 outline-none cursor-pointer">
                  Currency:
                  {currencySymbol} {currencyId}
                </label>
              </button> */}
            </span>
          </div>
          <div className="capitalize flex flex-col mt-3 ml-[35px] ">
            <div className="relative flex-col block mt-1">
              <label className="text-xs" htmlFor="fixedCost">
                fixed cost
              </label>
              <input
                type="number"
                className="mt-2 mb-2 w-[90%] h-auto border-b-2 border-b-black text-sm font-[sm-pro-medium] placeholder:pb-2 outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="Eg. 50,000/-"
                name="fixedCost"
                onKeyDown={removeCharacter}
                value={itemList.fixedCost}
                onChange={handleChange}
              />
            </div>
            <div className="relative flex-col block mt-1">
              <label className="text-xs" htmlFor="variableCost">
                {selectedTab === "unit"
                  ? "variable cost per unit"
                  : "Total Variable Cost"}
              </label>
              <input
                type="number"
                className="mt-2 mb-2 w-[90%] h-auto border-b-2 border-b-black text-sm font-[sm-pro-medium] placeholder:pb-2 outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="Eg. 50,000/-"
                name="variableCost"
                onKeyDown={removeCharacter}
                value={itemList.variableCost}
                onChange={handleChange}
              />
            </div>
            {selectedTab === "unit" ? (
              <div className="relative flex-col block mt-1">
                <label className="text-xs" htmlFor="Input">
                  price per unit
                </label>
                <input
                  type="number"
                  className="mt-2 mb-2 w-[90%] h-auto border-b-2 border-b-black text-sm font-[sm-pro-medium] placeholder:pb-2 outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="Eg. 50,000/-"
                  name="pricePerUnit"
                  onKeyDown={removeCharacter}
                  value={itemList.pricePerUnit}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="relative flex-col block mt-1">
                <label className="text-xs" htmlFor="Input">
                  Number Of Units
                </label>
                <input
                  type="number"
                  className="mt-2 mb-2 w-[90%] h-auto border-b-2 border-b-black text-sm font-[sm-pro-medium] placeholder:pb-2 outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="Eg. 50/-"
                  name="quantity"
                  onKeyDown={removeCharacter}
                  value={itemList.quantity}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-evenly mt-3 w-[100%] h-[5vh] ">
            <button
              className={`outline-none h-auto mt-5 relative font-semibold rounded-full p-2 text-2xl pl-3 pr-3 pt-1 w-[50%] text-center bg-[#35cd3b] cursor-pointer
              
              ${
                itemList.fixedCost &&
                itemList.variableCost &&
                (itemList.pricePerUnit || itemList.quantity
                  ? "cursor-pointer"
                  : "cursor-not allowed")
              }
              
              `}
              onClick={inputHandler}
            >
              Calculate
            </button>
            <button
              className={`h-[7vh] outline-none  justify-center items-center mt-5 rounded-[100%] bg-[#fe5a01] relative w-[14%] ${
                itemList.fixedCost ||
                itemList.variableCost ||
                itemList.pricePerUnit ||
                itemList.quantity
                  ? "flex"
                  : "invisible"
              } `}
              id="reload-btn"
              onClick={clearInputs}
            >
              <Image
                src={Reload}
                width={20}
                height={10}
                alt="Reload"
                id="reload"
                className="outline-none"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <CurrencyPopUp
          myCurrencySymbol={setCurrencySymbol}
          myCurrencyId={setCurrencyId}
          closeCurrencyPopUp={() => setOpenCurrencyDialog(false)}
          openCurrency={openCurrencyDialog}
        />
      </div>
    </>
  );
};

export default InputTab;
