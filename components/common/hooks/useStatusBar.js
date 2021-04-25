import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect } from 'react-navigation';

export default function useStatusBar(style, animated = true) {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style, animated);
    }, [])
  );
}
