import { forwardRef, useState } from "react";
import {
  Container,
  Group,
  Stack,
  Select,
  Button,
  Text,
  Textarea,
  TextInput,
  Paper,
  Avatar,
  Alert,
  Switch,
  Box,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import useVoucherStore from "store/voucher/voucher.store";
import { useStyles } from "./create-voucher.component.styles";
import { DatePicker } from "@mantine/dates";
import { useServices } from "services";
import { BackButton, ProgressStatus, Title } from "../../../components";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export const CreateVoucherForm = () => {
  const { classes } = useStyles();
  const { walletService } = useServices();
  const navigate = useNavigate();

  const [walletName, setWalletName] = useState("");
  const [walletDescription, setWalletDescription] = useState("");

  const [signalingPeriod, setSignalingPeriod] = useState(300);
  const [walletBeneficiary, setWalletBeneficiary] = useState("");

  const [claimType, setClaimType] = useState(0);
  const [DdayTime, setDdayTime] = useState(0);

  const [date, setDate] = useState(null);
  const [isTopupToggleChecked, setIsTopupToggleChecked] = useState(false);

  const [topupValue, setTopupValue] = useState<any>("");

  const [selectWallet, setSelectWallet] = useState([]);
  const [options, setOptions] = useState(selectWallet);

  const [seedPhrase, setSeedPhrase] = useState<any>("");
  const [balanceLoader, setBalanceLoader] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [validator, setValidator] = useState(false);

  const [advancedOptions, setAdvancedOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setCreateStep, setFormData, formData } = useVoucherStore(
    (state: any) => state
  );

  const createVoucher = async () => {
    // setCreating(true);
    // const wallet = await walletService.load();
    // setFormData({
    //   title: voucherTitle,
    //   description: voucherDesc,
    //   privateKey: formData.privateKey
    //     ? formData.privateKey
    //     : wallet.data?.privateKey,
    //   address: formData.address ? formData.address : wallet.data?.address,
    //   chain: chain,
    //   expirationTime: expirationTime,
    // });
    // setCreating(false);
    // setCreateStep(2);
  };

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <Container className={classes.box}>
      <Paper className={classes.formContainer} withBorder>
        <BackButton label="Back to Home" onClick={backButtonHandler} />
        <Group mb={30}>
          <Title>Create a New Wallet</Title>
        </Group>
        <Stack justify="flex-start">
          <TextInput
            type="text"
            placeholder="Enter Wallet Name"
            label="Waller Name"
            rightSectionWidth={92}
            onChange={(event) => {
              setWalletName(event.target.value);
            }}
          />

          <Textarea
            placeholder="Wallet Description"
            label="Wallet Description (Optional)"
            rightSectionWidth={92}
            onChange={(event) => {
              setWalletDescription(event.target.value);
            }}
          />

          <TextInput
            type="email"
            placeholder="Enter Beneficiary email or DID"
            label="Beneficiary Email or DID (Optional)"
            rightSectionWidth={92}
            onChange={(event) => {
              setWalletBeneficiary(event.target.value);
            }}
          />

          {/* advanced */}

          <Group sx={{ justifyContent: "space-between" }}>
            <Text size="lg" weight={600}>
              Add a Cliam type
            </Text>{" "}
            <Switch
              checked={advancedOptions}
              onChange={() => setAdvancedOptions(!advancedOptions)}
            />
          </Group>

          {advancedOptions && (
            <>
              <Select
                label="Select Claim Type"
                placeholder="Select Cliam Type"
                // itemComponent={SelectItem}
                // value={chain}
                data={[
                  {
                    value: "Signalling",
                    label: "Signalling (You can send the signal when claimed)",
                  },
                  {
                    value: "Arbitration",
                    label: "Arbitration (Arbitrators decide the claim)",
                  },
                  {
                    value: "DDAY",
                    label: "DDAY (Claim on exact date)",
                  },
                ]}
                // onChange={setChain}
              />
              {/* render feilds based on selected values */}
              <DatePicker
                placeholder="Select DDAY date"
                label="Select DDay Date 
"
              />
            </>
          )}

          {/* topup  */}

          <Group sx={{ justifyContent: "space-between" }}>
            <Text size="lg" weight={600}>
              Topup the wallet
            </Text>{" "}
            <Switch
              checked={isTopupToggleChecked}
              onChange={(e) => {
                setIsTopupToggleChecked(!isTopupToggleChecked);
              }}
            />
          </Group>

          {isTopupToggleChecked && (
            <>
              <Select
                label="Select the wallet"
                placeholder="Select the Wallet"
                // itemComponent={SelectItem}
                // value={chain}
                data={[
                  {
                    value: "wallet 1",
                    label: "wallet 1",
                  },
                ]}
                // onChange={setChain}
              />

              {balanceLoader ? (
                <Text>Loading Wallet Balance...</Text>
              ) : (
                <Text>Wallet's Balance is {`1ETH`}</Text>
              )}

              <TextInput
                type="text"
                placeholder="Enter Topup value"
                label="Enter Top up Value"
                rightSectionWidth={92}
                onChange={(event) => {
                  setTopupValue(event.target.value);
                }}
              />
            </>
          )}

          <Alert>
            This will create a wallet using signaling method with 300 sec
            signaling period. Click on "Add a Claim Type" to update
          </Alert>

          <Button
            loading={loading}
            className={classes.button}
            onClick={() => {
              createVoucher();
            }}
          >
            Create
          </Button>
        </Stack>
      </Paper>

      <Container className={classes.progressbox}>
        <ProgressStatus
          title="Progress"
          description="Provide the basic details before we create a wallet for you ✍️."
          // update the status according to the progress
          status={20}
        />
      </Container>
    </Container>
  );
};
