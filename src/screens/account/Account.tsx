/* eslint-disable react-native/no-inline-styles */
import {useActions} from '@hooks/useActions';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {supabase} from '@lib/supabase/supabase';
import useTheme from '@theme/useTheme';
import {navigate, resetAndNavigate} from '@utils/NavigationUtils';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export default function Account() {
  //const navigation = useNavigation();
  const {theme, themeType} = useTheme();
  const styles = themeStyles(theme);
  const {user} = useTypedSelector(state => state.auth);
  const {resetAuth} = useActions();
  // const [form, setForm] = useState({
  //   emailNotifications: true,
  //   pushNotifications: false,
  // });

  const handleLogout = async () => {
    try {
      const {error} = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      resetAuth();
      resetAndNavigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.header}>
        {/* <View style={styles.headerAction}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <AntDesignIcon color={'grey'} name="arrowleft" size={24} />
          </TouchableOpacity>
        </View> */}

        <Text numberOfLines={1} style={styles.headerTitle}>
          Settings
        </Text>

        {/* <View style={[styles.headerAction, {alignItems: 'flex-end'}]}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <AntDesignIcon color="#000" name="more" size={24} />
          </TouchableOpacity>
        </View> */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.section, {paddingTop: 4}]}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.sectionBody}>
            <TouchableOpacity
              onPress={() => {
                navigate('PersonalInfo');
              }}
              style={styles.profile}>
              <Image
                alt=""
                source={{
                  //uri: 'https://images.unsplash.com/photo-1633332755162-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                  uri: 'https://randomuser.me/api/portraits/men/44.jpg',
                }}
                style={styles.profileAvatar}
              />

              <View style={styles.profileBody}>
                <Text style={styles.profileName}>
                  {user?.app_metadata?.provider}
                </Text>

                <Text style={styles.profileHandle}>{user?.email}</Text>
              </View>

              <AntDesignIcon color="#bcbcbc" name="right" size={16} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                  navigate('Settings');
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>App settings</Text>

                <View style={styles.rowSpacer} />

                <Text style={styles.rowValue}>English</Text>

                <AntDesignIcon color="#bcbcbc" name="right" size={16} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigate('AddressList');
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Manage Address</Text>

                <View style={styles.rowSpacer} />

                <AntDesignIcon color="#bcbcbc" name="right" size={16} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigate('PaymentMethods');
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Payment Method</Text>

                <View style={styles.rowSpacer} />

                <AntDesignIcon color="#bcbcbc" name="right" size={16} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigate('Notifications');
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Notifications</Text>

                <View style={styles.rowSpacer} />

                <AntDesignIcon color="#bcbcbc" name="right" size={16} />
              </TouchableOpacity>
            </View>

            <View style={[styles.rowWrapper, styles.rowLast]}>
              <TouchableOpacity
                onPress={() => {
                  navigate('Privacy');
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Privacy Setting</Text>

                <View style={styles.rowSpacer} />

                <AntDesignIcon color="#bcbcbc" name="right" size={16} />
              </TouchableOpacity>
            </View>

            {/* <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Email Notifications</Text>

                <View style={styles.rowSpacer} />

                <Switch
                  onValueChange={emailNotifications =>
                    setForm({...form, emailNotifications})
                  }
                  style={{transform: [{scaleX: 0.95}, {scaleY: 0.95}]}}
                  value={form.emailNotifications}
                />
              </View>
            </View>

            <View style={[styles.rowWrapper, styles.rowLast]}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Push Notifications</Text>

                <View style={styles.rowSpacer} />

                <Switch
                  onValueChange={pushNotifications =>
                    setForm({...form, pushNotifications})
                  }
                  style={{transform: [{scaleX: 0.95}, {scaleY: 0.95}]}}
                  value={form.pushNotifications}
                />
              </View>
            </View> */}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>

          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Contact Us</Text>

                <View style={styles.rowSpacer} />

                <AntDesignIcon color="#bcbcbc" name="right" size={16} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Report Bug</Text>

                <View style={styles.rowSpacer} />

                <AntDesignIcon color="#bcbcbc" name="right" size={16} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Rate in App Store</Text>

                <View style={styles.rowSpacer} />

                <AntDesignIcon color="#bcbcbc" name="right" size={16} />
              </TouchableOpacity>
            </View>

            <View style={[styles.rowWrapper, styles.rowLast]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Terms and Privacy</Text>

                <View style={styles.rowSpacer} />

                <AntDesignIcon color="#bcbcbc" name="right" size={16} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionBody}>
            <View
              style={[
                styles.rowWrapper,
                styles.rowFirst,
                styles.rowLast,
                {alignItems: 'center'},
              ]}>
              <TouchableOpacity onPress={handleLogout} style={styles.row}>
                <Text style={[styles.rowLabel, styles.rowLabelLogout]}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.contentFooter}>App Version 2.24 #50491</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const themeStyles = (theme: any) =>
  StyleSheet.create({
    /** Header */
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 16,
    },
    headerAction: {
      width: 40,
      height: 40,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#bcbcbc',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      textAlign: 'center',
    },
    /** Content */
    content: {
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background,
    },
    contentFooter: {
      marginTop: 24,
      fontSize: 13,
      fontWeight: '500',
      textAlign: 'center',
      color: '#a69f9f',
    },
    /** Section */
    section: {
      paddingVertical: 12,
    },
    sectionTitle: {
      margin: 8,
      marginLeft: 12,
      fontSize: 13,
      letterSpacing: 0.33,
      fontWeight: '500',
      color: '#a69f9f',
      textTransform: 'uppercase',
    },
    sectionBody: {
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    /** Profile */
    profile: {
      padding: 12,
      backgroundColor: theme.components.card.backgroundColor,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    profileAvatar: {
      width: 60,
      height: 60,
      borderRadius: 9999,
      marginRight: 12,
    },
    profileBody: {
      marginRight: 'auto',
    },
    profileName: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
    },
    profileHandle: {
      marginTop: 2,
      fontSize: 16,
      fontWeight: '400',
      color: '#858585',
    },
    /** Row */
    row: {
      height: 44,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingRight: 12,
    },
    rowWrapper: {
      paddingLeft: 16,
      backgroundColor: theme.components.card.backgroundColor,
      borderTopWidth: 1,
      borderColor: theme.colors.border,
    },
    rowFirst: {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    rowLabel: {
      fontSize: 16,
      letterSpacing: 0.24,
      color: theme.colors.text,
    },
    rowSpacer: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    rowValue: {
      fontSize: 16,
      fontWeight: '500',
      color: '#ababab',
      marginRight: 4,
    },
    rowLast: {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    rowLabelLogout: {
      width: '100%',
      textAlign: 'center',
      fontWeight: '600',
      color: '#dc2626',
    },
  });
