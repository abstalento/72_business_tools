import Image from "next/image";
import { Component, Fragment, useEffect, useState } from "react";
///Images
import share from "../../public/icons/share.svg";
import dynamic from "next/dynamic";
import document from "../../public/icons/document.svg";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfProvider from "../../components/salarycalculator/salaryPdfProvider/salaryPdfProvider";
import Pdf from "../../components/salarycalculator/pdf/PDF";
import calendar from "../../public/icons/salarycalendar.svg";
import hourglass from "../../public/icons/hourglass.svg";
import { useRouter } from "next/router";
import { withRouter } from 'next/router'

export default withRouter( class Card extends Component {
  constructor(props) {
    super(props);
    // this.router = useRouter()
    const { router } = this.props
    this.state = {
      salary: {
        annual: "",
        week: "",
        monthly: "",
        daily: "",
        hourly: "",
        hourlyWeek: "",
        perminute: "",
        persecond: "",
      },
      advanceMode: false,
      initialdays: 5,
      workingday: 22,
      dailyhour: 8,
      month: "",
      year: "",
      hour: "",
      day: "",
      week: "",
      minute: "",
      second: "",
      // router: useRouter().query.newsId
    };
    //  const router = useRouter()
  }

  inputFields = (event) => {
    const { name, value } = event.target;
    this.CalculateSalary(value, name);
  };

  CalculateSalary = (value, type) => {
    const { workingday, initialdays, dailyhour } = this.state;
    let month, year, hour, week, minute, second, day;

    switch (type) {
      case "month":
        month = value;
        year = Number(value * 12).toFixed(2);
        hour = Number(value / workingday / dailyhour).toFixed(2);
        day = Number(hour * dailyhour).toFixed(2);
        week = Number(day * initialdays).toFixed(2);
        minute = Number(hour / 60).toFixed(2);
        // second = minute / 60;
        break;

      case "week":
        week = value;
        day = Number(week / initialdays).toFixed(2);
        month = Number(day * workingday).toFixed(2);
        year = Number(month * 12).toFixed(2);
        hour = Number(day / dailyhour).toFixed(2);
        minute = Number(hour / 60).toFixed(2);
        // second = minute / 60;
        break;

      case "hour":
        hour = value;
        day = Number(hour * dailyhour).toFixed(2);
        week = Number(day * initialdays).toFixed(2);
        month = Number(day * workingday).toFixed(2);
        year = Number(month * 12).toFixed(2);
        minute = Number(hour / 60).toFixed(2);
        // second = minute / 60;
        break;

      case "year":
        year = value;
        month = Number(value / 12).toFixed(2);
        day = Number(month / workingday).toFixed(2);
        week = Number(day * initialdays).toFixed(2);
        hour = Number(day / dailyhour).toFixed(2);
        minute = Number(hour / 60).toFixed(2);
        // second = minute / 60;
        break;

      case "minute":
        minute = value;
        hour = Number(value * 60).toFixed(2);
        day = Number(hour * dailyhour).toFixed(2);
        week = Number(day * initialdays).toFixed(2);
        month = Number(day * workingday).toFixed(2);
        year = Number(month * 12).toFixed(2);
        break;
      case "day":
        day = value;
        hour = Number(value / dailyhour).toFixed(2);
        minute = Number(hour / 60).toFixed(2);
        week = Number(day * initialdays).toFixed(2);
        month = Number(day * workingday).toFixed(2);
        year = Number(month * 12).toFixed(2);
        break;
    }
    this.setState({
      month,
      day,
      hour,
      week,
      year,
      minute,
      second,
    });
    const salaryObject = {
      month,
      day,
      hour,
      week,
      year,
      minute,
      second,
    };
    this.setState({ ...salaryObject, salary: salaryObject });
    this.props.onSalaryChange(salaryObject);
  };

  handleCustomValue = (event) => {
    if (
      !event.target.value ||
      this.handleValidDayAndTime(event.target.name, event.target.value)
    )
      this.setState(
        {
          [event.target.name]: event.target.value,
        },
        () => this.CalculateSalary(this.state.month, "month")
      );
    else alert("Enter valid number");
  };

  handleValidDayAndTime = (name, day) => {
    day = parseInt(day);
    switch (name) {
      case "workingday": {
        return day <= 31;
      }
      case "initialdays": {
        return day <= 7;
      }
      case "dailyhour": {
        return day <= 24;
      }
      default: {
        return false;
      }
    }
  };

  handleReset = () => {
    const salary = {
      annual: "",
      week: "",
      monthly: "",
      daily: "",
      hourly: "",
      hourlyWeek: "",
      perminute: "",
      persecond: "",
    };
    this.setState({ salary });
  };

  handleAdvanceMode = () => {
    this.setState((prevState) => ({ advanceMode: !prevState.advanceMode }));
  };
  handleShare = (e) => {
    alert("hello ");
  };
  
   appRoute = (data) => {
    // this.state.router.push("/invoicegenerator")
    // this.state.router.push({
    //   pathname: "/invoicegenerator",
    // });
    this.props.router.push(data)
  };
  render() {
    const {
      advanceMode,
      dailyhour,
      day,
      hour,
      initialdays,
      minute,
      month,
      salary,
      second,
      week,
      workingday,
      year,
    } = this.state;
    // const PdfProvider = dynamic(
    //   () =>
    //     import("../../components/invoicegenerator/pdf-provider/PdfProvider"),
    //   {
    //     ssr: false,
    //   }
    // );
    return (
      <div className="mt-3 md:mt-8">
        <div className="flex justify-center items-center blur-0">
          <section className=" w-[90%] lg:w-[100%] xl:w-[80%]  bg-white rounded-[10px]">
            <div className="container px-8 py-4 h-full">
              <div className="flex justify-center items-center flex-wrap  g-6 text-gray-800">
                <div class="md:w-8/12 lg:w-6/12 mb-12 md:mt-0">
                  <div className="w-full h-14">
                    <h3 className="md:text-[35px] sm:text-[20px] text-left font-['Sf-pro-semibold']">
                      Salary Payment Calculator
                    </h3>
                  </div>
                  <div className="text-left pt-2 sm:pt-0">
                    <p className="text-base  font-['sf-pro-regular'] mb-4 ">
                      Estimate how much you could earn.
                    </p>
                  </div>

                  <div className="md:w-[85%] lg:w-[85%] h-[10vh] rounded-sm py-2 px-2 w-max  bg-[#EAF4FE] opacity-100 flex flex-row justify-evenly items-center">
                    <PdfProvider
                      ButtonComponent={(props) => (
                        <button
                        id="pdfdownload"
                          className="p-3 text-base flex flex-row indent-2 text-[#272D35] font-['sf-pro-regular']"
                          onClick={props.onClick}
                        >
                          <Image
                            src={document}
                            alt="document"
                            className="w-5 h-5"
                          ></Image>
                          Click Here to Get Document
                        </button>
                      )}
                      disabled={!!(this.state.year == "" )}
                      pdfDocument={
                        this.state.salary.annual === "" ? null : (
                          <Pdf salaryDetails={this.state.salary} 
                          initialdays= {this.state.initialdays}
                          workingday= {this.state.workingday}
                          dailyhour={this.state.dailyhour} 
                          currencySymbol={this.props.currencyData}/>
                        )
                      }
                    ></PdfProvider>
                    {/* <div className="border-l-2 border-[#F97351] md:border-none">
                      <button className="pl-2 flex flex-row indent-2 text-[#272D35] font-['sf-pro-regular'] ">
                        <Image src={share} alt="share" className="w-5 h-5"></Image>
                        Share File
                      </button>
                    </div> */}
                  </div>
                  <div className="hidden sm:hidden md:block">
                  <p className="font-['sf-pro-bold'] text-lg text-[#272D35] mt-5">
                    About Products :
                  </p>
                  <div className="font-['sf-pro-regular'] text-justify text-base text-[#3A3A3A] w-3/4 p-2">
                    <p></p>
                    With the Salary Calculator, you can convert salary amounts
                    to their corresponding payments based on their frequency.
                    There are several payment frequencies to consider, such as
                    biweekly, semimonthly, and monthly. Annual vacation days and
                    holidays are accounted for in both unadjusted and adjusted
                    results
                  </div>
                  <div>
                    <p className="font-['sf-pro-bold'] text-lg text-[#272D35]">
                      Our Other Products:
                    </p>
                    <div className="w-[90%] h-24 flex justify-around items-center">
                      <Image
                        src="/images/GST One Pro.png"
                        height="55"
                        width="110"
                        className="cursor-pointer"
                        onClick={()=>this.appRoute("/invoicegenerator")}
                      />
                      <Image
                        src="/images/btBillHive.png"
                        height="55"
                        width="110"
                        className="cursor-pointer"
                        onClick={()=>this.appRoute("/billHive")}
                      />
                      <Image
                        src="/images/Promodoro.png"
                        height="55"
                        width="110"
                        className="cursor-pointer"
                        onClick={()=>this.appRoute("/pomodoro")}
                      />
                    </div>
                  </div>
                  </div>
          
                </div>
                <div className="md:w-[100%]  lg:w-5/12 lg:ml-20 sm:flex-row-reverse">
                  <form>
                    <div className="border-[3px]  border-[#F16363] rounded-[10px] w-full bg-[#FBFBFB] pt-3 px-7">
                      <div className="mb-3">
                        <label className="font-['sf-pro-medium'] text-lg text-[#272D35] opacity-100">
                          Annual salary
                        </label>
                        <div className="flex flex-row  w-full h-12">
                          <div
                            className="w-10 border-l-2 text-[18px] flex items-center justify-center
                             text-white  bg-[#090909CC] bg-clip-padding border border-solid border-[#060606CC] rounded-l-[4px]  m-0"
                          >
                            {this.props.currencyData}
                          </div>
                          <input
                          id="annual"
                            type="number"
                            onChange={this.inputFields}
                            name="year"
                            value={year == 0 ? "" : year}
                            // {!isNaN(week) ? Math.ceil(day) : ""}
                            className="form-control block w-11/12  px-4 font-['sf-pro-bold'] text-2xl bg-white bg-clip-padding 
                            border-[1.8px] border-opacity-50 border-l-none rounded-l-none border-solid border-[#060606CC] rounded m-0 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div class="mb-4">
                        <label className="font-['sf-pro-medium'] text-lg text-[#272D35] opacity-100">
                          Monthly Wages
                        </label>
                        <div className="flex flex-row  w-full h-12">
                          <div
                            className=" w-14 border-l-2 text-[18px] flex items-center justify-center
                             text-white  bg-[#090909CC] bg-clip-padding border border-solid border-[#060606CC] rounded-l-[4px]  m-0"
                          >
                            {this.props.currencyData}
                          </div>
                          <input
                          id="month"
                            type="number"
                            onChange={this.inputFields}
                            name="month"
                            value={month == 0 ? "" : month}
                            className="form-control block w-full  px-4 font-['sf-pro-bold'] text-2xl  bg-white bg-clip-padding 
                            border-[1.8px] border-opacity-50 rounded-l-none border-r-0 rounded-r-none border-solid border-[#060606CC] rounded m-0 focus:outline-none"
                          />
                          <div
                            className=" form-control flex flex-row w-28 items-center border-r-2 px-1  indent-2 text-[20px] bg-opacity-30 
                             text-white  bg-[#3A3A3A] bg-clip-padding border-[1.8px] border-opacity-50 border-[#060606CC]  rounded-r-[4px]  m-0"
                          >
                            <div className="flex flex-row justify-center ">
                              <Image
                                src={calendar}
                                className="w-10 h-10"
                              ></Image>
                              <div>
                                <input
                                  type="number"
                                  onChange={this.handleCustomValue}
                                  name="workingday"
                                  value={workingday == 0 ? "" : workingday}
                                  className="w-8 bg-transparent bg-opacity-30 outline-none  text-black font-['sf-pro-bold'] text-xl"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="mb-4">
                        <label className="font-['sf-pro-medium'] text-lg text-[#272D35] opacity-100">
                          Weekly Wages
                        </label>
                        <div className="flex flex-row  w-full h-12">
                          <div
                            className="form-control w-14 border-l-2 text-[18px] flex items-center justify-center
                             text-white  bg-[#090909CC] bg-clip-padding border border-solid border-[#060606CC] rounded-l-[4px]  m-0"
                          >
                            {this.props.currencyData}
                          </div>
                          <input
                          id="week"
                            type="number"
                            value={week == 0 ? "" : week}
                            name="week"
                            onChange={this.inputFields}
                            className="form-control block w-full  px-4  font-['sf-pro-bold'] text-2xl bg-white bg-clip-padding 
                            border-[1.8px] border-opacity-50  rounded-l-none border-r-0 rounded-r-none border-solid border-[#060606CC] rounded m-0 focus:outline-none"
                          />
                          <div
                            className=" form-control flex flex-row w-28 items-center border-r-2 px-1  indent-2 text-[20px] bg-opacity-30 
                             text-white  bg-[#3A3A3A] bg-clip-padding border-[1.8px] border-opacity-50 border-[#060606CC]  rounded-r-[4px]  m-0"
                          >
                            <div className="flex flex-row justify-center">
                              <Image
                                src={calendar}
                                className="w-10 h-10"
                              ></Image>
                              <div>
                                <input
                                  type="number"
                                  name="initialdays"
                                  onChange={this.handleCustomValue}
                                  value={initialdays == 0 ? "" : initialdays}
                                  className="w-8 bg-transparent bg-opacity-30 outline-none text-black font-['sf-pro-bold'] text-xl"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="font-['sf-pro-medium'] text-lg text-[#272D35] opacity-100">
                          Daily Wages
                        </label>
                        <div className="flex flex-row  w-full h-12">
                          <div
                            className="form-control w-14 border-l-2 text-[18px] flex items-center justify-center
                             text-white  bg-[#090909CC] bg-clip-padding border border-solid border-[#060606CC] rounded-l-[4px]  m-0"
                          >
                            {this.props.currencyData}
                          </div>
                          <input
                          id="day"
                            type="number"
                            name="day"
                            value={day == 0 ? "" : day}
                            onChange={this.inputFields}
                            className="form-control block w-full  px-4 font-['sf-pro-bold'] text-2xl bg-white bg-clip-padding 
                            border-[1.8px] border-opacity-50  rounded-l-none border-r-0 rounded-r-none border-solid border-[#060606CC] rounded m-0 focus:outline-none"
                          />
                          <div
                            className=" form-control flex flex-row w-28 items-center border-r-2 px-1  indent-2 text-[20px] bg-opacity-30 
                             text-white  bg-[#3A3A3A] bg-clip-padding border-[1.8px] border-opacity-50 border-[#060606CC]  rounded-r-[4px]  m-0"
                          >
                            <div className="flex flex-row justify-center">
                              <Image
                                src={hourglass}
                                className="w-8 h-8"
                              ></Image>
                              <div>
                                <input
                                  type="number"
                                  onChange={this.handleCustomValue}
                                  name="dailyhour"
                                  value={dailyhour == 0 ? "" : dailyhour}
                                  className="w-8 bg-transparent bg-opacity-30 outline-none text-black font-['sf-pro-bold'] text-xl"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="font-['sf-pro-medium'] text-lg text-[#272D35] opacity-100">
                          Hourly wages
                        </label>
                        <div className="flex flex-row  w-full h-12">
                          <div
                            className="form-control w-10 border-l-2 text-[18px] flex items-center justify-center
                             text-white  bg-[#090909CC] bg-clip-padding  border-solid border-[#060606CC] rounded-l-[4px]  m-0"
                          >
                            {this.props.currencyData}
                          </div>
                          <input
                          id="hour"
                            type="number"
                            onChange={this.inputFields}
                            value={hour == 0 ? "" : hour}
                            name="hour"
                            className="form-control block w-11/12  px-4  font-['sf-pro-bold'] text-2xl bg-white bg-clip-padding 
                            border-[1.8px] border-opacity-50 border-l-none rounded-l-none border-solid border-[#060606CC] rounded m-0 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="font-['sf-pro-medium'] text-lg text-[#272D35] opacity-100">
                          Per Min Wages
                        </label>
                        <div className="flex flex-row  w-full h-12">
                          <div
                            className="form-control w-10 border-l-2 text-[18px] flex items-center justify-center
                             text-white  bg-[#090909CC] bg-clip-padding  border-solid border-[#060606CC] rounded-l-[4px]  m-0"
                          >
                            {this.props.currencyData}
                          </div>
                          <input
                          id="min"
                            type="number"
                            onChange={this.inputFields}
                            value={minute == 0 ? "" : minute}
                            name="minute"
                            className="form-control block w-11/12  px-4  font-['sf-pro-bold'] text-2xl bg-white bg-clip-padding 
                            border-[1.8px] border-opacity-50 border-l-none rounded-l-none border-solid border-[#060606CC] rounded m-0 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="block sm:block md:hidden">
                  <p className="font-['sf-pro-bold'] text-lg text-[#272D35] mt-5">
                    About Products :
                  </p>
                  <div className="font-['sf-pro-regular'] text-left text-base text-[#3A3A3A] w-[250px] md:w-3/4 lg:w-3/4 p-0 md:p-2 lg:p-2 sm:w-[250px]">
                    
                    With the Salary Calculator, you can convert salary amounts
                    to their corresponding payments based on their frequency.
                    There are several payment frequencies to consider, such as
                    biweekly, semimonthly, and monthly. Annual vacation days and
                    holidays are accounted for in both unadjusted and adjusted
                    results
                  </div>
                  <div>
                    <p className="font-['sf-pro-bold'] text-lg text-[#272D35]">
                      Our Other Products:
                    </p>
                    <div className="w-[90%] h-24 flex justify-around items-center">
                      <Image
                        src="/images/GST One Pro.png"
                        height="55"
                        width="110"
                        className="cursor-pointer"
                        onClick={()=>this.appRoute("/invoicegenerator")}
                      />
                      <Image
                        src="/images/btBillHive.png"
                        height="55"
                        width="110"
                        className="cursor-pointer"
                        onClick={()=>this.appRoute("/billHive")}
                      />
                      <Image
                        src="/images/Promodoro.png"
                        height="55"
                        width="110"
                        className="cursor-pointer"
                        onClick={()=>this.appRoute("/pomodoro")}
                      />
                    </div>
                  </div>
                  </div>
              </div>
            </div>
          </section>
        </div>
        {/* {this.state.salary.annual === "" ? null : (
          <PDFViewer height={"800px"} width={"850px"} showToolbar={true}>
            <Pdf salaryDetails={this.state.salary} currencySymbol={this.props.currencyData}/>
          </PDFViewer>
        )} */}
      </div>
    );
  }
})
