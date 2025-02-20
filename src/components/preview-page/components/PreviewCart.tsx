/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlexBox } from "@/components";
import PersonalInfo from "@/components/links-page/components/PersonalInfo";
import PlatformButton from "@/components/links-page/components/PlatformButton";
import ProfileImg from "@/components/links-page/components/ProfileImg";
import { LinkCartTypes } from "@/lib/types/platformCartType";
import { Box, FlexProps } from "@chakra-ui/react";
import { FC } from "react";
import PreviewCartConatiner from "./PreviewCartContainer";

type PreviewCartProps = FlexProps & {
  data: any;
};

const PreviewCart: FC<PreviewCartProps> = ({ data, ...props }) => {
  const linksLength = data?.dev_links?.length > 6 ? true : false;

  return (
    <PreviewCartConatiner {...props}>
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
  );
};

export default PreviewCart;
