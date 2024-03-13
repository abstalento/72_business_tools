import React from 'react';
import SubField from './Input/SubField';
import FirstField from './Input/FirstField';
import { useState,useEffect } from 'react';


const Content = () => {
  const [selectedContent, setSelectedContent] = useState('webcost');
  const [webCostValues, setWebCostValues] = useState([]);
  const [leadCostValues, setLeadCostValues] = useState([]);
  const [totalWebCost, setTotalWebCost] = useState(5);
  const [totalLeadCost, setTotalLeadCost] = useState();

  const [fields, setFields] = useState([{ id: 1, label: 'Development cost', value:''}]);
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




  const [expenses, setExpenses] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [lead, setLead] = useState('');
  const [leadCost, setLeadCost] = useState(0);

  const handleExpensesChange = (event) => {
    setExpenses(event.target.value);
  };

  const handleCostChange = (event) => {
    setTotalCost(event.target.value);
  };

  const handleLeadChange = (event) => {
    setLead(event.target.value);
  };

  const calculateLeadCost = () => {
    if (lead !== 0) {
      const calculatedLeadCost = parseFloat(totalCost) / parseFloat(lead);
      setLeadCost(calculatedLeadCost.toFixed(2));
    } else {
      setLeadCost(0);
    }
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

  const handleAddTotal = (e) => {
    e.preventDefault();
    const webTotal = fields.reduce((total, field) => total + Number(field.value || 0), 0);
    setTotalWebCost(webTotal);
  };

  const [totalRoiValue, setTotalRoiValue] = useState(0);    
// ----------------------------
const convertionRate = 1000;
const averageSale = 1000;

const totalProfitWeb = () => {
  return leadCost * convertionRate * averageSale;
};

const calculateTotalRoiValue = () => {
  const totalWebCost = parseFloat(totalCost);
  const profitWeb = totalProfitWeb();
  const totalRoi = (((profitWeb - totalWebCost) / totalWebCost)*100);
  setTotalRoiValue(totalRoi.toFixed(2));
};

const onClickTotal = (e) => {
  handleAddTotal(e);
  calculateLeadCost(e);
  calculateTotalRoiValue(e);

}


  return (
    <main className='relative mt-[15%] flex justify-center items-center w-screen h-screen' style={{ zIndex: 0 }}>
      <div className='absolute flex h-[50%] bg-[#FFCA64] gap-[1%] w-full top-[10%] justify-center items-center'
      >
          <FirstField
          selectedContent={selectedContent}
          addWebCost = {addWebCost}
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
          webCostValues = {webCostValues}
          clearValues = {clearValues}
          calculateTotalValue = {calculateTotalValue}
          handleItemClick = {handleItemClick}
          addLeadCost = {addLeadCost}
          leadCostValues = {leadCostValues}
          onClickTotal = {onClickTotal}

          expenses = {expenses}
          handleExpensesChange = {handleExpensesChange}
          totalCost = {totalCost}
          handleCostChange  = {handleCostChange }
          lead = {lead}
          handleLeadChange = {handleLeadChange}
          calculateLeadCost = {calculateLeadCost}
          leadCost = {leadCost}
          
          />
          <SubField 
          totalWebCost = {totalWebCost}
          leadCost = {leadCost}
          totalRoiValue = {totalRoiValue}
          />
      </div>
    </main>
  );
};

export default Content;