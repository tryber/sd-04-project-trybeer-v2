import { extendTheme } from '@chakra-ui/react';

import { Button, Input, Heading } from './styling';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        height: '100%',
      },
    },
  },
  colors: {
    basegreen: '#6DB808',
  },
  components: {
    Button,
    Input,
    Heading,
  },
  fonts: {
    heading: 'Roboto Slab, serif',
    body: 'Noto Sans, sans-serif',
    logo: 'Averia Serif Libre, serif',
    mono: 'Menlo, monospace',
  },
});

export default theme;
