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
export function MonthlySheetCal({ attendanceMon, calData }) {
  const [data, setData] = useState([])

  useEffect(() => {
    (async function Change() {
      if (attendanceMon == undefined) {
        let date = new Date()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let data = await getDaysArray(year,month)
        setData(data)
        calData(data)
      }
      else{

      let date = new Date(attendanceMon)
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let datavalue = await getDaysArray(year,month)
      setData(datavalue)
      calData(datavalue)
      }

    })()

  }, [attendanceMon])



  return (
    <div className="flex gap-5">
      <div className={`flex flex-row gap-3.5 ${data.length == 31 ?'xl:gap-[15px]' :data.length == 30 ?'xl:gap-[16px]' :data.length == 29 ?'xl:gap-[17px]' :data.length == 28 ?'xl:gap-[18px]':null}`}>
        {data.map(d => (<p>
          <div className="flex flex-col text-center">
            <span>{d.dayName}</span>
            <span>{d.date}</span>
          </div>
        </p>
        ))}
      </div>
    </div>
  );
}