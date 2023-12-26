import { StyleSheet } from "@react-pdf/renderer";

export default StyleSheet.create({
  pdfHeader: {
    backgroundColor: "#F5F5F5",
    opacity: 1,
    height: "130px",
    display: "flex",
    // width:'600px',
    padding: "12px",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerImageDiv: {
    display: "flex",
    width: "220px",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  swotImage: {
    width: "70px",
    height: "70px",
    padding: "10px",
    borderRadius: "8px",
  },
  swotImageContent: {
    display: "flex",
    flexDirection: "column",
    height: "40px",
    paddingLeft:'13px',
    justifyContent: "space-around",
  },
  swotImageContentTitle1: {
    fontFamily: "Helvetica-Bold",
    fontSize: "26px",
    color:'#232E38',
  },
  swotImageContentTitle2: {
    fontSize: "10px",
    color:'#232E38',
  },
  swotHeadRight:{
    width:'150px',
    paddingRight:'15px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  swotHeadRightTitle1: {
    fontFamily: "Helvetica-Bold",
    fontSize: "20px",
    color:'#232E38',
  },
  swotHeadRightTitle2: {
    fontSize: "12px",
    color:'#232E38',
    width: "140px",
    textAlign: "right",
    marginTop: "2px",
  },
  content: {
    marginTop: "18px",
    marginBottom:'5px',
    // padding: "25px",
    paddingLeft:'25px',
    paddingRight:'25px',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentHead: {
    display: "flex",
    width: "25%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    color: "#19A520",
    fontSize: "16px",
    paddingLeft:'15px',
    fontFamily: "Helvetica-Bold",
  },
  contentHeadOPPORTUNITIES: {
    display: "flex",
    width: "33%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    color: "#0B96D5",
    fontSize: "16px",
    paddingLeft:'10px',
    fontFamily: "Helvetica-Bold",
  },
  contentHeadWEAKNESS: {
    display: "flex",
    width: "26%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    color: "#FF7043",
    fontSize: "16px",
    paddingLeft:'10px',
    fontFamily: "Helvetica-Bold",
  },
  contentHeadTHREADS: {
    display: "flex",
    width: "23%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    color: "#EF5350",
    fontSize: "16px",
    paddingLeft:'10px',
    fontFamily: "Helvetica-Bold",
  },
  contentRight: {
    display: "flex",
    flexDirection: "row",
    width: "18%",
    justifyContent: "space-between",
    fontFamily: "Helvetica-Bold",
    fontSize: "15px",
    // backgroundColor:'#F5F5F5',
  },
  contentRightScore: {
    display: "flex",
    flexDirection: "row",
  },
  contentBody: {
    paddingLeft:'25px',
    paddingRight:'25px',
    marginBottom:'8px'
  },
  contentBodyHead: {
    backgroundColor: "#5c5c5c",
    // opacity:'100%',
    color: "white",
    padding: "6px",
    borderRadius: "4px",
    fontSize: "13px",
    display: "flex",
    paddingLeft:'15px',
    paddingRight:'15px',
    fontFamily: 'Helvetica-Bold',
    flexDirection: "row",
  },
  bodyHeadNo: {
    width: "10%",
  },
  bodyHeadTitle: {
    width: "75%",
  },
  bodyHeadGrade: {
    width: "35%",
  },
  bodyHeadOutOf: {
    width: "23%",
    textAlign:'right',
  },
  swotContent:{
    paddingLeft:'25px',
    paddingRight:'25px',
    // borderBottom:'1px'
  },
  swotContentBody: {
    padding: "3px",
    fontSize: "16px",
    marginBottom:'5px',
    display: "flex",
    color:'#303030',
    // opacity:0.8,
    flexDirection: "row",
  },
  swotContentNo: {
    width: "6%",
    paddingLeft:'12px'
  },
  swotContentTitle: {
    width: "50%",
    paddingLeft:'15px'
  },
  swotContentGrade: {
    width: "23%",
    textAlign:'center'
  },
  swotContentOutOf: {
    width: "23%",
    textAlign:'center',
    paddingLeft:'45px',
  },
  pdfFooter:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    paddingLeft:'12px',
    paddingRight:'12px',
    paddingTop:'6px',
    paddingBottom:'6px',
    backgroundColor:'#F3F3F3'
  },
  pdfFooterContent:{
    fontSize:'8px',
  },



  headerImageDivBottom: {
    display: "flex",
    width: "150px",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  swotImageBottom: {
    backgroundColor: "white",
    width: "45px",
    height: "45px",
    padding: "8px",
    borderRadius: "8px",
  },
  swotImageContentBottom: {
    display: "flex",
    flexDirection: "column",
    height: "35px",
    justifyContent: "space-around",
  },
  swotImageContentTitle1Bottom: {
    fontFamily: "Helvetica-Bold",
    fontSize: "12px",
  },
  swotImageContentTitle2Bottom: {
    fontSize: "6px",
  },
  footerImage: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:'37%'
  }
});
