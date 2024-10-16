import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";

type LabelInputProps = FormControlProps & {
  type: string;
  value: string;
  fieldKey: string;
  label?: string;
  placeholder?: string;
  handleChange: (key: string, value: string) => void;
  isRequired?: boolean;
};

const LabelInput: FC<LabelInputProps> = ({
  type,
  value,
  fieldKey,
  label,
  handleChange,
  placeholder,
  isRequired,
  ...props
}) => {
  return (
    <FormControl
      isRequired={isRequired}
      w="full"
      h="auto"
      mb="1.5rem"
      {...props}
    >
      <FormLabel>{label}</FormLabel>
      <Input
        value={value}
        onChange={(e: any) => handleChange(fieldKey, e.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </FormControl>
  );
};

export default LabelInput;
