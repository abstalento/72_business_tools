import PouchDB from "pouchdb";

const Service = {
  swotHistory: async () => {
    var db = new PouchDB("swotAnalysis");
    return db
      .get("swotHistory")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  },
  swotActiveData: async () => {
    var db = new PouchDB("swotAnalysis");
    return db
      .get("swotActiveData")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  },
};

export default Service;
