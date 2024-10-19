import { BgButton, LinkInput, TextNormal } from "@/components/utils";
import { colors } from "@/lib";
import { LinkCartTypes } from "@/lib/types/platformCartType";
import {
  Box,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, ReactNode, useRef, useState } from "react";
import SelectBox from "./SelectBox";

type LinkModalProps = {
  children: ReactNode;
  data: any;
};

const LinkModal: FC<LinkModalProps> = ({ children, data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement>(null);
  const [updatedPlatform, setUpdatedPlatform] =
    useState<LinkCartTypes["platform"]>();
  const [url, setUrl] = useState("");

  const handleUpdatePlatform = (newPlatform: LinkCartTypes) => {
    setUpdatedPlatform(newPlatform?.platform);
  };

  const handleUpdateUrl = (value: string) => {
    setUrl(value);
  };

  const handleLinkCreate = () => {};

  console.log("Platform", updatedPlatform);
  console.log("URL", url);

  return (
    <>
      <Flex ref={btnRef} onClick={onOpen}>
        {children}
      </Flex>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent maxW="500px" p="2rem 3rem">
          <ModalCloseButton />
          <Box w="full" position="relative">
            <TextNormal mb="1.5rem" fontWeight="600" fontSize="1.5rem">
              Add you link
            </TextNormal>

            <TextNormal fontSize=".75rem" mb="4px">
              Platform
            </TextNormal>
            <Box mb="12px">
              <SelectBox
                handleUpdatePlatform={handleUpdatePlatform}
                defaultValue={updatedPlatform} // Use updatedPlatform for the value
              />
            </Box>
            <TextNormal fontSize=".75rem" mb="4px">
              Link
            </TextNormal>
            <LinkInput handleUpdateUrl={handleUpdateUrl} value={url} />
          </Box>
          <Box mt="2rem">
            <Flex gap={2} justifyContent="flex-end" alignItems="flex-end">
              <BgButton
                h="10px"
                p="16px 14px"
                fontSize=".775rem"
                w="60px"
                bg={colors?.primary}
                onClick={handleLinkCreate}
              >
                Create
              </BgButton>
            </Flex>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LinkModal;
