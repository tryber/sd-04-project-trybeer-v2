export default {
  // The styles all button have in common
  baseStyle: {
    fontFamily: 'body',
    letterSpacing: 'wider',
    textTransform: 'uppercase',
    borderRadius: 'full',
    ':hover': {
      color: 'basegreen',
      bg: 'white',
    },
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
      borderColor: 'white',
      color: 'white',
    },
    solid: {
      border: '2px solid',
      borderColor: 'white',
      bg: 'white',
      color: 'basegreen',
      ':hover': {
        border: '2px solid',
        borderColor: 'white',
        color: 'white',
        bg: 'basegreen',
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
};
