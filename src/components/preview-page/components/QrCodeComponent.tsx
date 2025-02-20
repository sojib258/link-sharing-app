"use client";
import { BgButton } from "@/components";
import { Center, FlexProps } from "@chakra-ui/react";
import { QRCodeCanvas } from "qrcode.react";
import PreviewCartConatiner from "./PreviewCartContainer";

type QRCodeComponentProps = FlexProps & {
  link: string;
};

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({
  link,
  ...props
}) => {
  const downloadQR = () => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <PreviewCartConatiner {...props}>
      <Center w="200px" h="auto" flexDir="column" gap={8}>
        <QRCodeCanvas value={link} size={150} />
        <BgButton onClick={downloadQR}>Download QR</BgButton>
      </Center>
    </PreviewCartConatiner>
  );
};

export default QRCodeComponent;
