import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function InstanceModal(props) {
  const { show, hide, modalName, content } = props;
  return (
    <Modal isOpen={show} onClose={hide}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalName ? modalName : "Tên Modal"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{content ? content : "content"}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default InstanceModal;
