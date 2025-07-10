import Button from '@components/ui/Button';
import Typography from '@components/ui/Typography';
import darkTheme from '@theme/dark';
import {goBack} from '@utils/NavigationUtils';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const ScreenHeader = ({
  title,
  rightContent,
}: {
  title: string;
  rightContent?: any;
}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <Button
            variant="ghost"
            leftIcon={<Icon name="arrow-back" size={24} />}
            onPress={goBack}
          />
        </View>

        <View
          style={[styles.titleContainer, !rightContent && styles.centerTitle]}>
          <Typography variant="h4" weight="bold">
            {title}
          </Typography>
        </View>

        {rightContent ? (
          <View style={styles.rightContainer}>{rightContent}</View>
        ) : (
          <View style={styles.rightContainer} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    backgroundColor: darkTheme.colors.background,
  },
  btnContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 2,
  },
  centerTitle: {
    alignItems: 'center',
    color: darkTheme.colors.text,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
