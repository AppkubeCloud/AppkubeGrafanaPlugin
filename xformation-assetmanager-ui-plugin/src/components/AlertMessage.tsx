import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "300%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AlertMessage(props: any) {
  const classes = useStyles();
  const vertical = "top";
  const horizontal = "right";

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    if (props.handleCloseAlert) {
      console.log("calling handle close");
      props.handleCloseAlert();
      return;
    }
  };

  return (
    <div className={classes.root}>
      <Snackbar
        style={{ top: "87px", left: "auto", right: "24px" }}
        autoHideDuration={6000}
        open={props.open}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
      >
        <Alert onClose={handleClose} severity={props.severity}>
          {props.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
