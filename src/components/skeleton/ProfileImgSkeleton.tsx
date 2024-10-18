import { colors } from "@/lib";
import { Flex, FlexProps, SkeletonCircle } from "@chakra-ui/react";
import { FC } from "react";

type ProfileImgSkeleton = FlexProps & {};

const ProfileImgSkeleton: FC<ProfileImgSkeleton> = ({ ...props }) => {
  return (
    <Flex justifyContent="center" w="full" h="auto" mb="18px" {...props}>
      <Flex
        w="80px"
        h="80px"
        borderRadius="50%"
        border={`4px solid ${colors.primary}`}
      >
        <SkeletonCircle w="full" h="full" size="full" />
      </Flex>
    </Flex>
  );
};

export default ProfileImgSkeleton;
