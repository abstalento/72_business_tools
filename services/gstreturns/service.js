
import PouchDB from "pouchdb";

const Service = {
  gstReturnsHistory: async () => {
    var db = new PouchDB("gstReturns");
    return db
      .get("gstReturnsHistory")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  },
};

export default Service;
