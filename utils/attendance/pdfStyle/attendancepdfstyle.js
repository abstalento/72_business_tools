import { display } from "@mui/system";
import { StyleSheet } from "@react-pdf/renderer";

export default StyleSheet.create({

    
    text:{
        fontSize:100
        
    },


    greenMark:{
       backgroundColor:"pink"
    },
    header:{
        backgroundColor:"#5F266D",
        height:85,
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    headerimage:{
        width:"80%",
    },
    headerimagedev:{
        height:"100%",
        width:"18%",
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        alignSelf:"center"
    },
    headerChild:{
        height:50,
        width:"94%",
        flexDirection:"row",
        alignItems:"center",
        alignContent:"center",
        display:"flex",
        justifyContent:"space-between",
     
    
    

        
    },
    headerdev2:{
        color:"#FFFFFF",
        width:"26%",
        height:"60%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        alignContent:"center",
        fontSize:"11px",
        alignItems:"center",
        alignSelf:"center",
        borderRight:"1px",
        borderLeft:"1px",
        borderColor:"#bcf520",
        borderStyle:"dotted",

    
    
     
    },
    headerdev3:{
         display:"flex",
         flexDirection:"column",
         justifyContent:"space-between",
         height:"60%",
         width:"19%",
         color:"#FFFFFF",
         fontSize:"10px",
         alignItems:"center",
         alignSelf:"center",
         borderRight:"1px",
         borderColor:"#bcf520",
         borderStyle:"dotted",
       
      
    },
    headerdev4:{
        height:"100%",
        width:"87%",
        color:"#FFFFFF",
        fontSize:"11px",
        height:"75%",
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
        backgroundColor:"#FFFFFF66",
        alignItems:"center",
        alignSelf:"center",
        borderRadius:5,
        padding:"6px"
    
        
    
        
     
    },
    headerdevParent:{
       width:"29%",
       borderRight:"1px",
         borderColor:"#bcf520",
         borderStyle:"dotted",
        
    },
    headerdev5:{
          display:"flex",
         height:"11vh",
         width:"20%",
         color:"#FFFFFF",
         backgroundColor:"#FFFFFF",
         alignItems:"center",
         justifyContent:"center",
         color:"#000000",
         borderRadius:"8px",
         borderLeft:"8px",
         borderColor:"#FFC507",
         marginLeft:"0.5cm",
    },
    headerCalender:{
      width:"89%",
      height:"9vh",
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between",
    
    },
    headerCal:{
        display:"flex",
        flexDirection:"row",
        width:"70%",
        justifyContent:"space-between",
    
    },
    headerCale:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        alignItems:"center",
        justifyContent:"space-between",
      
    },
    body:{
        width:"100%",
        height:"7vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    bodycolor:{
        width:"94%",
        height:"6vh",
        display:"flex",
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-evenly"
     
    },
    bodyListColor:{
        width:"9%",
        justifyContent:"space-around",
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    tablebody:{
        width:"100%",
        // height:"70vh",
        backgroundColor:"#ffffff",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    table:{
        backgroundColor:"#fafafa",
        width:"94%",
        // height:"66vh"
    },
    tablehead:{
        backgroundColor:"#232E38",
        width:"100%",
        height:"5vh",
        borderTopLeftRadius:"5px",
        borderTopRightRadius:"5px",
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"row"
    }
,
tableheaddata:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    paddingLeft:"10px",
    width:"20%",
    color:"#FFFFFF",
    alignItems:"center"
}
,
calender:{
    width:"73%",
    display:"flex",
    color:"#FFFFFF",
    fontSize:"7px",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"

},
days:{
    width:"98%"
},

tabledata:{
    width:"100%",
    height:"5vh",
    fontSize:"10px",
    display:"flex",
   justifyContent:"space-between",
   padding:"8px",
   flexDirection:"row",
   overflow:"scroll"

 
}
,
present:{
    width:"30%",
    backgroundColor:"#5FCDFF",
    borderRadius:"50px"
},
absent:{
    width:"30%",
    backgroundColor:"#FF4A73",
    borderRadius:"50px"
}
,
others:{
    backgroundColor:"#F9D335",
    width:"40%",
    borderRadius:"50px"
},
dayhead:{
    display:"flex",
    flexDirection:"row",
    width:"28%",
    justifyContent:"space-between",
    paddingLeft:"10px"
   
}
,
dayscount:{
    display:"flex",
    flexDirection:"row",
    width:"73%",
    justifyContent:"space-around"
}
,
details: {
   
   width:"70%",
   display:"flex",
   flexDirection:"column",
   justifyContent:"space-between",
   textAlign:"justify"
   
   
   
},
mapdata:{
    overflow:"scroll",

    
    
}
,footer:{
        width:"100%",
        backgroundColor:"#4E4C4C33",
        height:"8vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    footer2:{
       width:"94%",
       height:"6vh",
       display:"flex",
       justifyContent:"space-between",
       flexDirection:"row",
       alignItems:"center",
    
    },
    footerimage:{
        width:"40%",
        height:20
    },
    footerimagedev:{
        display:"flex",
        flexDirection:"row",
        width:"20%",
        height:"100%",
        alignItems:"center",
        justifyContent:"space-evenly"
    },
    line:{
        height:"3vh"
    },
    calhead:{
        display:"flex",
        width:"100%"  
    },
    calhead1:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-evenly"
    },
    calhead2:{
        display:"flex",
        flexDirection:"col",
        alignItems:"center"
    },
    
    attendanceHead:{
       
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        width:"75%",
      
    },
    attStatusPresent:{
        borderRadius:"8px",
        width:"15px",
        height:"3vh",
        backgroundColor:"#13BBEF"
    },
    attStatusAbsent:{
        borderRadius:"8px",
        width:"15px",
        height:"3vh",
        backgroundColor:"#FF4A73"

    },
    attStatusCL:{
        borderRadius:"8px",
        width:"15px",
        height:"3vh",
        backgroundColor:"#0B0BD5"
    },
    attStatusPL:{
        borderRadius:"8px",
        width:"15px",
        height:"3vh",
        backgroundColor:"#F10BF1"
    },
    attStatusCOM:{
        borderRadius:"8px",
        width:"15px",
        height:"3vh",
        backgroundColor:"#232E38"
    },
    attStatusOFF:{
        borderRadius:"8px",
        width:"15px",
        height:"3vh",
        backgroundColor:"#E88605"
    },
    attStatusPA:{
        borderRadius:"8px",
        width:"15px",
        height:"3vh",
        backgroundColor:"#760BF1"
    },
    attStatusHA:{
        borderRadius:"8px",
        width:"15px",
        height:"3vh",
        backgroundColor:"#B50451"
    },
    attStatusSunday:{
        width:"15px",
        height:"4vh",
        backgroundColor:"#875FE899",
     
    }, 
    attendancebody:{
     width:"10px",
     height:"10vh"
    },
    tableBodyData:{
     display:"flex",
     width:"50px",
     justifyContent:"space-between",
     alignItems:"center",
     height:"5vh",
    
    },
    tablebodydata:{
        width:"50px",
        height:"2vh",
   
    }

})