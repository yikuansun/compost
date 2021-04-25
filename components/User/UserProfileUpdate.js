//import React, { useState } from 'react';
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Yup from 'yup';
import { Button } from 'native-base';

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
class UserProfileUpdateScreen extends Component {

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
  //async function handleProfileUpdate(values) {
  async handleProfileUpdate(values) {
    const { email, oldPassword, password,  passwordRepeat} = values;
    this.setCustomError(`new passwords do not match.`);

    try {
      /*
      await firebase.auth().sendPasswordResetEmail(
        email)
        .then(function() {
          // Password reset email sent.
          setCustomError("Email is sent to " + email);

        })
        .catch(function(error) {
          // Error occurred. Inspect error.code.
          setCustomError(error.message);

        });
      //navigation.navigate('Login');
      */
      if (password !== passwordRepeat) {
        this.setCustomError(`new passwords do not match.`);
        return;
      }
      if (oldPassword === password) {
        this.setCustomError(`New password can not be same as old password.`);
        return;
      }
      if (! password  || password.length<6) {
        this.setCustomError('Please enter at least 6 characters for password');
        return;
      }

      // check old password
      if (oldPassword) {
        firebase.auth().signInWithEmailAndPassword(email, oldPassword).then(function (user) {
          //this.setCustomError(");
          console.log('user signed in check passed : ' + JSON.stringify(user, null, 4));
          // this.setState({'signInPass': true});
          // update password
          var user = firebase.auth().currentUser;
          user.updatePassword(password).then(() => {
            console.log("Password updated!");
            //that.setCustomError('Password updated!');

          }).catch((error) => { console.log(error); 
            //this.setCustomError('Authentication Failed. Old password is not valid.');
            return false;});
          })
          // Sign in failed
          .catch(function(error) {
            console.log('Authentication Failed. Old password is not valid:' + error);
            return;
        });
      } else {
        this.setCustomError('Old password is not valid.');
        return;
      }
    
      this.setCustomError('Password updated');
      /*console.log("sign in:" + signInPass);
      if (this.state.signInPass) {
        this.setCustomError('sign in passed.');

      } else {
          this.setCustomError('Authentication Failed. Old password is not valid.');
      }*/
      //this.setCustomError(`handleProfileUpdate done. email(${email}), oldpassword(${oldPassword}) newPassword(${password}) passwordRepeat(${passwordRepeat})`);
    } catch (error) {
      this.setCustomError(error.message);
    }
  }

  changePassword(currentPassword, newPassword) {
    this.reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        console.log("Password updated!");
        return true;
      }).catch((error) => { console.log(error); return false;});
    }).catch((error) => { console.log(error);  return false});
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
          textContentType="emailAddress"
          autoFocus={false}
          editable={false}
        />
        <FormField
          name="oldPassword"
          title="Old  Password"
          leftIcon="textbox-password"
          placeholder="old password"
          autoCapitalize="none"
          //keyboardType="password"
          textContentType="password"
          autoFocus={true}
          secureTextEntry={true}
        />
        <FormField
          name="password"
          title="New Password"
          leftIcon="textbox-password"
          placeholder="new password"
          autoCapitalize="none"
          //keyboardType="password"
          textContentType="password"
          autoFocus={false}
          secureTextEntry={true}
        />
        <FormField
          name="passwordRepeat"
          title="Confirm Password"
          leftIcon="textbox-password"
          placeholder="new password"
          autoCapitalize="none"
          keyboardType="password"
          textContentType="password"
          autoFocus={false}
          secureTextEntry={true}
        />
        <FormButton title="Update" />
        {<FormErrorMessage error={this.state.customError} visible={true} />}
      </Form>


    <Button style={{marginTop:80, backgroundColor:"gray",  marginLeft:120, marginRight:120 }} full rounded primary
                            onPress= {() => {this.props.navigation.navigate('App');}}>
                            <Text style={{fontSize: 18, color: 'white' }}>B A C K</Text>
    </Button>


    </SafeView>
  );
  }
}

export default UserProfileUpdateScreen;

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