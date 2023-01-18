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

  const [chain, setChain] = useState<string | null>("mumbai");
  const [voucherTitle, setVoucherTitle] = useState<string>();

  const [voucherDesc, setVoucherDesc] = useState<string>();
  const [creating, setCreating] = useState(false);

  const [date, setDate] = useState<null | Date>();
  const [expirationTime, setExpirationTime] = useState<number>(0);

  const navigate = useNavigate();

  const { setCreateStep, setFormData, formData } = useVoucherStore((state: any) => state);

  const createVoucher = async () => {
    setCreating(true);
    const wallet = await walletService.load();
    setFormData({
      title: voucherTitle,
      description: voucherDesc,
      privateKey: formData.privateKey ? formData.privateKey : wallet.data?.privateKey,
      address: formData.address ? formData.address : wallet.data?.address,
      chain: chain,
      expirationTime: expirationTime
    });

    setCreating(false);
    setCreateStep(2);
  };


  const setExpiration = (date: Date) => {
    setDate(date);
    const presentTime = Date.now() / 1000;
    const futureTime = dayjs(date).valueOf() / 1000;
    const timeDifference = futureTime - presentTime;
    setExpirationTime(Math.floor(timeDifference));
  };

  const backButtonHandler = () => {
    navigate(-1);
  };

  interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: string;
    label: string;
    description: string;
  }

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, description, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />
  
          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" >
              {description}
            </Text>
          </div>
        </Group>
      </div>
    )
  );
  

  return (
    <Container className={classes.box}>
      <Paper className={classes.formContainer} withBorder>
        <BackButton label="Back to Home" onClick={backButtonHandler} />
        <Group mb={30}>
          <Title>Create a New Voucher</Title>
        </Group>
        <Stack justify="flex-start">
          <Select
            label="Select Currency"
            placeholder="Select Currency"
            itemComponent={SelectItem}
            value={chain}
            data={[
              { value: "mumbai", label: "MATIC (Testnet)", image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/matic.svg' },
              { value: "eth", label: "ETH", image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/eth.svg', description: 'ETH on Ethereum chain (Adding soon)', disabled: true },
              { value: "bsc", label: "BNB", image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/bnb.svg', description: 'BNB on BSC chain (Adding soon)',  disabled: true  },
              { value: "avalanche", label: "AVAX", image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/avax.svg', description: 'AVAX on Avalanche C-Chain (Adding soon)', disabled: true},
              { value: "matic", label: "MATIC (Mainnet)", image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/matic.svg', description: 'Matic on Polygon chain (Adding soon)', disabled: true},
            ]}
            onChange={setChain}
          />

          <TextInput
            type="text"
            placeholder="Voucher Title"
            label="Voucher Title (Optional)"
            rightSectionWidth={92}
            onChange={(event) => {
              setVoucherTitle(event.target.value);
            }}
          />

          <Textarea
            placeholder="Voucher Description"
            label="Voucher Description (Optional)"
            rightSectionWidth={92}
            onChange={(event) => {
              setVoucherDesc(event.target.value);
            }}
          />

          <DatePicker
            placeholder="Pick date"
            label="Voucher Expiry (Optional)"
            onChange={setExpiration}
          />

          <Button
            loading={creating}
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
          title="Enter Voucher Details"
          description="Provide the basic details before we create a voucher for you ✍️. You can also set the expiry date for the voucher here"
          status={20}
        />
      </Container>
    </Container>
  );
};
