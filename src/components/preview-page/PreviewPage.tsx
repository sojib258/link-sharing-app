"use client";
import { BgButton, FlexBox, TextButton } from "@/components";
import PersonalInfo from "@/components/links-page/components/PersonalInfo";
import PlatformButton from "@/components/links-page/components/PlatformButton";
import ProfileImg from "@/components/links-page/components/ProfileImg";
import Container from "@/components/preview-page/components/Container";
import PreviewCartConatiner from "@/components/preview-page/components/PreviewCartContainer";
import { colors } from "@/lib";
import { LinkCartTypes } from "@/lib/types/platformCartType";
import { RootState } from "@/store";
import { useGetAllDevlinksQuery } from "@/store/services/devlinksApi";
import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const PreviewPage = () => {
  const { userId } = useSelector((state: RootState) => state?.auth);
  const { data } = useGetAllDevlinksQuery({ userId }, { skip: !userId });

  const linksLength = data?.dev_links?.length > 6 ? true : false;

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
            <PersonalInfo
              name={`${data?.firstname} ${data?.lastname}`}
              email={data?.email}
            />

            {/* Added Links Card */}
            <FlexBox
              flexDir="column"
              alignItems="center"
              height="265px"
              overflowY={linksLength ? "scroll" : "hidden"}
            >
              {data?.dev_links?.map((item: LinkCartTypes, i: number) => (
                <PlatformButton key={i} dev_links={item} />
              ))}
            </FlexBox>
          </Box>
        </PreviewCartConatiner>
      </FlexBox>
    </Container>
  );
};

export default PreviewPage;
