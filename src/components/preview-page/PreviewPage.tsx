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
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const PreviewPage = () => {
  const { loggedIn } = useSelector((state: RootState) => state?.auth);
  const [copied, setCopied] = useState(false);
  const FRONTEND_BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const { id } = useParams();
  const lastHyphenIndex = id.lastIndexOf("-");
  const userId = id.slice(lastHyphenIndex + 1);
  const documentId = id.slice(0, lastHyphenIndex);

  const { data } = useGetAllDevlinksQuery({ userId }, { skip: !userId });

  const linksLength = data?.dev_links?.length > 6 ? true : false;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${FRONTEND_BASE_URL}/${documentId}-${userId}/preview`
    );
    setCopied(true);

    // Reset the "Copied" text after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Container p="24px">
      <Flex
        justifyContent="space-between"
        p="12px 16px"
        bg={colors.white}
        borderRadius="12px"
      >
        <Link href={"/links"}>
          <TextButton>
            {loggedIn ? "Back to Editor" : "Create your own links"}
          </TextButton>
        </Link>
        <BgButton onClick={handleCopy}>
          {copied ? "Copied!" : "Copy Share Link"}
        </BgButton>
      </Flex>
      <FlexBox justifyContent="center">
        <PreviewCartConatiner>
          <Box w="200px" h="auto">
            {/* Image Area */}
            <ProfileImg firstName={data?.firstname} imgSrc={data?.image?.url} />

            {/* Personal Information Area */}
            <PersonalInfo
              firstName={data?.firstname}
              lastName={data?.lastName}
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
