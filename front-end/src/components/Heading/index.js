/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Heading, useStyleConfig } from '@chakra-ui/react';

export default function (props) {
  const { size, ...rest } = props;

  // 2. Reference `Button` stored in `theme.components`
  const styles = useStyleConfig('Button', { size });

  // 3. Pass the computed styles into the `sx` prop
  return (<Heading
    sx={ styles }
    { ...rest }
  />);
}
