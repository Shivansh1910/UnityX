import { createStyles } from "@mantine/core";
import React from "react";

interface IModalCircleBtn {
  size: number;
  handleOnClick?: Function;
  Icon: React.ReactElement;
  background?: string;
}

const useStyles = createStyles(
  (theme, props: Pick<IModalCircleBtn, "size" | "background">) => ({
    circleBtn: {
      width: props.size,
      height: props.size,
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: props.background,
      position: "absolute",
      left: "20px",
    },
  })
);

const ModalCircleBtn: React.FC<IModalCircleBtn> = ({
  size,
  handleOnClick,
  Icon,
  background = "#3c3c3c",
}) => {
  const { classes } = useStyles({ size, background });
  return (
    <div
      onClick={() => {
        if (handleOnClick) {
          handleOnClick();
        }
      }}
      className={classes.circleBtn}
    >
      {Icon}
    </div>
  );
};

export default ModalCircleBtn;
