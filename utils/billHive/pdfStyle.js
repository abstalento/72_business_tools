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
        // backgroundColor: location.bgColorValue
      },
      section: {
        height: 'auto',
        borderRadius: '5px',
        fontSize: '12px',
        width: '100%'
        // backgroundColor:'red'
      },
      headLeft: {
        height: 'auto',
        maxHeight:'100px',
        fontSize: '12px',
        width: 'auto',
        maxWidth:'30%'
        // backgroundColor:'red',
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
        // backgroundColor:'red',
        display: 'flex',
        flexDirection: 'row',
        padding: '20px',
        paddingBottom: '30px'
        // backgroundColor:'red'
      },
      pdfRow2Left: {
        width: '70%'
        // backgroundColor: 'red',
      },
      pdfRow2Right: {
        fontSize: '12px',
        width: '45%',
        // backgroundColor: 'green',
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
        fontSize: '10px',
        lineHeight: '1.3'
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
        width: '40%',
        fontSize: '10px',
        backgroundColor: 'black',
        color: 'white',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      tabelHQuantity: {
        width: '20%',
        fontSize: '10px',
        textAlign: 'center',
        color: 'white',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      tabelHRate: {
        width: '20%',
        fontSize: '10px',
        textAlign: 'center',
        color: 'white',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      tabelHAmount: {
        width: '20%',
        fontSize: '10px',
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
        justifyContent: 'space-between',
        padding: '20px',
        paddingTop: '5px'
      },
      tabelBNo: {
        width: '4%',
        textAlign: 'right'
      },
      tabelBitemList: {
        width: '38%',
        overflow: 'hidden',
         textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        lineHeight: '1.5'
      },
      tabelBItem1: {
        // width: '38%',
        // overflow: 'hidden',
        fontFamily: 'Helvetica',
        color: '#777777',
        // width: '38%',
        // overflow: 'hidden',
      },
      tabelBItemBold: {
        // width: '38%',
        // overflow: 'hidden',
        fontFamily: 'Helvetica-Bold',
        // textOverflow: 'ellipsis',
        // whiteSpace: 'nowrap',
        // lineHeight: '1.5'
      },
      tabelBQuantity: {
        width: '16%',
        textAlign: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        lineHeight: '1.3'
      },
      tabelBRate: {
        width: '16%',
        textAlign: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
        // fontFamily:'ITF'
      },
      tabelBAmount: {
        width: '15%',
        textAlign: 'right',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      pdfRow4: {
        fontSize: '12px',
        minHeight: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      pdfNoteNTerms: {
        width: '55%',
        fontSize: '9px',
        fontFamily: 'Helvetica',
        lineHeight: '1.6'
      },
      pdfCalc: {
        width: '40%'
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
        fontFamily: 'Helvetica',
      
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
        textAlign: 'right'
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
        width:'33%'
      }
  })