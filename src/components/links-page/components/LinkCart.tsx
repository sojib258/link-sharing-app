import { FlexBox, Icon, LinkInput, TextButton, TextNormal } from "@/components";
import { colors } from "@/lib";
import { Box, BoxProps } from "@chakra-ui/react";
import { FC } from "react";
import SelectBox from "./SelectBox";

type LinkCartProps = BoxProps & {};

const LinkCart: FC<LinkCartProps> = ({ ...props }) => {
  return (
    <Box w="full" h="full" mb={"3rem"} {...props}>
      <FlexBox justifyContent="space-between" alignItems="center" mb="8px">
        <FlexBox h="full" alignItems="center">
          <Icon name="bar-two" />
          <TextNormal
            ml="5px"
            fontWeight="600"
            color={colors.lightDark}
          >{`Link #${1}`}</TextNormal>
        </FlexBox>
        <TextButton
          px="0px"
          border="none"
          color={colors.danger}
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
          <SelectBox />
        </Box>
        <TextNormal fontSize=".75rem" mb="4px">
          Link
        </TextNormal>
        <LinkInput />
      </Box>
    </Box>
  );
};

export default LinkCart;
