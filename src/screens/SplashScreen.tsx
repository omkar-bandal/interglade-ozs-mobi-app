import {useTypedSelector} from '@hooks/useTypedSelector';
import {navigate} from '@utils/NavigationUtils';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/ui/Button';

function SplashScreen() {
  const {user} = useTypedSelector(state => state.auth);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Image
            source={{uri: 'https://assets.withfra.me/Landing.3.png'}}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.title}>
              Plan your day{'\n'}with{' '}
              <View style={styles.appName}>
                <Text style={styles.appNameText}>MyApp</Text>
              </View>
            </Text>
            <Text style={styles.text}>
              Aliqua ullamco incididunt elit labore consequat ipsum sunt
              exercitation aliqua duis nulla et qui fugiat
            </Text>
          </View>

          <Button
            onPress={() => {
              const screen = user ? 'HomeTab' : 'LoginScreen';
              navigate(screen);
            }}
            label={"Let's go"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#281b52',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    color: '#9992a7',
    textAlign: 'center',
  },
  /** Hero */
  hero: {
    backgroundColor: '#d8dffe',
    margin: 12,
    borderRadius: 16,
    padding: 16,
  },
  heroImage: {
    width: '100%',
    height: '50%',
    margin: 'auto',
  },
  /** Content */
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  contentHeader: {
    paddingHorizontal: 24,
  },
  appName: {
    backgroundColor: '#fff2dd',
    transform: [
      {
        rotate: '-5deg',
      },
    ],
    paddingHorizontal: 6,
  },
  appNameText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#281b52',
  },
  /** Button */
  button: {
    backgroundColor: '#56409e',
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
});

export default SplashScreen;
