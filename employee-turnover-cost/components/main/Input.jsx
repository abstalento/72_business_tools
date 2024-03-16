import React, { useState } from 'react';

const InputComponent = ({ total, setTotal ,setData }) => {
  const [position, setPosition] = useState('');
  const [hiringCost, setHiringCost] = useState('');
  const [lostProductivityCost, setLostProductivityCost] = useState('');
  const [salary, setSalary] = useState('');
  const [recruitmentCost, setRecruitmentCost] = useState('');
  const [onboardingCost, setOnboardingCost] = useState('');
  const [trainingCost, setTrainingCost] = useState('');

  const handleCalculate = () => {
    // Check if all input fields are filled
    if (
      position.trim() === '' ||
      hiringCost.trim() === '' ||
      lostProductivityCost.trim() === '' ||
      salary.trim() === '' ||
      recruitmentCost.trim() === '' ||
      onboardingCost.trim() === '' ||
      trainingCost.trim() === ''
    ) {
    alert('Please fill in all input fields.');
      return;
    }
  
    // Calculate the total cost
    const result =
      parseFloat(hiringCost) +
      parseFloat(lostProductivityCost) +
      parseFloat(salary) +
      parseFloat(recruitmentCost) +
      parseFloat(onboardingCost) +
      parseFloat(trainingCost);
    
    console.log('Total cost:', result);
    setTotal(result);
    const data=[hiringCost,lostProductivityCost,salary,recruitmentCost,onboardingCost,trainingCost]
    setData(data)
  };
  

  const handleClear = () => {
    setPosition('');
    setHiringCost('');
    setLostProductivityCost('');
    setSalary('');
    setRecruitmentCost('');
    setOnboardingCost('');
    setTrainingCost('');
    setTotal(0);
  };

  return (
    <div className='h-full'>
      <div className="mb-6">
        <label className="block mb-2">Employee Position</label>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required placeholder='UI/UX Designer' className="w-full border border-gray-300 p-3 rounded shadow" />
      </div>
      <div className="mb-6 flex">
        <div className="w-1/2 pr-6">
          <label className="block mb-2">Employee Salary</label>
          <input type="number" value={hiringCost} onChange={(e) => setHiringCost(e.target.value)} className="w-full border border-gray-300 p-3 rounded shadow" />
        </div>
        <div className="w-1/2 pl-2">
          <label className="block mb-2">Recruitment Cost</label>
          <input type="number" value={lostProductivityCost} onChange={(e) => setLostProductivityCost(e.target.value)} className="w-full border border-gray-300 p-3 rounded shadow" />
        </div>
      </div>
      <div className="mb-6 flex">
        <div className="w-1/2 pr-6">
          <label className="block mb-2">Hiring Cost</label>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full border border-gray-300 p-3 rounded shadow" />
        </div>
        <div className="w-1/2 pl-2">
          <label className="block mb-2">Onboarding Cost</label>
          <input type="number" value={recruitmentCost} onChange={(e) => setRecruitmentCost(e.target.value)} className="w-full border border-gray-300 p-3 rounded shadow" />
        </div>
      </div>
      <div className="mb-6 flex">
        <div className="w-1/2 pr-6">
          <label className="block mb-2">Training Cost</label>
          <input type="number" value={onboardingCost} onChange={(e) => setOnboardingCost(e.target.value)} className="w-full border border-gray-300 p-3 rounded shadow" />
        </div>
        <div className="w-1/2 pl-2 relative">
          <label className="block mb-2">Lost Productivity Cost</label>
          <input 
            type="number" 
            value={trainingCost} 
            onChange={(e) => setTrainingCost(e.target.value)} 
            className="w-full border border-gray-300 p-3 rounded shadow" 
          />
      </div>


      </div>
      <div className="flex justify-between">
        <button onClick={handleCalculate} className="bg-[#B31bA6] text-white mt-[5%] px-4 py-3 w-2/5 rounded">Calculate</button>
        <button onClick={handleClear} className="border-2 border-[#B31bA6] text-black mt-[5%] px-4 py-3 w-2/5 rounded">Clear</button>
      </div>
    </div>
  );
}

export default InputComponent;