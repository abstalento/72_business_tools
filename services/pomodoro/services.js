import PouchDB from "pouchdb";

const Services = {
    getPomodoro: async () => {
        var db = new PouchDB("Pomodoro");
        return db
          .get("Pomodoro")
          .then((response) => response)
          .then((doc) => doc)
          .catch((error) => error);
      },

   
     

}

export default Services