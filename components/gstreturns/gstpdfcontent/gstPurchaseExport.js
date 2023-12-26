import React from "react";
import { Document, Link, Page, Text, View, Image } from "@react-pdf/renderer";
import styles from "../../../utils/gstReturns/salesPdfStyle";

// Create Document Component
const GstPurchaseContent = ({ datas, action, content }) => {

  const currentTime = new Date();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const year = currentTime.getFullYear();
  const newdate =
    day < 10
      ? "0" + day + "-" + "0" + month + "-" + year
      :  day + "-" + "0" + month + "-" + year;

  const salesGst = datas?.gstSales.reduce(
    (total, item) => Number(total) + Number(item.salesGstAmount),
    0
  );
  const salesBillCost = datas?.gstPurchase.reduce(
    (total, item) => Number(total) + Number(item.billCost),
    0
  );
  const salesTotalBill = datas?.gstPurchase.reduce(
    (total, item) =>
      Number(total) + Number(item.billCost) + Number(item.gstAmount),
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
              <Text>{content}</Text>
              <Text>{datas.gstTitle}</Text>
            </View>
          </View>
          <View style={styles.salesContent1}>
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
              <Text style={styles.salesBillContactHead}>Date</Text>
              <Text style={styles.salesBillContactBody}>{newdate}</Text>
            </View>
          </View>
          <View style={styles.salesContent}>
            <View style={styles.salesTabelHead}>
              <Text style={styles.salesHeadNo}>SNo.</Text>
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
                  <Text style={styles.salesHeadInDate}>
                    {value.invoiceDate}
                  </Text>
                  <Text style={styles.salesBodyCmpName}>
                    {value.purchaseCompanyName}
                  </Text>
                  <Text style={styles.salesBodyGstNum}>
                    {value.gstInNo}
                  </Text>
                  <Text style={styles.salesBodyBillCost}>
                    <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    />
                    {value.billCost ? value.billCost : 0}
                  </Text>
                  <Text style={styles.salesBodyGstAmt}>
                    <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    />
                    {value.gstAmount ? value.gstAmount : 0}
                  </Text>
                  <Text style={styles.salesBodyAmount}>
                    <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    />
                    {Number(value.billCost) + Number(value.gstAmount)}
                  </Text>
                  <Text style={styles.salesHeadPaidDate}>
                    {value.paidDate}
                  </Text>
                  <Text style={styles.salesHeadPaidMode}>
                    {value.payMode}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.footerContent}>
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
              <Text style={styles.footerBillCost}>Purchase GST AMOUNT</Text>
              <Text style={styles.footerBillCostRight}>
                <Image
                  style={{ height: "6px", width: "7px" }}
                  src="/images/rupee-indian.png"
                />
                {Number(purchaseGst).toFixed(2)}
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
          </View>

          <View style={styles.footerCalc}>
            <View style={styles.footerCalcLeft}>
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
            </View>
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
              <View style={{width:'80px',height:'50px',marginTop:'10px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
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
              <View style={{width:'80px',height:'50px',marginTop:'10px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <Text>=</Text>
              </View>
              <View style={styles.footerCalcLeftContent}>
                <Text style={styles.footerRightCalcTop}>NEED TO PAY</Text>
                <View style={styles.footerRightCalcBottom}>
                  <Image
                    style={{ height: "7px", width: "8px" }}
                    src="/images/rupee-indian.png"
                  />
                  <Text>{payAmount}/-</Text>
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

export default GstPurchaseContent;
