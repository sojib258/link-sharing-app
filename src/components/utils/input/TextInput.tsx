import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";

type TextInputProps = FormControlProps & {
  label?: string;
  type: string;
  name: string;
  errorMsg?: string;
  value: any;
  placeholder?: string;
  handleChange: (key: string, value: string) => void;
  isRequired?: boolean;
  submitted?: boolean;
  fieldKey: string;
};

const TextInput: FC<TextInputProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  handleChange,
  isRequired = false,
  fieldKey,
  ...props
}) => {
  return (
    <FormControl
      isRequired={isRequired}
      display="flex"
      h="full"
      alignItems="center"
      {...props}
    >
      <FormLabel minW="10rem">{label}</FormLabel>
      <Input
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e) => handleChange(fieldKey, e.target.value)}
      />
    </FormControl>
  );
};

export default TextInput;
