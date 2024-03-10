import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";

const WebCost = ({fields,setFields,handleAddField,handleAddWebTotal,total,handleFieldChange,handleLabelChange,handleDeleteField,setTotal,totalWebCost}) => {
  // const [fields, setFields] = useState([{ id: 1, label: 'Development', value:''}]);
  // const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   calculateTotal();
  // }, [fields]);

  // const handleFieldChange = (id, value) => {
  //   const updatedFields = fields.map((field) =>
  //     field.id === id ? { ...field, value } : field
  //   );
  //   setFields(updatedFields);
  // };

  // const handleLabelChange = (id, label) => {
  //   const updatedFields = fields.map((field) =>
  //     field.id === id ? { ...field, label } : field
  //   );
  //   setFields(updatedFields);
  // };

  // const handleAddField = () => {
  //   const newId = fields.length + 1;
  //   setFields([...fields, { id: newId, label: '', value: '' }]);
  // };

  // const handleDeleteField = (id) => {
  //   const filteredFields = fields.filter((field) => field.id !== id);
  //   setFields(filteredFields);
  // };

  // const calculateTotal = () => {
  //   const totalValue = fields.reduce((total, field) => total + parseInt(field.value || 0), 0);
  //   setTotal(totalValue);
  // };

  // const handleAddWebTotal = () => {
  //   const webTotal = fields.reduce((total, field) => total + parseInt(field.value || 0), 0);
  //   alert(`Total Web Cost: ${webTotal}`);
  // };

  return (
    <section className='mt-[20%]'>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 z-1 static">
        {fields.map((field, index) => (
          <div key={field.id} className="flex px-4 items-center gap-[4%]">
            {index !== 0 && (
              <input
                type='text'
                placeholder='Enter Field'
                value={field.label}
                onChange={(e) => handleLabelChange(field.id)}
                className="border border-gray-300 rounded py-2 px-4 outline-none flex-1 max-w-[150px]"
              />
            )}
            <label htmlFor={`field-${field.id}`} className="flex-1">
              {field.label}:
            </label>
            <input
              type='number'
              autoFocus
              min={0}
              required
              id={`field-${field.id}`}
              placeholder='2500'
              className='border border-gray-300 rounded py-2 px-4 outline-none flex-1'
              value={field.value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            {field.id !== 1 && (
              <button
                type='button'
                onClick={() => handleDeleteField(field.id)}
                className='hover:text-red-500 transition-colors'
              >
                <FaTrashAlt />
              </button>
            )}
          </div>
        ))}
        <div className="flex">
          <button
            type='button'
            onClick={handleAddField}
            className='bg-green-500 ml-2 flex gap-2 h-10 w-[25%] justify-center items-center rounded-lg text-white transition-colors hover:bg-red-500'
          >
            <IoIosAdd /> <span>Add Field</span>
          </button>
          <button
            type='button'
            onClick={handleAddWebTotal}
            className='bg-green-500 ml-2 flex absolute right-3 gap-2 h-10 w-[25%] justify-center items-center rounded-lg text-white transition-colors hover:bg-red-500'
          >
            <IoIosAdd /> <span>Add Web</span>
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        Total: {totalWebCost}
      </div>
    </section>
  );
};

export default WebCost;
