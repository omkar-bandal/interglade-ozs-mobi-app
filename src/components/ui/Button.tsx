import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {BORDER_RADIUS, SPACING} from '../../theme/constants';
import useTheme from '../../theme/useTheme';
import {Typography} from './Typography';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'destructive'
  | 'success';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  label,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  disabled = false,
  children,
  ...rest
}) => {
  const {theme} = useTheme();

  // Size mappings
  const sizeStyles = useMemo(
    () => ({
      small: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: leftIcon && !label ? SPACING.xs : SPACING.sm,
        borderRadius: BORDER_RADIUS.sm,
        height: 32,
      },
      medium: {
        paddingVertical: SPACING.sm,
        paddingHorizontal: leftIcon && !label ? SPACING.sm : SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        height: 44,
      },
      large: {
        paddingVertical: SPACING.md,
        paddingHorizontal: leftIcon && !label ? SPACING.md : SPACING.lg,
        borderRadius: BORDER_RADIUS.md,
        height: 56,
      },
    }),
    [leftIcon, label],
  );

  // Variant mappings
  const getStyles = useMemo(() => {
    const variants = {
      primary: {
        backgroundColor: disabled
          ? theme.components.button.disabledBackground
          : theme.components.button.primaryBackground,
        borderWidth: 0,
        borderColor: disabled
          ? theme.components.button.disabledBackground
          : theme.components.button.primaryBackground,
        textColor: disabled
          ? theme.components.button.disabledTextColor
          : theme.components.button.textColor,
      },
      secondary: {
        backgroundColor: theme.colors.secondaryLight,
        //backgroundColor: 'red',
        borderWidth: 0,
        borderColor: theme.colors.secondaryLight,
        textColor: theme.colors.textButton,
      },
      destructive: {
        backgroundColor: theme.colors.error,
        borderWidth: 0,
        borderColor: theme.colors.error,
        textColor: theme.colors.white,
      },
      success: {
        backgroundColor: theme.colors.success,
        borderWidth: 0,
        borderColor: theme.colors.success,
        textColor: theme.colors.white,
      },
      outline: {
        backgroundColor: theme.colors.transparent,
        borderWidth: 1,
        borderColor: disabled
          ? theme.components.button.disabledBackground
          : theme.components.button.primaryBackground,
        textColor: disabled
          ? theme.components.button.disabledTextColor
          : theme.components.button.primaryBackground,
      },
      ghost: {
        backgroundColor: theme.colors.transparent,
        borderWidth: 0,
        borderColor: disabled
          ? theme.components.button.disabledBackground
          : theme.components.button.primaryBackground,
        textColor: disabled
          ? theme.components.button.disabledTextColor
          : theme.components.button.primaryBackground,
      },
      link: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
        textColor: disabled
          ? theme.components.button.disabledTextColor
          : theme.components.button.primaryBackground,
      },
    };

    return variants[variant];
  }, [theme, variant, disabled]);

  const buttonStyles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: getStyles.backgroundColor,
      borderWidth: getStyles.borderWidth,
      borderColor: getStyles.borderColor,
      ...sizeStyles[size],
      width: fullWidth ? '100%' : undefined,
      opacity: disabled ? 0.7 : 1,
      minWidth: leftIcon && !label ? sizeStyles[size].height : undefined,
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftIcon: {
      marginRight: label ? SPACING.xs : 0,
    },
    rightIcon: {
      marginLeft: label ? SPACING.xs : 0,
    },
    link: {
      padding: 0,
      height: undefined,
      backgroundColor: 'transparent',
    },
  });

  const isLink = variant === 'link';
  const isIconOnly = leftIcon && !label && !children;

  return (
    <TouchableOpacity
      style={[
        buttonStyles.button,
        isLink && buttonStyles.link,
        isIconOnly ? {aspectRatio: 1} : undefined,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={getStyles.textColor} />
      ) : (
        <View style={buttonStyles.contentContainer}>
          {leftIcon && <View style={buttonStyles.leftIcon}>{leftIcon}</View>}

          {label && (
            <Typography
              variant="button"
              weight="medium"
              color={getStyles.textColor}>
              {label}
            </Typography>
          )}

          {children}

          {rightIcon && <View style={buttonStyles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
