import { colors } from "@/lib";
import { Box, BoxProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type PreviewImageContainerProps = BoxProps & {
  children: ReactNode;
};

const PreviewImageContainer: FC<PreviewImageContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <Box
      position="relative"
      w="150px"
      h="150px"
      borderRadius="1.5rem"
      overflow="hidden"
      bg={colors?.lightPrimary}
      {...props}
    >
      {children}
    </Box>
  );
};

export default PreviewImageContainer;
