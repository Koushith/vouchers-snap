import {
  Group,
  Stack,
  Alert,
  Button,
  Container,
  Center,
  Text,
  Paper,
  Box,
  Badge,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons";
import { BackButton, Image, ProgressStatus, Title } from "../../../components";
import { useStyles } from "./create-voucher.component.styles";
//@ts-ignore
import useVoucherStore from "store/voucher/voucher.store";
import { useClipboard } from "@mantine/hooks";
import { utils } from "ethers";
import { useEffect, useState } from "react";

import {
  EmailShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";

export const VoucherCreationSuccess = () => {
  const [sharableLink, setSharableLink] = useState("");
  const { classes } = useStyles();

  const clipboard = useClipboard({ timeout: 500 });

  const { formData, sharableDigest, accountDetails, setCreateStep } =
    useVoucherStore((state: any) => state);

  const link = `http://${window.location.host}/vouchers/${sharableDigest}`;


  useEffect(() => {
    if (sharableLink !== undefined) {
      setSharableLink(link);
    }
  }, []);

  const formatExpiration = () => {

    return { days: Math.floor(formData.expirationTime / 86400),
      hours: Math.ceil(formData.expirationTime % 86400 / 3600)}
 
  };

  return (
    <>
      <Container className={classes.box}>
        <Paper className={classes.formContainer} withBorder>
          <Group mb={30}>
            <Title>Share the Voucher</Title>
          </Group>
          <Container sx={{ padding: 0, marginBottom: "46px" }}>
            <div className={classes.voucherImage}>
              <Center style={{ height: "100%" }}>
                <Center style={{ flexDirection: "column" }}>
                  <Image src="/images/matic.svg" width={40} />
                  <Text mt={10} weight={600} style={{ color: "white" }}>
                    {formData.title}
                  </Text>
                </Center>
                {Boolean(formData.expirationTime) && <Badge className={classes.badge}>Expires in {Boolean(formatExpiration().days) && `${formatExpiration().days} days `}
                 {formatExpiration().hours && `${formatExpiration().hours} hours` }</Badge>}
              </Center>
            </div>
          </Container>
          <Stack mt={32}>
            <Group
              style={{
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text size="sm">Description</Text>
              <Text size="sm" className={classes.voucherText}>
                {formData.description}
              </Text>
            </Group>

            <Group
              style={{
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text size="sm">Title</Text>
              <Text size="sm" className={classes.voucherText}>
                {formData.title} 🚀
              </Text>
            </Group>

            <Group
              style={{
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text size="sm">Amount</Text>
              <Text size="sm" className={classes.voucherText}>
                {utils.formatEther(accountDetails?.result)}
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

            <Alert variant="light" icon={<IconCheck size={16} />} color="green">
              {" "}
              Share the voucher ID or the link with the recipient
            </Alert>

            <Paper radius="md" p="xl" withBorder>
              <Group position="apart">
                <Box
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <IconCopy
                    size={30}
                    cursor="pointer"
                    color={clipboard.copied ? "teal" : "#626E99"}
                    onClick={() => {
                      clipboard.copy(sharableLink);
                      showNotification({
                        message: "Sharable link has been copied",
                      });
                    }}
                  />
                  <Text size="sm" mt={6}>
                    Copy URL
                  </Text>
                </Box>

                <EmailShareButton
                  url={sharableLink}
                  body="Click here Redeem your Voucher-"
                  subject="Safient Voucher Giveaway"
                >
                  <EmailIcon size={30} round={true} />
                  <Text size="sm">Email</Text>
                </EmailShareButton>

                <WhatsappShareButton
                  title="Click here Redeem your Voucher-"
                  url={sharableLink}
                >
                  <WhatsappIcon size={30} round={true} />
                  <Text size="sm">WhatsApp</Text>
                </WhatsappShareButton>

                <TelegramShareButton
                  title="Click here Redeem your Voucher-"
                  url={sharableLink}
                >
                  <TelegramIcon size={30} round={true} />
                  <Text size="sm">Telegram</Text>
                </TelegramShareButton>
              </Group>
            </Paper>
          </Stack>
        </Paper>

        <Container className={classes.progressbox}>
          <ProgressStatus
            title="Voucher Created Successfully 🎊"
            description="Now you can share this with your beloved ones either by copying the link or just sending them through any messaging medium"
            status={100}
          />
        </Container>
      </Container>
    </>
  );
};
