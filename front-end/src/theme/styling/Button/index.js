export default {
  // The styles all button have in common
  baseStyle: {
    fontFamily: 'body',
    letterSpacing: 'wider',
    textTransform: 'uppercase',
    borderRadius: 'full',
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: '12px',
      padding: '16px',
    },
    md: {
      fontSize: '16px',
      padding: '24px',
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'red.500',
    },
    solid: {
      bg: 'red.500',
      color: 'white',
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
};
