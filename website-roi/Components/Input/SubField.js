import React from 'react';

const SubField = ({totalWebCost,leadCost,totalRoiValue}) => {
  // const totalWebCost = 500;
  const totalLeadCost = 1000;
  const roiValue = 100;
  return (
    <main class=''
    >
      <section className='h-[75vh] flex-row w-[500px] mt-[50%] justify-center gap-y-[12%]'
        style={{ boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.3)' }}
      >
        <section className='bg-gray-100 h-[22vh] flex '>
          <div className="border-r-2 border-gray-400 w-[50%] h-[100%]">
            <p className='p-4'>Total WebCost</p>
            <span className='flex pl-10 mt-auto text-[2em]'><b>${(totalWebCost ? totalWebCost : '0')}</b></span>
          </div> 
          <div className="boder-r-black w-[50%] h-[100%]">
          <p className='p-4'>Total LeadCost</p>
            <span className='flex pl-10 mt-auto text-[2em]'><b>${leadCost}</b></span>
          </div> 
        </section>
        {/* ---------*/}
        <section className='bg-gray-100 h-[52vh] mt-[1%]'>
          <div className="roi pt-2 pl-2">
              <p>ROI CALCULATE</p>
              <span className='h-10 w-[70%] bg-gray-300 flex border '><b className='mt-[-1.5%] ml-12 text-[2em]'>{totalRoiValue}%</b></span>
          </div>
          <div className="time mt-[-%] pl-2">
            <p>TIME PERIOD</p>
            <div className="flex gap-10 justify-center mt-4">
            <section className='border-r-2 bg-black w-[20%] h-[20vh]'>hello</section>
            <section className='border-r-2  bg-black w-[20%] h-[20vh]'>hello</section>
            <section className='border-r-2 bg-black w-[20%] h-[20vh]'>hello</section>
            </div>
          </div>
          <div className="btn">
          <div className="flex p-4">
          <button
            type='button'
            className='bg-green-500 ml-20 flex h-10 w-[25%] justify-center items-center rounded-lg text-white transition-colors hover:bg-red-500'
          >
            Share report
          </button>
          <button
            type='button'
            className='bg-green-500 absolute right-3 h-10 w-[12%] mr-[15%] items-center rounded-lg text-white transition-colors hover:bg-red-500'
          >
            Download report
          </button>
        </div>
          </div>

        </section>
      </section>
    </main>
  )
}

export default SubField;