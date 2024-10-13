import { colors } from "@/lib";
import { Box, GridProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type ContainerProps = GridProps & {
  children: ReactNode;
};

const Container: FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <Box
      w="full"
      h="18rem"
      bg={colors.primary}
      borderBottomLeftRadius="1.5rem"
      borderBottomRightRadius="1.5rem"
      {...props}
    >
      {children}
    </Box>
  );
};

export default Container;
