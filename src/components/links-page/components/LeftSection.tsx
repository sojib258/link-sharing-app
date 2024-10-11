import { FlexBox } from "@/components";
import { addedLinks } from "@/lib/config/data";
import { Box } from "@chakra-ui/react";
import LeftContainer from "./LeftContainer";
import PersonalInfo from "./PersonalInfo";
import PlatformButton from "./PlatformButton";
import ProfileImg from "./ProfileImg";

const LeftSection = () => {
  const linksLength = addedLinks?.length > 6 ? true : false;
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
        <ProfileImg />

        {/* Personal Information Area */}
        <PersonalInfo />

        {/* Added Links Card */}
        <FlexBox
          flexDir="column"
          alignItems="center"
          height="265px"
          overflowY={linksLength ? "scroll" : "hidden"}
        >
          {addedLinks.map((item, i) => (
            <PlatformButton key={i} data={item} />
          ))}
        </FlexBox>
      </Box>
    </LeftContainer>
  );
};

export default LeftSection;
