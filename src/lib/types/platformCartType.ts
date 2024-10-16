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
    platform: IconNameOptions;
    label: string;
    cardColor: string;
    textColor: string;
    iconColor: string;
    urlPattern: string;
  };
};
