import { colors } from "@/lib";
import { Flex, FlexProps, Image } from "@chakra-ui/react";
import { FC } from "react";

type ProfileImgProps = FlexProps & {};

const ProfileImg: FC<ProfileImgProps> = ({ ...props }) => {
  return (
    <Flex justifyContent="center" w="full" h="auto" mb="18px" {...props}>
      <Flex
        w="80px"
        h="80px"
        borderRadius="50%"
        border={`4px solid ${colors.primary}`}
      >
        <Image
          borderRadius="50%"
          w="full"
          h="full"
          objectFit="cover"
          src="/user/userOne.jpeg"
          alt="Profile Image"
        />
      </Flex>
    </Flex>
  );
};

export default ProfileImg;
