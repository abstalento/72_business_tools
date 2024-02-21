import React, { useEffect, useState } from "react";
var converter = require('number-to-words');
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";

import styles from "../../../utils/ledger/ledgerPdfStyle";

const Pdf = ({ ledgerData, type, fromDate, toDate }) => {
  // Create styles
  const [ledger, setLedger] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const ledgerPdfModify = () => {
    let amount = 0;
    let ledger = [...ledgerData];
    ledger.map((data) => {
      if (data.income != "") {
        if (data.income == "expense") {
          data.expense = Math.abs(data.expense);
          amount = amount + data.expense;
        } else {
          amount = amount + data.credit;
        }
      }
    });

    setTotalAmount(amount);
    return ledger;
  };
  const dateFormatPDF= (date)=>{
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  let current_datetime = new Date(date)
  let day1 = current_datetime.getDate()
  if (day1 < 10) {
      day1 = '0' + day1;
  }
  let formatted_date = day1 + "-" +
      months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
  return formatted_date
  }
  const dateFormatReport= (date)=>{
let current_datetime1 = new Date(date)
let month = current_datetime1.getMonth() + 1
let day = current_datetime1.getDate()
let year = current_datetime1.getFullYear()
if (day < 10) {
    day = '0' + day;
}
if (month < 10) {
    month = `0${month}`;
}
let format = `${day}/${month}/${year}`;
  return format
}

  useEffect(() => {
    let data = ledgerPdfModify();

    setLedger(data);
  }, [ledgerData]);
  // Create Document Component
  return (
    <Document>
      <Page
        size="A4"
        // orientation="landscape"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.main}>
          <View style={styles.ledgerheader}>
            {/* <View> */}
            <Image
              style={{ height: "40px", width: "130px"}}
              src="/images/ledgerlogo.png"
            />
 <View style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-around",
                // backgroundColor: "#E4E4E429",
                width: 200,
                padding:"2px",
                borderRadius: 10,
                // borderLeftWidth: 10,
                // borderLeftStyle: "solid",
               
              }}>
              <View style={styles.balance}>
              <Text style={styles.balancehead}>
                {type == "expense" || type == "credit"
                  ? "Total Amount  "
                  : "Balance Amount  "}
              </Text>
              <Text style={styles.numberamount}>
                {type == "expense" || type == "credit"
                  ? totalAmount
                  : ledgerData.length > 0
                  ? ledgerData[ledgerData.length - 1]?.balance
                  : 0}.00/-
              </Text>
            </View>
            </View>
            </View>
          
         
            <View style={styles.details}>
              <View style={styles.companyDetails}>
                <Text style={styles.companyName}>
                  {type == "expense"?"Expense":type=="credit"?"Credit":"All"}
                </Text>
                <View style={styles.fromDate}>
                  <Text style={styles.from}>From Date</Text>
                  <Text style={styles.fromdata}>{dateFormatPDF(fromDate)}</Text>
                </View>
                <View style={styles.toDate}>
                <Text style={styles.from}>To Date</Text>
                  <Text style={styles.fromdata}>{dateFormatPDF(toDate)}</Text>
                </View>
               
              <View style={styles.words}>
              <Text style={styles.numwords}> {type == "expense" || type == "credit"
                  ? converter.toWords(totalAmount)
                  : ledgerData.length > 0
                  ? converter.toWords(ledgerData[ledgerData.length - 1]?.balance)
                  : 0} Rupees Only</Text>
              </View>
             {/* </View> */}
           
              </View>
            </View>
       
<View style={styles.salesContent}>
            <View style={styles.contentTitle}>
              <Text>Details*</Text>
            </View>
            <View style={styles.border}>
              <View style={styles.TableHead}>
                <Text style={styles.THeadNo}>S.No</Text>
                <Text style={styles.HeadDate}>Date</Text>
                <Text style={styles.HeadLedger}>Ledger</Text>
                <Text style={styles.HeadCmpName}>Company Name</Text>
                <Text style={styles.HeadReference}>Reference</Text>
                {type == "expense" || type == "credit" ? (
                  <Text style={styles.HeadBillCost}>Amount</Text>
                ) : (
                  <>
                    <Text style={styles.HeadExpense}>Expense</Text>
                    <Text style={styles.HeadCredit}>Credit</Text>
                  </>
                )}
              </View>
            </View>

            {ledger.map((value, index) => {
              return (
                <View style={styles.salesTabelBody}>
                  <Text style={styles.No}>
                    {++index < 10 ? "0" + index : index}
                  </Text>
                  <Text style={styles.date}>{dateFormatReport(value.date)}</Text>
                  <Text style={styles.Ledger}>{value.category}</Text>
                  <Text style={styles.CmpName}>{value.companyname}</Text>
                  <Text style={styles.reference}>{value.reference}</Text>
                  {type == "expense" ? (
                    <Text style={styles.salesBodyGstNum}>{value.expense}</Text>
                  ) : type == "credit" ? (
                    <Text style={styles.salesBodyGstNum}>{value.credit}</Text>
                  ) : (
                    <>
                      <Text style={styles.Expense}>{value.expense}</Text>
                      <Text style={styles.Credit}>{value.credit}</Text>
                      
                    </>
                  )}
                </View>
              );
            })}
            <View style={styles.borderbottomdash}>
              <Text style={styles.Grandtotalhead}>
                {type == "expense" || type == "credit"
                  ? "Total  "
                  : "Balance Amount  "}Rs.
                {type == "expense" || type == "credit"
                  ? totalAmount
                  : ledgerData.length > 0
                  ? ledgerData[ledgerData.length - 1]?.balance
                  : 0}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.pdfFooter} fixed={true}>
          <View style={styles.footerImage}>
            <Text style={styles.pdfFooterContent}>Powered by</Text>
            <Link src="http://72businesstools.com/">
              <Image
                style={{ height: "15px", width: "50px" }}
                src="/images/72BTImage.png"
              />
            </Link>
            <Image
              style={{ height: "28px", width: "1px" }}
              src="/images/LineImage.png"
            />
            <Image
              style={{ height: "20px", width: "65px" }}
              src="/images/ledgerlogo.png"
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};
// ReactPDF.render(<Pdf />, `example.pdf`);
export default Pdf;
