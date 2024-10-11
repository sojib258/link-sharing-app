import { CustomIcon, FlexBox, TextNormal } from "@/components/utils";
import { PlatformCartType } from "@/lib/types/platformCartType";
import { Box, FlexProps } from "@chakra-ui/react";
import { FC } from "react";

type PlatformButtonProps = FlexProps & {
  data: PlatformCartType;
};

const PlatformButton: FC<PlatformButtonProps> = ({ data, ...props }) => {
  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="center"
      p="8px 12px"
      bg={data?.cardColor}
      mb="12px"
      borderRadius="8px"
      {...props}
    >
      <FlexBox h="full" alignItems="center">
        <Box mr="4px">
          <CustomIcon size={14} name={data?.platform} color={data?.iconColor} />
        </Box>
        <TextNormal color={data?.texxtColor} fontSize=".65rem">
          {data?.label}
        </TextNormal>
      </FlexBox>
      <Box>
        <CustomIcon size={14} color={data?.iconColor} name="arrow-right" />
      </Box>
    </FlexBox>
  );
};

export default PlatformButton;
