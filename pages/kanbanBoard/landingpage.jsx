import Header from "../../components/kanbanBoard/header/header";
import Footer from "../../components/kanbanBoard/footer/footer";
import NewApplication from "../../components/kanbanBoard/new-application/NewApplication";
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";
import BtoolsFooter from "../../container/72BTfooter/BToolsFooter";
import Createnewpopup from "../../components/kanbanBoard/createnewpopup/AddNewPopup";
import Createnewprojectpopup from "../../components/kanbanBoard/createnewpopup/Createnewprojectpopup";
import AddNewPopup from "../../components/kanbanBoard/createnewpopup/AddNewPopup";
import GlobalContext from "../../components/kanbanBoard/Calender/GlobalContext";
import ContextWrapper from "../../components/kanbanBoard/Calender/ContactWrapper";
const LandingPage = () => {
  return (
    <div className=" h-screen flex flex-col justify-between">
      <div>
        
      {/* <BtoolsHeader Src="../icons/KanbanBoardLogo.svg" Height="50" Width="83"/> */}
      </div>
      <div>
       <ContextWrapper><NewApplication/></ContextWrapper>      
      </div>
      <div>
        <BtoolsFooter/>
      </div>
    </div>
  );
};

export default LandingPage;
