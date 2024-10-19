"use client";
import {
  FlexBox,
  PersonalInfoSkeleton,
  PlatformButtonSkeleton,
  ProfileImgSkeleton,
} from "@/components";
import { Box, Grid, GridItem, GridProps, Skeleton } from "@chakra-ui/react";
import { FC } from "react";
import LeftContainer from "../links-page/components/LeftContainer";
import LinkCardSkeleton from "./LinkCardSkeleton";
import OverViewSkeleton from "./OverviewSkeleton";

type LinksPageSkeletonProps = GridProps & {};
const LinksPageSkeleton: FC<LinksPageSkeletonProps> = () => {
  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      gap={2}
      px={{ base: "1rem", md: "6.25rem" }}
    >
      <GridItem
        display={{ base: "none", lg: "block" }}
        colSpan={2}
        w="100%"
        h="full"
      >
        {/* Left Part Content */}

        <LeftContainer>
          <Box
            w="200px"
            h="auto"
            position="absolute"
            top="100px"
            left={{ base: "50px", xl: "100px" }}
          >
            {/* Image Area */}
            <ProfileImgSkeleton />

            {/* Personal Information Area */}
            <PersonalInfoSkeleton />

            {/* Added Links Card */}
            <PlatformButtonSkeleton />
          </Box>
        </LeftContainer>
      </GridItem>
      <GridItem mt="3rem" colSpan={{ base: 5, lg: 3 }} w="100%" h="full">
        <OverViewSkeleton mb="1.5rem" />
        <Skeleton mb="2.5rem" w="full" h="1.5rem" />

        <Box w="full" minH="300px">
          <LinkCardSkeleton mb="2rem" />
          <LinkCardSkeleton />
        </Box>
        <FlexBox justifyContent="flex-end" mt="2rem" py="24px">
          <Skeleton w="100px" h="32px" />
        </FlexBox>
      </GridItem>
    </Grid>
  );
};

export default LinksPageSkeleton;
