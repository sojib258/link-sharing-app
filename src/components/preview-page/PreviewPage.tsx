import { BgButton, FlexBox, TextButton } from "@/components";
import { colors } from "@/lib";
import { addedLinks, personalInfo } from "@/lib/config/data";
import { Box, Flex } from "@chakra-ui/react";
import PersonalInfo from "../links-page/components/PersonalInfo";
import PlatformButton from "../links-page/components/PlatformButton";
import ProfileImg from "../links-page/components/ProfileImg";
import Container from "./components/Container";
import PreviewCartConatiner from "./components/PreviewCartContainer";

const PreviewPage = () => {
  const linksLength = addedLinks?.length > 6 ? true : false;

  return (
    <Container p="24px">
      <Flex
        justifyContent="space-between"
        p="12px 16px"
        bg={colors.white}
        borderRadius="12px"
      >
        <TextButton>Back to Editor</TextButton>
        <BgButton>Share Link</BgButton>
      </Flex>
      <FlexBox justifyContent="center">
        <PreviewCartConatiner>
          <Box w="200px" h="auto">
            {/* Image Area */}
            <ProfileImg imgSrc="/user/userOne.jpeg" />

            {/* Personal Information Area */}
            <PersonalInfo data={personalInfo?.data} />

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
      </FlexBox>
    </Container>
  );
};

export default PreviewPage;
