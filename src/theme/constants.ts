import {Dimensions} from 'react-native';
import darkTheme from './dark';
import lightTheme from './light';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

// Font sizes
export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

// Border radius
export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Font weights
export const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

// Font families - customize based on your design
export const FONT_FAMILY = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

// Animation durations
export const ANIMATION = {
  fast: 200,
  normal: 300,
  slow: 500,
};

// Z-index values
export const Z_INDEX = {
  base: 1,
  card: 10,
  drawer: 20,
  modal: 30,
  overlay: 40,
  tooltip: 50,
};

export type Theme = typeof lightTheme;

export {darkTheme, lightTheme};
