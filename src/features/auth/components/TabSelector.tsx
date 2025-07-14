import {SPACING} from '@theme/constants';
import darkTheme from '@theme/light';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type TabProps = {
  selectedTab: 'Login' | 'SignUp';
  onTabSelect: (tab: 'Login' | 'SignUp') => void;
};

const Tab: React.FC<TabProps> = ({selectedTab, onTabSelect}) => {
  return (
    <View style={styles.loginSignupTextContent}>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'Login' ? styles.tabUnderline : styles.underline,
        ]}
        onPress={() => onTabSelect('Login')}>
        <Text
          style={[
            styles.tabText,
            selectedTab === 'Login' && {color: darkTheme.colors.textSecondary},
          ]}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'SignUp' ? styles.tabUnderline : styles.underline,
        ]}
        onPress={() => onTabSelect('SignUp')}>
        <Text
          style={[
            styles.tabText,
            selectedTab === 'SignUp' && {
              color: darkTheme.colors.textSecondary,
            },
          ]}>
          SignUp
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  loginSignupTextContent: {
    width: '100%',
    paddingTop: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tab: {
    width: '50%',
    alignItems: 'center',
    paddingBottom: SPACING.sm,
  },
  tabUnderline: {
    borderBottomColor: darkTheme.colors.primary,
    borderBottomWidth: 4,
    borderStyle: 'solid',
  },
  underline: {
    borderBottomColor: darkTheme.colors.secondaryLight,
    borderBottomWidth: 1,
  },
  tabText: {
    fontSize: 28,
    fontWeight: '500',
    color: darkTheme.colors.textTertiary,
  },
});
