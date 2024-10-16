"use client";
import { AddButton, BgButton, FlexBox, OverView } from "@/components";
import { LinkCartTypes } from "@/lib/types/platformCartType";
import { RootState } from "@/store";
import { useGetAllDevlinksQuery } from "@/store/services/devlinksApi";
import { Box, Grid, GridItem, GridProps, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import LinkCart from "./components/LinkCart";

type LinksPageProps = GridProps & {};

const LinksPage: FC<LinksPageProps> = ({ ...props }) => {
  const { userId, token } = useSelector((state: RootState) => state?.auth);
  const { isLoading, data } = useGetAllDevlinksQuery(
    { userId },
    { skip: !userId }
  );

  // State to store updated links
  const [updatedLinks, setUpdatedLinks] = useState<LinkCartTypes[]>([]);

  // Handle link updates (platform and URL)
  const handleLinkUpdate = (
    index: number,
    platform: LinkCartTypes["platform"],
    url: string
  ) => {
    setUpdatedLinks((prevLinks) => {
      const updated = [...prevLinks];
      updated[index] = {
        ...updated[index], // Keep the existing values
        platform, // Update platform object
        url, // Update the URL
      };
      return updated;
    });
  };

  console.log("Updated Links", updatedLinks);

  // Handle save functionality
  const handleSave = () => {
    console.log("Inside Btn", updatedLinks);
    // Assuming you have a save function that accepts an array of updated links and userId
    // saveLinksToBackend(userId, updatedLinks, token); // You need to implement this function for API call
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

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
        {/* <LeftSection /> */}
      </GridItem>
      <GridItem colSpan={{ base: 5, lg: 3 }} w="100%" h="full">
        <OverView data={data?.overview} />
        <AddButton>Add new link</AddButton>

        <Box w="full" minH="300px">
          {data?.dev_links?.map((item: LinkCartTypes, i: number) => (
            <LinkCart
              handleLinkUpdate={(platform, url) =>
                handleLinkUpdate(i, platform, url)
              }
              platform={item?.platform}
              key={i}
              index={i}
              link={item?.url}
            />
          ))}
        </Box>
        <FlexBox justifyContent="flex-end" mt="2rem" py="24px">
          <BgButton onClick={handleSave}>Save</BgButton>
        </FlexBox>
      </GridItem>
    </Grid>
  );
};

export default LinksPage;
