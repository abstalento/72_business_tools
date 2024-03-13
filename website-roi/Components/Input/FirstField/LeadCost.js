import React, { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";

const LeadCost = ({expenses,handleExpensesChange,totalCost,
  handleCostChange,lead,handleLeadChange,calculateLeadCost,leadCost }) => {
  return (
    <section className='mt-[20%]'>
      <form className="max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-4 p-3">
          <div className="flex flex-col mb-4">
            <label htmlFor="expenses" className="text-lg m-2">
              Add Expenses
            </label>
            <input
              type="text"
              id="expenses"
              autoFocus
              placeholder="Enter expenses"
              value={expenses}
              onChange={handleExpensesChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="totalCost" className="text-lg m-2">
              Add Cost
            </label>
            <input
              type="number"
              id="totalCost"
              min={0}
              placeholder="Enter cost"
              value={totalCost}
              onChange={handleCostChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="lead" className="text-lg m-2">
              Add Lead
            </label>
            <input
              type="number"
              id="lead"
              min={0}
              placeholder="Enter lead"
              value={lead}
              onChange={handleLeadChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

      </form>
    </section>
  );
};

export default LeadCost;
