"use client";
import { BgButton, FlexBox, TextButton } from "@/components";
import { colors } from "@/lib";
import { RootState } from "@/store";
import { useGetAllDevlinksQuery } from "@/store/services/devlinksApi";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import Container from "./components/Container";
import PreviewCart from "./components/PreviewCart";

const PreviewPage = () => {
  const { loggedIn } = useSelector((state: RootState) => state?.auth);
  const [copied, setCopied] = useState(false);
  const FRONTEND_BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const { id } = useParams();
  const lastHyphenIndex = id.lastIndexOf("-");
  const userId = id.slice(lastHyphenIndex + 1);
  const documentId = id.slice(0, lastHyphenIndex);

  const { data } = useGetAllDevlinksQuery({ userId }, { skip: !userId });

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
        <PreviewCart data={data} />
      </FlexBox>
    </Container>
  );
};

export default PreviewPage;
