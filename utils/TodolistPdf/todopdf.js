import { StyleSheet } from "@react-pdf/renderer";

export default StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  movieContainer: {
    backgroundColor: "#f6f6f5",
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
  movieDetails: {
    display: "flex",
    marginLeft: 5,
  },
  movieTitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  movieOverview: {
    fontSize: 10,
  },

  image: {
    height: 200,
    width: 150,
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 150,
    alignItems: "center",
    marginBottom: 12,
  },
  vote: {
    display: "flex",
    flexDirection: "row",
  },
  rating: {
    height: 10,
    width: 10,
  },
  vote_text: {
    fontSize: 10,
  },
  vote_pop: {
    fontSize: 10,
    padding: 2,
    backgroundColor: "#61C74F",
    color: "#fff",
  },
  vote_pop_text: {
    fontSize: 10,
    marginLeft: 4,
  },
  overviewContainer: {
    minHeight: 110,
  },
  detailsFooter: {
    display: "flex",
    flexDirection: "row",
  },
  lang: {
    fontSize: 8,
    fontWeight: 700,
  },
  vote_average: {
    fontSize: 8,
    marginLeft: 4,
    fontWeight: "bold",
  },

  //mystyle
  header: {
    height: "200px",
    width: "100%",
    backgroundColor: "#52A9F9",
  },
  blueImg: {
    height: "200px",
    width: "100%",
  },

  //table
  headerLeft: {
    color: "red",
  },

  table: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    paddingTop: 8,
    paddingBottom: 8,
  },
  header2: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  // So Declarative and unDRY 👌
  row1: {
    width: "10%",
  },
  row2: {
    width: "15%",
  },
  row3: {
    width: "25%",
  },
  row4: {
    width: "20%",
  },
  row5: {
    width: "15%",
  },

  row6: {
    width: "20%",
  },

  //Add Style
  Pagelayout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    marginTop: "60px",
  },

  Todolist: {
    fontFamily: "Helvetica-Bold",
    fontSize: "40px",
    color: "#ffffff",
    marginLeft: "35px",
  },

  Date: {
    fontFamily: "Helvetica-Bold",
    fontSize: "15px",
    color: "#ffffff",
    marginLeft: "25px",
    marginTop: "20px",
  },
  Completed: {
    fontFamily: "Helvetica-Bold",
    fontSize: "35px",
    color: "#ffffff",
    marginTop: "20px",
    marginLeft: "350px",
  },

  TodolistRight: {
    marginTop: "60px",
    marginLeft: "-150px",
    fontFamily: "Helvetica-Bold",
    fontSize: "20px",
    color: "#ffffff",
  },

  LayoutTable: {
    border: "2px solid #000000",
    backgroundColor: "#232E38",
    color: "#ffffff",
    position: "absolute",
    marginTop: "25px",
  },

  TdLayout: {
    position: "absolute",
    marginTop: "85px",
  },
  TdStyle: {
    paddingBottom: "20px",
  },
  Tableheight: {
    height: "900px",
  },
  Footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#00000029",
    opacity: "5",
    height: "90px",
  },

  Divfooter_01: {
    color: "#232E38",
    fontSize: "10px",
    marginTop: "40px",
    marginLeft: "25px",
  },
  Divfooter_02: {
    marginTop: "40px",
    marginLeft: "250px",
  },

  Divfooter_03: {
    marginTop: "35px",
    marginRight: "45px",
  },
  footerlogo: {
    height: "50px",
    width: "70%",
  },
});
