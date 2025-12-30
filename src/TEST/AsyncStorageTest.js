import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@counter_value';

const AsyncStorageTest = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredValue();
  }, []);

  const loadStoredValue = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedValue !== null) {
        setCount(parseInt(storedValue, 10));
      }
    } catch (error) {
      Alert.alert('Fail reading:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveValue = async (newValue) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newValue.toString());
    } catch (error) {
      Alert.alert('Fail saving:', error);
    }
  };

  const increment = () => {
    const newValue = count + 1;
    setCount(newValue);
    saveValue(newValue);
  };

  const decrement = () => {
    const newValue = count - 1;
    setCount(newValue);
    saveValue(newValue);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorage</Text>
      <Text style={styles.counter}>{count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="+1" onPress={increment} />
        <View style={styles.buttonSpacing} />
        <Button title="-1" onPress={decrement} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  counter: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 30,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  buttonSpacing: {
    width: 20,
  },
});

export default AsyncStorageTest;

