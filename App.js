import React from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorageTest from './src/TEST/AsyncStorageTest';

const App = () => {
  return (
    <View style={styles.container}>
      <AsyncStorageTest />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
