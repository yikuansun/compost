import React from 'react';
import {
    AsyncStorage,
    Button,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Text,
    Linking
  } from 'react-native';
import * as Google from 'expo-google-app-auth';
//Firebase
import * as firebase from 'firebase';
import 'firebase/firestore';

import { AppContext } from '../../AppContextProvider'

import landing_bg from '../../assets/landing_bg.png';

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
              <Text style={styles.signInButton}> S I G N  I N / S I G N  U P </Text>
            </TouchableOpacity>
            <View style={{flex:0.17}} />

            <TouchableOpacity
                style={styles.guestButton}
                onPress= {() => {this.loginAsGuest();}}>
              <Text style={styles.guestText}>  G U E S T  </Text>
            </TouchableOpacity>
            <View style={{flex:0.17}} />
            
            <TouchableOpacity
                style={styles.aboutButton}
                onPress={() => {
                  this.props.navigation.navigate('Terms')
                }}>
                  <Text style={styles.aboutButton}> T E R M S  O F  U S E </Text>
            </TouchableOpacity>
            <View style={{flex:0.17}} />

            <TouchableOpacity onPress={() => Linking.openURL('http://www.GoCompost.org')}>
              <Text style={styles.websiteButton}>
                www.GoCompost.org
              </Text>
            </TouchableOpacity>
            </View>

            <View>



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
      //backgroundColor: "#fed66c",
      backgroundColor: "#f0e090",
      fontSize: 15,
      textAlign: "center",
      padding: 6,
      borderRadius:12,
      borderWidth: 1,
      borderColor: '#f0e090'
    },
    area: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    guestButton: {
      backgroundColor: "#d6c49a",
      fontSize: 15,
      textAlign: "center",
      padding: 6,
      borderRadius:12,
      borderWidth: 1,
      borderColor: '#d6c49a'
    },
    guestText: {
      backgroundColor: "#d6c49a",
      fontSize: 15,
      textAlign: "center",
      padding: 4,
      borderRadius:12,
      borderWidth: 1,
      borderColor: '#d6c49a',
      color: 'black',
    },
    aboutButton: {
      backgroundColor: "#b6c4a7",
      fontSize: 15,
      textAlign: "center",
      padding: 5,
      borderRadius:12,
      borderWidth: 1,
      borderColor: '#b6c4a7'

    },
    websiteButton: {
      color: '#526645',
      backgroundColor: "#F5F3F4",
      fontSize: 15,
      textAlign: "center",
      padding: 0,
      borderRadius:40,
      borderWidth: 0,
      borderColor: '#F5F3F4'

    },
  });
  
  
  export default SignInScreen;