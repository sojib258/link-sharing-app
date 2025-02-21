"use client";
import { TextButton } from "@/components/utils";
import { colors } from "@/lib";
import { RootState } from "@/store";
import { Box, Flex, FlexProps } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { PiEyeBold } from "react-icons/pi";
import { useSelector } from "react-redux";

type PreviewProps = FlexProps & {};

const Preview: FC<PreviewProps> = ({ ...props }) => {
  const { documentId, userId } = useSelector((state: RootState) => state?.auth);
  return (
    <Flex
      w="100%"
      justifyContent="flex-end"
      alignItems="center"
      userSelect="none"
      {...props}
    >
      <Link href={`/${documentId}-${userId}/preview`}>
        <TextButton
          display={{ base: "none", md: "block" }}
          _hover={{
            backgroundColor: colors.primary,
            color: colors.white,
            transition: "0.8s",
          }}
        >
          Preview
        </TextButton>
      </Link>
      <Box
        display={{ base: "flex", md: "none" }}
        w="2.2rem"
        h="2.2rem"
        borderRadius="8px"
        border={`2px solid ${colors.primary}`}
        alignItems="center"
        justifyContent="center"
      >
        <Link href={`/${documentId}-${userId}/preview`}>
          <PiEyeBold color={colors.primary} fontSize="1.2rem" />
        </Link>
      </Box>
    </Flex>
  );
};

export default Preview;
