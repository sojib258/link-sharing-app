import { FlexBox } from "@/components";
import { Box, BoxProps, Skeleton } from "@chakra-ui/react";
import { FC } from "react";

type LinkCardSkeletonProps = BoxProps & {};

const LinkCardSkeleton: FC<LinkCardSkeletonProps> = ({ ...props }) => {
  return (
    <Box w="full" h="full" mb={"3rem"} {...props}>
      <FlexBox justifyContent="space-between" alignItems="center" mb="8px">
        <FlexBox h="full" alignItems="center">
          <Skeleton w="150px" h="24px" />
        </FlexBox>
        <Skeleton w="150px" h="24px" />
      </FlexBox>

      {/* Link Cart */}
      <Box w="full" position="relative">
        <Skeleton mb=".5rem" w="100px" h="10px" />
        <Box mb="12px">
          <Skeleton w="full" h="24px" />
        </Box>
        <Skeleton mb=".5rem" w="100px" h="10px" />
        <Skeleton w="full" h="10px" />
      </Box>
    </Box>
  );
};

export default LinkCardSkeleton;
