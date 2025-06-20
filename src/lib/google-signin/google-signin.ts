import {GoogleSignin} from '@react-native-google-signin/google-signin';

const WEB_CLIENT_ID =
  '61445403089-i1eqfcbta8ot3i13mh9uurm7gi3q2ch1.apps.googleusercontent.com';
const IOS_CLIENT_ID =
  '61445403089-m1pn3f7lkujtu4h4n5aq73kjicl9o92s.apps.googleusercontent.com';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
  });
};
