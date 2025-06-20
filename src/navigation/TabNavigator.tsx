import {CustomTabBar} from '@components/CustomToolbar';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Account from '@screens/account/Account';
import {Activities} from '@screens/activities/Activities';
import {Booking} from '@screens/booking/Booking';
import ConversationListScreen from '@screens/messages/ConversationListScreen';
import {Publish} from '@screens/publish/Publish';
import {BottomTabParamList} from './types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export function TabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="Home">
      <BottomTab.Screen name="Publish" component={Publish} />
      <BottomTab.Screen name="Messaging" component={ConversationListScreen} />
      <BottomTab.Screen name="Home" component={Booking} />
      <BottomTab.Screen name="Activity" component={Activities} />
      <BottomTab.Screen name="Account" component={Account} />
    </BottomTab.Navigator>
  );
}
