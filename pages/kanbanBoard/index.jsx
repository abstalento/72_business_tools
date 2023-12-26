import Createnewpopup from "../../components/kanbanBoard/createnewpopup/AddNewPopup";
import NewApplication from "../../components/kanbanBoard/new-application/NewApplication";
import LandingPage from "./landingpage";
import styles from '../../styles/kanbanBoard.module.css'

function Home() {
  return (
    <>
      <div className="w-auto h-screen">
        <LandingPage/>
      </div>
    </>
  );
}

export default Home;
