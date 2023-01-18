import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Text,
  Paper,
  Group,
  Button,
  Checkbox,
  Stack,
  Box,
  Alert,
} from "@mantine/core";

import { useStores } from "store";
import { useServices } from "services";
import { RoutePath } from "navigation";

export function RegisterScreen(props: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registering, setRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();
  const { accountStore } = useStores();
  const { accountService } = useServices();

  const [isTermsChecked, setIsTermsChecked] = useState(false);

  useEffect(() => {
    !accountStore.signer && navigate(RoutePath.login);
  }, []);

  const register = async () => {
    try {
      setRegistering(true);
      const account = await accountService.register(name, email);
      if (account.hasData()) {
        navigate(RoutePath.vouchers);
      } else {
        navigate(RoutePath.vouchers);
        // TODO: ignoring ceramic network error
      }
      if (account.hasError()) {
        const message = account.getErrorMessage();
        setErrorMessage(message);
      }
      setRegistering(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
        <Text size="lg" weight={500}>
          Welcome to Safient Vouchers 👋
        </Text>
        <Box mt="md">
          <Text size="md">
            Looks like you are new here . Please provide these optional info so
            that you get the best experience 🤝
          </Text>
        </Box>

        {errorMessage.length > 0 && (
          <Box mt="md">
            <Text size="md" color="red">
              {errorMessage}
            </Text>
          </Box>
        )}

        <>
          <Stack mt="md">
            <TextInput
              label="Name"
              placeholder="John Doe"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextInput
              label="Email"
              placeholder="hello@safient.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Checkbox
              label="By clicking, you agree to the Terms & Privacy Policy."
              mt="md"
              size="md"
              //@ts-ignore
              checked={isTermsChecked}
              onChange={(event: any) => {
                setIsTermsChecked(event.currentTarget.checked);
              }}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Button
              loading={registering}
              disabled={!isTermsChecked}
              type="submit"
              fullWidth
              onClick={register}
            >
              Lets go 🚀
            </Button>
          </Group>
        </>
      </Paper>
    </Box>
  );
}
