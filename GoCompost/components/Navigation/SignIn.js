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
                onPress= {() => {this.signInWithGoogleAsync(this.context);}}
            >
              <Text style={styles.signInButton}>  GOOGLE SIGN IN  </Text>
            </TouchableOpacity>
            <View style={{flex:0.17}} />

            <TouchableOpacity
                style={styles.guestButton}
                onPress= {() => {this.loginAsGuest();}}>
              <Text style={styles.guestButton}>  ENTER as guest  </Text>
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
    signInWithGoogleAsync = async (context) => {
        try {
          const result = await Google.logInAsync({
            // behavior: "web",
            androidClientId: "1030026048519-ot7a0st94hvn8aq4ha80doc9nrofoo9r.apps.googleusercontent.com",
            iosClientId: "1030026048519-lsctp11872qacdhp6m59nbgl9qp9n7gn.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            console.log('user:' + JSON.stringify(result, null, 4));
            this.onSignIn(result, context);
            this.props.navigation.navigate('App');
            return result.accessToken;
          } else {
            // TODO
            // display login failure and let use retyß
            return { cancelled: true };
          }
        } catch (e) {
          console.log("signInWithGoogleAsync error:" + JSON.stringify(e,null,4));
          return { error: true };
        }

      //await AsyncStorage.setItem('userToken', 'abc');
    };

     onSignIn = (googleUser, context) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();

          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                //googleUser.getAuthResponse().id_token);
                googleUser.idToken,
                googleUser.accessToken);
            // Sign in with credential from the Google user.
            firebase
                .auth()
                .signInWithCredential(credential)
                .then(function(result) {
                    if (result.additionalUserInfo.isNewUser) {
                        const userInfo = {
                            email: result.user.email,
                            profile_picture: result.user.photoURL,
                            first_name: result.additionalUserInfo.profile.given_name,
                            last_name: result.additionalUserInfo.profile.family_name,
                            name: result.additionalUserInfo.profile.name,
                            created_at: Date.now(),
                            last_logged_in: Date.now()
                        }
                        // add a user record into database
                        firebase.firestore()
                        .collection('users')
                        .doc(result.user.uid)
                        .set(userInfo)
                        .then(function (snapshot) {
                            console.log("write success.")
                        })
                        /*.error(function (e) {
                            console.log("write error:" + JSON.stringify(e, null, 4))

                        });*/
                        console.log('added user:' + JSON.stringify(userInfo, null, 4))
                        const { user, setUser } = context;
                        // Set context with logged ininfo
                        setUser({loggedIn: true, userInfo: userInfo});
                    } else {
                        // update user last login time
                        firebase.firestore()
                        .collection('users')
                        .doc(result.user.uid)
                        .update({
                            last_logged_in: Date.now(), 
                        })
                        const userInfo = {
                          email: result.user.email,
                          profile_picture: result.user.photoURL,
                          first_name: result.additionalUserInfo.profile.given_name,
                          last_name: result.additionalUserInfo.profile.family_name,
                          name: result.additionalUserInfo.profile.name,
                          last_logged_in: Date.now()
                        }
                        console.log('updated user last_logged_in:' + JSON.stringify(userInfo, null, 4))
                        
                        // Set context with logged ininfo
                        const { user, setUser } = context;
                        setUser({loggedIn: true, userInfo: userInfo});

                    }
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                    console.log('onSignIn error:' + JSON.stringify(error));
                });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this));
      }

      isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.user.uid) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
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
      padding: 6
    },
    area: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    guestButton: {
      backgroundColor: "#efefef",
      fontSize: 20,
      textAlign: "center",
      padding: 6

    },
    aboutButton: {
      backgroundColor: "#cfe1e0",
      fontSize: 20,
      textAlign: "center",
      padding: 6

    },
  });
  
  
  export default SignInScreen;