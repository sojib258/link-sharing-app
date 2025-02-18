import { BgButton, LinkInput, TextNormal } from "@/components/utils";
import { colors } from "@/lib";
import { URL } from "@/lib/config/constants";
import { LinkCartTypes } from "@/lib/types/platformCartType";
import { RootState } from "@/store";
import {
  Box,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FC, ReactNode, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ErrorMsg from "./ErrorMsg";
import SelectBox from "./SelectBox";

type LinkModalProps = {
  children: ReactNode;
  data: any;
};

const LinkModal: FC<LinkModalProps> = ({ children, data }) => {
  const { userId, token } = useSelector((state: RootState) => state?.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const [updatedPlatform, setUpdatedPlatform] = useState<{
    id: number | null;
    platform: string;
    urlPattern: string;
  }>({
    id: null,
    platform: "",
    urlPattern: "",
  });

  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleUpdatePlatform = (newPlatform: LinkCartTypes["platform"]) => {
    setError("");
    setUpdatedPlatform({
      id: newPlatform?.id,
      platform: newPlatform?.platform,
      urlPattern: newPlatform?.urlPattern,
    });
  };

  const handleUpdateUrl = (value: string) => {
    if (!updatedPlatform?.platform) {
      setError("Please select platform first");
      return;
    }
    setUrl(value);
  };

  const platFormReset = () => {
    setUpdatedPlatform({
      id: null,
      platform: "",
      urlPattern: "",
    });
    setUrl("");
    setError("");
    onClose();
  };

  const handleLinkCreate = async () => {
    try {
      const { platform, urlPattern } = updatedPlatform;
      const regex = new RegExp(urlPattern);
      if (regex.test(url)) {
        setError("");
        const response = axios.post(`${URL}/dev-links`, {
          data: {
            users_permissions_users: userId,
            platform: updatedPlatform?.id,
            url: url,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let capitalizedStr =
          platform.charAt(0).toUpperCase() + platform.slice(1);
        toast.promise(response, {
          success: {
            title: `${capitalizedStr} Created Success`,
            description: "Looks great",
          },
          error: { title: "Promise rejected", description: "Something wrong" },
          loading: { title: "Promise pending", description: "Please wait" },
        });

        const responseData = await response;
        console.log("Succesfully Created");
        console.log("ResponseData", responseData);
      } else {
        setError(`Invalid url for ${platform}, ${url}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Flex ref={btnRef} onClick={onOpen}>
        {children}
      </Flex>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={platFormReset}>
        <ModalOverlay />

        <ModalContent maxW="500px" p="2rem 3rem">
          <ModalCloseButton onClick={platFormReset} />
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
                // defaultValue={updatedPlatform} // Use updatedPlatform for the value
              />
            </Box>
            <TextNormal fontSize=".75rem" mb="4px">
              Link
            </TextNormal>
            <LinkInput handleUpdateUrl={handleUpdateUrl} value={url} />
          </Box>
          <Box mt="2rem">
            {error && <ErrorMsg error={error} />}
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
