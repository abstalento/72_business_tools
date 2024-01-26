import React, { useEffect } from "react";
import { useState } from "react";
import Select from 'react-select'
import CreateLedger from "../../container/ledger/createledger";

function CustomSelect(props){
  const [selectedoption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchable, setIsSearchable] = useState(false);
  const [Modal, setModal] = useState(false)
  const [options,setOptions]=useState([])

const handleChange=(event)=>{
    setSelectedOption(event.label)
    props.onCustomSelect(event)
  }

useEffect(()=>{
  if(props?.data &&  props?.data.length>0){
    if(props?.IsAddnew){
      setOptions([{label:"Add new",value:"addNew",description:'new data'},...props.data])
    }
    else{
      if(props?.isAll){
        setSelectedOption('ALL')
        setOptions([{label:"ALL",value:"",description:'getting all data'},...props.data])
      }else{
        setOptions(props.data)
      }
     
    }
    
  }
else{
  if(props?.IsAddnew){
    setOptions([{label:"Add new",value:"addNew",description:'new data'},...props.data])
  }
  else{
    setOptions(...props.data)
  }
}
},[props.data])
// const customStyles = {
//   control: (base) => ({
//     ...base,
//     height: props.height,
//     minHeight: 25,
//     borderColor: "white"
//   }),
//   option: (provided, state) => ({
//    ...provided,
//   textAlign:'left'
//  }),
//   placeholder: (defaultStyles) => {
//      return {
//          ...defaultStyles,
//          top:'50%',
//          color:'000000',
//          fontSize: '12px',
//          fontWeight: '500'
//      }
//  },
//  input: (styles) => ({
//   ...styles,
//   margin: 0,
//   display:'block',
//   fontSize:'10px',
//   borderColor: "white"
//   // height:props.height
// }),
//  indicatorsContainer: (provided, state) => {
//   return {
//     ...provided,
//     padding: '0px',
//     paddingLeft: '0px',
//     paddingTop: '0px',
//     paddingRight: '0px',
//     paddingDown: '0px',
//     height:props.height
//   };
// },
// valueContainer: (provided, state) => {
//   return {
//     ...provided,
//    position:"initial",
//    fontWeight: '500',
//   };
// },
// singleValue: (provided, state) => ({
//   ...provided,
//  top:'50%',
//  maxWidth: 'calc(100% - 43px)'
// }),
// //  option: (provided, state) => ({
// //   ...provided,
// //   // width:'201px',
// //   // Your styles here
// // }),
//  menu: (provided, state)=>({
//  ...provided,
//  zIndex:999,
//  width:'230px'
// })
//   }
// const customStyles = {
//   control: (base, state) => ({
//     ...base,
//     backgroundColor:"#fbfbfb",
//     // Overwrittes the different states of border
//     borderColor: "F40000",
//     // Removes weird border around container
//     boxShadow: state.isFocused ? null : null,
//     "&:hover": {
//       // Overwrittes the different states of border
     
//     }
//   })
// };

  
    return (
      <>
     
      <div style={{width:props.Width, height:props.Height}} className="border sm:bg-white bg-white  border-opacity-25 rounded-lg p-[2px]">
        <label className="text-xs hidden sm:hidden md:block mt-[2px]">{props.title}</label>
        <Select
        className="text-[15px] sm:text-[16px] md:text-[12px] "
          placeholder="Select the Ledger"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            // borderColor: state.isFocused ? 'grey' : 'red',
            outline:'none',
            height: 10,
            minHeight: 10,
            border: "0px solid black",
            backgroundColor:"white",
            border: 0,
            // This line disable the blue border
            boxShadow: "none"
          }),
        }}
          // className="border-none bg-[#fbfbfb]"
          // classNamePrefix="Select the Ledger"
          isLoading={isLoading}
          
          // isSearchable={isSearchable}
          name="color"
          value={selectedoption?{label:selectedoption}:null}
        //  {...options.map((options)=>(
        //   <option value={options.value}>{options.label}</option>
        //  ))}
          options={options && options.length>0?options:[]}
          // styles={colourStyles}
          
          // value={options.filter(function(option) {
          //   return option.value === selectedoption;
          // })}
        
          hideSelectedOptions={"addNew"}
          onChange={(evt)=>handleChange(evt)}
        />
         {/* {console.log(Modal)} */}
        {/* {Modal ? <CreateLedger Popover={Modal} onClose={handlePopupClose} onSave={handleLedgerData}/> : null} */}
        </div>
        
      </>

    )  
}
export default  CustomSelect;
