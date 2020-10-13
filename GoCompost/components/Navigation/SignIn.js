import React from 'react';
import {
    AsyncStorage,
    Button,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Text
  } from 'react-native';
import * as Google from 'expo-google-app-auth';
//Firebase
import * as firebase from 'firebase';
import 'firebase/firestore';

import { AppContext } from '../../AppContextProvider'

import landing_bg from '../../assets/landing_bg.jpg';

  /**
 * Used the following tutorials:
 *    https://www.youtube.com/watch?v=ZcaQJoXY-3Q
 *    In order to run app in expo client, we have to use the following sdk: 
 *    https://docs.expo.io/versions/latest/sdk/google/
 *    
 */
class SignInScreen extends React.Component {
    static navigationOptions = {
      title: 'GoCompost',
    };
  

    // Set the context to be used
    // Refer to React Context API: https://reactjs.org/docs/context.html#contextprovider
    // use the experimental public class fields syntax
    static contextType = AppContext;

    render() {
      return (

        <View style={styles.container}>
          <ImageBackground source={landing_bg} style={styles.image}>
          <View style={styles.container}>
            <View style={{flex:1}}>
            </View>
            <View style={{flex:1}}>
            <TouchableOpacity 
                style={styles.signInButton}
                onPress= {() => {
                  //this.signInWithGoogleAsync(this.context);}
                  console.log('switch to real loginscreen...');
                  this.props.navigation.navigate('Login');
                }}
            >
              <Text style={styles.signInButton}> SIGN IN / SIGN UP </Text>
            </TouchableOpacity>
            <View style={{flex:0.17}} />

            <TouchableOpacity
                style={styles.guestButton}
                onPress= {() => {this.loginAsGuest();}}>
              <Text style={styles.guestText}>  ENTER as guest  </Text>
            </TouchableOpacity>
            <View style={{flex:0.17}} />

            <TouchableOpacity
                style={styles.aboutButton}
                onPress= {() => {this.gotoAboutScreen();}}>
              <Text style={styles.aboutButton}>    ABOUT  </Text>
            </TouchableOpacity>

            </View>
          </View>
          </ImageBackground>
        </View>
      );
    }
    loginAsGuest = async () => {
      console.log('logged in as guest...');
      this.props.navigation.navigate('App');
    }
    gotoAboutScreen = async () => {
      console.log('switch to About screen...');
      this.props.navigation.navigate('About');
    }
    
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      width: '100%',
      height: '100%',
    },
    signInButton: {
      backgroundColor: "#fed66c",
      fontSize: 20,
      textAlign: "center",
      padding: 6,
      borderRadius:12,
      borderWidth: 1,
      borderColor: '#fed66c'
    },
    area: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    guestButton: {
      backgroundColor: "#999999",
      fontSize: 20,
      textAlign: "center",
      padding: 6,
      borderRadius:12,
      borderWidth: 1,
      borderColor: '#999999'
    },
    guestText: {
      backgroundColor: "#999999",
      fontSize: 20,
      textAlign: "center",
      padding: 6,
      borderRadius:12,
      borderWidth: 1,
      borderColor: '#999999',
      color: 'white',
    },
    aboutButton: {
      backgroundColor: "#B6D7AA",
      fontSize: 20,
      textAlign: "center",
      padding: 6,
      borderRadius:12,
      borderWidth: 1,
      borderColor: '#B6D7AA'

    },
  });
  
  
  export default SignInScreen;