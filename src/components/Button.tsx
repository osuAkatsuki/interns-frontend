import { Button as MuiButton, Typography } from "@mui/material";

export const Button = ({
  text,
  sx,
}: {
  text: string;
  sx: any | undefined;
}) => {
  const defaultStyle = {
    minHeight: 52,
    minWidth: 128,
    borderRadius: "10px",
  };
  var styles = sx === undefined ? defaultStyle : { ...sx, ...defaultStyle };
  return (
    <MuiButton
      variant="contained"
      color="primary"
      sx={styles}
    >
      <Typography variant="h6" fontSize={18}>{text}</Typography>
    </MuiButton>
  )
};