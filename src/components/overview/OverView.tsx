import { TextNormal } from "@/components";
import { Stack, StackProps } from "@chakra-ui/react";
import { FC } from "react";

type OverViewProps = StackProps & {
  data: {
    title: string;
    description: string;
  };
};

const OverView: FC<OverViewProps> = ({ data, ...props }) => {
  return (
    <Stack {...props}>
      <TextNormal fontSize="1.5rem" fontWeight="600">
        {data?.title}
      </TextNormal>
      <TextNormal fontSize="1rem">{data?.description}</TextNormal>
    </Stack>
  );
};

export default OverView;
