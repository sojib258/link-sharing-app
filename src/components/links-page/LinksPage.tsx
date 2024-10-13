"use client";
import { AddButton, BgButton, FlexBox, OverView } from "@/components";
import { linkOverView } from "@/lib/config/data";
import { Box, Grid, GridItem, GridProps } from "@chakra-ui/react";
import { FC } from "react";
import LeftSection from "./components/LeftSection";
import LinkCart from "./components/LinkCart";

type LinksPageProps = GridProps & {};

const LinksPage: FC<LinksPageProps> = ({ ...props }) => {
  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      gap={2}
      {...props}
      px={{ base: "1rem", md: "6.25rem" }}
    >
      <GridItem
        display={{ base: "none", lg: "block" }}
        colSpan={2}
        w="100%"
        h="full"
      >
        {/* Left Part Content */}
        <LeftSection />
      </GridItem>
      <GridItem colSpan={{ base: 5, lg: 3 }} w="100%" h="full">
        <OverView data={linkOverView} />
        <AddButton>Add new link</AddButton>

        <Box w="full" minH="300px">
          {/* Text Info */}
          <LinkCart />
          <LinkCart />
        </Box>
        <FlexBox
          justifyContent="flex-end"
          mt="2rem"
          // borderTop={`1px solid ${colors.borderColor}`}
          py="24px"
        >
          <BgButton>Save</BgButton>
        </FlexBox>
      </GridItem>
    </Grid>
  );
};

export default LinksPage;
