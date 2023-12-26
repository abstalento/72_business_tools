import React, { useRef } from "react";
import { useState, useEffect } from "react";
import myImaga from '../../../public/images/men.jpg'
import Image from "next/image";
import Charts from "./Chart";
import Service from "../../../services/attendanceEntry/services";
import { useContext } from "react";
import GlobalContext from "../../kanbanBoard/Calender/GlobalContext";
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";
import PouchDB from "pouchdb";
// import Image from "next/image";


const ViewPopup = ({ handleClose }) => {

    const { selectedemployee,setGetDashPopup,getDashPopup} = useContext(GlobalContext)
    const fileUpload = useRef()
    const [file, setFile] = useState({ uploadFile: "" })
    const [selectImage, setSelectImage] = useState(null);
    const [createObjectURl, setCreateObjectURl] = useState(null);
    const [showImageTag, setShowImageTag] = useState(true)
    const [dbDataEmpDetails, setdbDataEmpDetails] = useState([]);
 
     const [image,setImage] =useState();
 

    const [empDetails, setEmpDetails] = useState([selectedemployee])
    const[empAllDetails,setempAllDetails] = useState([])
   
    let greet
    let myDate = new Date();
    let hrs = myDate.getHours();
    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';
    const handlePrint = () => {
        if (typeof window !== "undefined") {
            window.print()
          }
       
    }
    const uploadPhoto = () => {
        fileUpload.current.click()
       
    }
    const handlePopupClose = ()=>{
        setGetDashPopup(!getDashPopup)
        handleClose(false)
     
    }
    
    useEffect(()=>{ 
  
        if(createObjectURl!==null && createObjectURl!=="")
        {
        let updatedEmpDetails = [{...empDetails[0],uploadProfile: createObjectURl}]
        setEmpDetails(updatedEmpDetails)
        handleProfileUpdate(updatedEmpDetails)
       }
    },[createObjectURl])

    const handleFileSelect = (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        let isValid = validateFile(fileObj)
        if (isValid) {
        //    console.log(fileObj,"isValid")
           const data = new FileReader()
           data.addEventListener('load',()=>{
            // setImage(data.result)
            setCreateObjectURl(data.result)
           });
          data.readAsDataURL(fileObj)

        }
         setShowImageTag(false)    
    }

    



    const validateFile = (fileObj) => {
        const docSize = fileObj.size / 1024 / 1024;
        if (docSize < 1 && fileObj.name.match(/(\.jpg|\.JPG|\.png|\.PNG|\.JPEG|\.jpeg)$/)) {
            return true;
        } else {
            return false;
        }
    }
    const deleteImage = () => {
        setCreateObjectURl(null)
        setShowImageTag(true)
    }

    
    useEffect(()=>{
        if(empDetails.length > 0 && empDetails[0].uploadProfile !== null && empDetails[0].uploadProfile !== ""){
            setShowImageTag(false)
        }
    
        var db = new PouchDB("AttendanceEntryProject");
        db.get("EmployeeDetails")
        .then(function (doc) {     
          var empDet = doc.EmployeeDetails;
          setempAllDetails(empDet)
        })
        .catch(function (err) {
          console.log("Error: ", err);
        });
   
    },[])

    const handleProfileUpdate=(empDetails)=>{
        
        var db = new PouchDB("AttendanceEntryProject");
          let valemp = empDetails[0].uploadProfile
         

        const updatedEmpAllDetails = empAllDetails.map((emp) =>
        emp.empID === empDetails[0].empID ? 
        {...emp,uploadProfile :empDetails[0].uploadProfile}
         : emp
        );


      db.get("EmployeeDetails", function (err, doc) {
        if (err) {
          var doc = {
            _id: "EmployeeDetails",
            EmployeeDetails: updatedEmpAllDetails,
          };
          db.put(doc);
        }
        db.put(
          {
            _id: doc._id,
            EmployeeDetails:updatedEmpAllDetails,
            _rev: doc._rev,
          },
          function (err, response) {
            if (err) {
              return console.log(err, "err");
            } else {
              console.log(response, "ress");
            }
          }
        );
        })

        
    }



    return (
        <>
            <div className="bg-[#080808] h-screen  flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.8]">
                <div className="bg-white flex justify-around items-center w-[93%] md:h-[97%] md:w-[45%] lg:w-[40%] xl:w-[28%] h-[88vh] rounded-md ">
                    <div className=" h-[90vh] w-[88%] flex flex-col ">
                        <div className="flex justify-end h-[8vh] w-full ">
                            <div className="flex items-center justify-between w-[100%] ">
                                <div className="text-[12px] md:text-[18px]">
                                    <h1 className="font-bold">Hi</h1>
                                    <p className="font-[sfpro-regular] ">{greet}! This is</p>
                                </div>
                                <div className="flex">
                                    <img src="../icons/Print.svg" alt="" className="w-11 cursor-pointer" onClick={handlePrint} />
                                    <img src="../icons/ClosePopup.svg" alt="" className="w-11 cursor-pointer" onClick={handlePopupClose} />
                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] flex justify-center">
                            <div className="w-[100%]">
                                {
                                
                                    empDetails.map((details, index) => {
                                    
                                        return (
                                            <div>
                                                <div className="w-[95%] h-[20vh] md:h-[23vh] flex items-center justify-around mx-auto ">

                                                    <div className=" w-[30%] text-[12vh] md:h-[14vh] bg-orange-500 rounded-md"  onClick={uploadPhoto}>
                                                        {
                                                            showImageTag == true ? (<>
                                                                <img src="/images/AvatarImage.png" className="cursor-pointer"></img>
                                                                <input type="file"
                                                                    ref={fileUpload}
                                                                    onChange={handleFileSelect}
                                                                    className="hidden"
                                                                    accept="image/*"
                                                                    name="uploadFile"
                                                                     value={file.uploadFile}
                                                                />

                                                                  
                                                            </>) :
                                                             (<>
                                                             
                                                             <img className="h-[12vh] md:h-[14vh] xl:h-[16vh] w-full rounded-[6px] object-cover" src={details.uploadProfile} />
                                                             <input type="file"
                                                                    ref={fileUpload}
                                                                    onChange={handleFileSelect}
                                                                    className="hidden"
                                                                    accept="image/*"
                                                                    name="uploadFile"
                                                                    value={file.uploadFile}
                                                                />
                                                                </>)
                                                                                                                                                   // src={details.uploadProfile}
                                                        }
                                                        {/* {
                                                        details.uploadProfile?<><div className="h-[15vh] group pt-0.5 w-[17%] absolute top-[75px] left-[92px] md:left-[270px] md:top-[78px] lg:top-[75px] lg:left-[375px] xl:left-[580px] xl:top-[78px]">
                                                                <div className=" h-[7vh] w-[101%] rounded-tr-[19px] b-tr-[20px]  ">
                                                                    <div className="h-[7vh] w-[101%] items-center flex justify-around ">
                                                                        <span className="hidden group-hover:block cursor-pointer"><Image onClick={deleteImage} className="hidden" height={18} width={18} src="/icons/trash-bin.svg" /></span>

                                                                    </div>
                                                                </div>
                                                            </div></> : null
                                                        } */}
                                                    </div>
                                                    <div className=" h-[15vh] flex-col justify-around text-left flex w-[50%]">
                                                        <div>
                                                            <h3 className="font-[sfpro-bold] text-[16px] md:text-[18px]">{details.empName}</h3>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-[#707A89] text-[10px] md:text-[12px]">{details.designation}</h3>
                                                        </div>
                                                        <div>
                                                            <h3 className="bg-[#4F46BA] text-white font-[sfpro-regular] text-[10px] md:text-[12px] p-2 rounded-md">{details.empID}-{details.designation}</h3>
                                                        </div>
                                                    </div>

                                                </div>



                                                <div className="flex justify-center w[100%]">
                                                    <div className="w-[100%] h-[30vh] md:h-[34vh] rounded-lg border-2 p-5 flex justify-center items-center">
                                                        <div className="flex-col h-[28vh] flex items-start w-[40%] justify-around">
                                                            <div>
                                                                <h3 className="font-[sfpro-regular] text-[#3B3C3D] text-[11px] md:text-[14px]">Account</h3>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-[sfpro-regular] text-[#3B3C3D] text-[11px] md:text-[14px]">IFCSC Code</h3>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-[sfpro-regular] text-[#3B3C3D] text-[11px] md:text-[14px]">PAN / UAE Number</h3>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-[sfpro-regular] text-[#3B3C3D]  text-[11px] md:text-[14px]">Address</h3>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-[sfpro-regular] text-[#3B3C3D]  text-[11px] md:text-[14px]">Contact Number</h3>
                                                            </div>
                                                            <h3 className="font-[sfpro-regular] text-[#3B3C3D]  text-[11px] md:text-[14px]">Mail ID</h3>
                                                        </div>
                                                        {/* <div className="h-[28vh]  w-[45%] flex-col flex justify-evenly "> */}
                                                        <div className="flex-col h-[28vh] flex items-start w-[40%] justify-around ">
                                                            <div>
                                                                <h3 className="font-[sfpro-regular] text-[#3B3C3D]  text-[11px] md:text-[14px]">{details.accNumber}</h3>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-[sfpro-regular] text-[#3B3C3D] text-[11px] md:text-[14px]">{details.IFSCCode}</h3>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-[sfpro-regular] text-[#3B3C3D] text-[11px] md:text-[14px]">{details.panNumber}</h3>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-[sfpro-regular] text-[#3B3C3D]  text-[11px] md:text-[14px]">{details.address}</h3>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-[sfpro-regular] text-[#3B3C3D] text-[11px] md:text-[14px]">{details.contactNo}</h3>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-[sfpro-regular] text-[#3B3C3D] text-[11px] md:text-[14px]">{details.emailID}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>




                                                <div className=" w-[100%]">
                                                    <div className="w-[100%]  flex justify-between h-[5vh] items-center">
                                                        <h4 className="font-[sfpro-regular] text-[9px] md:text-[12px] text-[#1B2767]">Reports View</h4>
                                                        
                                                    </div>
                                                    <Charts empDetails={details.Attendance}/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ViewPopup;
