import { colors } from "@/lib";
import { Flex, FlexProps, Image } from "@chakra-ui/react";
import { FC } from "react";

type ProfileImgProps = FlexProps & {
  imgSrc: string;
};

const ProfileImg: FC<ProfileImgProps> = ({ imgSrc, ...props }) => {
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
          src={imgSrc}
          alt="Profile Image"
        />
      </Flex>
    </Flex>
  );
};

export default ProfileImg;
