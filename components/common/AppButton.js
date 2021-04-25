import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function AppButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor:  '#f57c00' }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%'
  },
  buttonText: {
    color:  '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase'
  }
});
