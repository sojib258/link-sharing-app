"use client";
import { FC } from "react";
import { BsInstagram } from "react-icons/bs";
import {
  FaDiscord,
  FaEnvelope,
  FaFacebookSquare,
  FaGithub,
  FaLinkedin,
  FaPinterest,
  FaQuora,
  FaReddit,
  FaRegUserCircle,
  FaSnapchat,
  FaTelegram,
  FaTwitterSquare,
} from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { HiBars2 } from "react-icons/hi2";
import {
  IoIosArrowDown,
  IoLogoYoutube,
  IoMdHeartDislike,
} from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { MdOutlineCloudUpload } from "react-icons/md";
import { PiEyeBold } from "react-icons/pi";
import { SiTiktok } from "react-icons/si";

export type IconNameOptions =
  | "add"
  | "link"
  | "eye"
  | "user"
  | "github"
  | "youtube"
  | "linkedin"
  | "twitter"
  | "facebook"
  | "gmail"
  | "instagram"
  | "arrow-right"
  | "bar-two"
  | "down-arrow"
  | "discord"
  | "pinterest"
  | "quora"
  | "tiktok"
  | "likee"
  | "snapchat"
  | "reddit"
  | "telegram"
  | "douyin"
  | "upload";

type IconProps = {
  size?: number;
  color?: string;
  name: IconNameOptions;
};

const icons: { [key in IconNameOptions]: FC<{ size: number; color: string }> } =
  {
    add: IoAdd,
    link: FaLink,
    eye: PiEyeBold,
    user: FaRegUserCircle,
    github: FaGithub,
    youtube: IoLogoYoutube,
    linkedin: FaLinkedin,
    twitter: FaTwitterSquare,
    facebook: FaFacebookSquare,
    gmail: FaEnvelope,
    instagram: BsInstagram,
    "arrow-right": FiArrowRight,
    "bar-two": HiBars2,
    "down-arrow": IoIosArrowDown,
    upload: MdOutlineCloudUpload,
    discord: FaDiscord,
    pinterest: FaPinterest,
    quora: FaQuora,
    tiktok: SiTiktok,
    likee: IoMdHeartDislike,
    snapchat: FaSnapchat,
    reddit: FaReddit,
    telegram: FaTelegram,
    douyin: SiTiktok,
  };

const Icon: FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = icons[name] || IoAdd;
  return (
    <IconComponent
      size={props.size || 22}
      color={props.color || "#000"}
      {...props}
    />
  );
};

export default Icon;
