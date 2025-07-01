import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from './ui/Input';

export function Search({style}: {style?: any}) {
  return (
    <View style={[styles.searchContainer, style]}>
      <Input leftIcon={<Icon name="search" size={16} />} placeholder="Search" />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
  
  },
});
