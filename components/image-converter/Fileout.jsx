import { useEffect, useState } from "react";
// import { saveAs } from "file-saver";
import FileSaver from "file-saver";
import { ToastContainer, toast } from "react-toastify";
// import PulsLoader from "react-spinners/PulseLoader";
import "react-toastify/dist/ReactToastify.css";

const FileOut = (props) => {
  // const override: CSSProperties = {
  //   display: "block",
  //   margin: "0 auto",
  //   borderColor: "red",
  // };

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const [text, setText] = useState(props.textOut);

  useEffect(() => {
    if (props.textOut) {
      setLoading(false);
    }
  }, []);
  function copy() {
    let textarea = document.getElementById("textarea");
    textarea.select();
    document.execCommand("copy");

    toast.success("Copied To Clipboard Sucessfully !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  const downloadText = () => {
    var blob = new Blob([props.textOut], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(blob, "72-btools.txt");
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <div className="pl-20">
          <div className="bg-white bg-opacity-90 pt-1 flex flex-col border-[10px] border-opacity-75 border-[#010101] w-80 h-96 rounded-xl">
            {/* {props.textOut ? ( */}
            <div>
              <div className="flex justify-between p-3 ">
                <div>
                  <h1 className="font-[sf-pro-regular]">Output</h1>
                </div>
                <div className="flex justify-between w-[25%]">
                  <div
                    onClick={props.textOut == "" || props.textOut == undefined
                    ? null : copy}
                    className={`bg-[#07070765] bg-opacity-20 p-2 rounded-lg flex items-center ${props.textOut == "" || props.textOut == undefined ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-[#0064FE]'}`}
                  >
                    <img className="w-3 h-3" src="../icons/Copy.svg" alt="" />
                  </div>
                  <div
                    onClick={
                      props.textOut == "" || props.textOut == undefined
                        ? null
                        : downloadText
                    }
                    className={`bg-[#07070765] bg-opacity-20 p-2  rounded-lg flex items-center ${props.textOut == "" || props.textOut == undefined ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-[#0064FE]'}`}
                  >
                    <img
                      className="w-3 h-3"
                      src="../icons/Download.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="pl-1">
                <textarea
                  id="textarea"
                  value={props.textOut}
                  className="h-72 pl-2 w-72 focus:outline-none bg-transparent  no-scrollbar "
                ></textarea>
              </div>
            </div>
            {/* ) : ( */}
            {/* <div className="w-[100%] flex justify-center items-center h-full">
                <PulsLoader
                  color="blue"
                  loading={loading}
                  // cssOverride={override}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileOut;
