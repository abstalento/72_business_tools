import { padding } from "@mui/system";
import { StyleSheet } from "@react-pdf/renderer";

export default StyleSheet.create({
  main:{
    // backgroundColor:"#9687FF",
paddingLeft:"18px",
paddingRight:"18px"
  },
  ledgerheader: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "row",
    height: "90px",
    paddingLeft: "13px",
    paddingRight: "13px",
    justifyContent: "space-between",
    alignItems: "center",
    // height:80,
      // fontSize:10,
      // width:560,
      // paddingLeft:28,
      // flexDirection:"row",
      // justifyContent:"space-between",
      // alignItems:"center"
  },
  companyDetails:{
    // height:20,
    width:"100%",
    display:"flex",
    flexDirection:"row",
    marginLeft:"2px",
    justifyContent:"space-evenly",
    fontFamily: "Helvetica-Bold",
    // backgroundColor:"#4B00FF",
    // justifyContent:"space-around",
    fontSize:15
  },
  balance:{
    marginTop:"5px",
    // backgroundColor:"#F0F0F0",
    display:"flex",
    justifyContent:"flex-start",
    width:"150px",
    height:"50px",
    fontSize:'12px',
   
    // textAlign:"right",
    // marginLeft:"200px"
  },
  balancehead:{
fontSize:15,
marginTop:"12px",
// backgroundColor:"#D92121",
color:"#BAB8B8",
width:'120px'
  },
  numberamount:{
    paddingRight:"2px",
textAlign:"right",
fontSize:"18px",
padding:"1px"
  },
  amount:{
    // backgroundColor:"#C0FF00",
textAlign:"right",
fontSize:"15px",
width:"250px",
height:"40px",
opacity:"0.5"
  },
  exptotalamount:{
    fontSize:25,
    marginLeft:"25px"
  },
  totalbalancehead:{
fontSize:"20px",
height:"25px",
color:"#000000"
  },
  numwords:{
 textAlign:"right",
 alignItems:"flex-start",
// backgroundColor:"#00FFFB",
width:"280px",
 display:"flex",
 justifyContent:"flex-end",
color:"#000000",
fontSize:"12px",

  },
  words:{
display:"flex",
width:"280px",
// backgroundColor:"#FC8F60",
justifyContent:"flex-end",
//  borderBottom:'dashed',
//     borderBottomColor:"black",
//     borderBottomWidth:"1px",
  },
  balancefooter:{
    marginTop:"5px",
    // backgroundColor:"#D92121",
    display:"flex",
    justifyContent:"flex-start",
    width:"200px",
    height:"50px",
    fontSize:'12px',
  },
 
  from:{
fontSize:7,
color:"#707070",
marginBottom:"2px"
  },
  details:{
    // backgroundColor:"#FC8F60",
    width:"95%",
    height:40,
    justifyContent:"space-evenly",
    alignItems:"flex-start",
    marginLeft:"5px"
  },
  companyName:{
    width:"18%",
    //  marginLeft:"3px",
    // marginBottom:'5px',
    fontSize:20,
  },
  companyAddress:{
    marginBottom:'3px'
  },
  THeadNo:{
    width:"55px",
    // backgroundColor:"#FF00FA",
    marginLeft:"10px",
    // padding:"5px"
  },
  fromDate:{
    width:"80px",
    height:"30px",
    borderRadius:"5px",
    border:"1px solid grey",
    borderopacity:"0.5",
    // marginRight:"2px",
    // marginLeft:"20px",
    padding:"2px"

  },
  fromdata:{
    fontSize:10,
  },
  date:{
    fontSize:"5px",
    width:"90px",
    textAlign:"right",
    // paddingLeft:"150px",
    // backgroundColor:"#2A00FF"

  },
toDate:{
    width:"80px",
    height:"30px",
    borderRadius:"5px",
   border:"1px solid grey",
    marginLeft:"2px",
     padding:"3px"
  },
  salesContent: {
    minHeight:'110px',
    marginTop: "5px",
    paddingLeft: "13px",
    paddingRight: "13px",
    width: "100%",
    // borderBottom:'2px',
    // borderColor:'#dbdbdb',
  },
  contentTitle: {
    marginBottom:'10px',
    fontFamily: "Helvetica-Bold"
  },
  border:{
    borderBottom:'dashed',
    borderBottomColor:"black",
    borderBottomWidth:"1px",
    height:"5vh",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"   
  },
  TableHead: {
    backgroundColor: "black",
    color: "white",
    height: "28px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    fontSize: "7px",
    width: "100%",
    borderRadius: "5px",
    fontFamily: "Helvetica-Bold",
  },
    No: {
  //  backgroundColor:"#37FF00",
    // marginLeft:"3px",
    width: "55px",
    textAlign: "center",
  },
  borderbottomdash:{
    borderTop:'dashed',
    borderTopColor:"black",
    borderTopWidth:"1px",
    borderBottom:'dashed',
    borderBottomColor:"black",
    borderBottomWidth:"1px",
    height:"5vh",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"   
  },
  Grandtotalhead:{
    textAlign:'center',
    paddingTop:"10px",
  },
 

  HeadDate:{
  // backgroundColor:"#00FF26",
    width: "70px",
    textAlign: "left",
  },
  HeadLedger: {
    // backgroundColor:"#F0F0F0",
    width: "120px",
    textAlign: "left",
  },
  HeadCmpName: {
  // backgroundColor:"#00FF26",
    width: "110px",
    textAlign: "left",
  },

    reference: {
    width: "130px",
    paddingLeft:"2px",
    paddingRight:"2px",
     overflow: "hidden",
    textOverflow:"ellipsis",
    // backgroundColor:"#FF1212",
    // marginLeft:"25px",
    textAlign: "left",
  },
  HeadReference: {
    // backgroundColor:"#FF1212",
    width: "130px",
    textAlign: "left",
  },
    HeadExpense: {
    // backgroundColor:"#37FF00",
     width: "150px",
     textAlign:'center'
   },
    Expense: {
    // backgroundColor:"#37FF00",
     width: "120px",
     textAlign:'center'
   },
   HeadCredit: {
    // backgroundColor:"#FF1212",
    width: "120px",
    textAlign: "center",
  },
   Credit: {
    // backgroundColor:"#FF1212",
    width: "120px",
    textAlign: "center",
  },
  salesBodyGstAmt: {
    // backgroundColor:"#F84226",
    display: "flex",
    flexDirection: "row",
    alignContent:'center',
    width: "90px",
    textAlign: "center",
  },
  salesBodyAmount: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "90px",
    textAlign: "center",
    paddingRight: "10px",
  },
  salesHeadPaidMode: {
    width: "130px",
    textAlign: "center",
  },

  salesTabelBody: {
    height: "32px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    fontSize: "7px",
    width: "100%",
    fontFamily: "Helvetica",
  },
 date:{
    // backgroundColor:"#F84226",
    width: "70px",
    textAlign: "left",
  },
  Ledger: {
  //  backgroundColor:"#37FF00",
    width: "117px",
    textAlign:'left'
  },
  CmpName: {
    // backgroundColor:"#F84226",
    width: "100px",
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  salesBodyGstNum: {
    width: "120px",
    // textAlign: "left",
    textAlign:"center"
  },
  HeadBillCost: {
    width: "90px",
    textAlign: "center",
  },
  salesHeadGstAmt: {
    width: "90px",
    textAlign: "center",
  },
  salesHeadAmount: {
    width: "90px",
    textAlign: "center",
    paddingRight: "10px",
  },
  footerContent: {
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-end',
    width:'100%',
    justifyContent:'flex-end',
    paddingLeft:'13px',
    paddingRight:'13px',
    marginBottom:'10px'
  },
  footerText: {
    width:'200px',
    marginBottom:'7px',
    textAlign:'right',
    display:'flex',
    flexDirection:'row',
  },

  footerImage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "33%",
  },
  pdfFooterContent: {
    fontSize: "8px",
  },
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
});
