import { Input, InputProps } from '@chakra-ui/react';
import { FC } from 'react';

type SearchInputProps = InputProps & {
	type: string;
	placeholder?: string;
};

const SearchInput: FC<SearchInputProps> = ({ type, placeholder, ...props }) => {
	return (
		<Input
			type={type}
			w='full'
			borderRadius='1.5rem'
			placeholder={placeholder}
			size='lg'
			mb='16px'
			pr='3.5rem'
			{...props}
		/>
	);
};

export default SearchInput;
