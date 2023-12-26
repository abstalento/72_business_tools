import { IconButton } from "@mui/material";

const RippleButton = (props) => {
  return (
    <IconButton {...props}>
      {props.children}
    </IconButton>
  );
};

export default RippleButton;
