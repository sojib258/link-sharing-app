"use client";
import { BgButton, FlexBox, TextButton, TextNormal } from "@/components";
import { colors } from "@/lib";
import { RootState } from "@/store";
import { useGetAllDevlinksQuery } from "@/store/services/devlinksApi";
import { Center, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import Container from "./components/Container";
import PreviewCart from "./components/PreviewCart";
import PreviewCartConatiner from "./components/PreviewCartContainer";
import QRCodeComponent from "./components/QrCodeComponent";

const PreviewPage = () => {
  const { loggedIn } = useSelector((state: RootState) => state?.auth);
  const [copied, setCopied] = useState(false);
  const FRONTEND_BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const { id } = useParams();
  const lastHyphenIndex = id.lastIndexOf("-");
  const userId = id.slice(lastHyphenIndex + 1);
  const documentId = id.slice(0, lastHyphenIndex);
  const link = `${FRONTEND_BASE_URL}/${documentId}-${userId}/preview`;

  const { data } = useGetAllDevlinksQuery({ userId }, { skip: !userId });

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  console.log("D", data);
  return (
    <Container p="24px">
      <Flex
        justifyContent={{ base: "center", sm: "space-between" }}
        p="12px 16px"
        bg={colors.white}
        borderRadius="12px"
        flexWrap={{ base: "wrap", sm: "nowrap" }}
        gap={4}
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
      {data ? (
        <FlexBox
          justifyContent="center"
          gap={4}
          flexWrap={{ base: "wrap", md: "nowrap" }}
          pb="2rem"
        >
          <QRCodeComponent
            mt={{ base: "0px", sm: "4rem" }}
            // mt="0px"
            order={{ base: "1", md: "0" }}
            link={link}
          />
          <PreviewCart order={{ base: "0", md: "1" }} data={data} />
        </FlexBox>
      ) : (
        <PreviewCartConatiner mx="auto">
          <Center w="200px" h="300px">
            <TextNormal textAlign="center">
              Looks like invalid url! <br /> No Data Found!
            </TextNormal>
          </Center>
        </PreviewCartConatiner>
      )}
    </Container>
  );
};

export default PreviewPage;
