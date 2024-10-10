"use client";
import { Icon, IconProps } from "@chakra-ui/react";
import { FC } from "react";
import { FaRegUserCircle } from "react-icons/fa";

type UserIconProps = IconProps & {};

const UserIcon: FC<UserIconProps> = ({ ...props }) => {
  return <Icon fontSize="1.3rem" as={FaRegUserCircle} {...props} />;
};

export default UserIcon;
