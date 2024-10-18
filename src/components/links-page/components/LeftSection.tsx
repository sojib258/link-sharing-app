import {
  FlexBox,
  PersonalInfoSkeleton,
  PlatformButtonSkeleton,
  ProfileImgSkeleton,
} from "@/components";
import { UserDetailsType } from "@/lib/types/platformCartType";
import { Box } from "@chakra-ui/react";
import { FC } from "react";
import LeftContainer from "./LeftContainer";
import PersonalInfo from "./PersonalInfo";
import PlatformButton from "./PlatformButton";
import ProfileImg from "./ProfileImg";

type LeftSectionProps = {
  data: UserDetailsType;
  isLoading?: boolean;
};

const LeftSection: FC<LeftSectionProps> = ({ data, isLoading }) => {
  const linksLength = data?.dev_links?.length > 6 ? true : false;

  console.log("Data", data);
  return (
    <LeftContainer>
      <Box
        w="200px"
        h="auto"
        position="absolute"
        top="100px"
        left={{ base: "50px", xl: "100px" }}
      >
        {/* Image Area */}
        {isLoading ? (
          <ProfileImgSkeleton />
        ) : (
          <ProfileImg imgSrc={data?.image?.url} />
        )}

        {/* Personal Information Area */}
        {isLoading ? (
          <PersonalInfoSkeleton />
        ) : (
          <PersonalInfo
            name={`${data?.firstname} ${data?.lastname}`}
            email={data?.email}
          />
        )}

        {/* Added Links Card */}
        {isLoading ? (
          <PlatformButtonSkeleton />
        ) : (
          <FlexBox
            flexDir="column"
            alignItems="center"
            height="265px"
            overflowY={linksLength ? "scroll" : "hidden"}
          >
            {data?.dev_links?.map((item, i) => (
              <PlatformButton key={i} dev_links={item} />
            ))}
          </FlexBox>
        )}
      </Box>
    </LeftContainer>
  );
};

export default LeftSection;
