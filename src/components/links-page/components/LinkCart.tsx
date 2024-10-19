import { FlexBox, Icon, LinkInput, TextButton, TextNormal } from "@/components";
import { LinkCartTypes } from "@/lib/types/platformCartType";
import { Box, BoxProps } from "@chakra-ui/react";
import { FC, useState } from "react";
import SelectBox from "./SelectBox";

type LinkCartProps = BoxProps & {
  link: string;
  index: number;
  platform: LinkCartTypes["platform"];
  handleLinkUpdate: (platform: LinkCartTypes["platform"], url: string) => void;
};

const LinkCart: FC<LinkCartProps> = ({
  link,
  index,
  platform,
  handleLinkUpdate,
  ...props
}) => {
  const [updatedPlatform, setUpdatedPlatform] = useState(platform);
  const [updatedUrl, setUpdatedUrl] = useState(link);

  const handleUpdatePlatform = (newPlatform: LinkCartTypes) => {
    setUpdatedPlatform(newPlatform.platform);
    handleLinkUpdate(newPlatform.platform, updatedUrl); // Pass the new platform and the current URL
  };

  const handleUpdateUrl = (url: string) => {
    setUpdatedUrl(url);
    handleLinkUpdate(updatedPlatform, url); // Pass the current platform and the updated URL
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
      </Box>
    </Box>
  );
};

export default LinkCart;
