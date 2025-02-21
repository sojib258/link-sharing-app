import { Skeleton } from "@chakra-ui/react";
import PreviewCartConatiner from "../preview-page/components/PreviewCartContainer";

const BoxSkeleton = () => {
  return (
    <PreviewCartConatiner mx="auto">
      <Skeleton w="200px" h="300px" borderRadius="16px" />
    </PreviewCartConatiner>
  );
};

export default BoxSkeleton;
