import { TextNormal } from "@/components/utils";
import { colors } from "@/lib";
import { Center, WrapItemProps } from "@chakra-ui/react";
import { FC } from "react";

type AvatarImageProps = WrapItemProps & {
  firstName?: string;
  lastName?: string;
};

const AvatarImage: FC<AvatarImageProps> = ({ firstName, lastName }) => {
  const initials = `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;

  return (
    <Center bg={colors?.lightPrimary} w={"full"} h="full" borderRadius="full">
      <TextNormal color={colors?.white} fontSize="1.5rem" fontWeight="600">
        {initials}
      </TextNormal>
    </Center>
  );
};

export default AvatarImage;
