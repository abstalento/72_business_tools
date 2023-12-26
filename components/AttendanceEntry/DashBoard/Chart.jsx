import { Line } from 'react-chartjs-2'
import dayjs from "dayjs";
import { Chart as chartjs, LineElement, CategoryScale, LinearScale, PointElement, } from 'chart.js';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import GlobalContext from "../../../components/kanbanBoard/Calender/GlobalContext";

chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
)

const ChartData = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { OpenViewPopup, setOpenViewPopup } = useContext(GlobalContext);
  const [yearData,setYearData]=useState('')
  const [chartData, setChartData] = useState([])
  let monthData = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
  const data = [
    {
      doses: {
        dose2: true,
        dose1: true,
        selectedVaccine: "AstraZeneca",
        firstDose: { seconds: 1630374445, nanoseconds: 511000000 },
        secondDose: { seconds: 1632966600, nanoseconds: 0 }
      },
      displayName: "Dark",
      address: ""
    },
    {
      address: "",
      doses: {
        firstDose: { seconds: 1630135912, nanoseconds: 920000000 },
        dose2: true,
        selectedVaccine: "AstraZeneca",
        secondDose: { seconds: 1632727920, nanoseconds: 0 },
        dose1: true
      },
      displayName: "Raven"
    },
    {
      address: "",
      doses: {
        firstDose: { seconds: 1630135912, nanoseconds: 920000000 },
        dose2: true,
        selectedVaccine: "AstraZeneca",
        secondDose: { seconds: 1643817600, nanoseconds: 0 }, //just a sample date -- equivalent is February 3, 2022
        dose1: true
      },
      displayName: "Raven"
    }
  ];

  const dateFormatPDF = (date) => {
    const timef = date
    const dateValue = dayjs(timef).format('YYYY-MM-DD'); // display
    const expectedValue = dayjs(dateValue).format("DD-MMM-YYYY"); // display
    return expectedValue
  }

  const  createDateObject=(value)=> {
    try {
        return new Date(value.split('-').reverse().join('-'));
    }
    catch(e) {
        return null;
    }
}


  
const getDataByYear= async(attData)=>{
  let array=[]
  attData.forEach(element => {
    let dateObject = createDateObject(element.date)
     // let dddd = createDateObject('19/12/2023')
     element.date = dayjs(dateObject, 'DD-MM-YYYY').format('DD-MMM-YYYY');
   });
   monthData.map(month => {
     let count = 0
     if (attData.length > 0) {
       attData.map(data => {
         let dateValue = data.date
         
         if (data.status == 'present' && dateValue.includes(month)) {
           count = count + 1    
       }
       })
       array.push(count)
     }
   })
   return array
}

const splitDate=(date)=>{
  let splitdata=date.split('-')
  let finalYear=splitdata[2]
  return finalYear
}

const filterDataByYear= async(attData,year)=>{
  let array=[]

  let filterAttData = attData.filter(att=>splitDate(att.date) == year)
  // attData.forEach(element => {
   
  //   if(year==finalYear){
  //     array.push(element)
  //   }
  //  
  //   return array
  //  });
  return filterAttData
  
}

  useEffect(() => {
    (async function Change() {
    const d = new Date();
    let currentYear = d.getFullYear();
    setYearData(currentYear)
    let attData = [...props.empDetails]
    let filteredArray=await filterDataByYear(attData,"2023")
   let array= await getDataByYear(filteredArray)
    setChartData(array)
    })();
  }, [props.empDetails])

  let totalUsers = 20;

  const dosesTemplate = chartData

  const d1 = data.filter(
    (d) =>
      new Date(d.doses.firstDose.seconds * 1000).getFullYear() ==
      selectedDate.getFullYear()
  );

  const doses1 = d1.reduce(
    (acc, cur) => {
      if (!cur.doses.dose1) return acc;
      const month = new Date(cur.doses.firstDose.seconds * 1000).getMonth();
      acc[month] = acc[month] + 1;

      return acc;
    },
    [...dosesTemplate]
  );

  const d = data.filter(
    (d) =>
      new Date(d.doses.secondDose.seconds * 1000).getFullYear() ==
      selectedDate.getFullYear()
  );

  const doses2 = d.reduce(
    (acc, cur) => {
      if (!cur.doses.dose2) return acc;
      const month = new Date(cur.doses.secondDose.seconds * 1000).getMonth();
      acc[month] = acc[month] + 1;

      return acc;
    },
    [...dosesTemplate]
  );
   const handleDateChange= async(e)=>{
       const {name,value}=e.target
       let attData = [...props.empDetails]
       let filteredArray=await filterDataByYear(attData,value)
      let array= await getDataByYear(filteredArray)
       setChartData(array)
       setYearData(value)
   }


  return (
    <div className="w-[100%] ">
      <div className="flex justify-end">
          <select onChange={handleDateChange} name="" id="" value={yearData} className="font-[sfpro-medium] text-[9px] md:text-[12px] outline-none">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
            <option value="2031">2031</option>
            <option value="2032">2032</option>
            <option value="2033">2033</option>
            <option value="2034">2034</option>
            <option value="2035">2035</option>
            <option value="2036">2036</option>
            <option value="2037">2037</option>
            <option value="2038">2038</option>
            <option value="2039">2039</option>
            <option value="2040">2040</option>
            <option value="2041">2041</option>
            <option value="2042">2042</option>
            <option value="2043">2043</option>
            <option value="2044">2044</option>
            <option value="2045">2045</option>
            <option value="2046">2046</option>
            <option value="2047">2047</option>
            <option value="2048">2048</option>
            <option value="2049">2049</option>
            <option value="2050">2050</option>
            <option value="2051">2051</option>
            <option value="2052">2052</option>
            <option value="2053">2053</option>
            <option value="2054">2054</option>
            <option value="2055">2055</option>
            <option value="2056">2056</option>
            <option value="2057">2057</option>
            <option value="2058">2058</option>
            <option value="2059">2059</option>
            <option value="2060">2060</option>
            <option value="2061">2061</option>
            <option value="2062">2062</option>
            <option value="2063">2063</option>
            <option value="2064">2064</option>
            <option value="2065">2065</option>
            <option value="2066">2066</option>
            <option value="2067">2067</option>
            <option value="2068">2068</option>
            <option value="2069">2069</option>
            <option value="2070">2070</option>


          </select>
          
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            views={["year"]}
            label="Year"
            value={selectedDate}
            minDate={new Date("01/01/2021").toString()}
            onChange={handleDateChange}
            animateYearScrolling
          />
        </MuiPickersUtilsProvider> */}
      </div>
      <div>
        <Line
          data={{
            labels: monthData,
            datasets: [
              {
                label: "1st Dose",
                data: doses1,
                backgroundColor: ["#4CDFE8"],
                borderColor: "#4CDFE8",
                borderWidth: 1
              },
              {
                label: "2nd Dose",
                data: doses2,
                backgroundColor: ["#4CDFE8"]
              }
            ]
          }}
          height={150}
          width={600}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "Hello",
              fontSize: 20
            },

            scales: {
              y: {
                min: 0,
                max: 20,
                ticks: {
                  stepSize: 5
                }
              },

              x: {
                grid: {
                  display: false

                }
              }

            },

            legend: {
              labels: {
                fontSize: 25
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default ChartData;