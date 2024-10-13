import { colors } from "@/lib";
import { Flex, FlexProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type PreviewCartConatinerProps = FlexProps & {
  children: ReactNode;
};

const PreviewCartConatiner: FC<PreviewCartConatinerProps> = ({
  children,
  ...props
}) => {
  return (
    <Flex
      w="280px"
      h="auto"
      justifyContent="center"
      bg={colors.white}
      borderRadius="1.5rem"
      mt="4rem"
      py="2rem"
      boxShadow={`0px 0px 16px -4px ${colors.borderColor}`}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default PreviewCartConatiner;
