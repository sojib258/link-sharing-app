import { PiEyeBold } from "react-icons/pi";

import { Icon, IconProps } from "@chakra-ui/react";
import { FC } from "react";

type PreviewIconProps = IconProps & {};

const PreviewIcon: FC<PreviewIconProps> = ({ ...props }) => {
  return <Icon fontSize="1.3rem" as={PiEyeBold} {...props} />;
};

export default PreviewIcon;
