import React, { useState, useEffect,useRef} from "react";
import PouchDB from "pouchdb";
import Service from "../../services/attendanceEntry/services";



function MultipleInput({ placeholder, FieldName, onChange, dataCollection, typeofEmployee, data, isEdit,defaultEntries }) {

  
    const [val, setVal] = useState([]);
    // const [showinput, setShowinput] = useState(false)
    // const [dbName, setDbName] = useState(name)
    // const [dbDeptName, setdbDeptName] = useState()
    // const [dbDesignation, setdbDesignation] = useState()
    // const [dbTypeOfEmp, setdbTypeOfEmp] = useState()
    // const [dbSalaryMode, setdbSalaryMode] = useState()
    // const [dbAddField1, setdbAddField1] = useState()
    // const [dbPicture, setdbPicture] = useState()
    // const [dbAddField, setdbAddField] = useState()
    // const [dbAttendanceField, setdbAttendanceField] = useState()
    // const [dbTypeofBank, setdbTypeofBank] = useState()
    // const [dbPaymentMode, setdbPaymentMode] = useState()
    const [isAdd, setisAdd] = useState(false)
    const input1 = useRef(null)






    const handleAdd = () => {
        setisAdd(true)
        setVal(prevState => prevState.concat({ title: "", Name: FieldName }));
        // setShowinput(true)
        dataCollection(val, FieldName)
    }




    const handleEmployeePay = (event, index) => {
        const { value, name } = event.target;
        const list = [...val];
        list[index][name] = value
        console.log('handling employee pay value')
        dataCollection(list, FieldName)
        setVal(list)
    }


    const handleDelete = (i) => {
        const deletVal = [...val]
        deletVal.splice(i, 1);
        console.log('Deleting value')
        setVal(deletVal)
    }


    useEffect(() => {
        (async function Change() {
            try {
                if (isEdit || defaultEntries) {
                    console.log('Setting val in useEffect', data)
                    setVal(data)
                    // dataCollection(val,name)
                }
              
            } catch (err) {
                alert(JSON.stringify(err))
            }
        })()
    }, [data])

    useEffect(() => {
        if (isAdd == true) {
            input1.current.focus();
        }
        setisAdd(false)
    }, [isAdd])

    useEffect(()=>{
        console.log('Changed Data value', val)
    }, [val])

    return (
        <>
            <div className="border-2 border-[#D5D5D5] bg-[#FFFFFF] pl-2 h-[37px]  w-[96%] md:w-[97%] rounded-md flex flex-row justify-between relative overflow-x-scroll scroll-smooth scrollBar hide-scroll-bar">
                <div className=" flex w-[100%] justify-between overflow-x-scroll scroll-smooth scrollBar hide-scroll-bar">
                    {val?.length == 0 ?
                        <div className="flex justify-around items-center">
                            <p>{placeholder}</p>
                        </div>
                        :
                        <>
                            {val.length > 0 && val.map((value, i) => {
                                return (
                                    <div className="flex mr-2 w-[100%]">

                                        <input
                                            value={value.title}
                                            type='text'
                                            name="title"
                                            ref={input1}
                                            className='h-[20px] w-[100px] border border-[#D5D5D5] mt-2'
                                            onChange={(e) => handleEmployeePay(e, i)}
                                        />
                                        <button onClick={() => handleDelete(i)}>x</button>
                                    </div>
                                )
                            })}
                        </>
                    }

                </div>
                <div className="min-w-[10%] max-w-[20%]">
                    <button className="mr-2 bg-[#4F46BA99] sticky left-[380px] text-[12px] 
                    h-[18px] w-[18px] mt-2 text-white rounded-md" onClick={() => handleAdd()}>+</button>
                </div>

            </div>
        </>
    );
}
export default MultipleInput