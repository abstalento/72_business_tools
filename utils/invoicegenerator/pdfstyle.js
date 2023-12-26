import{ StyleSheet } from '@react-pdf/renderer'

export default StyleSheet.create({
    pdfView: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '3px',
      fontSize: '12px',
      padding: '10px',
      // height: '150px',
      flexDirection: 'row',
      backgroundColor: "#f2f3f5"
      // backgroundColor: location.bgColorValue
    },
    section: {
      height: 'auto',
      borderRadius: '5px',
      fontSize: '12px',
      width: '100%'
    },
    headLeft: {
      height: 'auto',
      maxHeight:'100px',
      fontSize: '12px',
      width: 'auto',
      maxWidth:'30%'
    },
    image: {
      height: '50px'
    },
    headRight: {
      // height: '130px',
      display: 'flex',
      paddingTop: '15px',
      // justifyContent: 'flex-end',
      fontSize: '12px'
    },
    headRInvoice: {
      textAlign: 'right',
      paddingBottom: '10px',
      width: '130px',
      fontSize: '30px',
      fontWeight: '1000',
      fontFamily: 'Helvetica'
    },
    headRBillNo: {
      textAlign: 'right',
      width: '120px',
      color: '#777777',
    },
    pdfRow2: {
      fontSize: '12px',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      padding: '20px',
      paddingBottom: '30px'
    },
    pdfRow2Left: {
      width: '70%'
    },
    pdfRow2Right: {
      fontSize: '12px',
      width: '45%',
      textAlign: 'right'
    },
    billFrm: {
      width: '145px',
      // height:'40px',
      paddingBottom: '10px',
      lineHeight: '1.3',
    },
    labelBillTo: {
      color: '#777777',
      marginBottom: '5px',
      fontSize: '10px',
      lineHeight: '1.3'
    },
    billToShipTo: {
      display: 'flex',
      width: '85%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      textWrap: 'nowrap',
      textOverflow: 'ellipsis',
      // overflow: 'hidden',
      // textOverflow: 'ellipsis',
      // whiteSpace: 'nowrap',
    },
    invoiceBillTo: {
      fontSize: '10px',
      fontFamily: 'Helvetica',
      lineHeight: '1.3'
    },
    invoiceBillToBold: {
      fontSize: '10px',
      fontFamily: 'Helvetica-Bold',
      lineHeight: '1.3'
    },
    invoiceShipTo: {
      fontSize: '10px',
      fontFamily: 'Helvetica',
      lineHeight: '1.3'
    },
    invoiceShipToBold: {
      fontSize: '10px',
      fontFamily: 'Helvetica-Bold',
      lineHeight: '1.3'
    },
    labelShipTO: {
      marginBottom: '5px',
      color: '#777777',
      fontSize: '10px'
    },
    billT: {
      width: '35%',
      paddingBottom: '10px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '12px',
      fontFamily: 'Helvetica'
    },
    shipT: {
      width: '35%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '12px',
      fontFamily: 'Helvetica',
      lineHeight: '1.3'
    },
    date: {
      width: '95%',
      paddingBottom: '10px',
      fontSize: '10px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    labelDate: {
      color: '#777777',
      fontSize: '10px',
      textAlign:'right',
      width: '46%'
    },
    dueDate: {
      width: '95%',
      fontSize: '10px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: '10px'
    },
    labelDueDate: {
      width: '46%',
      color: '#777777',
      fontSize: '10px',
    },
    labelPaymentTerms: {
      width: '63%',
      color: '#777777',
    },
    invoicePaymentTerms: {
      width:'75%',
      paddingLeft:'5px',
      textAlign: 'right',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textIndent: '30px',
      lineHeight: '1.4'
    },
    tabelHead: {
      fontSize: '12px',
      display: 'flex',
      width: '97%',
      flexDirection: 'row',
      backgroundColor: 'black',
      borderRadius: '5px',
      padding: '7px',
      marginBottom: '10px',
      marginLeft: '10px'
      // paddingLeft:'6px'
    },
    tabelHNo: {
      width: '10%',
      fontSize: '10px',
      color: 'white',
      backgroundColor: 'black',
      paddingLeft: '10px'
    },
    tabelHItem: {
      width: '25%',
      fontSize: '10px',
      marginRight:'5px',
      backgroundColor: 'black',
      color: 'white',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    tabelHQuantity: {
      width: '10%',
      fontSize: '10px',
      marginRight:'5px',
      textAlign: 'center',
      color: 'white',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    tabelHNetTotal: {
      width: '10%',
      fontSize: '10px',
      textAlign: 'right',
      color: 'white',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginLeft:'17px',
      paddingLeft:'2px',
      whiteSpace: 'nowrap'
    },
    tabelHGst:{
      width: '16%',
      fontSize: '10px',
      marginRight:'15px',
      textAlign: 'center',
      color: 'white',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    tabelHCgst:{
      width: '18%',
      fontSize: '10px',
      marginRight:'5px',
      textAlign: 'center',
      color: 'white',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      // backgroundColor:'white'
    },
    tabelHRate: {
      width: '14%',
      fontSize: '10px',
      textAlign: 'center',
      marginRight:'12px',
      color: 'white',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    tabelHAmount: {
      width: '10%',
      fontSize: '10px',
      marginRight:'13px',
      textAlign: 'right',
      color: 'white',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingRight:'6px',
      whiteSpace: 'nowrap'
    },
    tabelBody: {
      fontSize: '10px',
      display: 'flex',
      fontFamily: 'Helvetica',
      flexDirection: 'row',
      // justifyContent: 'space-between',
      padding: '10px',
      paddingTop: '5px',
      paddingLeft:'10px',
      //  backgroundColor:'lime'
    },
    tabelBNo: {
      width: '4%',
      textAlign: 'right'
    },
    tabelBitemList: {
      width: '27%',
      marginRight:'4px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      lineHeight: '1.5',
      // backgroundColor:'red',
      marginLeft:'5px'
  
    },
    tabelBItem1: {
      fontFamily: 'Helvetica',
      color: '#777777',
      // paddingLeft:'30px',
    },
    tabelBItemBold: {
      fontFamily: 'Helvetica-Bold',
      // paddingLeft:'30px',
    },
    tabelBQuantity: {
      width: '8%',
      textAlign: 'center',
      marginLeft:'2px',
      marginRight:'3px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      lineHeight: '1.3',
      // backgroundColor:'red'
    },
    tabelBRate: {
      width: '13%',
      // textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
      // fontFamily:'ITF'
    },
    tabelBAmount: {
      width: '16%',
      marginRight:'2px',
      textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      // backgroundColor:'blue'
    },
    tabelBIgst:{ 
       width: '14%',
      fontSize: '10px',
      textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
  },
  tabelBCgst:{
    width: '15%',
    fontSize: '10px',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  tabelBNetAmount:{
      width: '15%',
      fontSize: '10px',
      textAlign: 'right',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
  },
  tabelCalculation:{
    width:'70%',
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingRight:'9px',
    fontSize:'10px',
    // backgroundColor:'yellow'
  },
  tabelCalc1:{

    display:'flex',
    flexDirection:'row'
  },
  tabelCalc1_1:{
    fontSize:'8px',
    width:'20%',
    marginRight:'20px'
  },
  tabelCalc1_2:{
    fontSize:'9px',
    width:'20%',
    marginRight:'20px',
    paddingRight:'9px',
    textAlign:'center',
    
  },
  tabelCalc1_3:{
    width:'32%',
    paddingLeft:'16px'
  },
  tabelCalc2:{
    width:'75%',
    display:'flex',
    flexDirection:'row'
  },
  subGstCalcIgst:{
    width:'50%',
    paddingRight:'13px'
    // textAlign:'center'
  },
  subGstCalc:{
    width:'50%',
    display:'flex',
    flexDirection:'row',
    // paddingRight:'13px',
    textAlign:'start',
    // backgroundColor:'white'
  },
  subCgst:{
    width:'80%',
  },
  subSgst:{
    width:'80%'
  },
  subNetCalc:{
    width:'41%',
    textAlign:'right',
    // backgroundColor:'lime'
  },
    pdfRow4: {
      fontSize: '12px',
      minHeight: '10px',
      padding: '18px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      // backgroundColor:'yellow'
    },
    pdfNoteNTerms: {
      width: '55%',
      fontSize: '9px',
      fontFamily: 'Helvetica',
      lineHeight: '1.6'
    },
    pdfCalc: {
      width: '40%',
      paddingRight:'10px',
      // backgroundColor:'orange'
    },
    pdfNotes: {
      paddingBottom: '10px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      lineHeight: '1.6'
    },
    labelNotes: {
      fontFamily: 'Helvetica',
      fontSize: '10px',
      paddingBottom: '6px',
      color: '#777777',
    },
    pdfTermNCon: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      lineHeight: '1.3'
    },
    pdfSubTotal: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: '14px'
      
    },
    labelDiscount: {
      width: '59%',
      opacity: '0.5',
      textAlign: 'right',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '9px',
      fontFamily: 'Helvetica'
    },
    labelShipping: {
      width: '59%',
      opacity: '0.5',
      textAlign: 'right',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '9px',
      fontFamily: 'Helvetica'
    },
    subTotalLabel: {
      width: '60%',
      opacity: '0.5',
      textAlign: 'right',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '9px',
      fontFamily: 'Helvetica'
    },
    subTotalInput: {
      width: '34%',
      fontSize: '10px',
      fontFamily: 'Helvetica',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      // paddingRight:'10px',
      textAlign: 'right',
    },
    pdfRow5: {
      // display: 'flex',
      // backgroundColor: '#F2F2F2',
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      padding: '8px',
      marginLeft:'12px',
      marginTop:'20px'
      // position:'relative',
      // top:'340px'
    },
    bottomTxt: {
      fontSize: '8px'
    },
    bottomImg: {
      height: '20px'
    },
    textLabel: {
      //   fontFamily: 'sfpro-regular-display'
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    textInput: {
      width: '320px',
      fontSize: '10px',
      fontFamily: 'Helvetica',
      textWrap: 'nowrap',
      // marginBottom: '10px',
      textOverflow: 'ellipsis'
    },
    textInputBold: {
      fontFamily: 'Helvetica-Bold',
      marginBottom: '0px'
    },
    pdfBalance: {
      display:'flex',
      flexDirection: 'row',
      fontSize:'10px',
      height:'20px',
      alignItems:'center',
      width: '100%',
      // opacity:'0.5',
      backgroundColor: '#f2f3f5',
      // height:'10px',
    },
    balanceLabel: {
      width:'55%',
      textAlign:'right',
      fontFamily:'Helvetica-Bold'
    },
    invoiceBalance: {
      width: '70%',
      textAlign:'right',
      paddingRight:'12px',
      fontFamily:'Helvetica-Bold'
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
      fontSize:'6px',
    },
    footerImage: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      width:'32%'
    }
  })