import { Skeleton, Stack, StackProps } from "@chakra-ui/react";
import { FC } from "react";

type PlatformButtonSkeletonProps = StackProps & {};

const PlatformButtonSkeleton: FC<PlatformButtonSkeletonProps> = ({
  ...props
}) => {
  return (
    <Stack w="full" h="200px" {...props}>
      <Skeleton mb="12px" w="200px" height="28px" />
      <Skeleton mb="12px" w="200px" height="28px" />
      <Skeleton mb="12px" w="200px" height="28px" />
      <Skeleton mb="12px" w="200px" height="28px" />
    </Stack>
  );
};

export default PlatformButtonSkeleton;
