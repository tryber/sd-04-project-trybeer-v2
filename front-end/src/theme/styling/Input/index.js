export default {
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  // Two variants: outline and solid
  variants: {
    flushed: {
      borderColor: 'green.500',
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
