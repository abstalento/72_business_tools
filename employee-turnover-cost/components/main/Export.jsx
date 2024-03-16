import React from "react";
import { Page, Text, Document, StyleSheet, View, Image } from "@react-pdf/renderer";
// import logo from "../logo1.jpeg"; // Import your logo image

const styles = StyleSheet.create({
  body: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 50,
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  employeePosition: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    width: "33%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000",
    padding: 8,
  },
  totalSection: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
  },
});

const Export = (props) => {
  // const [hiringCost,lostProductivityCost,salary,recruitmentCost,onboardingCost,trainingCost]=props
  // console.log("hello hiii",hiringCost)
  console.log(props)
  const categories = ["Employee Salary", "Hiring Cost", "Onboarding Cost", "Recruitment Cost", "Training Cost", "Lost Productivity Cost"];
  const c=props.props
  const a=c.reduce((acc, val) => acc + parseInt(val), 0)

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.header}>
          {/* <Image src={logo} style={styles.logo} /> */}
          <Text style={styles.headerText}>Employee Turnover Cost</Text>
        </View>
        {/* <View style={styles.employeePosition}>
          <Text>Employee Position: {position}</Text>
        </View> */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>S.No</Text>
            <Text style={styles.tableCell}>Category</Text>
            <Text style={styles.tableCell}>Cost</Text>
          </View>
          {[...Array(6)].map((_, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{categories[index]}</Text>
              <Text style={styles.tableCell}>{c[index]}</Text>
            </View>
          ))}
        </View>
        <View style={styles.totalSection}>
          <Text>Total Cost: {a}</Text>
        </View>
      </Page>
    </Document>
  );
};


export default Export;
