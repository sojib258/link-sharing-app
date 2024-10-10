import { Text, TextProps } from '@chakra-ui/react'
import React, { FC } from 'react'

type CartTitleProps = TextProps&{
    children: string;
}

const CartTitle:FC<CartTitleProps> = ({children, ...props}) => {
  return (
    <Text
      {...props}
    >
      {children}
    </Text>
  )
}

export default CartTitle