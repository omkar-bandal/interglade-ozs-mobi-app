import Button from '@components/ui/Button';
import {useFbLogin, useSetSession} from '@hooks/api/auth.rq';
import {useActions} from '@hooks/useActions';
import {configureFacebookSDK} from '@lib/fbsdk-next/fbsdk-next';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import {useEffect} from 'react';
import {Linking, Platform} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/AntDesign';

export default function FBLogin() {
  const {theme} = useTheme();
  const {setUser, setSession} = useActions();
  const {mutateAsync: fbLogin, isPending} = useFbLogin();
  const {mutateAsync: setFbSession, isPending: isSessionLoadingPending} =
    useSetSession();

  const extractTokensFromUrl = (url: string) => {
    // Extract tokens from the URL
    const params = url.split('#')[1];
    if (!params) {
      return {accessToken: null, refreshToken: null};
    }

    const paramPairs = params.split('&');
    let accessToken = null;
    let refreshToken = null;

    for (const pair of paramPairs) {
      const [key, value] = pair.split('=');
      if (key === 'access_token') {
        accessToken = value;
      }
      if (key === 'refresh_token') {
        refreshToken = value;
      }
    }

    return {accessToken, refreshToken};
  };

  useEffect(() => {
    // Configure Facebook SDK
    configureFacebookSDK();

    // Set up deep link handler for Supabase authentication
    const handleDeepLink = async ({url}: {url: string}) => {
      console.log('Deep link received:', url);

      // Parse the URL to extract the Supabase authentication data
      try {
        // The URL might contain parameters like access_token, refresh_token, etc.
        if (url.includes('auth-callback')) {
          const {accessToken, refreshToken} = extractTokensFromUrl(url);
          if (accessToken && refreshToken) {
            handleAuthCallback(accessToken, refreshToken);
          }
        }
      } catch (error) {
        console.error('Error processing deep link:', error);
      }
    };

    // Handle the case where the app is opened from a deep link
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAuthCallback = async (
    accessToken: string,
    refreshToken: string,
  ) => {
    const {data, error} = await setFbSession({accessToken, refreshToken});
    if (data.user) {
      await navigate('Tab', {screen: 'Home'});
      setUser(data.user);
      setSession(data.session);
      return;
    }

    if (error?.message) {
      console.log('error', error.message);
    }
  };

  const handleFBLogin = async () => {
    try {
      LoginManager.logOut();
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      console.log('Login result:', result);

      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }

      // Get access token
      const accessTokenData = await AccessToken.getCurrentAccessToken();
      console.log('Access token:', accessTokenData?.accessToken);

      if (!accessTokenData) {
        throw new Error('Failed to get access token');
      }

      if (accessTokenData?.accessToken) {
        try {
          // Send the Facebook token to your backend which uses Supabase
          const {data, error} = await fbLogin({
            token: accessTokenData.accessToken,
          });

          if (error?.message) {
            console.log('error', error.message);
            return;
          }

          // If your backend returns a URL, it's likely the Supabase OAuth URL
          if (data.url) {
            console.log('Redirecting to URL:', data.url, data);
            await Linking.openURL(data.url);
          }
        } catch (apiError) {
          console.error('API call failed:', apiError);
        }
      }
    } catch (error) {
      console.error('FB login error:', error);
    }
  };

  return (
    <Button
      label="Facebook"
      leftIcon={<Icon name="facebook-square" size={20} color="#fff" />}
      style={{backgroundColor: theme.colors.textDisabled}}
      onPress={handleFBLogin}
      disabled={isPending || isSessionLoadingPending}
      loading={isPending || isSessionLoadingPending}
    />
  );
}
