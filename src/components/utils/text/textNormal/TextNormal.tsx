"use client";
import { colors, fonts } from "@/lib";
import { Text, TextProps } from "@chakra-ui/react";
import { FC } from "react";

type TextNormalProps = TextProps & {
  children: string;
};

const TextNormal: FC<TextNormalProps> = ({ children, ...props }) => {
  return (
    <Text
      fontFamily={fonts?.poppins}
      fontSize="1rem"
      fontWeight="400"
      color={colors?.textColor}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TextNormal;
