export default {
  // The styles all button have in common
  baseStyle: {
    color: 'white',
    fontFamily: 'body',
    textTransform: 'uppercase',
  },
  // Two variants: outline and solid
  variants: {
    flushed: {
      borderColor: 'white',
      color: 'white',
    },
    solid: {
      bg: 'green.500',
      color: 'white',
    },
  },
  // The default size and variant values
  defaultProps: {
    variant: 'flushed',
  },
};
