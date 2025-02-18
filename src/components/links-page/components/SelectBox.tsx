import { TextNormal } from "@/components/utils";
import Icon from "@/components/utils/icon/Icon";
import { colors } from "@/lib";
import { LinkCartTypes } from "@/lib/types/platformCartType";
import { useGetAllPlatformQuery } from "@/store/services/platformApi";
// import { selectOptions } from "@/lib/config/data";
import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import Select, { SingleValueProps } from "react-select";

// Custom option component to display the icon and label
const CustomOption = (props: any) => {
  const { data, innerRef, innerProps } = props;
  return (
    <Flex
      _hover={{ backgroundColor: colors.lightPrimary }}
      ref={innerRef}
      {...innerProps}
      align="center"
      cursor="pointer"
      p={2}
    >
      <Icon name={data?.platform} size={18} />
      <TextNormal fontSize=".92rem" ml={2}>
        {data?.label}
      </TextNormal>
    </Flex>
  );
};

// Custom single value component to display the icon and label when selected
const CustomSingleValue = (props: SingleValueProps<any>) => {
  const { data } = props;
  return (
    <Flex align="center" bg="danger">
      <Icon name={data?.platform} size={18} />
      <TextNormal fontSize=".92rem" ml={2}>
        {data?.label}
      </TextNormal>
    </Flex>
  );
};

// Main component with the custom select

type SelectBoxProps = {
  defaultValue?: any;
  handleUpdatePlatform: (value: LinkCartTypes["platform"]) => void;
};

const SelectBox: FC<SelectBoxProps> = ({
  handleUpdatePlatform,
  defaultValue,
}) => {
  const { isLoading, data } = useGetAllPlatformQuery(undefined);
  console.log("SelectBoxData", data);

  // Handle value change and get the selected platform
  const handleChange = (selectedOption: any) => {
    console.log("Se", selectedOption);
    if (selectedOption) {
      handleUpdatePlatform(selectedOption);
    }
  };

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      placeholder="Select a platform"
      isClearable={true}
      name="platform"
      options={data?.data}
      components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.platform}
      onChange={handleChange}
      defaultValue={defaultValue}
    />
  );
};

export default SelectBox;
