
import PouchDB from "pouchdb";

const Service = {
  getcashLedgerHistory: async () => {
    var db = new PouchDB("cashLedger");
    return db
      .get("cashLedgerHistory")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  },
  getLedgerEntry: async () => {
    var db = new PouchDB("LedgerEntry");
    return db
      .get("LedgerEntry")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  },
};

export default Service;