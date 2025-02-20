import { colors } from "@/lib";
import { Center, CenterProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type ContainerProps = CenterProps & {
  children: ReactNode;
};

const Container: FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <Center
      flexDir="column"
      w="500px"
      h="auto"
      p="2rem"
      py="3rem"
      boxShadow={`0px 0px 8px -4px ${colors.primary}`}
      borderRadius="1rem"
      {...props}
    >
      {children}
    </Center>
  );
};

export default Container;
