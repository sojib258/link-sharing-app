"use client";
import { FlexBox } from "@/components";
import PersonalInfo from "@/components/links-page/components/PersonalInfo";
import PlatformButton from "@/components/links-page/components/PlatformButton";
import ProfileImg from "@/components/links-page/components/ProfileImg";
import Container from "@/components/preview-page/components/Container";
import PreviewCartConatiner from "@/components/preview-page/components/PreviewCartContainer";
import { LinkCartTypes } from "@/lib/types/platformCartType";
import { useGetAllDevlinksQuery } from "@/store/services/devlinksApi";
import { Box } from "@chakra-ui/react";
import { useParams } from "next/navigation";

const home = () => {
  const { id } = useParams();
  console.log("use", id);
  const { data } = useGetAllDevlinksQuery({ userId: id }, { skip: !id });

  const linksLength = data?.dev_links?.length > 6 ? true : false;

  console.log("Da", data);

  return (
    <Container p="24px">
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

export default home;
