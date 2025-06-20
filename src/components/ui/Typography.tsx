import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {FONT_FAMILY, FONT_SIZE, FONT_WEIGHT} from '../../theme/constants';
import useTheme from '../../theme/useTheme';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button';
export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TypographyAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: string;
  align?: TypographyAlign;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  weight = 'regular',
  color,
  align = 'left',
  style,
  children,
  ...rest
}) => {
  const {theme} = useTheme();

  const textColor = color || theme.colors.text;

  const variantStyles = {
    h1: {
      fontSize: FONT_SIZE.xxxl,
      lineHeight: FONT_SIZE.xxxl * 1.2,
    },
    h2: {
      fontSize: FONT_SIZE.xxl,
      lineHeight: FONT_SIZE.xxl * 1.2,
    },
    h3: {
      fontSize: FONT_SIZE.xl,
      lineHeight: FONT_SIZE.xl * 1.2,
    },
    h4: {
      fontSize: FONT_SIZE.lg,
      lineHeight: FONT_SIZE.lg * 1.2,
    },
    h5: {
      fontSize: FONT_SIZE.md,
      lineHeight: FONT_SIZE.md * 1.2,
    },
    body1: {
      fontSize: FONT_SIZE.md,
      lineHeight: FONT_SIZE.md * 1.5,
    },
    body2: {
      fontSize: FONT_SIZE.sm,
      lineHeight: FONT_SIZE.sm * 1.5,
    },
    caption: {
      fontSize: FONT_SIZE.xs,
      lineHeight: FONT_SIZE.xs * 1.5,
    },
    button: {
      fontSize: FONT_SIZE.md,
      lineHeight: FONT_SIZE.md * 1.2,
    },
  };

  const weightStyles = {
    regular: {
      fontFamily: FONT_FAMILY.regular,
      fontWeight: FONT_WEIGHT.regular as any,
    },
    medium: {
      fontFamily: FONT_FAMILY.medium,
      fontWeight: FONT_WEIGHT.medium as any,
    },
    semibold: {
      fontFamily: FONT_FAMILY.medium,
      fontWeight: FONT_WEIGHT.semibold as any,
    },
    bold: {
      fontFamily: FONT_FAMILY.bold,
      fontWeight: FONT_WEIGHT.bold as any,
    },
  };

  const styles = StyleSheet.create({
    text: {
      color: textColor,
      textAlign: align,
      ...variantStyles[variant],
      ...weightStyles[weight],
    },
  });

  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

export default Typography;
