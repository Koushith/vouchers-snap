import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  modalContainer: {
    size: "588px !important",
  },
  listContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  listHeading: {
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "16px",

    color: theme.colorScheme === "dark" ? "#A6A7AB " : "#495057 ",
    listStyle: "none",
  },
  listValue: {
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "16px",
    color: theme.colorScheme === "dark" ? "#A6A7AB " : "#495057 ",
    listStyle: "none",
  },
  SuccessIcon: {
    width: "60px",
    height: "60px",
  },
  successText: {
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#2C7A7B",
    textAlign: "center",
    marginTop: "30px",
  },
  button: {
    background:
      "linear-gradient(89.58deg, #44BCF0 -19.85%, #818CF8 54.07%, #A099FF 120.75%)",
  },
}));
