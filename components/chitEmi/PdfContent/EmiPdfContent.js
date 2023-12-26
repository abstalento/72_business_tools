import React from "react";
import { Document, View, Image, Text, Page, Link } from "@react-pdf/renderer";
import styles from "../../../utils/chitEmi/PdfStyle";

const EmiPdfContent = ({ emiPdf }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* <View>
                <View >
                    <Text style={styles.heading}>Emi Calculator</Text>
                </View>
                <View style={styles.container}>
                <View style={styles.header}>
                    <Text>Month</Text>
                    <Text>Principal</Text>
                    <Text>Interest</Text>
                    <Text>TotalPayment</Text>
                    <Text>Balance</Text>
                    <Text>LoanPaidOnDate</Text>
                </View>
            {
                emiPdf.map((element,index)=>(
                    <View style={styles.pdf3}>
                        <Text style={styles.mon}>{element.month}</Text>
                        <Text style={styles.emiprl}>{Number(element.PrincipalEmiValue).toFixed(2)}</Text>
                        <Text style={styles.emiInt}>{Number(element.InterestEmiValue).toFixed(2)}</Text>
                        <Text style={styles.emipay}>{Number(element.TotalPaymentValue).toFixed(2)}</Text>
                        <Text style={styles.emibal}>{Number(element.BalanceEmiValue).toFixed(2)}</Text>
                        <Text style={styles.emiloan}>{Number(element.LoanPaid).toFixed(2)}</Text>
                        
                    </View>
                ))
            }
            </View>
            </View> */}
        <View>
          <View style={styles.chitheader}>
            <View>
              <Image
                style={{ height: "65px", width: "160px" }}
                src="/images/chitpdfimage.png"
              />
            </View>
            <View style={styles.bonusHeadRight}>
              <Text>EMI</Text>
              <Text>CALCULATOR</Text>
            </View>
          </View>

          <View style={styles.emiContent}>
            <View style={styles.emiTabelHead}>
              <Text style={styles.emiHeadNo}>SNo.</Text>
              <Text style={styles.emiHeadMonth}>MONTH</Text>
              <Text style={styles.emiHeadPrincipal}>PRINCIPAL</Text>
              <Text style={styles.emiHeadInterest}>INTEREST</Text>
              <Text style={styles.emiHeadTotalPay}>TOTAL PAYMENT</Text>
              <Text style={styles.emiHeadBalance}>BALANCE</Text>
              <Text style={styles.emiLoanPaid}>LOAN PAID ON DATE</Text>
            </View>
            {emiPdf.map((element, index) => (
              <View style={styles.emiTabelBody}>
                <Text style={styles.emiHeadNo}>
                  {++index < 10 ? "0" + index : index}
                </Text>
                <Text style={styles.emiHeadMonth}>{element.month}</Text>
                <Text style={styles.emiHeadPrincipal}>
                  {Number(element.PrincipalEmiValue).toFixed(2)}
                </Text>
                <Text style={styles.emiHeadInterest}>
                  {Number(element.InterestEmiValue).toFixed(2)}
                </Text>
                <Text style={styles.emiHeadTotalPay}>
                  {Number(element.TotalPaymentValue).toFixed(2)}
                </Text>
                <Text style={styles.emiHeadBalance}>
                  {Number(element.BalanceEmiValue).toFixed(2)}
                </Text>
                <Text style={styles.emiLoanPaid}>
                  {Number(element.LoanPaid).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.pdfFooter} fixed={true}>
          <View style={styles.footerImage}>
            <Text style={styles.pdfFooterContent}>Powered by</Text>
            <Link src="http://72businesstools.com/">
              {" "}
              <Image
                style={{ height: "15px", width: "46px" }}
                src="/images/72BTImage.png"
              />
            </Link>
            <Image
              style={{ height: "30px", width: "1px" }}
              src="/images/LineImage.png"
            />
            <Image
              style={{ height: "20px", width: "70px" }}
              src="/images/Chit Calculator.png"
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default EmiPdfContent;
