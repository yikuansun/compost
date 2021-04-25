//import React, { useState } from 'react';
import React, { Component } from 'react';
import { Button } from 'native-base';
import { Text, StyleSheet,TouchableOpacity } from 'react-native';
import * as Yup from 'yup';

import SafeView from '../common/SafeView';
import Form from '../common/Forms/Form';
import FormField from '../common/Forms/FormField';
import FormButton from '../common/Forms/FormButton';
import IconButton from '../common/IconButton';
import FormErrorMessage from '../common/Forms/FormErrorMessage';
//TODO: refactor useStatusBar into 4.x navigation before reusing it
//import useStatusBar from '../common/hooks/useStatusBar';
import * as firebase from 'firebase';

import { AppContext } from '../../AppContextProvider';

/**
 * code credited to https://github.com/expo-community/expo-firebase-starter
 */

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
});


/***
 * TODO:
 * 1. all the UI components
 * 2. verification of existing password
 * 3. update password
 * 4. future enhancement: update first name last name etc
 * 
 */
//export default function UserProfileScreen({ navigation }) {
class UserProfileScreen extends Component {

  static contextType = AppContext;
  //useStatusBar('light-content');

  state = {
    'customError':'',
    'signInPass': false
  };
  //const [customError, setCustomError] = useState('');

  setCustomError(msg) {
    this.setState({'customError':msg});
  }
  async handleProfileUpdate(values) {
    const { email, password} = values;
    this.props.navigation.navigate('UserProfileUpdate');
  }
  async handleLogout(values) {
    const { userOldInfo, setUser } = this.context;
    setUser({loggedIn: false, userInfo: {}});
    this.props.navigation.navigate('Landing');
  }
  render() {
    const user = this.context.user;
    let userId = user.loggedIn ? user.userInfo.user_id : 'GuestUser';
    //console.log(`in UserProfileScreen, userId(${userId}) context data: ` + JSON.stringify(this.context,null,4));
  return (
    <SafeView style={styles.container}>
      <Form
        initialValues={{ email: user.userInfo.email }}
        //validationSchema={validationSchema}
        onSubmit={values => this.handleProfileUpdate(values)}
      >
        <FormField
          name="email"
          leftIcon="email"
          title="Email Address"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          editable={false}
        />
        <FormField
          name="Password"
          title="Password"
          leftIcon="textbox-password"
          placeholder="password"
          autoCapitalize="none"
          value="*********"
          //keyboardType="password"
          textContentType="password"
          autoFocus={true}
          editable={false}
          secureTextEntry={true}
        />
        <FormButton title="Change Profile" />


                <Button style={{marginTop:30, backgroundColor:"orange",  marginLeft:80, marginRight:80 }} full rounded primary
                            onPress= {() => this.handleLogout()} >
                            <Text style={{fontSize: 18, color: 'white' }}>L O G O U T</Text>
                </Button>

      </Form>

      <Button style={{marginTop:200, backgroundColor:"gray",  marginLeft:100, marginRight:100 }} full rounded primary
                            onPress= {() => {this.props.navigation.navigate('App');}}

                    >
                            <Text style={{fontSize: 18, color: 'white' }}>B A C K</Text>
      </Button>

    </SafeView>
  );
  }
}

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#C9DAB4'
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  }
});