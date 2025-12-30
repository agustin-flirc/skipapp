import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const ClipboardTest = () => {
  const [text, setText] = useState('');

  const copyToClipboard = async () => {
    try {
      if (text.trim() === '') {
        Alert.alert('Notice', 'Please enter some text before copying');
        return;
      }
      await Clipboard.setString(text);
      Alert.alert('Success', 'Text copied to clipboard');
    } catch (error) {
      console.error('Fail copying:', error);
      Alert.alert('Error', 'Failed to copy text');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clipboard</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text to copy..."
        value={text}
        onChangeText={setText}
        multiline
      />
      <View style={styles.buttonContainer}>
        <Button title="Copy to Clipboard" onPress={copyToClipboard} />
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    width: '100%',
  },
});

export default ClipboardTest;

