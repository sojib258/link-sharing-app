import { Flex, FlexProps, Skeleton } from "@chakra-ui/react";
import { FC } from "react";

type PersonalInfoSkeletonProps = FlexProps & {};

const PersonalInfoSkeleton: FC<PersonalInfoSkeletonProps> = ({ ...props }) => {
  return (
    <Flex
      w="full"
      flexDirection="column"
      alignItems="center"
      my="2rem"
      {...props}
    >
      <Skeleton mb={2} w={{ base: "140px", xl: "160px" }} height="12px" />
      <Skeleton w={{ base: "180px", xl: "220px" }} height="12px" />
    </Flex>
  );
};

export default PersonalInfoSkeleton;
