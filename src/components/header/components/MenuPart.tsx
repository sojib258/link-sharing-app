"use client";
import { FlexBox, IconButton, LinkIcon, UserIcon } from "@/components";
import { colors } from "@/lib";
import { Box, Flex, FlexProps } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";

type MenuPartProps = FlexProps & {};

const MenuPart: FC<MenuPartProps> = ({ ...props }) => {
  const pathname = usePathname();

  return (
    <Flex justifyContent="center" alignItems="center" gap={4} {...props}>
      {/* This button will show in tablet and desktop view*/}
      <Box display={{ base: "none", md: "block" }}>
        <Link href="/links">
          <IconButton
            color={colors.textColor}
            leftIcon={<FaLink fontSize="1.3rem" />}
            isActive={pathname === "/links"}
          >
            Links
          </IconButton>
        </Link>
      </Box>

      <Box display={{ base: "none", md: "block" }}>
        <Link href="/">
          <IconButton
            display={{ base: "none", md: "flex" }}
            color={colors.textColor}
            leftIcon={<FaRegUserCircle fontSize="1.2rem" />}
            isActive={pathname === "/"}
          >
            Profile Details
          </IconButton>
        </Link>
      </Box>

      {/* This is show mobile view */}
      <FlexBox
        display={{ base: "flex", md: "none" }}
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <Box
          display={{ base: "flex", md: "none" }}
          w="3.2rem"
          h="2.2rem"
          borderRadius="8px"
          alignItems="center"
          justifyContent="center"
          transition=".3s"
          _hover={{ backgroundColor: colors.lightPrimary }}
          bg={pathname === "/links" ? colors.lightPrimary : "transparent"}
        >
          <Link href="/links">
            <LinkIcon />
          </Link>
        </Box>
        <Box
          display={{ base: "flex", md: "none" }}
          w="3.2rem"
          h="2.2rem"
          borderRadius="8px"
          alignItems="center"
          justifyContent="center"
          transition=".3s"
          _hover={{ backgroundColor: colors.lightPrimary }}
          bg={pathname === "/" ? colors.lightPrimary : "transparent"}
        >
          <Link href="/">
            <UserIcon />
          </Link>
        </Box>
      </FlexBox>
    </Flex>
  );
};

export default MenuPart;
