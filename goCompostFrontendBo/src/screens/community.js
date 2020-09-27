import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Button, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from 'react-native-vector-icons/Feather'
import { DropDownPicker} from 'react-native-dropdown-picker';

const communityScreen = props => {
    this.state = {
        country: 'uk'
    }
    return (
  <View style={{flex: 1}}>
    
 
<DropDownPicker
    items={[
        {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
        {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
    ]}
    defaultValue={this.state.country}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => this.setState({
        country: item.value
    })}
/>
  </View>

  
  );
  
};

const styles = StyleSheet.create({
  
});

export default communityScreen;
