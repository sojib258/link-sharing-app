import { Flex, FlexProps } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

type FlexBoxProps = FlexProps & {
	children: ReactNode;
};

const FlexBox: FC<FlexBoxProps> = ({ children, ...props }) => {
	return (
		<Flex w='full' h='auto' {...props}>
			{children}
		</Flex>
	);
};

export default FlexBox;
