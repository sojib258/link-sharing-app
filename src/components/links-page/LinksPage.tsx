"use client";
import {
  AddButton,
  BgButton,
  FlexBox,
  LinksPageSkeleton,
  OverView,
} from "@/components";
import { URL } from "@/lib/config/constants";
import { linkOverView } from "@/lib/config/data";
import { LinkCartTypes } from "@/lib/types/platformCartType";
import { RootState } from "@/store";
import { useGetAllDevlinksQuery } from "@/store/services/devlinksApi";
import { Box, Grid, GridItem, GridProps } from "@chakra-ui/react";
import axios from "axios";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { LeftSection, LinkCart, LinkModal } from "./components/index";

type LinksPageProps = GridProps & {};

const LinksPage: FC<LinksPageProps> = ({ ...props }) => {
  const { userId, token } = useSelector((state: RootState) => state?.auth);
  const { data, refetch, isLoading, isFetching } = useGetAllDevlinksQuery(
    { userId },
    { skip: !userId }
  );

  // State to store updated links
  const [updatedLinks, setUpdatedLinks] = useState<LinkCartTypes[]>([]);
  const [validationErrors, setValidationErrors] = useState<boolean[]>([]);

  // Handle link updates (platform and URL)
  const handleLinkUpdate = (
    index: number,
    platform: LinkCartTypes["platform"],
    url: string,
    documentId: string,
    priority?: number
  ) => {
    const regex = new RegExp(platform?.urlPattern); // Use the platform's URL pattern
    const isValid = regex.test(url);

    // Update validation errors
    setValidationErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = !isValid;
      return newErrors;
    });

    // Update the updatedLinks array
    setUpdatedLinks((prevLinks: any) => {
      // Find the existing entry for this documentId (if any)
      const existingEntryIndex = prevLinks.findIndex(
        (item: LinkCartTypes) => item?.documentId === documentId
      );

      // Get the original state of the dev-link from the data
      const previousState = data?.dev_links?.find(
        (item: any) => item?.documentId === documentId
      );

      // Check if the URL and priority are reverted to the original values
      const isReverted =
        url === previousState?.url && priority === previousState?.priority;

      if (isReverted) {
        // If reverted, remove the entry from updatedLinks
        if (existingEntryIndex !== -1) {
          const updated = [...prevLinks];
          updated.splice(existingEntryIndex, 1);
          return updated;
        }
        return prevLinks; // No changes needed
      } else {
        // If not reverted, add or update the entry
        const newEntry = {
          platform, // Update platform object
          url, // Update the URL
          documentId,
          priority,
        };

        if (existingEntryIndex !== -1) {
          // If an entry with the same documentId exists, update it
          const updated = [...prevLinks];
          updated[existingEntryIndex] = newEntry;
          return updated;
        } else {
          // If no entry exists, add the new entry
          return [...prevLinks, newEntry];
        }
      }
    });
  };

  // Handle save functionality
  const handleSave = async () => {
    try {
      const updatePromises = updatedLinks.map((item) => {
        return axios.put(
          `${URL}/dev-links/${item?.documentId}`, // Use the documentId for each dev-link
          {
            data: {
              users_permissions_users: userId,
              platform: item?.platform?.id, // Use the updated platform ID
              url: item?.url, // Use the updated URL
              priority: item?.priority,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });

      // Execute all update requests concurrently
      const responses = await Promise.all(updatePromises);

      console.log("All updates successful:", responses);

      // Refetch the data to update the UI
      refetch();

      // Clear the updatedLinks state after successful save
      setUpdatedLinks([]);
    } catch (error) {
      console.error("Error updating dev-links:", error);
    }
  };

  if (isLoading || isFetching) {
    return <LinksPageSkeleton />;
  }

  console.log("Updated Links", updatedLinks);

  console.log("Data", data);

  const isDisabled =
    updatedLinks.length === 0 ||
    validationErrors.some((error) => error) ||
    isLoading ||
    isFetching;

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
      gap={2}
      {...props}
      px={{ base: "1rem", md: "6.25rem" }}
    >
      <GridItem
        colSpan={{ base: 1, lg: 2 }}
        order={{ base: 2, lg: 1 }}
        w="100%"
        h="full"
      >
        {/* Left Part Content */}
        <LeftSection isLoading={isLoading || isFetching} data={data} />
      </GridItem>
      <GridItem
        colSpan={{ base: 1, lg: 3 }}
        order={{ base: 1, lg: 2 }}
        w="100%"
        h="full"
      >
        <OverView data={linkOverView} />
        <LinkModal refetch={refetch} data={data}>
          <AddButton>Add new link</AddButton>
        </LinkModal>

        <Box w="full" minH="300px">
          {data?.dev_links?.map((item: LinkCartTypes, i: number) => (
            <LinkCart
              handleLinkUpdate={(platform, url, priority) =>
                handleLinkUpdate(i, platform, url, item?.documentId, priority)
              }
              platform={item?.platform}
              key={i}
              index={i}
              link={item?.url}
              documentId={item?.documentId}
              refetch={refetch}
              hasError={validationErrors[i]}
              priority={item?.priority}
            />
          ))}
        </Box>
        <FlexBox justifyContent="flex-end">
          <BgButton
            onClick={handleSave}
            isLoading={isLoading || isFetching}
            isDisabled={isDisabled}
            minW="150px"
          >
            Save
          </BgButton>
        </FlexBox>
      </GridItem>
    </Grid>
  );
};

export default LinksPage;
