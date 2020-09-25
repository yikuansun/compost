import React from 'react';
import {View, Text, StyleSheet, FlatList } from 'react-native';

const ListScreen = () => {
    const friends = [
        {Name: 'Friend #1'},
        {Name: 'Friend #2'},
        {Name: 'Friend #3'},
        {Name: 'Friend #4'},
        {Name: 'Friend #5'}
    ];

    return (
        <FlatList 
            data={friends} 
            renderItem={( {item} ) => {
                return <Text>{item.Name}</Text>
            }}
        />
        
        
    );
};

const styles = StyleSheet.create({});

export default ListScreen;