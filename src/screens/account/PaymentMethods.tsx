import {Container} from '@components/ui/Container';
import {Heading} from '@features/account/components/Heading';
import {SPACING} from '@theme/constants';
import lightTheme from '@theme/light';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export function PaymentMethods() {
  const [selected, setSelected] = useState('');
  const handleSelect = (method: string) => {
    setSelected(method);
  };

  return (
    <Container>
      <Heading title="Payment Method" />

      <View style={styles.section}>
        <View style={[styles.rowWrapper, styles.rowFirst]}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Cash on Delivery</Text>

            <View style={styles.rowSpacer} />
            <TouchableOpacity onPress={() => handleSelect('Cash on Delivery')}>
              <AntDesignIcon
                name={
                  selected === 'Cash on Delivery'
                    ? 'checkcircle'
                    : 'checkcircleo'
                }
                size={24}
                color={
                  selected === 'Cash on Delivery'
                    ? lightTheme.colors.primary
                    : '#000'
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rowWrapper}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Credit/Debit Card</Text>
            <View style={styles.rowSpacer} />
            <TouchableOpacity onPress={() => handleSelect('Credit Card')}>
              <AntDesignIcon
                name={
                  selected === 'Credit Card' ? 'checkcircle' : 'checkcircleo'
                }
                size={24}
                color={
                  selected === 'Credit Card'
                    ? lightTheme.colors.primary
                    : '#000'
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.rowWrapper, styles.rowLast]}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Online Payment</Text>

            <View style={styles.rowSpacer} />
            <TouchableOpacity onPress={() => handleSelect('Online Payment')}>
              <AntDesignIcon
                name={
                  selected === 'Online Payment' ? 'checkcircle' : 'checkcircleo'
                }
                size={24}
                color={
                  selected === 'Online Payment'
                    ? lightTheme.colors.primary
                    : '#000'
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
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
    color: '#000',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'center',
  },
  section: {
    paddingTop: 30,
    padding: SPACING.md,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
