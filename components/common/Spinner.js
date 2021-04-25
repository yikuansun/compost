import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import SafeView from './SafeView';

export default function Spinner() {
  return (
    <SafeView style={styles.container}>
      <ActivityIndicator size="large" color= '#039be5' />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
