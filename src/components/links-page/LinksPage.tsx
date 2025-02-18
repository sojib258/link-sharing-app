"use client";
import {
  AddButton,
  BgButton,
  FlexBox,
  LinksPageSkeleton,
  OverView,
} from "@/components";
import { linkOverView } from "@/lib/config/data";
import { LinkCartTypes } from "@/lib/types/platformCartType";
import { RootState } from "@/store";
import { useGetAllDevlinksQuery } from "@/store/services/devlinksApi";
import { Box, Grid, GridItem, GridProps } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { LeftSection, LinkCart, LinkModal } from "./components/index";

type LinksPageProps = GridProps & {};

const LinksPage: FC<LinksPageProps> = ({ ...props }) => {
  const { userId } = useSelector((state: RootState) => state?.auth);
  const { data, refetch, isLoading, isFetching } = useGetAllDevlinksQuery(
    { userId },
    { skip: !userId }
  );

  // State to store updated links
  const [updatedLinks, setUpdatedLinks] = useState<LinkCartTypes[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [validationErrors, setValidationErrors] = useState<boolean[]>([]);

  // Handle link updates (platform and URL)
  const handleLinkUpdate = (
    index: number,
    platform: LinkCartTypes["platform"],
    url: string
  ) => {
    const regex = new RegExp(platform?.urlPattern); // Define your urlPattern somewhere
    const isValid = regex.test(url);

    setValidationErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = !isValid;
      return newErrors;
    });

    setUpdatedLinks((prevLinks) => {
      const updated = [...prevLinks];
      updated[index] = {
        ...updated[index], // Keep the existing values
        platform, // Update platform object
        url, // Update the URL
      };
      return updated;
    });

    setHasChanges(true);
  };

  // Handle save functionality
  const handleSave = () => {
    if (validationErrors.some((error) => error)) {
      console.error("Validation errors exist. Cannot save.");
      return;
    }
    console.log("Inside Btn", updatedLinks);
    // Assuming you have a save function that accepts an array of updated links and userId
    // saveLinksToBackend(userId, updatedLinks, token); // You need to implement this function for API call
  };

  if (isLoading || isFetching) {
    return <LinksPageSkeleton />;
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
        <LeftSection data={data} />
      </GridItem>
      <GridItem colSpan={{ base: 5, lg: 3 }} w="100%" h="full">
        <OverView data={linkOverView} />
        <LinkModal refetch={refetch} data={data}>
          <AddButton>Add new link</AddButton>
        </LinkModal>

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
              documentId={item?.documentId}
              refetch={refetch}
              hasError={validationErrors[i]}
            />
          ))}
        </Box>
        <FlexBox justifyContent="flex-end" mt="2rem" py="24px">
          <BgButton
            onClick={handleSave}
            isDisabled={!hasChanges || validationErrors.some((error) => error)}
          >
            Save
          </BgButton>
        </FlexBox>
      </GridItem>
    </Grid>
  );
};

export default LinksPage;
