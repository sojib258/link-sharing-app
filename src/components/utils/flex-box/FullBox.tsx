import { Flex, FlexProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type FullBoxProps = FlexProps & {
  children: ReactNode;
};

const FullBox: FC<FullBoxProps> = ({ children, ...props }) => {
  return (
    <Flex w="full" h="full" {...props}>
      {children}
    </Flex>
  );
};

export default FullBox;
