import React, { useEffect, useState } from 'react';
const getDaysArray = async (year, month) => {
  var monthIndex = month - 1;
  var names = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var date = new Date(year, monthIndex, 1);
  var result = [];
  while (date.getMonth() === monthIndex) {
    let day = date.getDate()
    let monthData = date.getMonth() + 1
    let yearData = date.getFullYear()
    let finalDate = monthData >= 9 ? (day + '-' + (monthData) + '-' + yearData) : (day + '-' + "0" + (monthData) + '-' + yearData)
    result.push({ date: date.getDate(), dayName: names[date.getDay()], dateString: finalDate });
    date.setDate(date.getDate() + 1);
  }
  return result;
}
export function App({ attendanceMon, calData, Attendances, sentCalenderData,pageNumber }) {
  const [data, setData] = useState([])
  const [newData, setNewData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [clickDisabled,setClickDisabled]=useState(false)


  useEffect(() => {

    (async function Change() {
      if (attendanceMon == undefined) {
        let date = new Date()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let data = await getDaysArray(year, month)
        setData(data)
        sentCalenderData(data)
        let paginateArray = await paginate(data, 7, pageNo)
        calData(paginateArray)
        // pageNumber(pageNo)
        setNewData(paginateArray)

      }
      else {
        let date = new Date(attendanceMon)
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let data = await getDaysArray(year, month)
        setData(data)
        sentCalenderData(data)
        let paginateArray = await paginate(data, 7, pageNo)
        calData(paginateArray)
        // pageNumber(pageNo)
        setNewData(paginateArray)
      }
    })()

  }, [Attendances,attendanceMon])

  const leftArrowClick = async () => {
    let page_no = pageNo
    page_no = page_no - 1
    setPageNo(page_no)
    let paginateArray = await paginate(data, 7, page_no)
    calData(paginateArray)
    // pageNumber(pageNo)
    setNewData(paginateArray)
  }

  const rightArrowClick = async () => {
    let page_no = pageNo
    page_no = page_no + 1
    setPageNo(page_no)
    let paginateArray = await paginate(data, 7, page_no)
    calData(paginateArray)
    // pageNumber(pageNo)
    setNewData(paginateArray)
  }
  const paginate = async (data, page_size, page_number) => {
    return data.slice((page_number - 1) * page_size, page_number * page_size);
  }
  return (
    <div className="flex gap-[16px]">
   
      <button><img src="../icons/leftcall.svg" alt="" className={pageNo == 1 ? `cursor-not-allowed` : `cursor-pointer`} onClick={() => pageNo == 1 ? null :leftArrowClick()}/></button>

      <div className='App flex flex-row gap-[57px]'>
        {newData.map(d => (<p>
          <div className="flex flex-col text-center">
            <span>{d.dayName}</span>
            <span>{d.date}</span>
          </div>
        </p>
        ))}
      </div>
      <button><img src="../icons/RightCal.svg" alt="" className={newData.length < 7 || data.length==28 && pageNo==4  ? `cursor-not-allowed` : `cursor-pointer`}  onClick={() => newData.length <7 || data.length==28 && pageNo==4  ? null  :rightArrowClick()} /></button>
    </div>
  );
}