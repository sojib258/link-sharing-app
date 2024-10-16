import { Icon } from "@/components";
import { colors } from "@/lib";
import {
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftAddon,
} from "@chakra-ui/react";
import { FC } from "react";

type LinkInputProps = InputGroupProps & {
  value: string;
  handleUpdateUrl: (value: string) => void;
};

const LinkInput: FC<LinkInputProps> = ({
  value,
  handleUpdateUrl,
  ...props
}) => {
  return (
    <InputGroup size="md" {...props}>
      <InputLeftAddon>
        <Icon size={14} name="link" />
      </InputLeftAddon>
      <Input
        focusBorderColor={colors.lightPrimary}
        _focus={{ border: "none", outline: "none" }}
        placeholder="mysite"
        type="text"
        value={value}
        onChange={(e) => handleUpdateUrl(e.target.value)}
      />
    </InputGroup>
  );
};

export default LinkInput;
