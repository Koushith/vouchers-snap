//@ts-nocheck
import { Stack, Box, Text, Center, createStyles } from "@mantine/core";
import Send from "../../../assets/icons/send.svg";
import Recieve from "../../../assets/icons/recieve.svg";
import Trade from "../../../assets/icons/trade.svg";

const useStyles = createStyles(() => ({
  actionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0 60px",
  },

  actionsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-around",
    height: "50px",
    width: "50px",
    borderRadius: "4px",
    cursor: "pointer",
  },
}));

export const Actions = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.actionsContainer}>
      <div className={classes.actionsWrapper}>
        <div className={classes.iconContainer}>
          <img src={Send} alt="send" />
        </div>
        <Text mt={10}>Send</Text>
      </div>

      <div className={classes.actionsWrapper}>
        <div className={classes.iconContainer}>
          <img src={Recieve} alt="send" />
        </div>
        <Text mt={10}>Recieve</Text>
      </div>

      <div className={classes.actionsWrapper}>
        <div className={classes.iconContainer}>
          <img src={Trade} alt="send" />
        </div>
        <Text mt={10}>Trade</Text>
      </div>
    </div>
  );
};
