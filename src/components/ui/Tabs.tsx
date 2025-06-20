import useTheme from '@theme/useTheme';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Typography from './Typography';

interface TabItem {
  name: string;
  value: string;
}

interface TabProps {
  items: TabItem[];
  value?: string;
  onItemChange?: (value: string) => void;
}

export default function Tabs({items, value, onItemChange}: TabProps) {
  const {theme} = useTheme();
  const [tabValue, setTabValue] = React.useState(value ?? items[0].value);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.colors.textDisabled,
      paddingVertical: 1,
      paddingHorizontal: 1,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      borderRadius: 6,
      minHeight: 42,
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      backgroundColor: 'transparent',
      borderRadius: 6,
      height: 40,
    },
    text: {
      fontSize: 13,
      fontWeight: '600',
      color: '#6b7280',
    },
  });
  return (
    <View style={styles.container}>
      {items.map(item => {
        const isActive = item.value === tabValue;

        return (
          <View key={item.name} style={{flex: 1}}>
            <TouchableWithoutFeedback
              onPress={() => {
                setTabValue(item.value);
                onItemChange && onItemChange(item.value);
              }}>
              <View
                style={[
                  styles.item,
                  isActive && {backgroundColor: theme.colors.primary},
                ]}>
                <Typography style={[styles.text, isActive && {color: '#fff'}]}>
                  {item.name}
                </Typography>
              </View>
            </TouchableWithoutFeedback>
          </View>
        );
      })}
    </View>
  );
}
