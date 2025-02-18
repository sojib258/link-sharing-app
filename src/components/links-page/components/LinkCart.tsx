import { FlexBox, Icon, LinkInput, TextButton, TextNormal } from "@/components";
import { URL } from "@/lib/config/constants";
import { LinkCartTypes } from "@/lib/types/platformCartType";
import { RootState } from "@/store";
import { Box, BoxProps, useToast } from "@chakra-ui/react";
import axios from "axios";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import SelectBox from "./SelectBox";

type LinkCartProps = BoxProps & {
  link: string;
  index: number;
  platform: LinkCartTypes["platform"];
  documentId: string;
  refetch: () => void;
  handleLinkUpdate: (platform: LinkCartTypes["platform"], url: string) => void;
  hasError: boolean;
};

const LinkCart: FC<LinkCartProps> = ({
  link,
  index,
  platform,
  documentId,
  refetch,
  handleLinkUpdate,
  hasError,
  ...props
}) => {
  const { token } = useSelector((state: RootState) => state?.auth);
  const [updatedPlatform, setUpdatedPlatform] = useState(platform);
  const [updatedUrl, setUpdatedUrl] = useState(link);
  const toast = useToast();

  const handleUpdatePlatform = (newPlatform: LinkCartTypes["platform"]) => {
    setUpdatedPlatform(newPlatform);
    handleLinkUpdate(newPlatform, updatedUrl); // Pass the new platform and the current URL
  };

  const handleUpdateUrl = (url: string) => {
    setUpdatedUrl(url);
    handleLinkUpdate(updatedPlatform, url); // Pass the current platform and the updated URL
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
    <Box w="full" h="full" mb={"3rem"} {...props}>
      <FlexBox justifyContent="space-between" alignItems="center" mb="8px">
        <FlexBox h="full" alignItems="center">
          <Icon name="bar-two" />
          <TextNormal ml="5px" fontWeight="600">
            {`Link #${index + 1}`}
          </TextNormal>
        </FlexBox>
        <TextButton
          px="0px"
          border="none"
          color="red" // Change this color variable to match your theme
          _hover={{ background: "transparent" }}
          onClick={handleDeleteLink}
        >
          Remove
        </TextButton>
      </FlexBox>

      {/* Link Cart */}
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
