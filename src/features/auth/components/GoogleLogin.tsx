import Button from '@components/ui/Button';
import {useSocialLogin} from '@hooks/api/auth.rq';
import {useActions} from '@hooks/useActions';
import {configureGoogleSignIn} from '@lib/google-signin/google-signin';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

export default function GoogleLogin() {
  const {theme} = useTheme();

  const {setUser, setSession} = useActions();
  const {mutateAsync: googleLogin, isPending} = useSocialLogin();

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo?.data?.idToken) {
        const {data, error} = await googleLogin({
          provider: 'google',
          token: userInfo.data.idToken,
        });
        if (data.user) {
          await navigate('Tab', {screen: 'Home'});
          setUser(data.user);
          setSession(data.session);
          return;
        }

        if (error?.message) {
          console.log('error', error.message);
        }
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <Button
      label="Google"
      leftIcon={<Icon name="google" size={20} color="#fff" />}
      style={{backgroundColor: theme.colors.textDisabled}}
      onPress={handleGoogleLogin}
      disabled={isPending}
      loading={isPending}
    />
  );
}
