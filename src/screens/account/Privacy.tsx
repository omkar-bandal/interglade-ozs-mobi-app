import {Container} from '@components/ui/Container';
import {Heading} from '@features/account/components/Heading';
import {darkTheme, SPACING} from '@theme/constants';
import {useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

export function Privacy() {
  const [form, setForm] = useState({
    privateAccount: true,
    locationSharing: false,
  });
  return (
    <Container>
      <Heading title="Privacy" />

      <View style={styles.section}>
        <View style={[styles.rowWrapper, styles.rowFirst]}>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Public Profile</Text>
              <Text style={styles.rowDescription}>
                Choose whether your profile is visible to everyone or only to
                your followers.
              </Text>
            </View>
            <View style={styles.rowSpacer} />

            <Switch
              onValueChange={privateAccount =>
                setForm({...form, privateAccount})
              }
              style={{transform: [{scaleX: 0.95}, {scaleY: 0.95}]}}
              value={form.privateAccount}
            />
          </View>
        </View>

        <View style={[styles.rowWrapper, styles.rowLast]}>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Location Sharing</Text>
              <Text style={styles.rowDescription}>
                new messages, booking confirmations
              </Text>
            </View>
            <View style={styles.rowSpacer} />

            <Switch
              onValueChange={locationSharing =>
                setForm({...form, locationSharing})
              }
              style={{transform: [{scaleX: 0.95}, {scaleY: 0.95}]}}
              value={form.locationSharing}
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
    padding: SPACING.sm,
    paddingHorizontal: 16,
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
    // flexWrap: 'wrap',
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
