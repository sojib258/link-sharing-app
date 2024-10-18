import { Skeleton, Stack } from "@chakra-ui/react";
import { FC } from "react";

type PlatformButtonSkeletonProps = {};

const PlatformButtonSkeleton: FC<PlatformButtonSkeletonProps> = ({
  ...props
}) => {
  return (
    <Stack w="full" h="200px">
      <Skeleton mb="12px" w="200px" height="28px" />
      <Skeleton mb="12px" w="200px" height="28px" />
      <Skeleton mb="12px" w="200px" height="28px" />
      <Skeleton mb="12px" w="200px" height="28px" />
    </Stack>
  );
};

export default PlatformButtonSkeleton;
