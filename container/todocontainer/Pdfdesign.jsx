import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Svg,
} from "@react-pdf/renderer";

import styles from "../../utils/TodolistPdf/todopdf";

export function PdfDocument({ taskcompleted }) {
  const renderOptionList = () => {
    var daysList = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var monthsList = [
      "January",
      "February",
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
    var dateObj = new Date();
    var month = monthsList[dateObj.getUTCMonth()]; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var days = daysList[dateObj.getDay()];

    // var newdate = days + " " + "," + day + "," + month + "," + year;
    var newdate = days + " " + day + "," + month + "," + year;
    return (
      <View>
        <Text>{newdate}</Text>
      </View>
    );
  };

  return (
    <Document>
      <Page size="A3" style={styles.page}>
        <View>
          <Image
            src="/todolistimages/Rectangle_7308.png"
            style={styles.blueImg}
          />
        </View>
        <View style={styles.Pagelayout}>
          <View>
            <Text>
              <Text style={styles.Todolist}> To-Do List</Text>
            </Text>
            <Text style={styles.Date}>{renderOptionList()}</Text>
          </View>
          <View>
            <Text style={styles.Completed}>COMPLETED</Text>
          </View>
          <View>
            <Text style={styles.TodolistRight}>TO-Do List</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.LayoutTable}>
            <View style={[styles.row, styles.bold, styles.header2]}>
              <Text style={styles.row1}>No</Text>
              <Text style={styles.row2}>List</Text>
              <Text style={styles.row3}>ITEM</Text>
              <Text style={styles.row4}>DATE</Text>
              <Text style={styles.row5}>TIME</Text>
              <Text style={styles.row6}>PRIORITY</Text>
            </View>
          </View>

          <View style={styles.TdLayout}>
            {taskcompleted.map((item, i) => (
              <View style={styles.TdStyle}>
                <View key={i} style={styles.row} wrap={false}>
                  <Text style={styles.row1}>
                    <Text style={styles.bold}>{i + 1}</Text>
                  </Text>
                  <Text style={styles.row2}>{item.categorytype}</Text>
                  <Text style={styles.row3}>{item.heading}</Text>
                  <Text style={styles.row4}>
                    <Text style={styles.bold}>{item.date}</Text>
                  </Text>
                  <Text style={styles.row5}>{item.time}</Text>
                  <Text style={styles.row6}>{item.piority} Piority</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.Tableheight}></View>
        <View style={styles.Footer}>
          <View style={styles.Divfooter_01}>
            <Text>
              This list was maintained by using the To-Do List (Alpha Business
              Solutions) Product
            </Text>
          </View>
          <View style={styles.Divfooter_02}>
            <Image
              style={{ height: "20px", width: "40px" }}
              src="/images/powerdby.png"
            />
          </View>

          <View style={styles.Divfooter_03}>
            <Image
              style={{ height: "35px", width: "70px" }}
              src="/images/NewListLogo.png"
            />
          </View>
        </View>
      </Page>
    </Document>
  );
}
