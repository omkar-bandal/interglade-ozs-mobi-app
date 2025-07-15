import {Heading} from '@features/account/components/Heading';
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

export function Settings() {
  const {theme, themeType, setThemeType} = useTheme();

  const [form, setForm] = useState({
    theme: themeType === 'dark',
    language: false,
    sound: true,
  });

  const toggletheme = (isDark: boolean) => {
    setForm({...form, theme: isDark});
    setThemeType(isDark ? 'dark' : 'light');
  };

  const styles = themeStyles(theme);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Heading title="App Settings" />
      <View style={styles.section}>
        <View style={[styles.rowWrapper, styles.rowFirst]}>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Dark Theme</Text>
              <Text style={styles.rowDescription} />
            </View>
            <View style={styles.rowSpacer} />

            <Switch
              onValueChange={toggletheme}
              style={{transform: [{scaleX: 0.95}, {scaleY: 0.95}]}}
              value={form.theme}
            />
          </View>
        </View>

        <View style={styles.rowWrapper}>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Language</Text>
              <Text style={styles.rowDescription} />
            </View>
            <View style={styles.rowSpacer} />

            <Switch
              onValueChange={language => setForm({...form, language})}
              style={{transform: [{scaleX: 0.95}, {scaleY: 0.95}]}}
              value={form.language}
            />
          </View>
        </View>

        <View style={[styles.rowWrapper, styles.rowLast]}>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Sound</Text>
              <Text style={styles.rowDescription} />
            </View>

            <View style={styles.rowSpacer} />

            <Switch
              onValueChange={sound => setForm({...form, sound})}
              style={{transform: [{scaleX: 0.95}, {scaleY: 0.95}]}}
              value={form.sound}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const themeStyles = (theme: any) =>
  StyleSheet.create({
    section: {
      //flex: 1,
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      backgroundColor: theme.colors.background,
    },
    rowWrapper: {
      paddingLeft: 16,
      padding: SPACING.md,
      backgroundColor: theme.components.card.backgroundColor,
      borderTopWidth: 1,
      //borderColor: '#f0f0f0',
      borderBlockColor: theme.colors.border,
    },
    rowFirst: {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    row: {
      height: 44,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingRight: 12,
    },
    rowContent: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    rowLabel: {
      fontSize: 16,
      letterSpacing: 0.24,
      color: theme.colors.text,
    },
    rowDescription: {
      fontSize: 14,
      color: '#666',
      marginLeft: 8,
    },
    rowSpacer: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    rowLast: {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
  });
