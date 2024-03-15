import React, { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import Image from "next/image";
import { currency } from "../utils/currency";
import PropTypes from "prop-types";
import crossBlue from "../public/icons/crossblue.svg";
import search from "../public/icons/Search-Icon.svg";

const CurrencyPopUp = ({
  myCurrencySymbol,
  myCurrencyId,
  closeCurrencyPopUp,
  openCurrency,
}) => {
  const [fullWidth] = useState(false);
  const [maxWidth] = useState("md");
  const [currencySearch, SetCurrencySearch] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);

  const chooseCurrency = (value) => {
    if (value.currencySymbol) {
      myCurrencySymbol(value.currencySymbol);
    } else {
      myCurrencySymbol(value.id);
    }
    myCurrencyId(value.id);
    closeCurrencyPopUp(false);
  };

  const onClosePopUp = () => {
    closeCurrencyPopUp(false);
  };
  const searchCurrancy = (e) => {
    const mySearch = currencySearch.filter(
      (data) =>
        data.currencyName.toLowerCase().indexOf(e.target.value.toLowerCase()) >=
        0
    );
    setCurrencyList(mySearch);
  };

  useEffect(() => {
    const currencyMap = Object.values(currency).map((value) => value);
    setCurrencyList(currencyMap);
    SetCurrencySearch(currencyMap);
  }, []);
  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openCurrency}
        PaperProps={{
          style: {
            minWidth: "20%",
            maxWidth: "90%",
            height: "57vh",
          },
        }}
      >
        <div className="">
          <div className="p-3 flex justify-between items-center border-b-2">
            <h1 className="font-[interSemiBold] text-[20px]">
              Select Currency
            </h1>
            <Image
              width="25%"
              height="15px"
              className="h-[15px] cursor-pointer"
              src={crossBlue}
              onClick={onClosePopUp}
            />
          </div>
          <div className="p-2 border-b-2">
            <div className="w-[90%] h-[30px] mx-auto flex items-center bg-[#E9ECEF] rounded-xl">
              <Image
                width="28%"
                height="15px"
                className="bg-[#E9ECEF] rounded-xl pl-2"
                src={search}
              />
              <input
                id="searchCurrency"
                className="w-[90%] bg-[#E9ECEF] rounded-xl focus:outline-none pl-2"
                onChange={searchCurrancy}
              />
            </div>
          </div>
          <div className="h-[40vh] mt-3 overflow-y-scroll p-3 scrollBar">
            {currencyList.map((item, index) => {
              return (
                <div
                  id="TestCurrency"
                  key={index}
                  className="flex justify-between text-[14px] pb-2 cursor-pointer hover:bg-[#E9ECEF]"
                  onClick={() => chooseCurrency(item, index)}
                >
                  <p>{item.currencyName}</p> <p>{item.id}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Dialog>
    </>
  );
};
// CurrencyPopUp.defaultProps = {}

CurrencyPopUp.propTypes = {
  myCurrencyId: PropTypes.number.isRequired,
  myCurrencySymbol: PropTypes.string.isRequired,
  closeCurrencyPopUp: PropTypes.func.isRequired,
};
export default CurrencyPopUp;
