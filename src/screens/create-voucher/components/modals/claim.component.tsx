import { useState } from "react";
import { Modal, Button, Group, Text, Center } from "@mantine/core";
import { IconNote } from "@tabler/icons";

export const ClaimModal = () => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      {" "}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        padding={40}
      >
        <Center>
          <IconNote size={60} />
        </Center>
        <Text align="center" mt={40}>
          This action will initiate the wallet claim by paying the claim fee.
          Are you sure about this
        </Text>

        <Group
          mt={20}
          sx={{
            width: "100%",

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </Group>
      </Modal>
      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
};
