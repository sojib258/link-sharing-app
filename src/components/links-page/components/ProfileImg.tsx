import { colors } from "@/lib";
import { Flex, FlexProps, Image } from "@chakra-ui/react";
import { FC } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

type ProfileImgProps = FlexProps & {
  imgSrc: string;
};

const ProfileImg: FC<ProfileImgProps> = ({ imgSrc, ...props }) => {
  console.log("IMgSrc", imgSrc);
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
          src={`${BACKEND_URL}/${imgSrc}`}
          alt="Profile Image"
        />
      </Flex>
    </Flex>
  );
};

export default ProfileImg;
