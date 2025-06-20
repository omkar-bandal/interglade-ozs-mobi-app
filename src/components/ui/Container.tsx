import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// interface ContainerProps {
//   children: React.ReactNode;
//   style?: any;
// }
export function Container({children, style, ...rest}: any) {
  return (
    <SafeAreaView style={[styles.container, style]} {...rest}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
  },
});
