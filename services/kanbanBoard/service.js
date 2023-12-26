import PouchDB from "pouchdb";
// const Service = {
//   getKanbanBoardArchive: async () => {
//     var db = new PouchDB("KanbanBoardNewProject");
//     return db
//       .get("kanbanBoardArchive")
//       .then((response) => response)
//       .then((doc) => doc)
//       .catch((error) => error);
//   }
// };
// export const Services = {
//   getKanbanBoardNewProjectHistory: async () => {
//     var db = new PouchDB("KanbanBoardNewProject");
//     return db
//       .get("kanbanBoardNewProjectHistory")
//       .then((response) => response)
//       .then((doc) => doc)
//       .catch((error) => error);
//   }
// };


const Services = {
  getKanbanBoardArchive: async () => {
    var db = new PouchDB("KanbanBoardNewProject");
    return db
      .get("kanbanBoardArchive")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  },
  getKanbanBoardNewProjectHistory: async () => {
    var db = new PouchDB("KanbanBoardNewProject");
    return db
      .get("kanbanBoardNewProjectHistory")
      .then((response) => response)
      .then((doc) => doc)
      .catch((error) => error);
  },
};

export default Services;