"use client";
import { RootState } from "@/store";
import { Box, Flex, FlexProps, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type LogoPartProps = FlexProps & {};

const LogoPart: FC<LogoPartProps> = ({ ...props }) => {
  const { loggedIn } = useSelector((state: RootState) => state?.auth);
  const router = useRouter();

  const handleLinks = (link: string) => {
    if (!loggedIn) {
      toast.error("You are not logged in!");
    } else {
      router.push(link);
    }
  };

  return (
    <Flex
      w={{ base: "40px", md: "200px" }}
      h="full"
      alignItems="center"
      {...props}
    >
      <Box onClick={() => handleLinks("/")} cursor="pointer" userSelect="none">
        <Image
          display={{ base: "none", md: "block" }}
          w="auto"
          h="2rem"
          src="/logo/logoDesktop.jpg"
          alt="Logo Image"
        />
        <Image
          display={{ base: "block", md: "none" }}
          w="full"
          h="full"
          src="/logo/logoPhone.jpg"
          alt="Logo Image"
        />
      </Box>
    </Flex>
  );
};

export default LogoPart;
