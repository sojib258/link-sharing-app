import { Skeleton, Stack, StackProps } from "@chakra-ui/react";
import { FC } from "react";

type OverViewSkeletonProps = StackProps & {};

const OverViewSkeleton: FC<OverViewSkeletonProps> = ({ ...props }) => {
  return (
    <Stack {...props}>
      <Skeleton w="180px" h="24px" />
      <Skeleton w="full" h="24px" />
    </Stack>
  );
};

export default OverViewSkeleton;
