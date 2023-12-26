import React from "react";
import styles from "../../../utils/billHive/pdfStyle";
import { Document, Page, View, Text, Image, Link } from "@react-pdf/renderer";

const PdfContent = (props) => {
  const location = props.location;

  // console.log(location,"props.location--88888-",location.itemDetails.shipping,"--location.itemDetails.shipping")

  // let bii = location.itemDetails.billFrom.split('\n')
  const currencySymbol = location.currencySymbol;

  const subtotal = location.itemList
    .reduce((total, item) => total + item.quality * item.rate, 0)
    .toFixed(2);

  const total = (
    Number(subtotal) +
    (location.taxTGst
      ? (location.perTAmount.taxPercentTOAmount
          ? Number(
              (location.itemDetails.tax *
                (subtotal - (location.itemDetails.discount * subtotal) / 100)) /
                100
            )
          : Number(location.itemDetails.tax)) +
        (location.shippingNeed ? Number(location.itemDetails.shipping) : null) -
        (location.perTAmount.discountPercentTOAmount
          ? Number((location.itemDetails.discount * subtotal) / 100)
          : Number(location.itemDetails.discount))
      : (location.perTAmount.sGstPercentTOAmount
          ? Number(
              (location.itemDetails.sGst *
                (subtotal - (location.itemDetails.discount * subtotal) / 100)) /
                100
            )
          : Number(location.itemDetails.sGst)) +
        (location.perTAmount.cGstPercentTOAmount
          ? Number(
              (location.itemDetails.cGst *
                (subtotal - (location.itemDetails.discount * subtotal) / 100)) /
                100
            )
          : Number(location.itemDetails.cGst)) -
        (location.perTAmount.discountPercentTOAmount
          ? Number((location.itemDetails.discount * subtotal) / 100)
          : Number(location.itemDetails.discount)))
  ).toFixed(2);
  const monthArray = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const current = new Date();
  const month = current.getMonth();
  const day = current.getDate();
  const year = current.getFullYear();
  const newdate =
    day < 10
      ? monthArray[month] + " " + "0" + day + "," + " " + year
      : monthArray[month] + " " + day + "," + " " + year;

  function dateFormatter(date) {
    const bill = new Date(date);
    const month = bill.getMonth();
    const day = bill.getDate();
    const year = bill.getFullYear();
    const billDate =
      day < 10
        ? monthArray[month] + " " + "0" + day + "," + " " + year
        : monthArray[month] + " " + day + "," + " " + year;
    return billDate;
  }

  return (
    <Document>
      <Page
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "5px",
          marginTop: "5px",
        }}
        size="A4"
      >
        <View>
          <View style={styles.pdfView}>
            <View style={styles.headLeft}>
              {
                location?.imageUrl?.profilePic &&
                location.imageUrl.profilePic[0] ? (
                  <Image
                    style={styles.section}
                    src={location?.imageUrl.profilePic[0]}
                  />
                ) : null
              }
            </View>
            <View style={styles.headRight}>
              <Text style={styles.headRInvoice}>
                {location.detailsLabel.labelInvoice}
              </Text>
              <Text style={styles.headRBillNo}>
                # {location.itemDetails.invoiceNum}
              </Text>
            </View>
          </View>

          <View style={styles.pdfRow2}>
            <View style={styles.pdfRow2Left}>
              <View style={styles.billFrm}>
                <Text style={styles.textLabel}>
                  {/* {location.detailsLabel.labelBillFrom} */}
                </Text>
                <Text style={{ ...styles.textInput, ...styles.textInputBold }}>
                  {location.itemDetails.billFrom.split("\n")[0]}
                </Text>
                {location.itemDetails.billFrom
                  .split("\n")
                  .map((value, index) => {
                    return (
                      <Text style={styles.textInput}>
                        {index > 0 ? value : null}
                      </Text>
                    );
                  })}
              </View>


              <View style={styles.billToShipTo}>
              {location.itemDetails.shipTo === "" ? 
              <View style={styles.billFrm}>
                <Text style={styles.labelBillTo}>
                {location.detailsLabel.labelBillTo}:
                </Text>
                <Text style={{ ...styles.textInput, ...styles.textInputBold }}>
                  {location.itemDetails.billTo.split("\n")[0]}
                </Text>
                {location.itemDetails.billTo
                  .split("\n")
                  .map((value, index) => {
                    return (
                      <Text style={styles.textInput}>
                        {index > 0 ? value : null}
                      </Text>
                    );
                  })}
              </View> :  <View style={styles.billT}>
                  <Text style={styles.labelBillTo}>
                    {location.detailsLabel.labelBillTo}:
                  </Text>
                  <Text
                    style={{
                      ...styles.invoiceBillTo,
                      ...styles.invoiceBillToBold,
                    }}
                  >
                    {location.itemDetails.billTo.split("\n")[0]}
                  </Text>
                  {location.itemDetails.billTo
                    .split("\n")
                    .map((value, index) => {
                      return (
                        <Text style={styles.invoiceBillTo}>
                          {index > 0 ? value : null}
                        </Text>
                      );
                    })}
                </View> }
                
                {location.itemDetails.shipTo === "" ? null : (
                  <View style={styles.shipT}>
                    <Text style={styles.labelShipTO}>
                      {location.detailsLabel.labelShipTO}:
                    </Text>
                    <Text
                      style={{
                        ...styles.invoiceShipTo,
                        ...styles.invoiceShipToBold,
                      }}
                    >
                      {location.itemDetails.shipTo.split("\n")[0]}
                    </Text>
                    {/* <Text style={styles.invoiceShipTo}>{location.itemDetails.shipTo.split('\n')[1]}</Text> */}
                    {location.itemDetails.shipTo
                      .split("\n")
                      .map((value, index) => {
                        return (
                          <Text style={styles.invoiceShipTo}>
                            {index > 0 ? value : null}
                          </Text>
                        );
                      })}
                  </View>
                )}
              </View>
            </View>
            <View style={styles.pdfRow2Right}>
              {location.itemDetails.billDate === "" ? (
                <View style={styles.date}>
                  <Text style={styles.labelDate}>
                    {location.detailsLabel.labelDate}:
                  </Text>
                  <Text style={styles.invoiceData}>{newdate}</Text>
                  {/* <Text>{location.itemDetails.billDate}</Text> */}
                </View>
              ) : (
                <View style={styles.date}>
                  <Text style={styles.labelDate}>
                    {location.detailsLabel.labelDate}:
                  </Text>
                  {/* <Text>{newdate}</Text> */}
                  <Text style={styles.invoiceData}>
                    {dateFormatter(location?.itemDetails?.billDate)}
                  </Text>
                </View>
              )}
              {location.itemDetails.dueDate === "" ? null : (
                <View style={styles.dueDate}>
                  <Text style={styles.labelDueDate}>
                    {location.detailsLabel.labelDueDate}:
                  </Text>
                  <Text>{dateFormatter(location?.itemDetails?.dueDate)}</Text>
                </View>
              )}

              {location.itemDetails.paymentTerms === "" ? null : (
                <View style={styles.dueDate}>
                  <Text style={styles.labelPaymentTerms}>
                    {location.detailsLabel.labelPaymentTerms}:
                  </Text>
                  <Text style={styles.invoicePaymentTerms}>
                    {location?.itemDetails?.paymentTerms}
                  </Text>
                </View>
              )}
              {location.itemDetails.poNumber === "" ? null : (
                <View style={styles.dueDate}>
                  <Text style={styles.labelDueDate}>
                    {location.detailsLabel.labelPoNum}:
                  </Text>
                  <Text>{location?.itemDetails?.poNumber}</Text>
                </View>
              )}
              <View style={styles.pdfBalance}>
                <Text style={styles.balanceLabel}>
                  {location.detailsLabel.labelBalanceDue}:
                </Text>
                {currencySymbol === "₹" ? (
                  <Text style={styles.invoiceBalance}>
                    <Image
                      style={{ height: "7px", width: "6px" }}
                      src="/images/rupee-indian.png"
                    />
                    {Number(
                      Math.round(total - location.itemDetails.amountPaid)
                    ).toFixed(2)}
                  </Text>
                ) : (
                  <Text style={styles.subTotalInput}>
                    {currencySymbol}
                    {Number(
                      Math.round(total - location.itemDetails.amountPaid)
                    ).toFixed(2)}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.tabelHead}>
            <Text style={styles.tabelHNo}>S.NO</Text>
            <Text style={styles.tabelHItem}>
              {location.detailsLabel.labelItem}
            </Text>
            <Text style={styles.tabelHQuantity}>
              {location.detailsLabel.labelQuantity}
            </Text>
            <Text style={styles.tabelHRate}>
              {location.detailsLabel.labelRate}
            </Text>
            <Text style={styles.tabelHAmount}>
              {location.detailsLabel.labelAmount}
            </Text>
          </View>

          {props.location.itemList.map((item, index) => {
            return (
              <View key={index} style={styles.tabelBody}>
                <Text style={styles.tabelBNo}>
                  {++index < 10 ? "0" + index : index}
                </Text>
                <View style={styles.tabelBitemList}>
                  <Text
                    style={{ ...styles.tabelBItem, ...styles.tabelBItemBold }}
                  >
                    {item.item.split("\n")[0]}
                  </Text>
                  {/* <Text style={styles.tabelBItem1}>{item.item.split('\n')[1]}</Text></View> */}
                  {item.item.split("\n").map((value, index) => {
                    return (
                      <Text style={styles.tabelBItem1}>
                        {index > 0 ? value : null}
                      </Text>
                    );
                  })}{" "}
                </View>
                <Text style={styles.tabelBQuantity}>{item.quality}</Text>
                {currencySymbol === "₹" ? (
                  <Text style={styles.tabelBRate}>
                    <Image
                      style={{ height: "7px", width: "6px" }}
                      src="/images/rupee-indian.png"
                    />
                    {Number(item.rate).toFixed(2)}
                  </Text>
                ) : (
                  <Text style={styles.tabelBRate}>
                    {currencySymbol}
                    {Number(item.rate).toFixed(2)}
                  </Text>
                )}
                {currencySymbol === "₹" ? (
                  <Text style={styles.tabelBAmount}>
                    <Image
                      style={{ height: "7px", width: "6px" }}
                      src="/images/rupee-indian.png"
                    />
                    {Number(item.amount).toFixed(2)}
                  </Text>
                ) : (
                  <Text style={styles.tabelBAmount}>
                    {currencySymbol}
                    {Number(item.amount).toFixed(2)}
                  </Text>
                )}
              </View>
            );
          })}
          <View style={styles.pdfRow4}>
            <View style={styles.pdfCalc}>
              {location.taxNeed ? (
                <View style={styles.pdfSubTotal}>
                  <Text style={styles.subTotalLabel}>
                    {location.detailsLabel.labelSubTotal}:
                  </Text>
                  {currencySymbol === "₹" ? (
                    <Text style={styles.subTotalInput}>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {Number(Math.round(subtotal)).toFixed(2)}
                    </Text>
                  ) : (
                    <Text style={styles.subTotalInput}>
                      {currencySymbol}
                      {Number(Math.round(subtotal)).toFixed(2)}
                    </Text>
                  )}
                </View>
              ) : null}
              {location.discountNeed ? (
                <View style={styles.pdfSubTotal}>
                  :{" "}
                  {location.perTAmount.discountPercentTOAmount ? (
                    <Text style={styles.labelDiscount}>
                      {location.detailsLabel.labelDiscount}{" "}
                      {`(${location.itemDetails.discount}%)`}:
                    </Text>
                  ) : (
                    <Text style={styles.labelDiscount}>
                      {location.detailsLabel.labelDiscount}:
                    </Text>
                  )}
                  {location.perTAmount.discountPercentTOAmount ? (
                    currencySymbol === "₹" ? (
                      <Text style={styles.subTotalInput}>
                        <Image
                          style={{ height: "7px", width: "6px" }}
                          src="/images/rupee-indian.png"
                        />
                        {Number(
                          (location.itemDetails.discount * subtotal) / 100
                        ).toFixed(2)}
                      </Text>
                    ) : (
                      <Text style={styles.subTotalInput}>
                        {currencySymbol}
                        {Number(
                          (location.itemDetails.discount * subtotal) / 100
                        ).toFixed(2)}
                      </Text>
                    )
                  ) : currencySymbol === "₹" ? (
                    <Text style={styles.subTotalInput}>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {Number(location.itemDetails.discount).toFixed(2)}
                    </Text>
                  ) : (
                    <Text style={styles.subTotalInput}>
                      {currencySymbol}
                      {Number(location.itemDetails.discount).toFixed(2)}
                    </Text>
                  )}
                </View>
              ) : null}
              {location.taxNeed ? (
                <View>
                  {location.taxTGst ? (
                    <View style={styles.pdfSubTotal}>
                      {location.perTAmount.taxPercentTOAmount ? (
                        <Text style={styles.subTotalLabel}>
                          {location.detailsLabel.labelTax}{" "}
                          {`(${location.itemDetails.tax}%)`}:
                        </Text>
                      ) : (
                        <Text style={styles.subTotalLabel}>
                          {location.detailsLabel.labelTax}:
                        </Text>
                      )}
                      {location.perTAmount.taxPercentTOAmount ? (
                        currencySymbol === "₹" ? (
                          <Text style={styles.subTotalInput}>
                            <Image
                              style={{ height: "7px", width: "6px" }}
                              src="/images/rupee-indian.png"
                            />
                            {Number(
                              (location.itemDetails.tax *
                                (subtotal -
                                  (location.itemDetails.discount * subtotal) /
                                    100)) /
                                100
                            ).toFixed(2)}
                          </Text>
                        ) : (
                          <Text style={styles.subTotalInput}>
                            {currencySymbol}
                            {Number(
                              (location.itemDetails.tax *
                                (subtotal -
                                  (location.itemDetails.discount * subtotal) /
                                    100)) /
                                100
                            ).toFixed(2)}
                          </Text>
                        )
                      ) : currencySymbol === "₹" ? (
                        <Text style={styles.subTotalInput}>
                          <Image
                            style={{ height: "7px", width: "6px" }}
                            src="/images/rupee-indian.png"
                          />
                          {Number(location.itemDetails.tax).toFixed(2)}
                        </Text>
                      ) : (
                        <Text style={styles.subTotalInput}>
                          {currencySymbol}
                          {Number(location.itemDetails.tax).toFixed(2)}
                        </Text>
                      )}
                    </View>
                  ) : (
                    <View>
                      <View style={styles.pdfSubTotal}>
                        {location.perTAmount.sGstPercentTOAmount ? (
                          <Text style={styles.subTotalLabel}>
                            {location.detailsLabel.labelSGst}{" "}
                            {`(${location.itemDetails.sGst}%)`}:
                          </Text>
                        ) : (
                          <Text style={styles.subTotalLabel}>
                            {location.detailsLabel.labelSGst}:
                          </Text>
                        )}
                        {location.perTAmount.sGstPercentTOAmount ? (
                          currencySymbol === "₹" ? (
                            <Text style={styles.subTotalInput}>
                              <Image
                                style={{ height: "7px", width: "6px" }}
                                src="/images/rupee-indian.png"
                              />
                              {Number(
                                (location.itemDetails.sGst *
                                  (subtotal -
                                    (location.itemDetails.discount * subtotal) /
                                      100)) /
                                  100
                              ).toFixed(2)}
                            </Text>
                          ) : (
                            <Text style={styles.subTotalInput}>
                              {currencySymbol}
                              {Number(
                                (location.itemDetails.sGst *
                                  (subtotal -
                                    (location.itemDetails.discount * subtotal) /
                                      100)) /
                                  100
                              ).toFixed(2)}
                            </Text>
                          )
                        ) : currencySymbol === "₹" ? (
                          <Text style={styles.subTotalInput}>
                            <Image
                              style={{ height: "7px", width: "6px" }}
                              src="/images/rupee-indian.png"
                            />
                            {Number(location.itemDetails.sGst).toFixed(2)}
                          </Text>
                        ) : (
                          <Text style={styles.subTotalInput}>
                            {currencySymbol}
                            {Number(location.itemDetails.sGst).toFixed(2)}
                          </Text>
                        )}
                      </View>
                      <View style={styles.pdfSubTotal}>
                        {location.perTAmount.cGstPercentTOAmount ? (
                          <Text style={styles.subTotalLabel}>
                            {location.detailsLabel.labelCGst}{" "}
                            {`(${location.itemDetails.cGst}%)`}:
                          </Text>
                        ) : (
                          <Text style={styles.subTotalLabel}>
                            {location.detailsLabel.labelCGst}:
                          </Text>
                        )}
                        {location.perTAmount.cGstPercentTOAmount ? (
                          currencySymbol === "₹" ? (
                            <Text style={styles.subTotalInput}>
                              <Image
                                style={{ height: "7px", width: "6px" }}
                                src="/images/rupee-indian.png"
                              />
                              {/* {location.itemDetails.cGst} */}
                              {Number(
                                (location.itemDetails.cGst *
                                  (subtotal -
                                    (location.itemDetails.discount * subtotal) /
                                      100)) /
                                  100
                              ).toFixed(2)}
                            </Text>
                          ) : (
                            <Text style={styles.subTotalInput}>
                              {currencySymbol}
                              {Number(
                                (location.itemDetails.cGst *
                                  (subtotal -
                                    (location.itemDetails.discount * subtotal) /
                                      100)) /
                                  100
                              ).toFixed(2)}
                            </Text>
                          )
                        ) : currencySymbol === "₹" ? (
                          <Text style={styles.subTotalInput}>
                            <Image
                              style={{ height: "7px", width: "6px" }}
                              src="/images/rupee-indian.png"
                            />
                            {Number(location.itemDetails.cGst).toFixed(2)}
                          </Text>
                        ) : (
                          <Text style={styles.subTotalInput}>
                            {currencySymbol}
                            {Number(location.itemDetails.cGst).toFixed(2)}
                          </Text>
                        )}
                      </View>
                    </View>
                  )}{" "}
                </View>
              ) : null}

              {location.shippingNeed ? (
                <View style={styles.pdfSubTotal}>
                  <Text style={styles.labelShipping}>

                    {location.detailsLabel.labelShipping}: 
                  </Text>
                  {currencySymbol === "₹" ? (
                    <Text style={styles.subTotalInput}>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {Number(location.itemDetails.shipping).toFixed(2)}
                    </Text>
                  ) : (
                    <Text style={styles.subTotalInput}>
                      {currencySymbol}
                      {Number(location.itemDetails.shipping).toFixed(2)}
                    </Text>
                  )}
                </View>
              ) : null}

              <View style={styles.pdfSubTotal}>
                <Text style={styles.subTotalLabel}>
                  {location.detailsLabel.labelTotal}:
                </Text>
                {currencySymbol === "₹" ? (
                  <Text style={styles.subTotalInput}>
                    <Image
                      style={{ height: "7px", width: "6px" }}
                      src="/images/rupee-indian.png"
                    />
                    {Number(Math.round(total)).toFixed(2)}
                  </Text>
                ) : (
                  <Text style={styles.subTotalInput}>
                    {currencySymbol}
                    {Number(Math.round(total)).toFixed(2)}
                  </Text>
                )}
              </View>
              {location.itemDetails.amountPaid === "" ? null : (
                <View style={styles.pdfSubTotal}>
                  <Text style={styles.subTotalLabel}>
                    {location.detailsLabel.labelAmountPaid}:
                  </Text>
                  {currencySymbol === "₹" ? (
                    <Text style={styles.subTotalInput}>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {Number(
                        Math.round(location.itemDetails.amountPaid)
                      ).toFixed(2)}
                    </Text>
                  ) : (
                    <Text style={styles.subTotalInput}>
                      {currencySymbol}
                      {Number(
                        Math.round(location.itemDetails.amountPaid)
                      ).toFixed(2)}
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>

          <View style={styles.pdfRow5}>
            <View style={styles.pdfNoteNTerms}>
              <View style={styles.pdfNotes}>
                {location.itemDetails.notes === "" ? null : (
                  <Text style={styles.labelNotes}>
                    {location.detailsLabel.labelNotes}
                  </Text>
                )}
                <Text>{location.itemDetails.notes}</Text>
              </View>
              <View>
                {location.itemDetails.termsNCondition === "" ? null : (
                  <Text style={styles.labelNotes}>
                    {location.detailsLabel.labelTermsNCon}
                  </Text>
                )}
                <Text>{location.itemDetails.termsNCondition}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.pdfFooter} fixed={true}>
          {/* <View style={styles.pdfFooterContent}>
            <Text>Powered by Bill Hive | 72 Business Tools</Text>
            <Image
              style={{ height: "20px", width: "1px" }}
              src="/images/LineImage.png"
            />
            <Text>For more tools like visit</Text>
            <Link src="https://alphabsolutions.com/"><Text>72BusinessTools.com</Text></Link>
          </View> */}
          <View style={styles.footerImage}>
            <Text style={styles.pdfFooterContent}>Powered by</Text>
            <Link src="http://72businesstools.com/">
              {" "}
              <Image
                style={{ height: "15px", width: "50px" }}
                src="/images/72BTImage.png"
              />
            </Link>
            <Image
              style={{ height: "30px", width: "1px" }}
              src="/images/LineImage.png"
            />
            <Image
              style={{ height: "20px", width: "80px" }}
              src="/images/btBillHive.png"
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfContent;
