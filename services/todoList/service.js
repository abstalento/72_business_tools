import PouchDB from "pouchdb";

const Service = {
  todoHistory: async () => {
    var db = new PouchDB("todoList");
    return db
      .get("todoHistory")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  },
  todoListData: async () => {
    var db = new PouchDB("todoList");
    return db
      .get("todoListDatas")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  }
};

export default Service;
