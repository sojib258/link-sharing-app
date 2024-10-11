import { Icon } from "@/components";
import { colors } from "@/lib";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

const LinkInput = () => {
  return (
    <InputGroup size="md">
      <InputLeftAddon>
        <Icon size={14} name="link" />
      </InputLeftAddon>
      <Input
        focusBorderColor={colors.lightPrimary}
        _focus={{ border: "none", outline: "none" }}
        placeholder="mysite"
      />
    </InputGroup>
  );
};

export default LinkInput;
