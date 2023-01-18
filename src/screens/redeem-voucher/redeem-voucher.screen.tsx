import {
  Box,
  Button,
  Center,
  createStyles,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import { utils } from "ethers";
import { RoutePath } from "navigation";
import { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import { useServices } from "services";
import useVoucherStore from "store/voucher/voucher.store";
import { VoucherDetailsShimmer } from "../voucher-details/voucher-details.shimmer";

//@ts-ignore
import Success from "../../assets/icons/success.svg";

import { Wallet, AddressUtil } from "utils";
import { Container, Image } from "components";

export const useStyles = createStyles((theme) => ({
  modalContainer: {
    size: "588px !important",
  },
  voucherDetailsContainer: {
    borderRadius: "8px",
    width: "591px",
    margin: "100px auto 0 auto",
    minWidth: "591px",
    padding: "42px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
      minWidth: "100%",
    },
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
    fill: "#099268",
    width: "60px",
    height: "60px",
  },
  successText: {
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#099268",
    textAlign: "center",
    marginTop: "30px",
  },
  button: {
    color: "#fff !important",
    background:
      "linear-gradient(89.58deg, #44BCF0 -19.85%, #818CF8 54.07%, #A099FF 120.75%)",
  },
}));

export const RedeemVoucherScreen = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  const [loading, setLoading] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const [benAccount, setBenAccount]: any = useState();

  const wallet = new Wallet();
  const { safeService, accountService } = useServices();
  let { code } = useParams();


  const { voucherDetails, setVoucherDetails } = useVoucherStore(
    (state: any) => state
  );


  const loadVoucher = async () => {

    setLoading(true);

    const { id, secret } = AddressUtil.decodeSharableDigest(code!);
    const benA = await accountService.loginEphemeral(secret)
    setBenAccount(benA);
    setLoading(false);

  }


  const redeemVoucher = async () => {
    setRedeeming(true);

    const { id, secret } = AddressUtil.decodeSharableDigest(code!);
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
    navigate(RoutePath.voucherDetails);
  };

  useEffect(() => {
    loadVoucher();

  }

  , [])

  return (
    <>
      {loading && <VoucherDetailsShimmer/>}
      {!loading &&<Paper withBorder className={classes.voucherDetailsContainer}>
        <Center>
          <Image src={Success} className={classes.SuccessIcon} />
        </Center>
        <Text className={classes.successText}>
          You have a new voucher to redeem 🎉
        </Text>
        <Box mt={60} sx={{ maxWidth: "350px", margin: "0 auto" }}>
          <Box className={classes.listContainer}>
            <li className={classes.listHeading}>Title</li>
            <Box sx={{ filter: "blur(6px)" }}>
              <li className={classes.listValue}>Doge To the Moon</li>
            </Box>
          </Box>
          <Box className={classes.listContainer}>
            <li className={classes.listHeading}>Amount</li>
            <Box sx={{ filter: "blur(6px)" }}>
              <li className={classes.listValue}>$30</li>
            </Box>
          </Box>
          <Box className={classes.listContainer}>
            <li className={classes.listHeading}>Token</li>
            <Box sx={{ filter: "blur(6px)" }}>
              <li className={classes.listValue}>Doge</li>
            </Box>
          </Box>

          <Group position="right" mt={40} spacing="md">
            <Button
              loading={redeeming}
              onClick={redeemVoucher}
              fullWidth
              className={classes.button}
            >
              {redeeming ? "Redeeming" : "Redeem"}{" "}
            </Button>
          </Group>
        </Box>
      </Paper>
      }
    </>
  );
};
