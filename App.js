import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorageTest from './src/TEST/AsyncStorageTest';
import ClipboardTest from './src/TEST/ClipboardTest';
import SVGTest from './src/TEST/SVGTest';

const App = () => {
  const [activeTest, setActiveTest] = useState('AsyncStorage');

  const tests = [
    { id: 'AsyncStorage', label: 'AsyncStorage', component: AsyncStorageTest },
    { id: 'Clipboard', label: 'Clipboard', component: ClipboardTest },
    { id: 'SVG', label: 'SVG', component: SVGTest },
  ];

  const ActiveComponent = tests.find(test => test.id === activeTest)?.component;

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tests.map((test) => (
          <TouchableOpacity
            key={test.id}
            style={[
              styles.tab,
              activeTest === test.id && styles.tabActive,
            ]}
            onPress={() => setActiveTest(test.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTest === test.id && styles.tabTextActive,
              ]}
            >
              {test.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.content}>
        {ActiveComponent && <ActiveComponent />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});

export default App;
