import { ProfileImgSkeleton } from "@/components/skeleton";
import { colors } from "@/lib";
import { Flex, FlexProps, Image } from "@chakra-ui/react";
import { FC } from "react";
import AvatarImage from "./AvatarImage";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

type ProfileImgProps = FlexProps & {
  imgSrc: string;
  firstName: string;
  lastName?: string;
  isLoading?: boolean;
};

const ProfileImg: FC<ProfileImgProps> = ({
  imgSrc,
  firstName,
  lastName,
  isLoading,
  ...props
}) => {
  if (isLoading) return <ProfileImgSkeleton />;

  return (
    <Flex justifyContent="center" w="full" h="auto" mb="18px" {...props}>
      <Flex
        w="80px"
        h="80px"
        borderRadius="50%"
        border={`4px solid ${colors.primary}`}
      >
        {imgSrc ? (
          <Image
            borderRadius="50%"
            w="full"
            h="full"
            objectFit="cover"
            src={`${BACKEND_URL}/${imgSrc}`}
            alt="Profile Image"
          />
        ) : (
          <AvatarImage firstName={firstName} lastName={lastName} />
        )}
      </Flex>
    </Flex>
  );
};

export default ProfileImg;
