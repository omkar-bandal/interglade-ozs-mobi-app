import {darkTheme, FONT_SIZE, SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

type OverviewProps = {
  onClose: () => void;
  reservation: null;
};

const OverviewModal = ({onClose, reservation}: OverviewProps) => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);

  // const {data: reservationData} = useGetReservationById(reservationId);
  // const reservation = reservationData?.data;
  Alert.alert('Reservation overviews data', JSON.stringify(reservation));

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconCon}>
          <TouchableOpacity onPress={onClose} style={styles.header}>
            <AntDesignIcon color="#393872" name="close" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCon}>
          <Text style={styles.headerText}>Overview</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardrow}>
            <Text>Booking Title</Text>
            <Text>{}</Text>
          </View>
          <View style={styles.cardrow}>
            <Text>{}</Text>
            <Text>
              {' '}
              {/* {`${reservation?.service?.provider?.first_name} ${reservation?.service?.provider?.last_name}`} */}
            </Text>
          </View>
          {/* <View style={styles.cardrow}>
            <Text>Date</Text>
            <Text>July 20, 2024</Text>
          </View> */}
          <View style={styles.cardrow}>
            <Text>Time</Text>
            <Text>10:00 AM</Text>
          </View>
          <View style={styles.cardrow}>
            <Text>Location</Text>
            <Text>Virtual Meeting</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() => {
              navigate('Review', {});
            }}>
            <Text style={styles.outlineBtnText}>Write a Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OverviewModal;

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      width: '100%',
      height: '100%',
      paddingHorizontal: 16,
      // marginBottom: 0,
    },
    iconCon: {
      marginLeft: 'auto',
    },
    header: {
      padding: SPACING.sm,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerCon: {
      padding: SPACING.sm,
      alignSelf: 'center',
    },
    headerText: {
      paddingHorizontal: SPACING.md,
      fontSize: FONT_SIZE.lg,
      color: darkTheme.colors.primary,
      fontWeight: '800',
      padding: SPACING.sm,
    },
    backIcon: {
      height: 20,
      width: 20,
      tintColor: darkTheme.colors.primary,
    },
    card: {
      backgroundColor: darkTheme.colors.primary,
      padding: SPACING.sm,
      borderRadius: 10,
    },
    cardrow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: SPACING.sm,
    },
    reviewContainer: {
      marginTop: SPACING.lg,
    },
    reviewField: {
      borderWidth: 1,
      borderColor: darkTheme.colors.secondaryLight,
      backgroundColor: '#fff',
      borderRadius: 10,
    },
    text: {
      paddingLeft: SPACING.md,
      paddingBottom: SPACING.xl,
    },
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    outlineBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor: darkTheme.colors.primary,
      borderRadius: 8,
      paddingVertical: 10,
      marginRight: 8,
      alignItems: 'center',
    },
    outlineBtnText: {
      color: darkTheme.colors.primary,
      fontWeight: 'bold',
    },
    primaryBtn: {
      flex: 1,
      backgroundColor: darkTheme.colors.primary,
      borderRadius: 8,
      paddingVertical: 10,
      marginLeft: 8,
      alignItems: 'center',
    },
    primaryBtnText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    btnContainer: {
      margin: SPACING.md,
      marginTop: SPACING.xl,
    },
    btn: {
      alignSelf: 'center',
      padding: SPACING.sm,
      backgroundColor: '#fff',
      borderColor: darkTheme.colors.primary,
      borderWidth: 1,
      borderRadius: 10,
    },
    btnText: {
      color: darkTheme.colors.primary,
      fontSize: 20,
    },
  });
