import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeadCost from './FirstField/LeadCost';
import WebCost from './FirstField/WebCost';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FirstField = () => {
  const [selectedContent, setSelectedContent] = useState('webcost');
  const [webCostValues, setWebCostValues] = useState([]);
  const [leadCostValues, setLeadCostValues] = useState([]);
  const [totalWebCost, setTotalWebCost] = useState(5);
  const [totalLeadCost, setTotalLeadCost] = useState(0);

  const [fields, setFields] = useState([{ id: 1, label: 'Development', value:''}]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [fields]);

  const handleFieldChange = (id, value) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setFields(updatedFields);
  };

  const handleLabelChange = (id, label) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, label } : field
    );
    setFields(updatedFields);
  };

  const handleAddField = () => {
    const newId = fields.length + 1;
    setFields([...fields, { id: newId, label: '', value: '' }]);
  };

  const handleDeleteField = (id) => {
    const filteredFields = fields.filter((field) => field.id !== id);
    setFields(filteredFields);
  };

  const calculateTotalValue = () => {
    const totalValue = fields.reduce((total, field) => total + parseInt(field.value || 0), 0);
    setTotal(totalValue);
  };
  // ... (rest of the code for webcost) ...
  const handleItemClick = (content) => {
    setSelectedContent(content);
  };

  const addWebCost = (cost) => {
    setWebCostValues([...webCostValues, cost]);
  };

  const addLeadCost = (cost) => {
    setLeadCostValues([...leadCostValues, cost]);
  };

  const calculateTotal = () => {
    const webCostSum = webCostValues.reduce((acc, currentValue) => acc + currentValue, 0);
    const leadCostSum = leadCostValues.reduce((acc, currentValue) => acc + currentValue, 0);

    setTotalWebCost(webCostSum);
    setTotalLeadCost(leadCostSum);
  };

  const clearValues = () => {
    if (selectedContent === 'webcost') {
      setWebCostValues([]);
      setTotalWebCost(0);
    } else if (selectedContent === 'leadcost') {
      setLeadCostValues([]);
      setTotalLeadCost(0);
    }
  };

  const handleAddWebTotal = (e) => {
    e.preventDefault();
    const webTotal = fields.reduce((total, field) => total + parseInt(field.value || 0), 0);
    setTotalWebCost(webTotal);
  };
  return (
    <main className='z-10'>
      <section className='relative h-[63vh] w-[500px] mt-[50%] justify-center bg-gray-100 overflow-y-scroll shadow'>
        <div className='flex gap-2 lg:fixed justify-center items-center text-white ml-[10%] bg-black h-[10vh] rounded-lg mt-4 cursor-pointer  w-[20%]'>
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
            handleAddWebTotal={handleAddWebTotal}
            handleFieldChange={handleFieldChange}
            total={total}
            handleLabelChange={handleLabelChange}
            handleDeleteField={handleDeleteField}
            setValue={addWebCost}
            setTotal={setTotal}
            totalWebCost={totalWebCost}
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
            <LeadCost setValue={addLeadCost} />
            <ul>
              {leadCostValues.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <section className='bg-gray-100 h-[10.5vh] mt-[2%] total overflow-hidden flex justify-center items-center'>
        <button 
          onClick={clearValues} 
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline'
        >
          Clear
        </button>
        <button 
          onClick={calculateTotalValue} 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  focus:outline-none focus:shadow-outline'
        >
          Calculate
        </button>
      </section>
    </main>
  );
};

export default FirstField;
