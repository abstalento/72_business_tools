import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";

const Pdf = ({ salaryDetails, currencySymbol, initialdays,workingday,dailyhour }) => {
  // Create styles
  const styles = StyleSheet.create({
    // page: {
    //   display: "flex",
    //   flexDirection: "column",
    //   backgroundColor: "white",
    //   justifyContent: "center",
    //   padding: "5px",
    // },
    // rowSection: {
    //   flexDirection: "row",
    // },
    // section: {
    //   marginBottom: 2,
    //   flexGrow: 1,
    //   borderRadius: "5px",
    //   width: "100%",
    // },
    // heading: {
    //   display: "flex",
    //   justifyContent: "center",
    // },
    pdfFooter: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingLeft: "12px",
      paddingRight: "12px",
      paddingTop: "6px",
      paddingBottom: "6px",
      backgroundColor: "#F3F3F3",
    },
    pdfFooterContent: {
      fontSize: "6px",
    },
    footerImage: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "35%",
    },
    pdfHeader: {
      height:100,
      backgroundColor: "#838383",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px",
      paddingRight: "25px",
      paddingLeft: "25px",
    },
    pdfHeaderRight: {
      display: "flex",
      flexDirection: "column",
      color: "white",
    },
    pdfHeaderContent2: {
      fontFamily: "Helvetica-Bold",
    },
    pdfTabel: {
      marginTop: "40px",
      padding: "20px",
    },
    tabelHeader: {
      backgroundColor: "#232E38",
      borderRadius: "4px",
      display: "flex",
      flexDirection: "row",
      padding: "10px",
      fontSize: "8px",
      color: "white",
    },
    tabelHNo: {
      width: "40px",
    },
    tabelHTitle: {
      width: "350px",
    },
    tabelHAmount: {},
    tabelBody: {
      display: "flex",
      flexDirection: "row",
      padding: "10px",
      fontSize: "10px",
      color: "#232E38",
    },
    tabelBNo: {
      width: "40px",
    },
    tabelBTitle: {
      width: "350px",
    },
    tabelBAmount: {
      // height: "20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  });

  // Create Document Component
  return (
    <Document>
      {/* <Page size="A4" style={styles.page}>
        <View style={styles.heading}>
          <Text>Salary Calculator</Text>
        </View>
        <View style={styles.rowSection}>
          <View style={styles.section}>
            <Text>Annual</Text>
          </View>
          <View style={styles.section}>
            <Text>{salaryDetails.year}</Text>
          </View>
        </View>
        <View style={styles.rowSection}>
          <View style={styles.section}>
            <Text>Monthly</Text>
          </View>
          <View style={styles.section}>
            <Text>{salaryDetails.month}</Text>
          </View>
        </View>
        <View style={styles.rowSection}>
          <View style={styles.section}>
            <Text>Weekly</Text>
          </View>
          <View style={styles.section}>
            <Text>{salaryDetails.week}</Text>
          </View>
        </View>
        <View style={styles.rowSection}>
          <View style={styles.section}>
            <Text>Daily</Text>
          </View>
          <View style={styles.section}>
            <Text>{salaryDetails.day}</Text>
          </View>
        </View>
        <View style={styles.rowSection}>
          <View style={styles.section}>
            <Text>Hourly</Text>
          </View>
          <View style={styles.section}>
            <Text>{salaryDetails.hour}</Text>
          </View>
        </View>
        <View style={styles.rowSection}>
          <View style={styles.section}>
            <Text>Minutes</Text>
          </View>
          <View style={styles.section}>
            <Text>{salaryDetails.minute}</Text>
          </View>
        </View>
      </Page> */}
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <View style={styles.pdfHeader}>
            <View>
              <Image
                style={{ height: "40px", width: "130px" }}
                src="/images/salaryPdfImage.png"
              />
            </View>
            <View style={styles.pdfHeaderRight}>
              <Text style={styles.pdfHeaderContent2}>CALCULATION LIST</Text>
              {/* <Text style={styles.pdfHeaderContent2}>CALCULATION LIST</Text> */}
            </View>
          </View>
          <View style={styles.pdfTabel}>
            <View style={styles.tabelHeader}>
              <Text style={styles.tabelHNo}>S.NO</Text>
              <Text style={styles.tabelHTitle}>TITLE</Text>
              <Text style={styles.tabelHAmount}>AMOUNT</Text>
            </View>
            <View style={styles.tabelBody}>
              <Text style={styles.tabelBNo}>01</Text>
              <Text style={styles.tabelBTitle}>Annual Salary</Text>
              <Text style={styles.tabelBAmount}>
                {" "}
                {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> : currencySymbol}
                {salaryDetails.year}/-
              </Text>
            </View>
            <View style={styles.tabelBody}>
              <Text style={styles.tabelBNo}>02</Text>
              <Text style={styles.tabelBTitle}>Monthly Wages - {workingday}</Text>
              <Text style={styles.tabelBAmount}>
                {" "}
                {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> : currencySymbol}
                {salaryDetails.month}/-
              </Text>
            </View>
            <View style={styles.tabelBody}>
              <Text style={styles.tabelBNo}>03</Text>
              <Text style={styles.tabelBTitle}>Weekly Wages - {initialdays}</Text>
              <Text style={styles.tabelBAmount}>
                {" "}
                {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> : currencySymbol}
                {salaryDetails.week}/-
              </Text>
            </View>
            <View style={styles.tabelBody}>
              <Text style={styles.tabelBNo}>04</Text>
              <Text style={styles.tabelBTitle}>Daily Wages - {dailyhour}</Text>
              <Text style={styles.tabelBAmount}>
                {" "}
                {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> : currencySymbol}
                {salaryDetails.day}/-
              </Text>
            </View>
            <View style={styles.tabelBody}>
              <Text style={styles.tabelBNo}>05</Text>
              <Text style={styles.tabelBTitle}>Hourly Wages</Text>
              <Text style={styles.tabelBAmount}>
                {" "}
                {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> : currencySymbol}
                {salaryDetails.hour}/-
              </Text>
            </View>
            <View style={styles.tabelBody}>
              <Text style={styles.tabelBNo}>06</Text>
              <Text style={styles.tabelBTitle}>Per Min Wages</Text>
              <Text style={styles.tabelBAmount}>
                {" "}
                {currencySymbol == '₹' ?  <Image
                      style={{ height: "5px", width: "5px" }}
                      src="/images/rupee-indian.png"
                    /> : currencySymbol}
                {salaryDetails.minute}/-
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.pdfFooter} fixed={true}>
          {/* <View style={styles.pdfFooterContent}>
            <Text>Powered by Bill Hive | 72 Business Tools</Text>
            <Image
              style={{ height: "20px", width: "1px" }}
              src="/images/LineImage.png"
            />
            <Text>For more tools like visit</Text>
            <Link src="https://alphabsolutions.com/"><Text>72BusinessTools.com</Text></Link>
          </View> */}
          <View style={styles.footerImage}>
            <Text style={styles.pdfFooterContent}>Powered by</Text>
            <Link src="http://72businesstools.com/">
              {" "}
              <Image
                style={{ height: "15px", width: "50px" }}
                src="/images/72BTImage.png"
              />
            </Link>
            <Image
              style={{ height: "25px", width: "1px" }}
              src="/images/LineImage.png"
            />
            <Image
              style={{ height: "19px", width: "85px" }}
              src="/images/Salary Calculator.png"
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};
// ReactPDF.render(<Pdf />, `example.pdf`);
export default Pdf;
