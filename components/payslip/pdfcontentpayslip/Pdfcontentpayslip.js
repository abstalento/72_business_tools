import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, Image, Link } from '@react-pdf/renderer';
import styles from "../../../utils/paySlip/pdfstyle/pdfstyle";
var converter = require('number-to-words');



// Create styles
const PdfContent = ({ data, earningsvalue, deductionvalue, earningsAdditionals, imageoutput, deductionsAdditional, paysummary, defaultDate, monthandyear, colourchanger, currencySymbol }) => {
  // console.log(imageoutput,"image");
  const [showPay, setShow] = useState(false)
  let totalamount = Number(earningsvalue) - Number(deductionvalue)
  // console.log(totalamount,"Pdf Total")
  // const amountInWords = numWords(Number(totalamount))
  let math = Math.abs(totalamount)
  let amountInWords = converter.toWords(math)
  //  console.log(paysummaer)

  useEffect(() => {
    setShow(true)
  }, [paysummary])

  //  console.log(data,"datadatadata");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageContiner}>
          <View style={{
            height: 130,
            justifyContent: "space-around",
            backgroundColor: "#fafafa",
            borderBottomColor: "#707070",
            borderBottomStyle: "dashed",
            borderBottomWidth: 1
          }}>
            <View style={styles.headercontent}>

              <View style={styles.details}>
                {imageoutput ?
                <Image
                style={styles.imageout} 
                src={imageoutput?.profilePic && imageoutput?.profilePic?.length>0?imageoutput?.profilePic[0]:null }
              />:
                  null
                }

              

                <View style={styles.companyDetails}>
                  <Text style={styles.companyName}>{data?.companyName}</Text>
                  <Text style={styles.companyAddress}>{data?.companyAddress}</Text>
                  <Text style={styles.companyAddress}>{data?.secondLine}</Text>      
                  <Text style={styles.companyAddress}>{data?.country}</Text>
                  <Text>{data?.cityPin}</Text>
                </View>
              </View>
              <View style={styles.datecontiner}>
                <Text style={styles.monthtext}>Payslip for Month</Text>
                <Text style={{
                  fontSize: 20,
                  fontWeight: "bold", color: colourchanger
                }}>{monthandyear ? monthandyear : defaultDate}</Text>
              </View>
            </View>
          </View>
          <View style={styles.detailscontiner}>
            <View style={styles.detailsContent}>
              <View style={styles.contents}>
                <View style={styles.employeeDetails}>
                  <View style={styles.textContiner}>
                    <Text style={styles.employeeHeading}>Employee Name</Text>
                    <View style={styles.employeOutput}>
                      <Text style={styles.employeeText}>:  <Text style={styles.h1}>{data?.employeeName}</Text></Text>
                    </View>
                  </View>

                  <View style={styles.textContiner}>
                    <Text style={styles.employeeHeading}>Employee Id</Text>
                    <View style={styles.employeOutput}>
                      <Text style={styles.employeeText}>:  <Text style={styles.h1}>{data?.employeeID}</Text></Text>
                    </View>
                  </View>

                  <View style={styles.textContiner}>
                    <Text style={styles.employeeHeading}>Joining Date</Text>
                    <View style={styles.employeOutput}>
                      <Text style={styles.employeeText}>:  <Text style={styles.h1}>{data?.joiningDate}</Text></Text>
                    </View>
                  </View>

                  <View style={styles.textContiner}>
                    <Text style={styles.employeeHeading}>Contact</Text>
                    <View style={styles.employeOutput}>
                      <Text style={styles.employeeText}>:  <Text style={styles.h1}>{data?.contact}</Text></Text>
                    </View>
                  </View>

                  <View style={styles.textContiner}>
                    <Text style={styles.employeeHeading}>Pay Period</Text>
                    <View style={styles.employeOutput}>
                      <Text style={styles.employeeText}>:  <Text style={styles.h1}>{monthandyear ? monthandyear : defaultDate}</Text></Text>
                    </View>
                  </View>
                  <View style={styles.textContiner}>
                    <Text style={styles.employeeHeading}>Pay Date</Text>
                    <View style={styles.employeOutput}>
                      <Text style={styles.employeeText}>:  <Text style={styles.h1}>{data?.payDate}</Text></Text>
                    </View>
                  </View>
                </View>
                {/* rightside */}
                <View style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-around",
                  backgroundColor: "#E4E4E429",
                  width: 200,
                  borderRadius: 10,
                  borderLeftWidth: 10,
                  borderLeftStyle: "solid",
                  borderColor: colourchanger
                  // borderLeftColor:colourchanger
                }}>
                  <View style={styles.amountdetails}>
                    <View style={styles.paymentAmountandtext}>
                      <Text style={styles.paymentAmount}>{currencySymbol == '₹' ? <Image src="/images/rupee.png" style={styles.rupeeSymbol} /> : <Text>{currencySymbol}</Text>}{math}/-</Text>
                      <Text style={styles.paymentText}>Employee Net Pay</Text>
                    </View>
                  </View>
                  <View style={styles.paydatelop}>
                    <View style={styles.paydateandlop}>
                      <Text style={styles.paymenttext}>Paid Days</Text>
                      <View>
                        <Text style={styles.paymenttext}>: <Text style={styles.paymenttext}>{data?.paidDays}</Text></Text>
                      </View>
                    </View>
                    <View style={styles.paydateandlop}>
                      <Text style={styles.paymenttextlop}>LOP Days</Text>
                      <View>
                        <Text style={styles.paymenttext}>: <Text style={styles.paymenttext}>{data?.lossOfPay}</Text></Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.paySummaryMap}>
              <View style={styles.PaySummary}>
                {
                  paysummary.map((element, index) => {
                    return (
                      <>
                        <View style={styles.earningsoutput}>
                          <View style={styles.titleanddot}>
                            <Text style={styles.PaySummarytext}>{element.title}</Text>
                            <Text style={styles.PaySummarytext}>:</Text>
                          </View>
                          <Text style={styles.PaySummarytext}>{element.value}/-</Text>
                        </View>
                      </>
                    )

                  })
                }
              </View>
            </View>
          </View>



          <View style={styles.incomedetailscontiner}>
            <View style={styles.incomedetails}>
              <View style={styles.headingcontiner}>
                <Text style={styles.heading}>Income Details<Text style={styles.headingsymbol}>*</Text></Text>
              </View>
              <View style={styles.earningsanddeductions}>
                <View style={styles.earningscontiner}>
                  <View style={styles.earningsdetails}>
                    <Text>Earnings</Text>
                    <Text>Amounts</Text>
                  </View>
                </View>
                <View style={styles.earningscontiner}>
                  <View style={styles.earningsdetails}>
                    <Text>Deductions</Text>
                    <Text>Amounts</Text>
                  </View>
                </View>
              </View>
              <View style={styles.incomeDeductions}>
                <View style={styles.earningsoutputcontiner}>
                  <View style={styles.earningsoutput}>
                    <View style={styles.titleanddot}>
                      <Text>Basic Pay Cost</Text>
                      <Text>:</Text>
                    </View>
                    <Text>
                      {
                        data.basicPayCost ? data.basicPayCost : 0
                      }/-</Text>
                  </View>
                  <View style={styles.earningsoutput}>
                    <View style={styles.titleanddot}>
                      <Text>Rent Allowance</Text>
                      <Text>:</Text>
                    </View>
                    <Text >{
                      data.rentAllowance ? data.rentAllowance : 0
                    }/-</Text>
                  </View>

                  {
                    earningsAdditionals.map((element, index) => {
                      return (
                        <>
                          <View style={styles.earningsoutput}>
                            <View style={styles.titleanddot}>
                              <Text>{element.title}</Text>
                              <Text>:</Text>
                            </View>
                            <Text>{element.value}/-</Text>
                          </View>
                        </>
                      )

                    })
                  }

                </View>

                <View style={styles.earningsoutputcontiner}>
                  <View style={styles.earningsoutputtwo}>
                    <View style={styles.deductionstitleanddot}>
                      <Text>Income Tax</Text>
                      <Text>:</Text>
                    </View>
                    <Text >{
                      data.incomeTax ? data.incomeTax : 0
                    }/-</Text>
                  </View>
                  <View style={styles.earningsoutputtwo}>
                    <View style={styles.deductionstitleanddot}>
                      <Text>PF Amount</Text>
                      <Text>:</Text>
                    </View>
                    <Text>{
                      data.pfAmount ? data.pfAmount : 0
                    }/-</Text>
                  </View>
                  {
                    deductionsAdditional.map((element, index) => {
                      return (
                        <>
                          <View style={styles.earningsoutputtwo}>
                            <View style={styles.deductionstitleanddot}>
                              <Text>{element.title}</Text>
                              <Text>:</Text>
                            </View>
                            <Text>{element.value}/-</Text>
                          </View>
                        </>
                      )

                    })
                  }
                </View>
              </View>
            </View>
          </View>
          <View style={styles.totalcontiner}>
            <View style={styles.totalcontent}>
              <View style={styles.totaltext}>
                <Text>Gross Earnings</Text>
                <View style={styles.totalamount}>
                  <Text>{earningsvalue}/-</Text>
                </View>
              </View>
              <View style={styles.totaltexttwo}>
                <Text>Total Deductions</Text>
                <View style={styles.totalamount}>
                  <Text>{deductionvalue}/-</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.overalltotalcontiner}>
            <View style={styles.overalltotal}>
              <Text style={styles.overalltext1}>Total Net Payable :{currencySymbol == '₹' ? <Image src="/images/rupee.png" style={styles.rupeeSymbol} /> : <Text>{currencySymbol}</Text>}{math}/-</Text>
              <Text style={styles.overalltext2}>Rupees in Words: {amountInWords} Only</Text>
              <Text style={styles.overalltext3}>( Total Net Payable = Gross Earnings - Total Deductions )</Text>
            </View>
          </View>
        </View>
        <View style={styles.pdfFooter} fixed={true}>
          <View style={styles.footerImage}>
            <Text style={styles.pdfFooterContent}>Powered by</Text>
            <Link src="http://72businesstools.com/"> <Image
              style={{ height: "15px", width: "50px" }}
              src="/images/72BTImage.png"
            /></Link>
            <Image
              style={{ height: "30px", width: "1px" }}
              src="images/Line.png"
            />
            <Image
              style={{ height: "20px", width: "60px" }}
              src="/images/payslipImg.png"
            />
            {/* <View style={styles.pdffootertext}>
              <Text>PAYSLIP Generator</Text>
              <Text>BY 72 BUSINESS TOOLS</Text>
            </View> */}
          </View>
          {/* <View style={styles.FooterTextAll}>
                  <Text style={styles.FeeterText1}>PAYSLIP Generator</Text>
                  <Text style={styles.FooterText2}>BY 72 BUSINESS TOOLS</Text>
            </View> */}
        </View>
      </Page>
    </Document >
  )
};
export default PdfContent;