"use client";
import { Icon, TextNormal } from "@/components";
import { colors } from "@/lib";
import {
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftAddon,
} from "@chakra-ui/react";
import { FC, useState } from "react";

type LinkInputProps = InputGroupProps & {
  value: string;
  handleUpdateUrl: (value: string) => void;
};

const LinkInput: FC<LinkInputProps> = ({
  value,
  handleUpdateUrl,
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);

    // Reset the "Copied" text after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <InputGroup size="md" {...props}>
      <InputLeftAddon
        cursor={"pointer"}
        onClick={handleCopy}
        border={`1px solid ${colors?.primary}`}
        _hover={{
          border: `1px solid ${colors?.deepPrimary}`,
        }}
      >
        {copied ? (
          <TextNormal fontSize="sm" color="green.500">
            Copied!
          </TextNormal>
        ) : (
          <Icon size={14} name="link" />
        )}
      </InputLeftAddon>
      <Input
        placeholder="mysite"
        type="text"
        value={value}
        onChange={(e) => handleUpdateUrl(e.target.value)}
        border={`1px solid ${colors?.primary}`}
        _hover={{
          border: `1px solid ${colors?.deepPrimary}`,
        }}
      />
    </InputGroup>
  );
};

export default LinkInput;
