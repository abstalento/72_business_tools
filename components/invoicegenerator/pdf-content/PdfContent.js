import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../../utils/invoicegenerator/pdfstyle";
import { Document, Page, View, Text, Image, Link } from "@react-pdf/renderer";

const PdfContent = (props) => {
  const location = props.location;
  // const location = props.location ? JSON.parse(props.location.data) : "";
  // const location.currencySymbol = location.location.currencySymbol;

  const subtotal = location?.itemList
    ?.reduce((total, item) => total + item.quality * item.rate, 0)
    .toFixed(2);

  const quantityTotal = location.itemList.reduce(
    (total, item) => Number(total) + Number(item.quality),
    0
  );

  const NetAmountTotal = location.itemList
    .reduce((total, item) => Number(total) + Number(item.netTotal), 0)
    .toFixed(2);

  const discountAmount =
    Number(subtotal) -
    (location.discountNeed
      ? location.perTAmount.discountPercentTOAmount
        ? Number((location.itemDetails.discount * subtotal) / 100)
        : Number(location.itemDetails.discount)
      : null);

      const percentageTotal = location.itemList.reduce(
        (total, item) => Number(total) + Number(
          (location.taxTGst
            ? 
              Number(item.amount / 100) * Number(item.iGst)
            : 
              (Number(item.amount) / 100) * Number(item.cGst) +
              (Number(item.amount) / 100) * Number(item.sGst))
        ),
        0
      )
      .toFixed(2);

      const sgstTotal = location.itemList.reduce(
        (total, item) => Number(total) + Number(
              (Number(item.amount) / 100) * Number(item.sGst)
        ),
        0
      )
      const cGstTotal = location.itemList.reduce(
        (total, item) => Number(total) + Number(
              (Number(item.amount) / 100) * Number(item.cGst)
        ),
        0
      )
      const IgstTotal = location.itemList.reduce(
        (total, item) => Number(total) + Number(
              (Number(item.amount) / 100) * Number(item.iGst)
        ),
        0
      )

  const gstPercentageTotal = (Number(percentageTotal) + Number(discountAmount))
  const cessAmount =
    Number(gstPercentageTotal) +
    (location.shippingNeed ? Number(location.itemDetails.shipping) : null) +
    (location.cessNeed
      ? location.perTAmount.cessPercentToAmount
        ? Number((location.itemDetails.cess * NetAmountTotal) / 100)
        : Number(location.itemDetails.cess)
      : null);

  const total = Number(cessAmount)

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
                // <View
                //   style={{
                //     width: '230px',
                //     height: '130px',
                //     backgroundColor: 'white',
                //     justifyContent: 'center',
                //     alignItems: 'center'
                //   }}
                // >
                //   <Text style={{ opacity: '0.5' }}>Add Photo</Text>
                // </View>
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
                <Text style={styles.labelBillTo}>           {/* Style is Changed from labelBillFrom */}
                  {location.detailsLabel.labelBillFrom}     {/* Uncommented Line */}
                </Text>
                <Text style={{ ...styles.textInput, ...styles.textInputBold }}>
                  {location.itemDetails.billFrom.split("\n")[0]}
                </Text>
                {location.itemDetails.billFrom
                  .split("\n")
                  .map((value, index) => {
                    return (
                      <Text key={index} style={styles.textInput}>
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
                      <Text key={index} style={styles.textInput}>
                        {index > 0 ? value : null}
                      </Text>
                    );
                  })}
              </View> :
                <View style={styles.billT}>
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
                        <Text key={index} style={styles.invoiceBillTo}>
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
                          <Text key={index} style={styles.invoiceShipTo}>
                            {index > 0 ? value : null}
                          </Text>
                        );
                      })}
                  </View>
                )}
              </View>
            </View>
            <View style={styles.pdfRow2Right}>
              {location.itemDetails.billDate === "" ? null : (
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
              {location.itemDetails.buyerGst === "" ? null : (
                <View style={styles.dueDate}>
                  <Text style={styles.labelDueDate}>
                    {location.detailsLabel.labelBuyerGst}:
                  </Text>
                  <Text>{location?.itemDetails?.buyerGst}</Text>
                </View>
              )}
              {location.itemDetails.sellerGst === "" ? null : (
                <View style={styles.dueDate}>
                  <Text style={styles.labelDueDate}>
                    {location.detailsLabel.labelSellerGst}:
                  </Text>
                  <Text>{location?.itemDetails?.sellerGst}</Text>
                </View>
              )}
              <View style={styles.pdfBalance}>
                <Text style={styles.balanceLabel}>
                  {location.detailsLabel.labelBalanceDue}:
                </Text>
                {location.currencySymbol === "₹" ? (
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
                    {location.currencySymbol}
                    {Number(
                      Math.round(total - location.itemDetails.amountPaid)
                    ).toFixed(2)}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.tabelHead}>
            {/* <Text style={styles.tabelHNo}>NO.</Text> */}
            <Text style={styles.tabelHItem}>
              {location.detailsLabel.labelItem}
            </Text>
            <Text style={styles.tabelHRate}>
              {location.detailsLabel.labelRate}
            </Text>
            <Text style={styles.tabelHQuantity}>
              {location.detailsLabel.labelQuantity}
            </Text>
            <Text style={styles.tabelHAmount}>
              {location.detailsLabel.labelAmount}
            </Text>
            {location.taxTGst ? (
              <View style={styles.tabelHGst}>
                <Text> {location.detailsLabel.labelIgst}</Text>
              </View>
            ) : (
              <View style={styles.tabelHCgst}>
                <Text>{location.detailsLabel.labelCGst}</Text>
                <Text>{location.detailsLabel.labelSGst}</Text>
              </View>
            )}
            <Text style={styles.tabelHNetTotal}>
              {location.detailsLabel.labelNetTotal}
            </Text>
          </View>

          {location.itemList.map((item, index) => {
            return (
              <View key={index} style={styles.tabelBody}>
                {/* <Text style={styles.tabelBNo}>
                  {++index < 10 ? "0" + index : index}
                </Text> */}
                <View style={styles.tabelBitemList}>
                  <Text
                    style={{ ...styles.tabelBItem, ...styles.tabelBItemBold }}
                  >
                    {item.item.split("\n")[0]}
                  </Text>
                  {/* <Text style={styles.tabelBItem1}>{item.item.split('\n')[1]}</Text></View> */}
                  {item.item.split("\n").map((value, index) => {
                    return (
                      <Text key={index} style={styles.tabelBItem1}>
                        {index > 0 ? value : null}
                      </Text>
                    );
                  })}{" "}
                </View>

                {location.currencySymbol === "₹" ? (
                  <Text style={styles.tabelBRate}>
                    <Image
                      style={{ height: "7px", width: "6px" }}
                      src="/images/rupee-indian.png"
                    />
                    {Number(item.rate).toFixed(2)}
                  </Text>
                ) : (
                  <Text style={styles.tabelBRate}>
                    {location.currencySymbol}
                    {Number(item.rate).toFixed(2)}
                  </Text>
                )}
                <Text style={styles.tabelBQuantity}>{item.quality}</Text>
                {location.currencySymbol === "₹" ? (
                  <Text style={styles.tabelBAmount}>
                    <Image
                      style={{ height: "7px", width: "6px" }}
                      src="/images/rupee-indian.png"
                    />
                    {Number(item.amount).toFixed(2)}
                  </Text>
                ) : (
                  <Text style={styles.tabelBAmount}>
                    {location.currencySymbol}
                    {Number(item.amount).toFixed(2)}
                  </Text>
                )}
                {location.taxTGst ? (
                  <View style={styles.tabelBIgst}>
                    <Text>{`${item.iGst}%`}</Text>
                  </View>
                ) : (
                  <View style={styles.tabelBCgst}>
                    <Text>{`${item.cGst}%`}</Text>
                    <Text>{`${item.sGst}%`}</Text>
                  </View>
                )}

                <View style={styles.tabelBNetAmount}>
                  {location.currencySymbol === "₹" ? (
                    <Text>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {Math.round(
                        Number(
                          (item.netTotal = location.taxTGst
                            ? Number(item.amount) +
                              Number(item.amount / 100) * Number(item.iGst)
                            : Number(item.amount) +
                              (Number(item.amount) / 100) * Number(item.cGst) +
                              (Number(item.amount) / 100) * Number(item.sGst))
                        )
                      ).toFixed(2)}
                      {/* {Number(Math.round(subtotal)).toFixed(2)} */}
                    </Text>
                  ) : (
                    <Text>
                      {location.currencySymbol}
                      {Math.round(
                        Number(
                          (item.netTotal = location.taxTGst
                            ? Number(item.amount) +
                              Number(item.amount / 100) * Number(item.iGst)
                            : Number(item.amount) +
                              (Number(item.amount) / 100) * Number(item.cGst) +
                              (Number(item.amount) / 100) * Number(item.sGst))
                        )
                      ).toFixed(2)}
                      {/* {Number(Math.round(subtotal)).toFixed(2)} */}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={styles.tabelCalculation}>
              <View style={styles.tabelCalc1}>
                <Text style={styles.tabelCalc1_1}>
                  {location.detailsLabel.labelSubTotal}
                </Text>
                <Text style={styles.tabelCalc1_2}>{quantityTotal}</Text>
                <Text style={styles.tabelCalc1_3}>
                  {location.currencySymbol === "₹" ? (
                    <Text>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {Number(Math.round(subtotal)).toFixed(2)}
                    </Text>
                  ) : (
                    <Text>
                      {location.currencySymbol}
                      {Number(Math.round(subtotal)).toFixed(2)}
                    </Text>
                  )}
                </Text>
              </View>
              <View style={styles.tabelCalc2}>
              {location.taxTGst ? 
                 <View style={styles.subGstCalcIgst}>
                  {/* <Text>0</Text> */}
                  {location.currencySymbol === "₹" ? (
                    <Text style={{textAlign:'center'}}>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {IgstTotal}
                    </Text>
                  ) : (
                    <Text style={{textAlign:'center'}}>
                      {location.currencySymbol}{IgstTotal}
                    </Text>
                  )}
                </View> :
                <View style={styles.subGstCalc}>
                  {location.currencySymbol === "₹" ? (
                    <Text style={styles.subCgst}>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {cGstTotal}
                    </Text>
                  ) : (
                    <Text style={styles.subCgst}>
                      {location.currencySymbol}{cGstTotal}
                    </Text>
                  )}
                  {location.currencySymbol === "₹" ? (
                    <Text style={styles.subSgst}>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {sgstTotal}
                    </Text>
                  ) : (
                    <Text style={styles.subSgst}>
                      {location.currencySymbol}{sgstTotal}
                    </Text>
                  )}
                </View> }
                <View style={styles.subNetCalc}>
                  <Text>
                  {location.currencySymbol === "₹" ? (
                    <Text>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {Number(Math.round(NetAmountTotal)).toFixed(2)}
                    </Text>
                  ) : (
                    <Text>
                      {location.currencySymbol}
                      {Number(Math.round(NetAmountTotal)).toFixed(2)}
                    </Text>
                  )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.pdfRow4}>
            <View style={styles.pdfCalc}>
              {location.taxNeed ? (
                <View style={styles.pdfSubTotal}>
                  <Text style={styles.subTotalLabel}>
                    {location.detailsLabel.labelSubTotal}:
                  </Text>
                  {location.currencySymbol === "₹" ? (
                    <Text style={styles.subTotalInput}>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {Number(Math.round(subtotal)).toFixed(2)}
                    </Text>
                  ) : (
                    <Text style={styles.subTotalInput}>
                      {location.currencySymbol}
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
                    location.currencySymbol === "₹" ? (
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
                        {location.currencySymbol}
                        {Number(
                          (location.itemDetails.discount * subtotal) / 100
                        ).toFixed(2)}
                      </Text>
                    )
                  ) : location.currencySymbol === "₹" ? (
                    <Text style={styles.subTotalInput}>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {Number(location.itemDetails.discount).toFixed(2)}
                    </Text>
                  ) : (
                    <Text style={styles.subTotalInput}>
                      {location.currencySymbol}
                      {Number(location.itemDetails.discount).toFixed(2)}
                    </Text>
                  )}
                </View>
              ) : null}
              {location.cessNeed ? (
                <View style={styles.pdfSubTotal}>
                  :{" "}
                  {location.perTAmount.discountPercentTOAmount ? (
                    <Text style={styles.labelDiscount}>
                      {location.detailsLabel.labelCess}{" "}
                      {`(${location.itemDetails.cess}%)`}:
                    </Text>
                  ) : (
                    <Text style={styles.labelDiscount}>
                      {location.detailsLabel.labelCess}:
                    </Text>
                  )}
                  {location.perTAmount.cessPercentTOAmount ? (
                    location.currencySymbol === "₹" ? (
                      <Text style={styles.subTotalInput}>
                        <Image
                          style={{ height: "7px", width: "6px" }}
                          src="/images/rupee-indian.png"
                        />
                        {Number(
                          (location.itemDetails.cess * subtotal) / 100
                        ).toFixed(2)}
                      </Text>
                    ) : (
                      <Text style={styles.subTotalInput}>
                        {location.currencySymbol}
                        {Number(
                          (location.itemDetails.cess * subtotal) / 100
                        ).toFixed(2)}
                      </Text>
                    )
                  ) : location.currencySymbol === "₹" ? (
                    <Text style={styles.subTotalInput}>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {Number(
                        (location.itemDetails.cess * subtotal) / 100
                      ).toFixed(2)}
                    </Text>
                  ) : (
                    <Text style={styles.subTotalInput}>
                      {location.currencySymbol}
                      {Number(
                        (location.itemDetails.cess * subtotal) / 100
                      ).toFixed(2)}
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
                        location.currencySymbol === "₹" ? (
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
                            {location.currencySymbol}
                            {Number(
                              (location.itemDetails.tax *
                                (subtotal -
                                  (location.itemDetails.discount * subtotal) /
                                    100)) /
                                100
                            ).toFixed(2)}
                          </Text>
                        )
                      ) : location.currencySymbol === "₹" ? (
                        <Text style={styles.subTotalInput}>
                          <Image
                            style={{ height: "7px", width: "6px" }}
                            src="/images/rupee-indian.png"
                          />
                          {Number(location.itemDetails.tax).toFixed(2)}
                        </Text>
                      ) : (
                        <Text style={styles.subTotalInput}>
                          {location.currencySymbol}
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
                          location.currencySymbol === "₹" ? (
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
                              {location.currencySymbol}
                              {Number(
                                (location.itemDetails.sGst *
                                  (subtotal -
                                    (location.itemDetails.discount * subtotal) /
                                      100)) /
                                  100
                              ).toFixed(2)}
                            </Text>
                          )
                        ) : location.currencySymbol === "₹" ? (
                          <Text style={styles.subTotalInput}>
                            <Image
                              style={{ height: "7px", width: "6px" }}
                              src="/images/rupee-indian.png"
                            />
                            {Number(location.itemDetails.sGst).toFixed(2)}
                          </Text>
                        ) : (
                          <Text style={styles.subTotalInput}>
                            {location.currencySymbol}
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
                          location.currencySymbol === "₹" ? (
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
                              {location.currencySymbol}
                              {Number(
                                (location.itemDetails.cGst *
                                  (subtotal -
                                    (location.itemDetails.discount * subtotal) /
                                      100)) /
                                  100
                              ).toFixed(2)}
                            </Text>
                          )
                        ) : location.currencySymbol === "₹" ? (
                          <Text style={styles.subTotalInput}>
                            <Image
                              style={{ height: "7px", width: "6px" }}
                              src="/images/rupee-indian.png"
                            />
                            {Number(location.itemDetails.cGst).toFixed(2)}
                          </Text>
                        ) : (
                          <Text style={styles.subTotalInput}>
                            {location.currencySymbol}
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
                  {location.currencySymbol === "₹" ? (
                    <Text style={styles.subTotalInput}>
                      <Image
                        style={{ height: "7px", width: "6px" }}
                        src="/images/rupee-indian.png"
                      />
                      {Number(location.itemDetails.shipping).toFixed(2)}
                    </Text>
                  ) : (
                    <Text style={styles.subTotalInput}>
                      {location.currencySymbol}
                      {Number(location.itemDetails.shipping).toFixed(2)}
                    </Text>
                  )}
                </View>
              ) : null}

              <View style={styles.pdfSubTotal}>
                <Text style={styles.subTotalLabel}>
                  {location.detailsLabel.labelTotal}:
                </Text>
                {location.currencySymbol === "₹" ? (
                  <Text style={styles.subTotalInput}>
                    <Image
                      style={{ height: "7px", width: "6px" }}
                      src="/images/rupee-indian.png"
                    />
                    {Number(Math.round(total)).toFixed(2)}
                  </Text>
                ) : (
                  <Text style={styles.subTotalInput}>
                    {location.currencySymbol}
                    {Number(Math.round(total)).toFixed(2)}
                  </Text>
                )}
              </View>
              {location.itemDetails.amountPaid === "" ? null : (
                <View style={styles.pdfSubTotal}>
                  <Text style={styles.subTotalLabel}>
                    {location.detailsLabel.labelAmountPaid}:
                  </Text>
                  {location.currencySymbol === "₹" ? (
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
                      {location.currencySymbol}
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
            {/* <Text style={styles.bottomTxt}>
            © 2022, Alpha Business Solutions Pvt. Ltd. All Rights Reserved.
          </Text>
          <Image style={styles.bottomImg} src={homeLogo} /> */}
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
          <View style={styles.footerImage}>
            <Text style={styles.pdfFooterContent}>Powered by</Text>
            <Link src="http://72businesstools.com/">
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
              src="/images/GST One Pro.png"
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};
PdfContent.propTypes = {
  location: PropTypes.string.isRequired,
};

export default PdfContent;
