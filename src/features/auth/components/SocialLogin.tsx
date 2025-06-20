import {useSocialLogin} from '@hooks/api/auth.rq';
import React, {useEffect} from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DEEP_LINK_SCHEME = 'https://wrcluqeamjnzjmpwxiet.supabase.co';
const REDIRECT_URL = `${DEEP_LINK_SCHEME}://auth-callback`;

const SocialLogin = () => {
  const {mutateAsync: socialLogin} = useSocialLogin();
  useEffect(() => {
    // Add deep link listener for auth callback
    const handleDeepLink = async (event: any) => {
      const url = event.url;

      if (url && url.startsWith(DEEP_LINK_SCHEME)) {
        if (url.includes('auth-callback')) {
          const accessToken = extractAccessTokenFromUrl(url);
          if (accessToken) {
            await handleAuthCallback(accessToken);
          }
        }
      }
    };

    // Set up deep link handler
    if (Platform.OS === 'ios') {
      Linking.addEventListener('url', handleDeepLink);
    } else {
      // For Android
      const subscription = Linking.addListener('url', handleDeepLink);

      // Check if app was opened with a deep link
      Linking.getInitialURL().then(url => {
        if (url) {
          handleDeepLink({url});
        }
      });

      return () => {
        // Clean up
        if (subscription) {
          subscription.remove();
        }
      };
    }
  }, []);

  const extractAccessTokenFromUrl = (url: string) => {
    // Extract access_token from the URL
    const params = url.split('#')[1];
    if (!params) {
      return null;
    }

    const paramPairs = params.split('&');
    for (const pair of paramPairs) {
      const [key, value] = pair.split('=');
      if (key === 'access_token') {
        return value;
      }
    }
    return null;
  };

  const handleAuthCallback = async (accessToken: any) => {
    console.log('acessToke', accessToken);
  };

  const signInWithGoogle = async () => {
    const result = await socialLogin({
      provider: 'google',
      redirectUrl: REDIRECT_URL,
    });
    if (result?.data.url) {
      await Linking.openURL(result.data.url);
    }
    console.log('result', result);
  };

  const signInWithFacebook = async () => {
    const result = await socialLogin({
      provider: 'facebook',
      redirectUrl: REDIRECT_URL,
    });
    if (result?.data.url) {
      await Linking.openURL(result.data.url);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={signInWithGoogle}
        disabled={false}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.facebookButton]}
        onPress={signInWithFacebook}
        disabled={false}>
        <Text style={styles.buttonText}>Sign in with Facebook</Text>
      </TouchableOpacity>

      {/* {loading && <Text style={styles.loadingText}>Loading...</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: 250,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center',
  },
  userContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
  },
  signOutText: {
    color: 'white',
  },
});

export default SocialLogin;
