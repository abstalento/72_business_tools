import PouchDB from "pouchdb";

const Service = {
    getAttendanceEntry: async () => {
        var db = new PouchDB("AttendanceEntryProject");
        return db
          .get("AttendanceEntry")
          .then((response) => response)
          .then((doc) => doc)
          .catch((error) => error);
      },
     
      getCompanyDetails: async () => {
        var db = new PouchDB("AttendanceEntryProject");
        return db
          .get("CompanyDetails")
          .then((response) => response)
          .then((doc) => doc)
          .catch((error) => error);
      },

      getEmployeeDetails: async () => {
        var db = new PouchDB("AttendanceEntryProject");
        return db
          .get("EmployeeDetails")
          .then((response) => response)
          .then((doc) => doc)
          .catch((error) => error);
      },


      getAttendanceEmployee: async () => {
        var db = new PouchDB("AttendanceEntryProject");
        return db
          .get("AttendanceEmployee")
          .then((response) => response)
          .then((doc) => doc)
          .catch((error) => error);
      },
      getAttendanceData: async () => {
        var db = new PouchDB("AttendanceEntryProject");
        return db
          .get("AttendanceData")
          .then((response) => response)
          .then((doc) => doc)
          .catch((error) => error);
      },

}

export default Service