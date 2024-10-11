import { TextNormal } from "@/components/utils";
import Icon from "@/components/utils/icon/Icon";
import { colors } from "@/lib";
import { selectOptions } from "@/lib/config/data";
import { Flex } from "@chakra-ui/react";
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
        {data.label}
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
        {data.label}
      </TextNormal>
    </Flex>
  );
};

// Main component with the custom select
const SelectBox = () => {
  // Handle value change and get the selected platform
  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      console.log("Selected Platform:", selectedOption.platform);
    }
  };

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      placeholder="Select a platform" // Default selected option
      isClearable={true}
      //   isSearchable={false}
      name="platform"
      options={selectOptions}
      components={{ Option: CustomOption, SingleValue: CustomSingleValue }} // Custom option and single value renderer
      getOptionLabel={(option) => option.label} // Return the label for selection
      getOptionValue={(option) => option.platform} // Ensure the value is based on platform
      onChange={handleChange} // Handle the value change
    />
  );
};

export default SelectBox;
