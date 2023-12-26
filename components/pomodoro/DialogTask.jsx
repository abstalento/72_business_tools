import { Dialog } from "@mui/material";

const DialogTask = ({ isOpen, close , children, screenSize}) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={close}
        PaperProps={{
          style: {
            width: screenSize?screenSize.width:"25%",
            height: screenSize?screenSize.height:"100vh",
            margin: 0,
            borderRadius:"20px"
          },
        }}
      >
        {children}
      </Dialog>
    </>
  );
};

export default DialogTask;
