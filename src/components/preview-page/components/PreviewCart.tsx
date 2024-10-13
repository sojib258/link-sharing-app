import { FlexBox } from "@/components";
import PersonalInfo from "@/components/links-page/components/PersonalInfo";
import PlatformButton from "@/components/links-page/components/PlatformButton";
import ProfileImg from "@/components/links-page/components/ProfileImg";
import { addedLinks } from "@/lib/config/data";
import { Box } from "@chakra-ui/react";
import PreviewCartConatiner from "./PreviewCartContainer";

const PreviewCart = () => {
  const linksLength = addedLinks.length > 6 ? true : false;

  return (
    <PreviewCartConatiner>
      <Box w="200px" h="auto" bg="red">
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
    </PreviewCartConatiner>
  );
};

export default PreviewCart;
