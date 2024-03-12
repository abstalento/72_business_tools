import React, { useState } from "react";

const InputTab = (props) => {
  const [itemList, setItemList] = useState({
    fixedCost: "",
    variableCost: "",
    price: "",
    unit: "",
  });
  let count = 0;

  const [selectedTab, setSelectedTab] = useState("unit");

  const removeCharacter = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItemList((prevState) => ({ ...prevState, [name]: value }));
  };
  const inputHandler = () => {
    props.inputValues(
      itemList.fixedCost,
      itemList.variableCost,
      itemList.unit,
      itemList.price
    );
  };
  const clearInputs = () => {
    setItemList({
      fixedCost: "",
      variableCost: "",
      price: "",
      unit: "",
    });
    props.inputValues("", "", "", "");
  };
  return (
    <div className="w-[350px] bg-white h-[55vh] rounded-3xl shadow-lg shadow-slate-700/40 relative block justify-center items-center">
      <div className="rounded-tl-3xl rounded-tr-3xl bg-slate-500/15 h-[8vh] flex items-center justify-center leading-3">
        <h1 className="text-center font-bold text-[30px] font-sans break-words">
          BEP Calculator
        </h1>
      </div>
      <div className="h-[45vh] rounded-bl-3xl rounded-br-3xl mt-3 relative">
        <div className="flex justify-evenly">
          <span>
            <input
              type="radio"
              name="tab"
              id="unit"
              className="p-1 border-8 cursor-pointer border-red-950 ease-in-out duration-300"
              defaultChecked
              onClick={() => setSelectedTab("unit")}
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
          <span>
            <input
              type="radio"
              name="tab"
              id="price"
              className="p-1 cursor-pointer ease-in-out duration-300"
              onClick={() => setSelectedTab("price")}
            />
            <label
              className={`m-1 text-sm text-[sm-pro-medium] cursor-pointer ${
                selectedTab === "price" ? "font-bold" : " font-bold opacity-50"
              }`}
              htmlFor="price"
            >
              Price
            </label>
          </span>
          <span>
            <label htmlFor="currency" className="p-1 text-sm font-medium">
              Currency : INR
            </label>
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
              variable cost per unit
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
                name="unit"
                onKeyDown={removeCharacter}
                value={itemList.unit}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className="relative flex-col block mt-1">
              <label className="text-xs" htmlFor="Input">
                Selling Price
              </label>
              <input
                type="number"
                className="mt-2 mb-2 w-[90%] h-auto border-b-2 border-b-black text-sm font-[sm-pro-medium] placeholder:pb-2 outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="Eg. 50,000/-"
                name="price"
                onKeyDown={removeCharacter}
                value={itemList.price}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-evenly mt-3 w-[100%] h-[5vh] ">
          <button
            className={`h-auto mt-5 relative font-semibold rounded-full p-2 text-2xl pl-3 pr-3 pt-1 w-[50%] text-center bg-[#35cd3b] cursor-pointer`}
            onClick={inputHandler}
          >
            Calculate
          </button>
          <button
            className={`h-[7vh] mt-5 rounded-[100%] bg-orange-600 relative w-[14%]`}
            onClick={clearInputs}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default InputTab;
