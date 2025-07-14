import React, {ReactNode, useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Button from './ui/Button';
import useTheme from '@theme/useTheme';

const {height} = Dimensions.get('window');

type ActionSheetOption = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  destructive?: boolean;
  onPress: () => void;
};

interface ActionSheetProps {
  visible: boolean;
  title?: string;
  message?: string;
  options?: ActionSheetOption[];
  cancelButtonLabel?: string;
  onCancel: () => void;
  children?: ReactNode;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  title,
  message,
  options,
  onCancel,
  children,
}) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const {theme} = useTheme();
  const styles = useMemo(() => themeStyles(theme), [theme]);
  //const styles = themeStyles(theme);
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, opacity]);

  const handleOptionPress = (option: ActionSheetOption) => {
    option.onPress();
    onCancel();
  };

  const handleClose = () => {
    onCancel();
  };

  // Calculate content height for smooth animation
  const maxOptionsHeight = options
    ? Math.min(options.length * 60, height * 0.5)
    : height * 0.5;

  if (!visible) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={[styles.backdrop, {opacity}]} />
      </TouchableWithoutFeedback>

      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.sheetContainer,
            {
              transform: [{translateY: translateY}],
            },
          ]}>
          {/* Sheet Handle */}
          <View style={styles.handle}>
            <View style={styles.indicator} />
          </View>

          <View style={styles.headerContainer}>
            <View style={styles.titleWrapper}>
              {title && <Text style={styles.title}>{title}</Text>}
              {message && <Text style={styles.message}>{message}</Text>}
            </View>
            <Button label="X" onPress={onCancel} variant="ghost" />
          </View>

          {/* Options Section */}
          <ScrollView
            style={[styles.optionsContainer, {maxHeight: maxOptionsHeight}]}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            {options &&
              options.map((option, index) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.option,
                    index === options.length - 1 && styles.lastOption,
                  ]}
                  onPress={() => handleOptionPress(option)}
                  activeOpacity={0.7}>
                  <View style={styles.optionContent}>
                    {option.icon && (
                      <View style={styles.iconContainer}>{option.icon}</View>
                    )}
                    <Text
                      style={[
                        styles.optionText,
                        option.destructive && styles.destructiveText,
                      ]}>
                      {option.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            {children}
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      //backgroundColor: 'red',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    sheetContainer: {
      backgroundColor: theme.components.card.backgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: Platform.OS === 'ios' ? 30 : 20,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -3},
          shadowOpacity: 0.18,
          shadowRadius: 5,
        },
        android: {
          elevation: 24,
        },
      }),
    },
    handle: {
      alignSelf: 'center',
      paddingVertical: 12,
    },
    indicator: {
      width: 40,
      height: 5,
      borderRadius: 3,
      backgroundColor: '#DDDDDD',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    titleWrapper: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      //color: theme.colors.text,
      color: theme.colors.text,
      marginBottom: 8,
    },
    message: {
      fontSize: 14,
      color: '#fff',
      lineHeight: 20,
    },
    optionsContainer: {
      paddingHorizontal: 16,
    },
    option: {
      paddingVertical: 16,
      marginHorizontal: 4,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#EEEEEE',
    },
    lastOption: {
      borderBottomWidth: 0,
    },
    optionContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      marginRight: 12,
    },
    optionText: {
      fontSize: 16,
      color: '#007AFF',
      fontWeight: '500',
    },
    destructiveText: {
      color: '#FF3B30',
    },
  });
