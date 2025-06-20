import {Settings} from 'react-native-fbsdk-next';

const FB_APP_ID = '1256414982541048';

export const configureFacebookSDK = () => {
  Settings.setAppID(FB_APP_ID);
  Settings.initializeSDK();
};
