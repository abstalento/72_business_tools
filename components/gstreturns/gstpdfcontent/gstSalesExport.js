import React from "react";
import { Document, Link, Page, Text, View, Image } from "@react-pdf/renderer";
import styles from "../../../utils/gstReturns/salesPdfStyle";

// Create Document Component
const GstSalesContent = ({ datas, action, content, currencySymbol }) => {

  const monthArray = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  function dateFormatter(date) {
    const bill = new Date(date);
    const month = bill.getMonth();
    const day = bill.getDate();
    const year = bill.getFullYear();
    const billDate =
      day < 10
        ? monthArray[month] + "," + " " + year
        : monthArray[month] + "," + " " + year;
    return billDate;
  }

  const salesGst = datas?.gstSales.reduce(
    (total, item) => Number(total) + Number(item.salesGstAmount),
    0
  );
  const salesBillCost = datas?.gstSales.reduce(
    (total, item) => Number(total) + Number(item.salesBillCost),
    0
  );
  const purchaseBillCost = datas?.gstPurchase.reduce(
    (total, item) => Number(total) + Number(item.billCost),
    0
  );
  const salesTotalBill = datas?.gstSales.reduce(
    (total, item) =>
      Number(total) + Number(item.salesBillCost) + Number(item.salesGstAmount),
    0
  );

  const purchaseGst = datas?.gstPurchase.reduce(
    (total, item) => Number(total) + Number(item.gstAmount),
    0
  );

  const payAmount = Number(salesGst) - Number(purchaseGst);
  return (
    <Document>
      <Page
        size="A4"
        orientation="landscape"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <View style={styles.gstheader}>
            <View>
              <Image
                style={{ height: "65px", width: "160px" }}
                src="/images/pdfGstReturns.png"
              />
            </View>
            <View style={styles.contentHeadRight}>
              {/* <Text>{content}</Text> */}
              <Text>{datas.gstTitle}</Text>
            </View>
          </View>
          <View style={styles.salesContent1}>
            <View style={styles.salesBillFromContact}>
              <Text style={styles.salesBillContactHead}>Sales Bill From</Text>
              <Text style={styles.salesBillContactBody}>
                {datas.companyName}
              </Text>
            </View>
            <View style={styles.salesBillGstInContact}>
              <Text style={styles.salesBillContactHead}>SELLER GSTIN</Text>
              <Text style={styles.salesBillContactBody}>{datas.gstIn}</Text>
            </View>
            <View style={styles.salesBillContactNumber}>
              <Text style={styles.salesBillContactHead}>Contact Number</Text>
              <Text style={styles.salesBillContactBody}>
                {datas.contactNumber}
              </Text>
            </View>
            <View style={styles.salesBillContactDate}>
              <Text style={styles.salesBillContactHead}>Month</Text>
              <Text style={styles.salesBillContactBody}>
                {dateFormatter(datas.date)}
              </Text>
            </View>
          </View>

          <View style={styles.salesContent}>
            <View style={styles.contentTitle}>
              <Text>SALES BILL</Text>
            </View>
            <View style={styles.salesTabelHead}>
              <Text style={styles.salesHeadNo}>SNo.</Text>
              <Text style={styles.salesHeadSalesBillNo}>Sales Bill No.</Text>
              <Text style={styles.salesHeadInDate}>INVOICE DATE</Text>
              <Text style={styles.salesHeadCmpName}>COMPANY NAME</Text>
              <Text style={styles.salesHeadGstNum}>GSTIN NUMBER</Text>
              <Text style={styles.salesHeadBillCost}>BILL COST</Text>
              <Text style={styles.salesHeadGstAmt}>GST AMOUNT</Text>
              <Text style={styles.salesHeadAmount}>AMOUNT</Text>
              <Text style={styles.salesHeadPaidDate}>PAID DATE</Text>
              <Text style={styles.salesHeadPaidMode}>PAID MODE</Text>
            </View>
            {datas.gstSales.map((value, index) => {
              return (
                <View style={styles.salesTabelBody}>
                  <Text style={styles.salesHeadNo}>
                    {++index < 10 ? "0" + index : index}
                  </Text>
                  <Text style={styles.salesBodySalesBillNum}>
                    {value.salesBill}
                  </Text>
                  <Text style={styles.salesHeadInDate}>
                    {value.salesInvoiceDate}
                  </Text>
                  <Text style={styles.salesBodyCmpName}>
                    {value.saleCompanyName}
                  </Text>
                  <Text style={styles.salesBodyGstNum}>
                    {value.salesGstInNo}
                  </Text>
                  <Text style={styles.salesBodyBillCost}>
                  {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> : currencySymbol}
                    {value.salesBillCost ? value.salesBillCost : 0}
                  </Text>
                  <Text style={styles.salesBodyGstAmt}>
                  {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> : currencySymbol}
                    {value.salesGstAmount ? value.salesGstAmount : 0}
                  </Text>
                  <Text style={styles.salesBodyAmount}>
                  {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> : currencySymbol}
                    {Number(value.salesBillCost) + Number(value.salesGstAmount)}
                  </Text>
                  <Text style={styles.salesHeadPaidDate}>
                    {value.salesPaidDate}
                  </Text>
                  <Text style={styles.salesHeadPaidMode}>
                    {value.salesPayMode}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* <View style={styles.footerContent}>
            <View style={styles.footerText}>
              <Text style={styles.footerBillCost}>BILL COST</Text>
              <Text style={styles.footerBillCostRight}>
                <Image
                  style={{ height: "6px", width: "7px" }}
                  src="/images/rupee-indian.png"
                />
                {Number(salesBillCost).toFixed(2)}
              </Text>
            </View>
            <View style={styles.footerText}>
              <Text style={styles.footerBillCost}>SALES GST AMOUNT</Text>
              <Text style={styles.footerBillCostRight}>
                <Image
                  style={{ height: "6px", width: "7px" }}
                  src="/images/rupee-indian.png"
                />
                {Number(salesGst).toFixed(2)}
              </Text>
            </View>
            <View style={styles.footerText}>
              <Text style={styles.footerBillCost}>TOTAL BILL AMOUNT</Text>
              <Text style={styles.footerBillCostRight}>
                <Image
                  style={{ height: "6px", width: "7px" }}
                  src="/images/rupee-indian.png"
                />
                {Number(salesTotalBill).toFixed(2)}
              </Text>
            </View>
          </View> */}

          {/* <View style={styles.footerCalc}>
            <View style={styles.footerCalcRight}>
              <View style={styles.footerCalcLeftContent}>
                <Text style={styles.footerRightCalcTop}>SALES GST AMOUNT</Text>
                <View style={styles.footerRightCalcBottom}>
                  <Image
                    style={{ height: "7px", width: "8px" }}
                    src="/images/rupee-indian.png"
                  />
                  <Text>{salesGst}/-</Text>
                </View>
              </View>
              <View
                style={{
                  width: "80px",
                  height: "50px",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text>-</Text>
              </View>
              <View style={styles.footerCalcLeftContent}>
                <Text style={styles.footerRightCalcTop}>
                  PURCHASE GST AMOUNT
                </Text>
                <View style={styles.footerRightCalcBottom}>
                  <Image
                    style={{ height: "7px", width: "8px" }}
                    src="/images/rupee-indian.png"
                  />
                  <Text>{purchaseGst}/-</Text>
                </View>
              </View>
              <View
                style={{
                  width: "80px",
                  height: "50px",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text>=</Text>
              </View>
              <View style={styles.footerCalcLeftContent}>
                <Text style={styles.footerRightCalcTop}>GST NEED TO PAY</Text>
                <View style={styles.footerRightCalcBottom}>
                  <Image
                    style={{ height: "7px", width: "8px" }}
                    src="/images/rupee-indian.png"
                  />
                  <Text>{payAmount}/-</Text>
                </View>
              </View>
            </View>
          </View> */}

          {/* <View style={styles.salesContent1}>
            <View style={styles.salesBillFromContact}>
              <Text style={styles.salesBillContactHead}>Purchase Bill For</Text>
              <Text style={styles.salesBillContactBody}>
                {datas.companyName}
              </Text>
            </View>
            <View style={styles.salesBillGstInContact}>
              <Text style={styles.salesBillContactHead}>SELLER GSTIN</Text>
              <Text style={styles.salesBillContactBody}>{datas.gstIn}</Text>
            </View>
            <View style={styles.salesBillContactNumber}>
              <Text style={styles.salesBillContactHead}>Contact Number</Text>
              <Text style={styles.salesBillContactBody}>
                {datas.contactNumber}
              </Text>
            </View>
            <View style={styles.salesBillContactDate}>
              <Text style={styles.salesBillContactHead}>Month</Text>
              <Text style={styles.salesBillContactBody}>{dateFormatter(datas.date)}</Text>
            </View>
          </View> */}

          <View style={styles.salesContentPurchase}>
            <View style={styles.contentTitle}>
              <Text>PURCHASE BILL</Text>
            </View>
            <View style={styles.salesTabelHead}>
              <Text style={styles.salesHeadNo}>SNo.</Text>
              <Text style={styles.salesHeadSalesBillNo}>Purchase Bill No.</Text>
              <Text style={styles.salesHeadInDate}>INVOICE DATE</Text>
              <Text style={styles.salesHeadCmpName}>COMPANY NAME</Text>
              <Text style={styles.salesHeadGstNum}>GSTIN NUMBER</Text>
              <Text style={styles.salesHeadBillCost}>BILL COST</Text>
              <Text style={styles.salesHeadGstAmt}>GST AMOUNT</Text>
              <Text style={styles.salesHeadAmount}>AMOUNT</Text>
              <Text style={styles.salesHeadPaidDate}>PAID DATE</Text>
              <Text style={styles.salesHeadPaidMode}>PAID MODE</Text>
            </View>
            {datas.gstPurchase.map((value, index) => {
              return (
                <View style={styles.salesTabelBody}>
                  <Text style={styles.salesHeadNo}>
                    {++index < 10 ? "0" + index : index}
                  </Text>
                  <Text style={styles.salesBodySalesBillNum}>
                    {value.purchaseBill}
                  </Text>
                  <Text style={styles.salesHeadInDate}>
                    {value.invoiceDate}
                  </Text>
                  <Text style={styles.salesBodyCmpName}>
                    {value.purchaseCompanyName}
                  </Text>
                  <Text style={styles.salesBodyGstNum}>{value.gstInNo}</Text>
                  <Text style={styles.salesBodyBillCost}>
                   {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> : currencySymbol}
                    {value.billCost ? value.billCost : 0}
                  </Text>
                  <Text style={styles.salesBodyGstAmt}>
                  {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> : currencySymbol}
                    {value.gstAmount ? value.gstAmount : 0}
                  </Text>
                  <Text style={styles.salesBodyAmount}>
                  {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> : currencySymbol}
                    {Number(value.billCost) + Number(value.gstAmount)}
                  </Text>
                  <Text style={styles.salesHeadPaidDate}>{value.paidDate}</Text>
                  <Text style={styles.salesHeadPaidMode}>{value.payMode}</Text>
                </View>
              );
            })}

            <View style={styles.footerCalc}>
              {/* <View style={styles.footerCalcLeft}>
              <View style={styles.footerCalcLeftContent}>
                <Text style={styles.salesBillContactHead}>Notes</Text>
                <Text style={styles.salesBillContactBody}>
                  It was great doing business with you.
                </Text>
              </View>
              <View style={styles.footerCalcLeftContent}>
                <Text style={styles.salesBillContactHead}>
                  Terms & Conditions
                </Text>
                <Text style={styles.salesBillContactBody}>
                  Please make the payment by the due date.
                </Text>
              </View>
            </View> */}
              <View style={styles.footerCalcRight}>
              <View style={styles.footerCalcLeftContent}>
                  <Text style={styles.footerRightCalcTop}>
                    SALES TOTAL AMOUNT
                  </Text>
                  <View style={styles.footerRightCalcBottom}>
                  {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> :<Text>{currencySymbol}</Text>}
                    <Text>{salesBillCost}/-</Text>
                  </View>
                </View>
                <View style={styles.footerCalcLeftContent}>
                  <Text style={styles.footerRightCalcTop}>
                    SALES GST AMOUNT
                  </Text>
                  <View style={styles.footerRightCalcBottom}>
                  {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> :<Text>{currencySymbol}</Text>}
                    <Text>{salesGst}/-</Text>
                  </View>
                </View>
                {/* <View
                  style={{
                    width: "80px",
                    height: "50px",
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text>-</Text>
                </View> */}
                <View style={styles.footerCalcLeftContent}>
                  <Text style={styles.footerRightCalcTop}>
                    PURCHASE TOTAL AMOUNT
                  </Text>
                  <View style={styles.footerRightCalcBottom}>
                  {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> :<Text>{currencySymbol}</Text>}
                    <Text>{purchaseBillCost}/-</Text>
                  </View>
                </View>
                <View style={styles.footerCalcLeftContent}>
                  <Text style={styles.footerRightCalcTop}>
                    PURCHASE GST AMOUNT
                  </Text>
                  <View style={styles.footerRightCalcBottom}>
                  {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> :<Text>{currencySymbol}</Text>}
                    <Text>{purchaseGst}/-</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "80px",
                    height: "50px",
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text>=</Text>
                </View>
                <View style={styles.footerCalcLeftContent}>
                  <Text style={styles.footerRightCalcTop}>GST NEED TO PAY</Text>
                  <View style={styles.footerRightCalcBottom}>
                  {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> :<Text>{currencySymbol}</Text>}
                    <Text>{payAmount}/-</Text>
                  </View>
                </View>
              </View>
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
              src="/images/gstReturnsLogo.png"
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default GstSalesContent;
