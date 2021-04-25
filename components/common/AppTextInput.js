import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AppTextInput({
  leftIcon,
  width = '100%',
  rightIcon,
  handlePasswordVisibility,
  title = title,
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width }]}>
      <Text>{title} </Text>
      {leftIcon && (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          color='#6e6869'
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor= '#6e6869'
        {...otherProps}
      />
      {rightIcon && (
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
            name={rightIcon}
            size={20}
            color= '#6e6869'
            style={styles.rightIconStyles}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:  '#f9f9f9',
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10
  },
  icon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    width: '100%',
    fontSize: 18,
    color:  '#222222',
  },
  rightIconStyles: {
    alignSelf: 'center',
    marginLeft: 10
  }
});
