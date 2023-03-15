import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();

export default function showToast(status, message) {
  toast({
    title: message,
    status: status,
    position: "top-right",
    duration: 5000,
    isClosable: true,
  });
}
