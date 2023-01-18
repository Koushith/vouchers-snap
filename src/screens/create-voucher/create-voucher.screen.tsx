import { Container } from "@mantine/core";
import { CreateVoucherForm } from "./components/create-voucher-form.component";
import { useStyles } from "./create-voucher.screen.styles";
import useVoucherStore from "../../store/voucher/voucher.store";
import { TransferFund } from "./components/transfer-fund.component";
import { VoucherCreationSuccess } from "./components/create-voucher-success.component";

export const CreateVoucherScreen = () => {
  const { classes } = useStyles();

  const createStep = useVoucherStore((state: any) => state.createStep);

  return (
    <Container className={classes.createScreenContainer}>
      {createStep === 1 && <CreateVoucherForm />}
      {createStep === 2 && <TransferFund />}
      {createStep === 3 && <VoucherCreationSuccess />}
    </Container>
  );
};
