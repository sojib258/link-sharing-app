export type PlatformCartType = {
  id: number;
  documentId: string;
  platform: IconNameOptions;
  label: string;
  cardColor: string;
  textColor: string;
  iconColor: string;
  urlPattern: string;
};

import { IconNameOptions } from "@/components/utils/icon/Icon";

export type LinkCartTypes = {
  id: number;
  documentId: string;
  url: string;
  priority: number;
  platform: {
    id: number;
    documentId: string;
    platform: IconNameOptions; // like-github, youtube, facebook
    label: string;
    cardColor: string;
    textColor: string;
    iconColor: string;
    urlPattern: string;
  };
};

export type ImageType = {
  id: number;
  documentId: number;
  width: number;
  height: number;
  url: string;
};

export type UserDetailsType = {
  id: number;
  documentId: string;
  firstname: string;
  lastname: string;
  email: string;
  image: ImageType;
  dev_links: LinkCartTypes[];
};
