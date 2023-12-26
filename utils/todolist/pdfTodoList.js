import { StyleSheet } from "@react-pdf/renderer";


export default StyleSheet.create({
    pdfHead:{
        backgroundColor:'#E90854',
        height:'120px',
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between',
        color:'white'
    },
    headRow1:{
        display:'flex',
        paddingLeft:'20px',
        flexDirection:'column'
    },
    headDate:{
        fontSize:'14px',
        marginTop:'26px'
    },
    headRow2:{
        display:'flex',
        paddingRight:'20px',
        flexDirection:'column'
    },
    headProgress:{
        fontSize:'18px',
        color:'white',
        width:'130px',
        textAlign:'right',
        fontFamily: 'Helvetica-Bold',
    },
    headTodolist:{
        fontFamily: 'Helvetica',
        fontSize:'15px',
        textAlign:'right',
        width:'130px',
        marginTop:'5px'
    },
    tabelHead:{
        backgroundColor:'black',
        color:'white',
        height:'30px',
        width:'95%',
        marginLeft:'15px',
        marginTop:'30px',
        borderRadius:'3px',
        display:'flex',
        flexDirection:'row',
        fontSize:'10px',
        paddingLeft:'10px',
        paddingRight:'10px',
        alignItems:'center'
    },tabelHeadNo:{
        width:'90px'
    },
    tabelHeadList:{
        width:'160px'
    },
    tabelHeadItem:{
        width:'360px'
    },
    tabelHeadDate:{
        width:'160px'
    },
    tabelHeadTime:{
        width:'130px'
    },
    tabelHeadPriority:{
        width:'170px',
        textAlign:'right'
    },
    tabelBody:{
        height:'20px',
        width:'95%',
        marginLeft:'15px',
        borderRadius:'3px',
        display:'flex',
        flexDirection:'row',
        fontSize:'10px',
        marginTop:'10px',
        paddingLeft:'10px',
        paddingRight:'10px',
        alignItems:'center'
    },
    tabelBOdyNo:{
        width:'90px'
    },
    tabelBOdyList:{
        width:'160px'
    },
    tabelBOdyItem:{
       width:'360px',
    //   overflow: 'hidden',
    //   textOverflow: 'ellipsis',
    //   whiteSpace: 'nowrap',
    //   fontSize: '11px',
    //   fontFamily: 'Helvetica',
    //   backgroundColor:'red'
    },
    tabelBOdyDate:{
        width:'160px'
    },
    tabelBOdyTime:{
        width:'130px'
    },
    tabelBOdyPriority:{
        width:'170px',
        textAlign:'right'
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