import {Container} from '@components/ui/Container';
import MainTabs from '@features/activities/components/MainTabs';
import useTheme from '@theme/useTheme';
import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

export function Activities() {
  const {theme, themeType} = useTheme();
  const styles = themeStyles(theme);
  return (
    <Container style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activities</Text>
      </View>

      <View style={styles.content}>
        <MainTabs />
      </View>
    </Container>
  );
}

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background,
    },
    header: {
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
  });
