import React, { useEffect, useState } from "react";
import { Link, StyleSheet } from "@react-pdf/renderer";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import styles from "../../../utils/swotAnalysis/pdfStyle";
const PdfContent = (props) => {
  const data = props.datas;

  const [result, setResult]=useState()
  const [Strength, setStrengthData]=useState()
  const [Threats, setThreatsData]=useState()
  const [Weakness, setWeaknessData]=useState()
  // const [swotTitle, setswotTitleData]=useState()
  // console.log(data, "props");

  useEffect(()=>{
    // const result1 = props.datas.Opportunities.filter(name => Object.values(name).some(v => v !== ""));
      // console.log(result,"result");
      // const data = [{ daysIn: 1, daysOut: 1, category: "Day Shift" },{ daysIn: 2, daysOut: 1, category: "Day Shift" },{ daysIn: "", daysOut: 1, category: 1 }];

     const resultData = props.datas.Opportunities.filter((user)=>user.name!=="");
     const  StrengthData=props.datas.Strength.filter((user)=>user.name!=="");
     const  ThreatsData=props.datas.Threats.filter((user)=>user.name!=="");
     const  WeaknessData=props.datas.Weakness.filter((user)=>user.name!=="");
    //  const  swotTitleData=props.datas.swotTitle!=="";
   
 
     setStrengthData(StrengthData)
     setThreatsData(ThreatsData)
     setWeaknessData(WeaknessData)
    //  setswotTitleData(swotTitleData)
     setResult(resultData)

// console.log(swotTitleData,"ressssssssssssssssssss");    
  },[props.datas])

  const strengthPoints = data["Strength"]?.reduce(
    (total, value) => Number(total) + Number(value.points),
    0
  );

  const strengthDefault = data["Strength"]?.reduce(
    (total, value) => total + value.defaultPoints,
    0
  );
  const OpportunitiesPoints = data["Opportunities"]?.reduce(
    (total, value) => Number(total) + Number(value.points),
    0
  );

  const OpportunitiesDefault = data["Opportunities"]?.reduce(
    (total, value) => total + value.defaultPoints,
    0
  );
  const WeaknessPoints = data["Weakness"]?.reduce(
    (total, value) => Number(total) + Number(value.points),
    0
  );

  const WeaknessDefault = data["Weakness"]?.reduce(
    (total, value) => total + value.defaultPoints,
    0
  );
  const ThreatsPoints = data["Threats"]?.reduce(
    (total, value) => Number(total) + Number(value.points),
    0
  );

  const ThreatsDefault = data["Threats"]?.reduce(
    (total, value) => total + value.defaultPoints,
    0
  );
  return (
    <Document>
      <Page
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        size="A4"
      >
        <View>
          <View style={styles.pdfHeader}>
            <View style={styles.headerImageDiv}>
              {/* <View style={styles.swotImage}>
                <Image
                  style={{ height: "50px", width: "50px" }}
                  src="/images/swot-logo.png"
                />
              </View> */}
              <View style={styles.swotImageContent}>
                <Text style={styles.swotImageContentTitle1}>Score List</Text>
                <Text style={styles.swotImageContentTitle2}>
                  SWOT Analysis
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.swotHeadRight}>
                <Text style={styles.swotHeadRightTitle1}>
                  {data.swotTitle}
                </Text>
                <Text style={styles.swotHeadRightTitle2}>List Name</Text>
              </View>
            </View>
          </View>

        {
          Strength?.length>0 && (<><View style={styles.content}>
            <View style={styles.contentHead}>
              <Text>
                <Image
                  style={{ height: "20px", width: "20px" }}
                  src="/images/swotStrength.png"
                />
              </Text>
              <Text>STRENGTH</Text>
            </View>
            <View style={styles.contentRight}>
              <View>
                <Text>Score</Text>
              </View>
              <View style={styles.contentRightScore}>
                <Text>{Number(strengthPoints / data["Strength"].length).toFixed(1)}</Text>
                <Text>/{strengthDefault / data["Strength"].length}</Text>
              </View>
            </View>
          </View>
          <View style={styles.contentBody}>
            <View style={styles.contentBodyHead}>
              <Text style={styles.bodyHeadNo}>NO.</Text>
              <Text style={styles.bodyHeadTitle}>TITLE</Text>
              <Text style={styles.bodyHeadGrade}>YOUR GRADE</Text>
              <Text style={styles.bodyHeadOutOf}>OUT OF</Text>
            </View>
          </View>
          <View style={styles.swotContent}>
            {Strength?.map((value, index) => (
              // <View style={styles.swotContent}>
              <View style={styles.swotContentBody}>
                <Text style={styles.swotContentNo}>
                  {++index < 10 ? "0" + index : index}
                </Text>
                <Text style={styles.swotContentTitle}>{value.name}</Text>
                <Text style={styles.swotContentGrade}>{value.points}</Text>
                <Text style={styles.swotContentOutOf}>
                  {value.defaultPoints}
                </Text>
              </View>
              // </View>
            ))}
          </View> </>)
        }

          
       {
        result?.length>0 && (<>    <View style={styles.content}>
          <View style={styles.contentHeadOPPORTUNITIES}>
            <Text>
              <Image
                style={{ height: "20px", width: "20px" }}
                src="/images/swotOpptites.png"
              />
            </Text>
            <Text>OPPORTUNITIES</Text>
          </View>
          <View style={styles.contentRight}>
            <View>
              <Text>Score</Text>
            </View>
            <View style={styles.contentRightScore}>
              <Text>
                {Number(OpportunitiesPoints / data["Opportunities"].length).toFixed(1)}
              </Text>
              <Text>
                /{OpportunitiesDefault / data["Opportunities"].length}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.contentBody}>
          <View style={styles.contentBodyHead}>
            <Text style={styles.bodyHeadNo}>NO.</Text>
            <Text style={styles.bodyHeadTitle}>TITLE</Text>
            <Text style={styles.bodyHeadGrade}>YOUR GRADE</Text>
            <Text style={styles.bodyHeadOutOf}>OUT OF</Text>
          </View>
        </View>
        <View style={styles.swotContent}>
          {result?.map((value, index) => (
            // <View style={styles.swotContent}>
            <View style={styles.swotContentBody}>
              <Text style={styles.swotContentNo}>
                {++index < 10 ? "0" + index : index}
              </Text>
              <Text style={styles.swotContentTitle}>{value.name}</Text>
              <Text style={styles.swotContentGrade}>{value.points}</Text>
              <Text style={styles.swotContentOutOf}>
                {value.defaultPoints}
              </Text>
            </View>
            // </View>
          ))}
        </View> </>)
     
       }
          
          {
            Weakness?.length>0 && (<>  <View style={styles.content}>
              <View style={styles.contentHeadWEAKNESS}>
                <Text>
                  <Image
                    style={{ height: "20px", width: "20px" }}
                    src="/images/swotWeak.png"
                  />
                </Text>
                <Text>WEAKNESS</Text>
              </View>
              <View style={styles.contentRight}>
                <View>
                  <Text>Score</Text>
                </View>
                <View style={styles.contentRightScore}>
                  <Text>{Number(WeaknessPoints / data["Weakness"].length).toFixed(1)}</Text>
                  <Text>/{WeaknessDefault / data["Weakness"].length}</Text>
                </View>
              </View>
            </View>
            <View style={styles.contentBody}>
              <View style={styles.contentBodyHead}>
                <Text style={styles.bodyHeadNo}>NO.</Text>
                <Text style={styles.bodyHeadTitle}>TITLE</Text>
                <Text style={styles.bodyHeadGrade}>YOUR GRADE</Text>
                <Text style={styles.bodyHeadOutOf}>OUT OF</Text>
              </View>
            </View>
            <View style={styles.swotContent}>
              {Weakness?.map((value, index) => (
                // <View style={styles.swotContent}>
                <View style={styles.swotContentBody}>
                  <Text style={styles.swotContentNo}>
                    {++index < 10 ? "0" + index : index}
                  </Text>
                  <Text style={styles.swotContentTitle}>{value.name}</Text>
                  <Text style={styles.swotContentGrade}>{value.points}</Text>
                  <Text style={styles.swotContentOutOf}>
                    {value.defaultPoints}
                  </Text>
                </View>
                // </View>
              ))}
            </View> </>)
          }

         
         {
          Threats?.length>0 && (<>   <View style={styles.content}>
            <View style={styles.contentHeadTHREADS}>
              <Text>
                <Image
                  style={{ height: "20px", width: "20px" }}
                  src="/images/swotThreat.png"
                />
              </Text>
              <Text>THREATS</Text>
            </View>
            <View style={styles.contentRight}>
              <View>
                <Text>Score</Text>
              </View>
              <View style={styles.contentRightScore}>
                <Text>{Number(ThreatsPoints / data["Threats"].length).toFixed(1)}</Text>
                <Text>/{ThreatsDefault / data["Threats"].length}</Text>
              </View>
            </View>
          </View>
          <View style={styles.contentBody}>
            <View style={styles.contentBodyHead}>
              <Text style={styles.bodyHeadNo}>NO.</Text>
              <Text style={styles.bodyHeadTitle}>TITLE</Text>
              <Text style={styles.bodyHeadGrade}>YOUR GRADE</Text>
              <Text style={styles.bodyHeadOutOf}>OUT OF</Text>
            </View>
          </View>
          <View style={styles.swotContent}>
            {Threats?.map((value, index) => (
              // <View style={styles.swotContent}>
              <View style={styles.swotContentBody}>
                <Text style={styles.swotContentNo}>
                  {++index < 10 ? "0" + index : index}
                </Text>
                <Text style={styles.swotContentTitle}>{value.name}</Text>
                <Text style={styles.swotContentGrade}>{value.points}</Text>
                <Text style={styles.swotContentOutOf}>
                  {value.defaultPoints}
                </Text>
              </View>
              // </View>
            ))}
          </View> </>)
         }

       
        </View>
        <View style={styles.pdfFooter} fixed={true}>
          <View style={styles.footerImage}>
            <Text style={styles.pdfFooterContent}>Powered by</Text>
            <Link src="http://72businesstools.com/"> <Image
              style={{ height: "15px", width: "50px" }}
              src="/images/72BTImage.png"
            /></Link>
            <Image
              style={{ height: "30px", width: "1px" }}
              src="/images/LineImage.png"
            />
            <Image
              style={{ height: "20px", width: "95px" }}
              src="/images/Swot Analysis.png"
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfContent;
