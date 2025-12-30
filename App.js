import React from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorageTest from './src/TEST/AsyncStorageTest';
import ClipboardTest from './src/TEST/ClipboardTest';

const App = () => {
  return (
    <View style={styles.container}>
      <AsyncStorageTest />
      <ClipboardTest />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
