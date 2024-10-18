import { CustomIcon, FlexBox, TextNormal } from "@/components/utils";
import { LinkCartTypes } from "@/lib/types/platformCartType";
import { Box, FlexProps } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

type PlatformButtonProps = FlexProps & {
  dev_links: LinkCartTypes;
};

const PlatformButton: FC<PlatformButtonProps> = ({ dev_links, ...props }) => {
  return (
    <Link style={{ width: "100%" }} href={dev_links?.url} target="_blank">
      <FlexBox
        justifyContent="space-between"
        alignItems="center"
        p="8px 12px"
        bg={dev_links?.platform?.cardColor}
        mb="12px"
        borderRadius="8px"
        {...props}
      >
        <FlexBox h="full" alignItems="center">
          <Box mr="4px">
            <CustomIcon
              size={14}
              name={dev_links?.platform?.platform}
              color={dev_links?.platform?.iconColor}
            />
          </Box>
          <TextNormal color={dev_links?.platform?.textColor} fontSize=".65rem">
            {dev_links?.platform?.label}
          </TextNormal>
        </FlexBox>
        <Box>
          <CustomIcon
            size={14}
            color={dev_links?.platform?.iconColor}
            name="arrow-right"
          />
        </Box>
      </FlexBox>
    </Link>
  );
};

export default PlatformButton;
