import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeadCost from './FirstField/LeadCost';
import WebCost from './FirstField/WebCost';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FirstField = (
  {fields,setFields,handleAddField,handleAddTotal,total,handleFieldChange,handleLabelChange,
    handleDeleteField,setTotal,totalWebCost,selectedContent,addWebCost,webCostValues,onClickTotal,clearValues,
    calculateTotalValue,handleItemClick,addLeadCost,leadCostValues,expenses,handleExpensesChange,
    totalCost,handleCostChange,lead,handleLeadChange,calculateLeadCost,leadCost }) => {

  return (
    <main className='z-10'
    >
      <section className='relative h-[63vh] w-[500px] mt-[50%] justify-center bg-gray-100 overflow-y-scroll shadow'
      style={{ boxShadow: '10px 0px 10px rgba(0, 0, 0, 0.3)' }}  
      >
        <div 
        className='flex gap-2 absolute justify-center items-center text-white ml-[15%] bg-black h-[10vh] rounded-lg mt-4 cursor-pointer  w-[70%]'
        style={{ boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.4)' }}
        >
          <button 
            onClick={() => handleItemClick('webcost')} 
            className={selectedContent === 'webcost' ? 'active' : ''}
            style={{
              backgroundColor: selectedContent === 'webcost' ? 'red' : '', 
              color: selectedContent === 'webcost' ? 'white' : 'black',
              borderRadius:'10px 0px 0 10px',
              height:'100%',
              width:'50%',
              marginLeft:'-9px',
              color:'white'
            }}
          >
            WebCost
          </button>
          <button 
            onClick={() => handleItemClick('leadcost')} 
            className={selectedContent === 'leadcost' ? 'active' : ''} 
            style={{ 
              backgroundColor: selectedContent === 'leadcost' ? 'red' : '',
              borderRadius:'0px 10px 10px 0 ',
              height:'100%',
              width:'50%',
              marginRight:'-8px'
            }}>
            LeadCost
          </button>
        </div>
        {selectedContent === 'webcost' && (
          <div>
            <WebCost 
            fields={fields}
            setFields={setFields}
            handleAddField={handleAddField}
            handleAddTotal={handleAddTotal}
            handleFieldChange={handleFieldChange}
            total={total}
            handleLabelChange={handleLabelChange}
            handleDeleteField={handleDeleteField}
            setValue={addWebCost}
            setTotal={setTotal}
            totalWebCost={totalWebCost}
            onClickTotal = {onClickTotal}
            />
            <ul>
              {webCostValues.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        )}
        {selectedContent === 'leadcost' && (
          <div>
            <LeadCost 
            setValue={addLeadCost}
            expenses = {expenses}
            handleExpensesChange = {handleExpensesChange}
            totalCost = {totalCost}
            handleCostChange = {handleCostChange }
            lead = {lead}
            handleLeadChange = {handleLeadChange}
            calculateLeadCost = {calculateLeadCost}
            leadCost = {leadCost}
            />
            <ul>
              {leadCostValues.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <section className='bg-gray-100 h-[10.5vh] mt-[2%] total overflow-hidden flex justify-end items-center p-6'
        style={{ boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.2)' }}
      >
        <button 
          onClick={clearValues} 
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline'
        >
          Clear
        </button>
        <button 
          onClick={onClickTotal} 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  focus:outline-none focus:shadow-outline'
        >
          Calculate
        </button>
      </section>
    </main>
  );
};

export default FirstField;
