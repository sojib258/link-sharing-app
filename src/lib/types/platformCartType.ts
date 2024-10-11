import { IconNameOptions } from "@/components/utils/icon/Icon";

export type PlatformCartType = {
  platform: IconNameOptions; // Enforce platform to be one of IconNameOptions
  label: string;
  link: string;
  cardColor: string;
  texxtColor: string;
  iconColor: string;
};
