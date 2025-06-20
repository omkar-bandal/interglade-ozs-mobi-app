import React, {forwardRef, useMemo, useState} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import {BORDER_RADIUS, FONT_SIZE, SPACING} from '../../theme/constants';
import useTheme from '../../theme/useTheme';
import {Typography} from './Typography';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: any;
  inputWrapperStyle?: any;
  multiline?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      onRightIconPress,
      containerStyle,
      inputWrapperStyle,
      style,
      placeholder,
      value,
      multiline,
      size = 'medium',
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const {theme} = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus && onFocus(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur && onBlur(e);
    };

    // Size mappings
    const sizeStyles = useMemo(
      () => ({
        small: {
          paddingVertical: SPACING.xs,
          borderRadius: BORDER_RADIUS.sm,
          fontSize: FONT_SIZE.sm,
          height: 32,
        },
        medium: {
          paddingVertical: SPACING.sm,
          borderRadius: BORDER_RADIUS.md,
          fontSize: FONT_SIZE.md,
          height: 44,
        },
        large: {
          paddingVertical: SPACING.md,
          borderRadius: BORDER_RADIUS.md,
          fontSize: FONT_SIZE.lg,
          height: 56,
        },
      }),
      [],
    );

    const styles = StyleSheet.create({
      container: {
        width: '100%',
        marginBottom: SPACING.md,
      },
      label: {
        marginBottom: SPACING.xs,
      },
      inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: error
          ? theme.colors.error
          : isFocused
          ? theme.colors.primary
          : theme.components.input.border,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: theme.components.input.background,
        paddingHorizontal: SPACING.md,
      },
      input: {
        flex: 1,
        color: theme.colors.text,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'normal',
        ...sizeStyles[size],
      },
      leftIconContainer: {
        marginRight: SPACING.sm,
      },
      rightIconContainer: {
        marginLeft: SPACING.sm,
      },
      error: {
        marginTop: SPACING.xs,
        color: theme.colors.error,
      },
      helperText: {
        marginTop: SPACING.xs,
        color: theme.colors.textTertiary,
      },
      multilineInput: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 12,
        paddingBottom: 12,
      },
    });

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Typography
            variant="body2"
            weight="medium"
            style={styles.label}
            color={theme.colors.textSecondary}>
            {label}
          </Typography>
        )}

        <View style={[styles.inputWrapper, inputWrapperStyle]}>
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            style={[styles.input, multiline && styles.multilineInput, style]}
            placeholder={placeholder}
            placeholderTextColor={theme.components.input.placeholderColor}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            selectionColor={theme.colors.primary}
            multiline={multiline}
            {...rest}
          />

          {rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
              style={styles.rightIconContainer}>
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>

        {error && (
          <Typography variant="caption" style={styles.error}>
            {error}
          </Typography>
        )}

        {helperText && !error && (
          <Typography variant="caption" style={styles.helperText}>
            {helperText}
          </Typography>
        )}
      </View>
    );
  },
);

export default Input;
