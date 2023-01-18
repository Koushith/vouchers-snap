import React, { useState } from "react";
import { Modal, Button, Group, TextInput } from "@mantine/core";
import { useStyles } from "./redeem-modal.component.styles";
import { Title } from "../primitives/text/text.component";
//@ts-ignore
import { useNavigate } from "react-router-dom";
import { RoutePath } from "navigation/route-path";
import useVoucherStore from "store/voucher/voucher.store";
import { Wallet, AddressUtil } from "utils";
import { useServices } from "services";
import { utils } from "ethers";

export interface RedeemModalProps {
  children?: React.ReactNode;
  title?: string;
  modalActive?: boolean;
  setModalActive?: React.Dispatch<React.SetStateAction<boolean>> | any;
}

export const RedeemModal: React.FC<RedeemModalProps> = (props) => {
  const { title, modalActive = false, setModalActive, ...rest } = props;

  const { classes } = useStyles();
  const navigate = useNavigate();
  const { safeService, accountService } = useServices();
  const wallet = new Wallet();
  const [redeeming, setRedeeming] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { voucherDetails, setVoucherDetails, setFetching } = useVoucherStore(
    (state: any) => state
  );

  const redeemVoucher = async () => {
    if (code.length > 0) {
      setError("");
      setRedeeming(true);
      setFetching(true);
      navigate(RoutePath.voucherDetails);
      const { id, secret } = AddressUtil.decodeSharableDigest(code!);
      const benAccount = await accountService.loginEphemeral(secret);

      if (benAccount.data) {
        const voucher = await safeService.get(id);
        const voucherSafe = await safeService.recover(id, "beneficiary");
        const redeemAccount = await wallet.load("polygontestnet", {
          privateKey: voucherSafe.data?.privateKey!,
        });

        setVoucherDetails({
          wallet: wallet,
          amount: utils.formatEther(
            (await redeemAccount.data?.getBalance()!).toString()
          ),
          title: voucher.data?.safeName,
          description: voucher.data?.description,
          expirationTime: voucher.data?.claim.period,
          timeStamp: voucher.data?.timeStamp
        });
      }

      setRedeeming(false);
      setFetching(false);
      navigate(RoutePath.voucherDetails);
    } else {
      setError("Please enter the Voucher Code");
    }
  };

  return (
    <>
      <Modal
        opened={modalActive}
        onClose={() => setModalActive(false)}
        withCloseButton={true}
        className={classes.modalContainer}
        size={500}
      >
        <div style={{ padding: "28px" }}>
          <Title>Redeem Voucher</Title>
          <TextInput
            label="Enter the Voucher Code"
            placeholder="Input Voucher Code"
            mt={20}
            value={code}
            onChange={(e: any) => setCode(e.target.value)}
            error={error}
            required
          />
          <Group position="right" mt={20} spacing="md">
            <Button
              onClick={redeemVoucher}
              loading={redeeming}
              fullWidth
              className={classes.button}
            >
              {" "}
              {redeeming ? "Verifying & Redeeming" : "Verify & Redeem"}{" "}
            </Button>
          </Group>
        </div>
      </Modal>
    </>
  );
};
