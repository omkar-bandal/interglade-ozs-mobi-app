import {useTypedSelector} from '@hooks/useTypedSelector';
import useTheme from '@theme/useTheme';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

interface TabBarIconProps {
  route: {name: string};
  focused: boolean;
  color: string;
  size: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({
  route,
  focused,
  color,
  size,
}) => {
  let iconName = '';

  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Publish':
      iconName = focused ? 'add-circle' : 'add-circle-outline';
      break;
    case 'Activity':
      iconName = focused ? 'cash' : 'cash-outline';
      break;
    case 'Messaging':
      iconName = focused ? 'chatbubble' : 'chatbubble-outline';
      break;
    case 'Account':
      iconName = focused ? 'person' : 'person-outline';
      break;
  }

  return (
    <Icon name={iconName} size={focused ? size + 2 : size} color={color} />
  );
};

export const CustomTabBar: React.FC<any> = ({
  state,
  descriptors,
  navigation,
}) => {
  const {user} = useTypedSelector(state => state.auth);
  const {theme} = useTheme();
  const tabWidth = width / state.routes.length;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: state.index * tabWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [state.index, tabWidth, translateX]);

  const styles = StyleSheet.create({
    tabBarContainer: {
      flexDirection: 'row',
      height: 60,
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.backgroundInverse,
      shadowOffset: {
        width: 0,
        height: -4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 8,
      position: 'relative',
      ...Platform.select({
        ios: {
          paddingBottom: 20, // For iOS safe area
        },
      }),
    },
    tabButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    disabled: {
      opacity: 0.5,
    },
    indicator: {
      height: 3,
      backgroundColor: theme.colors.primary,
      position: 'absolute',
      top: 0,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
  });

  return (
    <View style={styles.tabBarContainer}>
      <Animated.View
        style={[
          styles.indicator,
          {
            width: tabWidth,
            transform: [{translateX}],
          },
        ]}
      />

      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const disabled = !user && route.name !== 'Home';

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            disabled={disabled}
            style={[disabled && styles.disabled, styles.tabButton]}>
            <TabBarIcon
              route={route}
              focused={isFocused}
              color={isFocused ? theme.colors.primary : theme.colors.text}
              size={24}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
