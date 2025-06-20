import {Container} from '@components/ui/Container';
import Search from '@features/search/components/Search';
import React from 'react';
import {StyleSheet} from 'react-native';

const SearchAndFilterScreen = () => {
  return (
    <Container style={styles.container}>
      <Search />
    </Container>
  );
};

export default SearchAndFilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
