import { Document, View, Image, Text, Page, Link } from "@react-pdf/renderer";
import styles from "../../../utils/chitEmi/PdfStyle";

const BonusPdfContent = ({ bonusPDF }) => {
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
        {/* <View>
                    <View >
                        <Text style={styles.bonusheading}>Bonus Amount Interest</Text>
                    </View>
                    <View style={styles.bonuscontainer}>
                        <View style={styles.bonusheader}>

                            <Text style={styles.bonus}>Amount payable for current month</Text>
                          
                            <Text style={styles.bonus}>Interest value</Text>
                            <Text style={styles.bonus}>Amount for auctioned person</Text>
                            <Text style={styles.bonus}>Bonus amount</Text>
                        </View>
                        <View>
                            {
                                bonusPDF.map((val, index) => (
                                    <View style={styles.pdf2}>

                                        <Text style={styles.bonus}>{val.installment}</Text>
                                        <Text style={styles.bonus}>{val.interest}</Text>
                                        <Text style={styles.bonus}>{val.amountVal}</Text>
                                        <Text style={styles.bonus}>{val.commission}</Text>
                                    </View>
                                ))
                            }

                        </View>
                    </View>
                </View> */}
        <View>
          <View style={styles.chitheader}>
            <View>
              <Image
                style={{ height: "65px", width: "160px" }}
                src="/images/chitpdfimage.png"
              />
            </View>
            <View style={styles.bonusHeadRight}>
              <Text>BONUS</Text>
              <Text>AMOUNT INTEREST</Text>
            </View>
          </View>
          <View style={styles.bonusContent}>
            <View style={styles.bonusTabelHead}>
              <Text style={styles.bonusHeadNo}>SNo.</Text>
              <Text style={styles.bonusHeadCategory}>CATEGORY</Text>
              <Text style={styles.bonusHeadValue}>VALUE</Text>
            </View>
            <View style={styles.bonusTabelBody}>
              <View style={styles.bonusBodyNo}>
                <Text>01</Text>
                <Text>02</Text>
                <Text>03</Text>
                <Text>04</Text>
              </View>

              <View style={styles.bonusBodyCategory}>
                <Text>Amount payable for current month</Text>
                <Text>Interest value</Text>
                <Text>Amount for auctioned person</Text>
                <Text>Bonus amount</Text>
              </View>

                {bonusPDF.map((val, index) => (
                  <View style={styles.bonusBodyValue}>
                    <Text>{Number(val.installment).toFixed(2)}</Text>
                    <Text>{val.interest}</Text>
                    <Text>{val.amountVal}</Text>
                    <Text>{Number(val.commission).toFixed(2)}</Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
        <View style={styles.pdfFooter} fixed={true}>
          <View style={styles.footerImage}>
            <Text style={styles.pdfFooterContent}>Powered by</Text>
            <Link src="http://72businesstools.com/">
              {" "}
              <Image
                style={{ height: "15px", width: "46px" }}
                src="/images/72BTImage.png"
              />
            </Link>
            <Image
              style={{ height: "30px", width: "1px" }}
              src="/images/LineImage.png"
            />
            <Image
              style={{ height: "20px", width: "55px" }}
              src="/images/Chit Calculator.png"
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default BonusPdfContent;
