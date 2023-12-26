import React from "react";
import { Document, Link, Page, Text, View, Image } from "@react-pdf/renderer";
import styles from "../../../utils/todolist/pdfTodoList";

// Create Document Component
const TodoPdfContent = ({ datas, action }) => {
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
  const weekArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const myDate = new Date();
  const day = myDate.getDay();
  const month = myDate.getMonth();
  const year = myDate.getFullYear();
  const date = myDate.getDate();
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
        <View>
          <View style={styles.pdfHead}>
            <View style={styles.headRow1}>
              <Text style={styles.headDate}>
                {weekArray[day]} {date}, {monthArray[month]}, {year}
              </Text>
            </View>
            <View style={styles.headRow2}>
              <Text style={styles.headProgress}>{action}</Text>
              <Text style={styles.headTodolist}>To-Do List</Text>
            </View>
          </View>
          <View style={styles.tabelHead}>
            <Text style={styles.tabelHeadNo}>NO.</Text>
            <Text style={styles.tabelHeadList}>List</Text>
            <Text style={styles.tabelHeadItem}>ITEM</Text>
            <Text style={styles.tabelHeadDate}>DATE</Text>
            <Text style={styles.tabelHeadTime}>TIME</Text>
            <Text style={styles.tabelHeadPriority}>PRIORITY</Text>
          </View>
          {datas.map((value, index) => {
            return (
              <View style={styles.tabelBody}>
                <Text style={styles.tabelBOdyNo}>
                  {++index < 10 ? "0" + index : index}
                </Text>
                <Text style={styles.tabelBOdyList}>{value.listName}</Text>
                <Text style={styles.tabelBOdyItem}>{value.taskTitle}</Text>
                <Text style={styles.tabelBOdyDate}>{value.date}</Text>
                <Text style={styles.tabelBOdyTime}>{value.time}</Text>
                <Text style={styles.tabelBOdyPriority}>{value.priority}</Text>
              </View>
            );
          })}
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
              src="/images/NewListLogo.png"
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TodoPdfContent;
