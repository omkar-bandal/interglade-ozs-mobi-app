import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface BreakerTextProps {
  text: string;
  lineColor?: string;
  textColor?: string;
  lineThickness?: number;
  lineWidth?: number | string;
  spacing?: number;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const BreakerText: React.FC<BreakerTextProps> = ({
  text,
  lineColor = '#E5E5EA',
  textColor = '#3C3C43',
  lineThickness = 1,
  lineWidth = '30%',
  spacing = 10,
  containerStyle,
  textStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.line,
          {
            backgroundColor: lineColor,
            height: lineThickness,
            marginRight: spacing,
          } as ViewStyle,
          typeof lineWidth === 'number'
            ? {width: lineWidth}
            : {width: lineWidth as any},
        ]}
      />
      <Text style={[styles.text, {color: textColor}, textStyle]}>{text}</Text>
      <View
        style={[
          styles.line,
          {
            backgroundColor: lineColor,
            height: lineThickness,
            marginLeft: spacing,
          } as ViewStyle,
          typeof lineWidth === 'number'
            ? {width: lineWidth}
            : {width: lineWidth as any},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  line: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default BreakerText;
