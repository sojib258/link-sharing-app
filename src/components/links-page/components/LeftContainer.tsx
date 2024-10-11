import { Flex, FlexProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type LeftContainerProps = FlexProps & {
  children?: ReactNode;
};

const LeftContainer: FC<LeftContainerProps> = ({ children, ...props }) => {
  return (
    <Flex
      h="600px"
      w={{ base: "300px", xl: "400px" }}
      bg="url(/mockup/mockup2.png)"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="center center"
      position="relative"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default LeftContainer;
