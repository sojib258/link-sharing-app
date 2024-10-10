"use client";
import { colors } from "@/lib";
import { Text, TextProps } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

type NavlinkProps = TextProps & {
  children: string;
  href: string;
};

const Navlink: FC<NavlinkProps> = ({ href, children, ...props }) => {
  return (
    <Link href={href}>
      <Text
        fontFamily="inter"
        fontSize="1rem"
        fontWeight="600"
        lineHeight="24px"
        color={colors.textColor}
        {...props}
      >
        {children}
      </Text>
    </Link>
  );
};

export default Navlink;
