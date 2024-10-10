import { Flex, FlexProps, Image } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

type LogoPartProps = FlexProps & {};

const LogoPart: FC<LogoPartProps> = ({ ...props }) => {
  return (
    <Flex
      w={{ base: "40px", md: "200px" }}
      h="full"
      alignItems="center"
      {...props}
    >
      <Link href="/">
        <Image
          display={{ base: "none", md: "block" }}
          w="auto"
          h="2rem"
          src="/logo/logoDesktop.jpg"
          alt="Logo Image"
        />
      </Link>

      <Link href="/">
        <Image
          display={{ base: "block", md: "none" }}
          w="full"
          h="full"
          src="/logo/logoPhone.jpg"
          alt="Logo Image"
        />
      </Link>
    </Flex>
  );
};

export default LogoPart;
