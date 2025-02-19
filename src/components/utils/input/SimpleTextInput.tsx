import { colors } from "@/lib";
import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";

type SimpleTextInputProps = FormControlProps & {
  label?: string;
  type: any;
  name: string;
  errorMsg?: string;
  value: any;
  placeholder?: any;
  handleChange: (value: string) => void;
  isRequired?: boolean;
  submitted?: boolean;
  labelStyle?: any;
};

const SimpleTextInput: FC<SimpleTextInputProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  handleChange,
  isRequired = false,
  labelStyle,
  ...props
}) => {
  return (
    <FormControl
      isRequired={isRequired}
      display="flex"
      h="full"
      alignItems={"center"}
      {...props}
    >
      <FormLabel sx={labelStyle}>{label}</FormLabel>
      <Input
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        minW="100px"
        border={`1px solid ${colors?.primary}`}
        _hover={{
          border: `1px solid ${colors?.deepPrimary}`,
        }}
      />
    </FormControl>
  );
};

export default SimpleTextInput;
