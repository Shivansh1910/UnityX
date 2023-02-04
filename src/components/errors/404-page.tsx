import React from "react";
import { createStyles } from "@mantine/core";

const useStyles = createStyles({
  detail: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    padding: "0 40px",
  },

  notExist: {
    fontFamily: "DM Sans",
    fontStyle: "normal",
    fontWeight: "bolder",
    fontSize: "20px",
    lineHeight: "26px",
    textAlign: "center",
  },

  bg: {
    background: "#000000",
    height: "100vh",
    width: "100vw",
  },
});

const NotFound: React.FC = () => {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.bg}>
        <div className={classes.detail}>
          <p className={classes.notExist}>
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
