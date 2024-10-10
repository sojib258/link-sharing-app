import { TextButton } from "@/components/utils";
import { colors } from "@/lib";
import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { FC } from "react";
import { PiEyeBold } from "react-icons/pi";

type PreviewProps = FlexProps & {};

const Preview: FC<PreviewProps> = ({ ...props }) => {
  return (
    <Flex w="100%" justifyContent="flex-end" alignItems="center" {...props}>
      <TextButton
        display={{ base: "none", md: "block" }}
        _hover={{
          backgroundColor: colors.primary,
          color: colors.white,
          transition: "0.8s",
        }}
      >
        Preview
      </TextButton>
      <Box
        display={{ base: "flex", md: "none" }}
        w="2.2rem"
        h="2.2rem"
        borderRadius="8px"
        border={`2px solid ${colors.primary}`}
        alignItems="center"
        justifyContent="center"
      >
        <PiEyeBold color={colors.primary} fontSize="1.2rem" />
      </Box>
    </Flex>
  );
};

export default Preview;
