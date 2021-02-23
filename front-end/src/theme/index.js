import { extendTheme } from '@chakra-ui/react';

import { Button, Input } from './styling';

const theme = extendTheme({
  components: {
    Button,
    Input,
  },
  colors: {
    brand: {
      100: '#f7fafc',
      900: '#1a202c',
    },
  },
});

export default theme;
