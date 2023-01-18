import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Stack,
  Box,
  Notification,
  Alert,
  Modal,
  Center,
  Loader,
  Container,
} from "@mantine/core";
import { GoogleButton, MetaMaskButton } from "../../components";
import { OAuthProvider } from "@magic-ext/oauth";

import { useServices } from "services";
import { useStores } from "store";
import { Errors } from "utils";
import { RoutePath } from "navigation";
import { StyledSpan } from "./auth.screen.styles";

export function LoginScreen(props: any) {
  let navigate = useNavigate();
  const { accountService, magiclinkService, safeService } = useServices();
  const { accountStore } = useStores();

  const [signingIn, setSigningIn] = useState(false);
  const [loginType, setLoginType] = useState("wallet");

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailLogin = async () => {
    try {
      setLoginType("email");
      setSigningIn(true);
      const res = await magiclinkService.loginWithEmail(email);
      setSigningIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSocialLogin = async (provider: OAuthProvider) => {
    try {
      setLoginType("social");
      setSigningIn(true);
      const res = await magiclinkService.loginWithSocial(provider);
    } catch (e) {
      console.log(e);
    }
  };

  const handleWalletLogin = async () => {
    try {
      setLoginType("wallet");
      setSigningIn(true);
      const account = await accountService.login(true);
      if (account.hasData()) {
        navigate(RoutePath.vouchers);
      } else {
        accountStore.setError(
          account.getErrorMessage(),
          account.getErrorCode()
        );
        account.getErrorCode() === Errors.UserNotFound.code &&
          navigate(RoutePath.register);
      }
      if (account.hasError()) {
        setErrorMessage(
          "Something went wrong while Signing In. Please try again."
        );
      }

      setSigningIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal
        centered
        opened={signingIn}
        onClose={() => !signingIn}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        withCloseButton={false}
        overlayOpacity={0.5}
        size={320}
      >
        <Box radius="md" sx={{ padding: "20px" }} {...props}>
          <Group>
            <Container
              sx={{
                display: "flex",
                alignItem: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Loader />
            </Container>
            <Text sx={{ textAlign: "center" }}>
              {" "}
              Please sign the message on Wallet if prompted. This may take a
              couple of seconds ...
            </Text>
          </Group>
        </Box>
      </Modal>

      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          padding: "10px",
        })}
      >
        <Paper radius="md" p="xl" sx={{ width: "500px" }} withBorder {...props}>
          <Text size="lg" weight={900}>
            Welcome to Safient Vouchers 👋
          </Text>

          {errorMessage.length > 0 && (
            <Box mt="md">
              <Text size="md" color="red">
                {errorMessage}
              </Text>
            </Box>
          )}

          <Stack mt="md">
            <TextInput
              size="sm"
              label="Enter your email address*"
              placeholder="hello@safient.io"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Button
              type="submit"
              fullWidth
              style={{
                background:
                  "linear-gradient(89.58deg, #44BCF0 -19.85%, #818CF8 54.07%, #A099FF 120.75%)",
              }}
            >
              Login
            </Button>
          </Group>

          <Divider label="OR" labelPosition="center" my="lg" />

          <Group grow mb="md" mt="md">
            <GoogleButton
              loading={signingIn && loginType === "social"}
              radius="md"
              onClick={() => {
                handleSocialLogin("google");
              }}
            >
              {" "}
              Google{" "}
            </GoogleButton>
            <MetaMaskButton
              loading={signingIn && loginType === "wallet"}
              radius="md"
              onClick={handleWalletLogin}
            >
              {" "}
              MetaMask{" "}
            </MetaMaskButton>
          </Group>
          <Text size="sm" align="center">
            By logging in, you are agreeing to the{" "}
            <StyledSpan
              onClick={() =>
                window.open(
                  "https://resources.safient.io/legal/terms",
                  "_blank"
                )
              }
            >
              Terms of Service{" "}
            </StyledSpan>{" "}
            and{" "}
            <StyledSpan
              onClick={() =>
                window.open(
                  "https://resources.safient.io/legal/privacy",
                  "_blank"
                )
              }
            >
              Privacy policy
            </StyledSpan>
            .
          </Text>
        </Paper>
      </Box>
    </>
  );
}
