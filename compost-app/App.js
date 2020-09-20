import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import announcements from './Database.json';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Announcements</Text>
      <StatusBar style="auto" />
      
      
      
      <Text>Footer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
