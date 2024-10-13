import { FlexBox, IconButton, LinkIcon, UserIcon } from "@/components";
import { colors } from "@/lib";
import { Box, Flex, FlexProps } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";

type MenuPartProps = FlexProps & {};

const MenuPart: FC<MenuPartProps> = ({ ...props }) => {
  return (
    <Flex justifyContent="center" alignItems="center" {...props}>
      {/* This button will show in tablet and desktop view*/}
      <Link href="/links">
        <IconButton
          display={{ base: "none", md: "flex" }}
          color={colors.textColor}
          leftIcon={<FaLink fontSize="1.3rem" />}
        >
          Links
        </IconButton>
      </Link>
      <Link href="./profile-details">
        <IconButton
          display={{ base: "none", md: "flex" }}
          color={colors.textColor}
          leftIcon={<FaRegUserCircle fontSize="1.2rem" />}
        >
          Profile Details
        </IconButton>
      </Link>

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
        >
          <Link href="/profile-details">
            <UserIcon />
          </Link>
        </Box>
      </FlexBox>
    </Flex>
  );
};

export default MenuPart;
