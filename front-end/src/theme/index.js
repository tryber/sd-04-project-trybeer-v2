import { extendTheme } from '@chakra-ui/react';

import { Button, Input } from './styling';

const theme = extendTheme({
  colors: {
    basegreen: '#6DB808',
  },
  components: {
    Button,
    Input,
  },
  fonts: {
    heading: 'Roboto Slab, serif',
    body: 'Noto Sans, sans-serif',
    logo: 'Averia Serif Libre, serif',
    mono: 'Menlo, monospace',
  },
});

export default theme;
