import React from "react";
import { Document, View, Image, Text, Page, Link } from "@react-pdf/renderer";
import styles from "../../../utils/chitEmi/PdfStyle";

const PdfContent = ({ amountPDf }) => {
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
                    <Text style={styles.heading}>Auctioned Amount Interest</Text>
                </View>
                <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.number}>S No</Text>
                    <Text style={styles.value}>Interest Value</Text>
                    <Text style={styles.amount}>Auctioned Amount</Text>
                    <Text style={styles.install}>Installment</Text>
                    <Text style={styles.comm}>Commission</Text>
                </View>
            {
                amountPDf.map((ele,index)=>(
                    <View style={styles.pdf1}>
                        <Text style={styles.num}>{index+1}</Text>
                        <Text style={styles.val}>{Number(ele.interestVal).toFixed(2)}</Text>
                        <Text style={styles.amt}>{Number(ele.AmountVal).toFixed(2)}</Text>
                        <Text style={styles.inst}>{Number(ele.Installment).toFixed(2)}</Text>
                        <Text style={styles.commission}>{Number(ele.Commission).toFixed(2)}</Text>
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
              <Text>AUCTIONED</Text>
              <Text>AMOUNT INTEREST</Text>
            </View>
          </View>

          <View style={styles.auctContent}>
            <View style={styles.auctTabelHead}>
              <Text style={styles.auctHeadNo}>SNo.</Text>
              <Text style={styles.auctInterestValue}>INTEREST VALUE</Text>
              <Text style={styles.auctAucAmount}>AUCTION AMOUNT</Text>
              <Text style={styles.auctHeadInstallment}>INSTALLMENT</Text>
              <Text style={styles.auctHeadCommission}>COMMISSION</Text>
            </View>
            {amountPDf.map((ele, index) => (
              <View style={styles.auctTabelBody}>
                <Text style={styles.auctBodyNo}>{++index < 10 ? "0" + index : index}</Text>
                <Text style={styles.auctBodyInterest}>{Number(ele.interestVal).toFixed(2)}</Text>
                <Text style={styles.auctBodyAucAmount}>{Number(ele.AmountVal).toFixed(2)}</Text>
                <Text style={styles.auctBodyInstallment}>{Number(ele.Installment).toFixed(2)}</Text>
                <Text style={styles.auctBodyCommission}>{Number(ele.Commission).toFixed(2)}</Text>
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
              style={{ height: "20px", width: "55px" }}
              src="/images/Chit Calculator.png"
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default PdfContent;
