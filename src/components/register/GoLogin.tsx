import { colors } from "@/lib";
import { Center, CenterProps } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { TextButton, TextNormal } from "../utils";

type GoLoginProps = CenterProps & {};

const GoLogin: FC<GoLoginProps> = ({ ...props }) => {
  return (
    <Center mt={4} gap={4} alignItems="center" {...props}>
      <TextNormal>Already have an account?</TextNormal>
      <Link href="/register">
        <TextButton
          px="0px"
          border="none"
          color={colors?.primary}
          _hover={{ background: "transparent" }}
        >
          Log In
        </TextButton>
      </Link>
    </Center>
  );
};

export default GoLogin;
