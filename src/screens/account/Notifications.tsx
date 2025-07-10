import {Container} from '@components/ui/Container';
import {Heading} from '@features/account/components/Heading';
import {darkTheme, SPACING} from '@theme/constants';
import {useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

export function Notifications() {
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingNotifications: true,
  });
  return (
    <Container>
      <Heading title="Notifications" />
      <View style={styles.section}>
        <View style={[styles.rowWrapper, styles.rowFirst]}>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Email Notifications</Text>
              <Text style={styles.rowDescription}>
                alerts, pramotions, and updates via email
              </Text>
            </View>
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

        <View style={styles.rowWrapper}>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Push Notifications</Text>
              <Text style={styles.rowDescription}>
                new messages, booking confirmations
              </Text>
            </View>
            <View style={styles.rowSpacer} />

            <Switch
              onValueChange={pushNotifications =>
                setForm({...form, pushNotifications})
              }
              style={{transform: [{scaleX: 0.95}, {scaleY: 0.95}]}}
              value={form.pushNotifications}
            />
          </View>
        </View>

        <View style={[styles.rowWrapper, styles.rowLast]}>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Marketing</Text>
              <Text style={styles.rowDescription}>
                for special offers, events, and updates
              </Text>
            </View>

            <View style={styles.rowSpacer} />

            <Switch
              onValueChange={marketingNotifications =>
                setForm({...form, marketingNotifications})
              }
              style={{transform: [{scaleX: 0.95}, {scaleY: 0.95}]}}
              value={form.marketingNotifications}
            />
          </View>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: darkTheme.colors.background,
  },
  rowWrapper: {
    paddingLeft: 16,
    padding: SPACING.md,
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
  rowContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
  },
  rowDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
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
