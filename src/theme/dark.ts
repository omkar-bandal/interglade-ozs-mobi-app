const darkTheme = {
  colors: {
    // Primary colors
    primary: '#80CBC4',
    primaryLight: '#5EACFF',
    primaryDark: '#0055A6',

    // Secondary colors
    secondary: '#7D74FF',
    //secondaryLight: '#B0ABFF',
    secondaryLight: '#E9F9F8',
    secondaryDark: '#5B52CC',

    // Accent colors
    accent: '#FF9F0A',
    accentLight: '#FFB340',
    accentDark: '#CC7A00',

    // Feedback colors
    success: '#30D158',
    error: '#FF453A',
    warning: '#FFD60A',
    info: '#64D2FF',

    // Neutral colors
    background: '#1C1C1E',
    card: '#2C2C2E',
    border: '#38383A',

    // Text colors
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textTertiary: '#EBEBF599', // 60% opacity
    textDisabled: '#EBEBF54D', // 30% opacity

    // Inverse colors (for light elements)
    textInverse: '#000000',
    backgroundInverse: '#FFFFFF',

    // Transparent colors
    transparent: 'transparent',
    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },

  // Component-specific styles
  components: {
    input: {
      background: '#2C2C2E',
      border: '#38383A',
      placeholderColor: '#EBEBF599', // 60% opacity
    },
    button: {
      primaryBackground: '#80CBC4',
      secondaryBackground: 'transparent',
      disabledBackground: '#38383A',
      textColor: '#FFFFFF',
      secondaryTextColor: '#0A84FF',
      disabledTextColor: '#EBEBF54D', // 30% opacity
    },
    card: {
      backgroundColor: '#2C2C2E',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
};

export default darkTheme;
