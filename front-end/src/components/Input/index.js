/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Input, useStyleConfig } from '@chakra-ui/react';

export default function (props) {
  const { variant, ...rest } = props;

  // 2. Reference `Button` stored in `theme.components`
  const styles = useStyleConfig('Input', { variant });

  // 3. Pass the computed styles into the `sx` prop
  return <Input sx={ styles } _placeholder={ { color: 'rgba(255, 255, 255, 0.6)' } } { ...rest } />;
}
