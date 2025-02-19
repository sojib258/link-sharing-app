import { FlexBox, PlatformButtonSkeleton } from "@/components";
import { LinkCartTypes, UserDetailsType } from "@/lib/types/platformCartType";
import { Box } from "@chakra-ui/react";
import { FC } from "react";
import LeftContainer from "./LeftContainer";
import PersonalInfo from "./PersonalInfo";
import PlaceholderButtons from "./PlaceholderButtons";
import PlatformButton from "./PlatformButton";
import ProfileImg from "./ProfileImg";

type LeftSectionProps = {
  data: UserDetailsType;
  isLoading?: boolean;
};

const LeftSection: FC<LeftSectionProps> = ({ data, isLoading }) => {
  const linksLength = data?.dev_links?.length > 6 ? true : false;

  return (
    <LeftContainer>
      <Box
        w="190px"
        h="auto"
        position="absolute"
        top="100px"
        left="50%"
        transform={"translateX(-50%)"}
      >
        {/* Image Area */}
        <ProfileImg
          imgSrc={data?.image?.url}
          isLoading={isLoading}
          firstName={data?.firstname}
          lastName={data?.lastname}
        />

        {/* Personal Information Area */}

        <PersonalInfo
          firstName={data?.firstname}
          lastName={data?.lastname}
          email={data?.email}
          isLoading={isLoading}
        />

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
            {data?.dev_links?.length > 0 ? (
              [...data.dev_links] // Create a shallow copy to avoid mutating the original array
                .sort(
                  (a: LinkCartTypes, b: LinkCartTypes) =>
                    b.priority - a.priority
                ) // Sort by priority (higher first)
                .map((item, i) => <PlatformButton key={i} dev_links={item} />)
            ) : (
              <PlaceholderButtons />
            )}
          </FlexBox>
        )}
      </Box>
    </LeftContainer>
  );
};

export default LeftSection;
