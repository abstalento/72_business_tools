import PouchDB from "pouchdb";

const Service = {
  getBillHiveHistory: async () => {
    var db = new PouchDB("BillHive");
    return db
      .get("BillHiveHistory")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  },
  getBillHiveActiveData: async () => {
    var db = new PouchDB("BillHive");
    return db
      .get("billHiveActiveData")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  },
  getBillHiveDefaultData: async () => {
    var db = new PouchDB("BillHive");
    return db
      .get("billHiveDefault")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  }
};

export default Service;
