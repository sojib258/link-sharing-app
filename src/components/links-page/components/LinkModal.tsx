/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BgButton,
  LinkInput,
  SimpleTextInput,
  TextNormal,
} from "@/components/utils";
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
  refetch: () => void;
};

const LinkModal: FC<LinkModalProps> = ({ children, refetch }) => {
  const { userId, token } = useSelector((state: RootState) => state?.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement>(null);
  const [priority, setPriority] = useState(10);
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

  const handleUpdatePriority = (value: string) => {
    setPriority(parseInt(value));
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
        const response = axios.post(
          `${URL}/dev-links`,
          {
            data: {
              users_permissions_users: userId,
              platform: updatedPlatform?.id,
              url: url,
              priority: priority,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const capitalizedStr =
          platform.charAt(0).toUpperCase() + platform.slice(1);
        toast.promise(response, {
          success: {
            title: `${capitalizedStr} Link Addedd Successfull`,
            description: "It's Awesome!",
          },
          error: { title: "Promise rejected", description: "Something wrong" },
          loading: { title: "Promise pending", description: "Please wait" },
        });

        const responseData = await response;
        console.log("ResponseData", responseData);
        platFormReset();
        refetch();
      } else {
        console.log("Else Case");
        setError(`Invalid url for ${platform}, ${url}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const isDisabled = !updatedPlatform?.platform || !url;

  return (
    <>
      <Flex my="2rem" ref={btnRef} onClick={onOpen}>
        {children}
      </Flex>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={platFormReset}>
        <ModalOverlay />

        <ModalContent maxW="500px" p="2rem 3rem">
          <ModalCloseButton onClick={platFormReset} />
          <Box w="full" position="relative">
            <TextNormal mb="1.5rem" fontWeight="600" fontSize="1.5rem">
              Add your link
            </TextNormal>

            <Box mb="12px">
              <TextNormal fontSize=".75rem" mb="4px">
                Platform
              </TextNormal>
              <SelectBox
                handleUpdatePlatform={handleUpdatePlatform}
                // defaultValue={updatedPlatform} // Use updatedPlatform for the value
              />
            </Box>
            <Box mb="12px">
              <TextNormal fontSize=".75rem" mb="4px">
                Link
              </TextNormal>
              <LinkInput handleUpdateUrl={handleUpdateUrl} value={url} />
              {error && <ErrorMsg mt={"4px"} error={error} />}
            </Box>

            <Box mb="12px">
              <SimpleTextInput
                name={"priority"}
                type={"number"}
                value={priority}
                handleChange={handleUpdatePriority}
                label={"Priority:"}
                placeholder={10}
                alignItems="flex-start"
                flexDir="column"
                labelStyle={{ fontSize: ".75rem", mb: "4px", color: "#322e2a" }}
              />
            </Box>
          </Box>
          <Flex
            mt="12px"
            gap={2}
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <BgButton
              h="16px"
              p="18px 14px"
              fontSize=".875rem"
              w="100px"
              bg={colors?.primary}
              onClick={handleLinkCreate}
              disabled={isDisabled}
            >
              Create
            </BgButton>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LinkModal;
