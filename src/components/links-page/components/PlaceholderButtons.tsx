import { FlexBox } from "@/components";
import { colors } from "@/lib";
import { Box } from "@chakra-ui/react";

const PlaceholderButtons = () => {
  return (
    <FlexBox flexDir="column" alignItems="center" height="265px" gap={6}>
      <Box w="full" h="30px" bg={colors?.lightWhite} borderRadius="4px" />
      <Box w="full" h="30px" bg={colors?.lightWhite} borderRadius="4px" />
      <Box w="full" h="30px" bg={colors?.lightWhite} borderRadius="4px" />
    </FlexBox>
  );
};

export default PlaceholderButtons;
