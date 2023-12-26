import PouchDB from "pouchdb";

const Service = {
  invoiceGeneratorHistory: async () => {
    var db = new PouchDB("invoiceGenerator");
    return db
      .get("invoiceHistory")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  },
  invoiceGeneratorActiveData: async () => {
    var db = new PouchDB("invoiceGenerator");
    return db
      .get("invoiceActiveData")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  },
  invoiceGeneratorDefaultData: async () => {
    var db = new PouchDB("invoiceGenerator");
    return db
      .get("invoiceDefault")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  },
};

export default Service;
