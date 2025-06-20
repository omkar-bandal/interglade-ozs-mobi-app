const lightTheme = {
  colors: {
    // Primary colors - Using your #FFC163 as the primary color
    primary: '#FFC163',
    primaryLight: '#FFDB99', // Lighter version of your color
    primaryDark: '#E6A43D', // Darker version of your color

    // Secondary colors - Complementary blues that work well with amber
    secondary: '#63A9FF', // Complementary blue
    secondaryLight: '#99CDFF',
    secondaryDark: '#3D85E6',

    // Accent colors - A subtle purple accent that pairs nicely with amber
    accent: '#8963FF',
    accentLight: '#B299FF',
    accentDark: '#6A3DE6',

    // Feedback colors - Slightly adjusted for harmony
    success: '#40CC6F',
    error: '#FF5147',
    warning: '#FFBC00', // Darker amber for warnings
    info: '#63C8FF',

    // Neutral colors
    background: '#FFFFFF',
    card: '#FAF7F2', // Subtle warm undertone
    border: '#EDE5D6', // Warm-tinted border

    // Text colors - Warmer black to complement amber
    text: '#292523',
    textSecondary: '#5F534A',
    textTertiary: '#8E8578',
    textDisabled: '#C7C2B8',

    // Inverse colors (for dark elements)
    textInverse: '#FFFFFF',
    backgroundInverse: '#2D2820', // Warmer dark background

    // Transparent colors
    transparent: 'transparent',
    overlay: 'rgba(41, 37, 35, 0.5)',
    shadow: 'rgba(41, 37, 35, 0.1)',

    white: '#fff',
    lightGray: '#F5F5F5',
    gray: '#B0B0B0',
    darkGray: '#7D7D7D',
  },

  // Component-specific styles
  components: {
    input: {
      background: '#FFFFFF',
      border: '#EDE5D6', // Matching border color
      placeholderColor: '#8E8578', // Matching tertiary text
    },
    button: {
      primaryBackground: '#FFC163', // Your color
      secondaryBackground: 'transparent',
      disabledBackground: '#EDE5D6',
      textColor: '#FFF', // Dark text on amber buttons
      secondaryTextColor: '#FFC163', // Your color
      disabledTextColor: '#C7C2B8',
    },
    card: {
      backgroundColor: '#FFFFFF',
      shadowColor: 'rgba(41, 37, 35, 0.1)',
    },
  },
};

export default lightTheme;
