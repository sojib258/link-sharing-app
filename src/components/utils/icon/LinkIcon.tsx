"use client";
import { Icon, IconProps } from "@chakra-ui/react";
import { FC } from "react";
import { FaLink } from "react-icons/fa6";

type LinkIconProps = IconProps & {};

const LinkIcon: FC<LinkIconProps> = ({ ...props }) => {
  return <Icon fontSize="1.3rem" as={FaLink} {...props} />;
};

export default LinkIcon;
