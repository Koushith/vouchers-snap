import { useEffect, useState } from "react";
import { useClipboard } from "@mantine/hooks";
import { IconCopy, IconCheck, IconAlertCircle } from "@tabler/icons";
import QRCode from "react-qr-code";
import {
  Container,
  Group,
  Stack,
  Button,
  Box,
  Notification,
  Paper,
  TextInput,
  Modal,
  Loader,
  Text as ProgressText,
  Alert,
} from "@mantine/core";
import { utils } from "ethers";
import { BackButton, ProgressStatus, Title } from "../../../components";
import { useStyles } from "./create-voucher.component.styles";
import { showNotification } from "@mantine/notifications";
import useVoucherStore from "store/voucher/voucher.store";
import { loadBalance } from "services/voucher/voucher.service.impl";

import { Wallet, AddressUtil } from "utils";
import { useServices } from "services";
import { useNavigate } from "react-router-dom";
import { Enums } from "@safient/core";

export const TransferFund = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const [progressMessage, setProgressMessage] = useState("");

  const [balance, setBalance] = useState(0);
  const [isTransferSuccess, setIstransferSuccess] = useState(false);
  const [creating, setCreating] = useState(false);
  const { accountService, safeService } = useServices();
  const {
    accountDetails,
    setAccountDetails,
    formData,
    setSharableDigest,
    setCreateStep,
  } = useVoucherStore((state: any) => state);
  const wallet = new Wallet();


  const createVoucher = async () => {
    setCreating(true);

    setProgressMessage("Creating your Voucher...");

    const benPrivate = wallet.generatePrivate();
    const benAccount = await accountService.registerEphemeral(
      "",
      "",
      benPrivate
    );

    setProgressMessage("Almost there... Please sign the message on your wallet if prompted");

    if (benAccount.data) {
      const voucherSafe = await safeService.create(
        formData.title,
        formData.description,
        benAccount.data.did!,
        formData.privateKey,
        formData.expirationTime ? Enums.ClaimType.ExpirationBased : null,
        formData.expirationTime,
        false
      );

      setProgressMessage("Hang on, you are one step closer...");

      const sharableDigest = AddressUtil.encodeSharableDigest(
        benPrivate,
        voucherSafe.data?.id!
      );
      setSharableDigest(sharableDigest);
    }
    setProgressMessage("Hang on, you are one step closer...");
    setCreating(false);
    setCreateStep(3);
  };

  const clipboard = useClipboard({ timeout: 500 });

  useEffect(() => {
    const timer = setInterval(async () => {
      const bal = await loadBalance(formData?.address);

      setAccountDetails(bal);

      if (bal?.result > 0) {
        setIstransferSuccess(true);
        setBalance(bal?.result);
      }
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [accountDetails]);

  const backButtonHandler = () => {
    setCreateStep(1);
  };

  return (
    <>
      {" "}
      <Modal
        centered
        opened={creating}
        onClose={() => !creating}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        withCloseButton={false}
        overlayOpacity={0.5}
        size={320}
      >
        <Box sx={{ padding: "20px" }}>
          <Group>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Loader />
              <ProgressText mt={"lg"}>{progressMessage}</ProgressText>
            </Container>
          </Group>
        </Box>
      </Modal>
      <Container className={classes.box}>
        <Paper className={classes.formContainer} withBorder>
          <BackButton label="Back to Previous" onClick={backButtonHandler} />
          <Group mb={30}>
            <Title>Transfer Fund</Title>
          </Group>
          <Stack align={"center"}>
            <QRCode
              value={formData?.address ? formData?.address : ""}
              level="L"
              size={200}
            />
          </Stack>
          <Box mt={73}>
            {!isTransferSuccess && (
              <Notification
                sx={{ width: "100%", boxShadow: "none" }}
                loading={!isTransferSuccess}
                disallowClose
              >
                Waiting to receive funds for your voucher ...
              </Notification>
            )}
            {isTransferSuccess && (
              <Notification
                icon={<IconCheck size={20} />}
                color="green"
                sx={{ width: "100%", boxShadow: "none" }}
                disallowClose
              >
                {utils.formatEther(balance)} Matic Token received
              </Notification>
            )}
          </Box>

          <TextInput
            label="Address"
            width={"100%"}
            value={formData?.address}
            placeholder={formData?.address}
            mt={40}
            mb={20}
            rightSection={
              <IconCopy
                size={18}
                cursor="pointer"
                style={{ stroke: "#495057" }}
                color={clipboard.copied ? "teal" : "#eee"}
                onClick={() => {
                  clipboard.copy(formData?.address);
                  showNotification({
                    message: "Wallet Address has been copied",
                  });
                }}
              />
            }
          />

        <Alert
            variant="light"
            icon={<IconAlertCircle size={20} />}
            color="blue"
          >
            Make sure to transfer the token/ currency only on Polygon Testnet.
          </Alert>

          <Button
           mt={20}
           mb={20}
            className={classes.button}
            loading={creating}
            disabled={!isTransferSuccess}
            onClick={() => {
              createVoucher();
            }}
          >
            {creating ? "Creating Voucher" : "Create"}
          </Button>
        </Paper>

        <Container className={classes.progressbox}>
          <ProgressStatus
            title="Transfer Crypto"
            description="Scan the QR Code with your mobile app or copy the adress and transfer the desired amoutn of token/ currency that you selected earlier"
            status={isTransferSuccess ? 60 : 40}
          />
        </Container>
      </Container>
    </>
  );
};
