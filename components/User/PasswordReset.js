import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
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

/**
 * code credited to https://github.com/expo-community/expo-firebase-starter
 */

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
});

export default function ForgotPasswordScreen({ navigation }) {
  //useStatusBar('light-content');

  const [customError, setCustomError] = useState('');

  async function handlePasswordReset(values) {
    const { email } = values;

    try {
      //await firebase.auth.Auth.sendPasswordResetEmail(email);
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
    } catch (error) {
      setCustomError(error.message);
    }
  }

  return (
    <SafeView style={styles.container}>
      <Form
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handlePasswordReset(values)}
      >
        <FormField
          name="email"
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
        />
        <FormButton title="Forgot Password" />
        {<FormErrorMessage error={customError} visible={true} />}
      </Form>

      <Button style={{marginTop:80, backgroundColor:"gray",  marginLeft:120, marginRight:120 }} full rounded primary
                            onPress= {() => {this.props.navigation.navigate('Login');}}>
                            <Text style={{fontSize: 18, color: 'white' }}>B A C K</Text>
      </Button>


    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#C9DAB4'
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  }
});