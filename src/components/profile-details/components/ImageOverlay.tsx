import { Icon, TextNormal } from "@/components/utils";
import { colors } from "@/lib";
import { BoxProps, Stack } from "@chakra-ui/react";
import { FC } from "react";

type ImageOverlayProps = BoxProps & {
  label: string;
};

const ImageOverlay: FC<ImageOverlayProps> = ({ label, ...props }) => {
  return (
    <Stack h="full" justifyContent="center" alignItems="center" {...props}>
      <Icon size={24} name="upload" color={colors?.white} />
      <TextNormal fontSize=".85rem" color={colors?.white}>
        {label}
      </TextNormal>
    </Stack>
  );
};

export default ImageOverlay;
