import {
  Alert,
  Badge,
  Button,
  Center,
  Container,
  Group,
  Stack,
  Text,
  Paper,
  Box,
} from "@mantine/core";
import { BackButton, Image, SendModal, Title } from "../../components";
import { IconAlertCircle, IconAlertTriangle } from "@tabler/icons";
import { useStyles } from "./voucher-details.screen.styles";
import useVoucherStore from "store/voucher/voucher.store";
import { useState } from "react";
import { Confetti } from "components/primitives/confetti/confetti.component";
import { VoucherDetailsShimmer } from "./voucher-details.shimmer";

export const VoucherDetailsScreen = () => {
  const { classes } = useStyles();
  const [sendModal, setSendModal] = useState(false);
  const { voucherDetails, fetching } = useVoucherStore((state: any) => state);


  const formatExpiration = () => {

    const presentTime = Date.now()/ 1000;
    
    const expiresOn = ` ${new Date(voucherDetails.timeStamp + voucherDetails.expirationTime * 1000).toLocaleString()} ( ${Intl.DateTimeFormat().resolvedOptions().timeZone})`
    const expirationTime = voucherDetails.timeStamp/ 1000 + voucherDetails.expirationTime - presentTime;

    return { days: Math.floor(expirationTime / 86400),
      hours: Math.ceil(expirationTime % 86400 / 3600), expired: expirationTime <= 0, expiresOn: expiresOn }
 
  };

  return (
    <>
      {fetching ? (
        <VoucherDetailsShimmer />
      ) : (
        <>
          <Confetti />
          <SendModal
            sendModal={sendModal}
            setSendModal={setSendModal}
            value={voucherDetails.amount}
            wallet={voucherDetails.wallet}
          />
          <Paper withBorder className={classes.voucherDetailsContainer}>
            <Container className={classes.formContainer}>
              <Box mt={20}>
                <BackButton label="Go Back" />
              </Box>
              <Container sx={{ padding: 0, marginBottom: "32px" }}>
                <Title text="Voucher Details" />
              </Container>
              <Container sx={{ padding: 0, marginBottom: "32px" }}>
                <div className={classes.voucherImage}>
                  <Center style={{ height: "100%" }}>
                    <Center style={{ flexDirection: "column" }}>
                      <Image src="/images/matic.svg" width={40} />
                      <Text mt={10} weight={600} style={{ color: "white" }}>
                        {voucherDetails.title} 🚀
                      </Text>
                    </Center>
                    
                    {Boolean(voucherDetails.expirationTime && !formatExpiration().expired) && <Badge sx={{ background: formatExpiration().expired ? "red" : ''}} className={classes.badge}>Expires in {Boolean(formatExpiration().days) && `${formatExpiration().days} days `}
                    {formatExpiration().hours && `${formatExpiration().hours} hours` }</Badge>}

                    {Boolean(voucherDetails.expirationTime && formatExpiration().expired) &&<Badge sx={{ background: "red" }} className={classes.badge}>
                      Voucher Expired
                    </Badge>
                    }
                  </Center>
                </div>
              </Container>
              <Container sx={{ padding: 0, marginBottom: "32px" }}>
                <Text size="sm">{voucherDetails.description}</Text>
              </Container>
              <Stack>
                <Group
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Text size="sm">Amount</Text>
                  <Text size="sm" className={classes.voucherText}>
                    {voucherDetails.amount < 0.0001 ? 0 : voucherDetails.amount }
                  </Text>
                </Group>
                <Group
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Text size="sm">Token</Text>
                  <Text size="sm" className={classes.voucherText}>
                    MATIC
                  </Text>
                </Group>

                {Boolean(voucherDetails.expirationTime) && <Group
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Text size="sm">Expires On</Text>
                  <Text size="sm" className={classes.voucherText}>
                    { formatExpiration().expiresOn }
                  </Text>
                </Group>
                }
                { voucherDetails.amount < 0.0001 &&
                <Alert
                  variant="light"
                  icon={<IconAlertCircle size={16} />}
                  color="green"
                >
                  {" "}
                  You have already claimed this voucher
                </Alert>
                }
                { Boolean((!voucherDetails.expirationTime || !formatExpiration().expired) && voucherDetails.amount > 0.0001) && <Group className={classes.btnContainer} noWrap>
                  <Button
                    className={classes.ghostButton}
                    variant="outline"
                    onClick={() => setSendModal(!sendModal)}
                  >
                    Claim
                  </Button>
                  <Button className={classes.button}>
                    Export to Safient Wallet (Soon)
                  </Button>
                </Group>
                }
                { Boolean(voucherDetails.expirationTime && formatExpiration().expired) && <Alert
                  variant="filled"
                  icon={<IconAlertTriangle size={16} />}
                  color="red"
                >
                  {" "}
                  This voucher has expired
                </Alert>
                }
              </Stack>
            </Container>
          </Paper>
        </>
      )}
    </>
  );
};
