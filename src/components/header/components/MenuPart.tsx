"use client";
import { FlexBox, IconButton, LinkIcon, UserIcon } from "@/components";
import { colors } from "@/lib";
import { RootState } from "@/store";
import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { useSelector } from "react-redux";

type MenuPartProps = FlexProps & {};

const MenuPart: FC<MenuPartProps> = ({ ...props }) => {
  const { loggedIn } = useSelector((state: RootState) => state?.auth);
  const pathname = usePathname();
  const router = useRouter();

  const handleLinks = (link: string) => {
    if (!loggedIn) {
      toast.error("You are not logged in!");
    } else {
      router.push(link);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" gap={4} {...props}>
      {/* This button will show in tablet and desktop view*/}
      <Box
        display={{ base: "none", md: "block" }}
        onClick={() => handleLinks("/links")}
      >
        <IconButton
          color={colors.textColor}
          leftIcon={<FaLink fontSize="1.3rem" />}
          isActive={pathname === "/links"}
        >
          Links
        </IconButton>
      </Box>

      <Box
        display={{ base: "none", md: "block" }}
        onClick={() => handleLinks("/")}
      >
        <IconButton
          display={{ base: "none", md: "flex" }}
          color={colors.textColor}
          leftIcon={<FaRegUserCircle fontSize="1.2rem" />}
          isActive={pathname === "/"}
        >
          Profile Details
        </IconButton>
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
          onClick={() => handleLinks("/links")}
        >
          <LinkIcon />
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
          onClick={() => handleLinks("/")}
        >
          <UserIcon />
        </Box>
      </FlexBox>
    </Flex>
  );
};

export default MenuPart;
