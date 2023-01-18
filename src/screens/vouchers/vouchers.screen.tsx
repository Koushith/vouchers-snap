import { Button, Center, Container, Stack } from "@mantine/core";
import { useState } from "react";
import { GenericCard, Image, Title, VoucherCard } from "../../components";
import { RedeemModal } from "../../components/redeem-modal/redeem-modal.component";
import { useStyles } from "./vouchers.screen.styles";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { RoutePath } from "navigation";
import { useStores } from "store";
//@ts-ignore
import EmptyState from "../../assets/images/empty.svg";
import useVoucherStore from "store/voucher/voucher.store";
import { useServices } from "services";
import { Wallet } from "utils";
import { utils } from "ethers";

export const VouchersScreen = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  let { code } = useParams();
  const wallet = new Wallet();
  const { safeService } = useServices();
  const { accountStore } = useStores();
  const { setFetching, setVoucherDetails } = useVoucherStore(
    (state: any) => state
  );

  const [modalActive, setModalActive] = useState(code ? true : false);

  const voucherCardHandler = async (safeId: any) => {
    setFetching(true);
    // todo- add a check for creator and ben
    navigate(RoutePath.voucherDetails);
    const voucher = await safeService.get(safeId);
    const voucherSafe = await safeService.recover(safeId, "creator");
    const redeemAccount = await wallet.load("polygontestnet", {
      privateKey: voucherSafe.data?.privateKey!,
    });
    if (voucher !== undefined) {
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
      setFetching(false);
      navigate(RoutePath.voucherDetails);
    }
  };

  return (
    <Container>
      <RedeemModal
        modalActive={modalActive}
        setModalActive={setModalActive}
        title="Redeem Voucher"
      />
      <Container className={classes.voucherScreenContainer}>
        <Container sx={{ padding: 0, marginTop: "42px" }}>
          <Title text="Create or Redeem a Voucher" />
        </Container>
        <div className={classes.actionsContainer}>
          <GenericCard
            title="Create"
            name="add"
            onClick={() => {
              navigate(RoutePath.createVoucher);
            }}
          />
          <GenericCard
            title="Redeem"
            name="redeem"
            onClick={() => setModalActive(true)}
          />
        </div>

        <Title text="My Vouchers" />

        <div className={classes.vouchersContainer}>
          {!accountStore._safientUser?.safes.length && (
            <Container>
              <Center>
                <Stack>
                  <Image src={EmptyState} mt={"lg"} />
                  {!accountStore.userSignedIn && <Button
                    className={classes.button}
                    mt={"lg"}
                    onClick={() => navigate(RoutePath.login)}
                  >
                    Login to see your vouchers
                  </Button>}
                </Stack>
              </Center>
            </Container>
          )}

          {accountStore?.safientUser?.safes.map((v) => (
            <div key={v.safeId}>
              <VoucherCard
                title={v.safeName}
                onClick={() => voucherCardHandler(v.safeId)}
              />
            </div>
          ))}
        </div>
      </Container>
    </Container>
  );
};
