import {
  FlexBox,
  Icon,
  LinkInput,
  SimpleTextInput as PriorityInput,
  TextButton,
  TextNormal,
} from "@/components";
import { URL } from "@/lib/config/constants";
import { LinkCartTypes } from "@/lib/types/platformCartType";
import { RootState } from "@/store";
import { Box, BoxProps, Center, Flex, Grid, useToast } from "@chakra-ui/react";
import axios from "axios";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import SelectBox from "./SelectBox";

type LinkCartProps = BoxProps & {
  link: string;
  index: number;
  platform: LinkCartTypes["platform"];
  documentId: string;
  priority?: number;
  refetch: () => void;
  handleLinkUpdate: (
    platform: LinkCartTypes["platform"],
    url: string,
    priority?: number
  ) => void;
  hasError: boolean;
};

const LinkCart: FC<LinkCartProps> = ({
  link,
  index,
  platform,
  documentId,
  priority,
  refetch,
  handleLinkUpdate,
  hasError,
  ...props
}) => {
  const { token } = useSelector((state: RootState) => state?.auth);
  const [updatedPlatform, setUpdatedPlatform] = useState(platform);
  const [updatedUrl, setUpdatedUrl] = useState(link);
  const toast = useToast();
  const [updatedPriority, setUpdatedPriority] = useState(priority);

  const handleUpdatePlatform = (newPlatform: LinkCartTypes["platform"]) => {
    setUpdatedPlatform(newPlatform);
    handleLinkUpdate(newPlatform, updatedUrl, updatedPriority); // Pass the new platform and the current URL
  };

  const handlePriorityChange = (value: string) => {
    setUpdatedPriority(parseInt(value));
    handleLinkUpdate(updatedPlatform, updatedUrl, parseInt(value));
  };

  const handleUpdateUrl = (url: string) => {
    setUpdatedUrl(url);
    handleLinkUpdate(updatedPlatform, url, updatedPriority); // Pass the current platform and the updated URL
  };

  const handleDeleteLink = async () => {
    try {
      const response = axios.delete(`${URL}/dev-links/${documentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.promise(response, {
        success: {
          title: `${platform?.label} Deleted Successfully`,
          description: "It's Awesome!",
        },
        error: { title: "Promise rejected", description: "Something wrong" },
        loading: { title: "Promise pending", description: "Please wait" },
      });

      const responseData = await response;
      console.log("ResponseData", responseData);
      // platFormReset();
      refetch();
    } catch (error) {}
  };

  return (
    <Box
      bg={"#f0f0f0"}
      px="16px"
      py="16px"
      borderRadius="8px"
      w="full"
      h="full"
      mb={"2rem"}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      {...props}
    >
      <Grid
        gridTemplateColumns={{ base: "1fr 1fr", sm: "repeat(3, 1fr)" }}
        gap={{ base: 2, sm: 4 }}
        mb={2}
      >
        <FlexBox h="full" alignItems="center">
          <Icon name="bar-two" />
          <TextNormal ml="5px" fontWeight="600">
            {`Link #${index + 1}`}
          </TextNormal>
        </FlexBox>
        <Center alignItems="center" h="full" order={{ base: 3, sm: 2 }}>
          <PriorityInput
            name={"priority"}
            type={"number"}
            value={updatedPriority}
            handleChange={handlePriorityChange}
            label={"Priority:"}
            placeholder={10}
          />
        </Center>

        <Flex
          justifyContent="flex-end"
          alignItems="center"
          order={{ base: 2, sm: 3 }}
        >
          <TextButton
            px="2px"
            border="none"
            color="red" // Change this color variable to match your theme
            _hover={{ background: "transparent" }}
            onClick={handleDeleteLink}
            textAlign="right"
          >
            Remove
          </TextButton>
        </Flex>
      </Grid>

      <Box w="full" position="relative">
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
        <LinkInput handleUpdateUrl={handleUpdateUrl} value={updatedUrl} />
        {hasError && (
          <TextNormal fontSize=".75rem" color="red.500">
            Invalid URL format
          </TextNormal>
        )}
      </Box>
    </Box>
  );
};

export default LinkCart;
