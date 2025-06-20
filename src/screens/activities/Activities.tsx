import {Container} from '@components/ui/Container';
import MainTabs from '@features/activities/components/MainTabs';
import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

export function Activities() {
  return (
    <Container style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activities</Text>
      </View>

      <View style={styles.content}>
        <MainTabs />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
