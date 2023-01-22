import { Button, Center, Stack, Text } from "@mantine/core";
import { IconLockAccessOff } from "@tabler/icons";

export const LockedWallet = () => {
  return (
    <Center mt={40}>
      <Stack>
        <Center>
          <IconLockAccessOff size={60} />
        </Center>
        <Text mt={20}>Wallet is not yet Accessible</Text>
        <Button mt={10}>Claim</Button>
      </Stack>
    </Center>
  );
};
