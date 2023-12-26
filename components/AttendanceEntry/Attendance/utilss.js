import dayjs from "dayjs";
import { useContext, useState } from "react";
import GlobalContext from "../../kanbanBoard/Calender/GlobalContext";
// const [addState,setAddState] = useState()


export function getMonthAttendance(value) {
  let  month = dayjs().month()
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 7)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(7).fill([]).map(() => {
    return new Array(1).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount  ));
    });
  });
  return daysMatrix;
}

