import React from 'react';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import * as firebase from 'firebase';
import { AppContext } from '../../AppContextProvider'
import * as Google from 'expo-google-app-auth';
import googleSignIn from '../../assets/SignInWithGoogle.png';
import loginBackgroundImage from '../../assets/login_bg.png';

class LoginScreen extends React.Component {

    // Set the context to be used
    // Refer to React Context API: https://reactjs.org/docs/context.html#contextprovider
    // use the experimental public class fields syntax
    static contextType = AppContext;

    constructor(props) {
        super(props)
        this.state = ( {
            email: '',
            password: ''
        })

    }
    
    validateEmail(email)
    {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        {
            return (true)
        }
        return (false)
    }

    signUpUser = async(email, password, context, navigation) => {
        try {
            if (this.state.password.length < 6) {
                alert("Please enter at least 6 characters for password")
                return;
            }
            // check to make sure it is a valid email TODO
            if (!this.validateEmail(email)) {
                alert("Please enter a valid email address")
                return;
            }
            console.log(`creating user: ${email}`)
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( user => {
                // created user successfully

            
                console.log(`user created ${email}`)

                //Immediately sign in
                firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {

                    // TODO: need to be able to add user name to be similar to gmail account
                    const userInfo = {
                        //TODO: instant auth right after user creation
                        //user_id: user.user.uid,  
                        user_id: email,
                        email: email,
                        profile_picture: "",
                        first_name:  "",
                        last_name:  "",
                        name: email,
                        created_at: Date.now(),
                        last_logged_in: Date.now()
                    }
                    console.log("user signed in: " + JSON.stringify(userInfo, null, 4))
                    // add a user record into database
                    firebase.firestore()
                        .collection('users')
                        .doc(user.user.uid)
                        .set(userInfo)
                        .then(function (snapshot) {
                            console.log("write success.")
                        })
                        .catch(error => {
                            console.log("failed to save user into userInfo table.");
                        });

                    console.log('added user:' + JSON.stringify(userInfo, null, 4))
                    const { userOldInfo, setUser } = context;
                    // Set context with logged ininfo
                    setUser({loggedIn: true, userInfo: userInfo});
                    //this.props.navigation.navigate('App');
                    navigation.navigate('App');

                })
                .catch(error => {
                    alert('Failed to log in the user.');
                });

            })
            .catch( error => {
                // failed to create user
                alert("Failed to create user. Please try again. \nError:" + error.message);
            });
            }

        catch (error) {
            console.log(error.toString())
        }
    }

    loginUser = async (email, password, context, navigation) => {
        try {
            firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
                console.log("user signed in: " + JSON.stringify(user, null, 4))

                // TODO: need to be able to add user name to be similar to gmail account

                // if user document does not exist, then create first
                const userRef = firebase.firestore().collection('users').doc(user.user.uid);
                userRef.get()
                    .then((userSnapshot) => {
                        let userInfo = {};
                        if (!userSnapshot.exists) {
                                // TODO: need to be able to add user name to be similar to gmail account
                                userInfo = {
                                    //TODO: instant auth right after user creation
                                    //user_id: user.user.uid,  
                                    user_id: email,
                                    email: email,
                                    profile_picture: "",
                                    first_name:  "",
                                    last_name:  "",
                                    name: email,
                                    created_at: Date.now(),
                                    last_logged_in: Date.now()
                                }
                                console.log("user signed in: " + JSON.stringify(userInfo, null, 4))
                                
                                // add a user record into database
                                firebase.firestore()
                                .collection('users')
                                .doc(user.user.uid)
                                .set(userInfo)
                                .then(function (snapshot) {
                                    console.log("added user record.")
                                }.catch(error))
                        } else {
                            // update user last login time
                            firebase.firestore()
                                .collection('users')
                                .doc(user.user.uid)
                                .update({
                                        last_logged_in: Date.now(), 
                                })
                                                    
                            userInfo = {
                                        user_id: user.user.uid,
                                                    email: email,
                                                    profile_picture: "",
                                                    first_name: "",
                                                    last_name: "",
                                                    name: email,
                                                    last_logged_in: Date.now()
                            }
                            console.log('updated user record last_logged_in:' + JSON.stringify(userInfo, null, 4))
                    
                        }
                               
                        // Set context with logged ininfo
                        const { userOldInfo, setUser } = context;
                        setUser({loggedIn: true, userInfo: userInfo});
                        //this.props.navigation.navigate('App');
                        navigation.navigate('App');
                    }).catch(function(error) {
                        console.log(error.message);
                        alert('Login failed. Not able to connect to server.')
                      });;
            }).catch(function(error) {
                alert('Login failed. Email address is not valid.')
              });

        }
        catch (error) {
            console.log(error.toString())
        }
    }

    render() {

        return (

            <Container style={styles.container2}>
            <ImageBackground source={loginBackgroundImage} style={styles.backgroundImage} >
                <Form>

                    <Text style={{fontSize: 20, color: 'black'}}>    </Text>
                    <Text style={{fontSize: 20, color: 'black'}}>    </Text>
                    <Text style={{fontSize: 20, color: 'black'}}>   </Text>
                    <Text style={{fontSize: 20, color: 'black'}}>   </Text>
                    <Text style={{fontSize: 20, color: 'black'}}>   </Text>

                    <Item floatingLabel style={{marginLeft:50, marginRight:50, marginBottom:10}}>
                        <Label style={{fontSize: 18, color:"white" }}>EMAIL</Label>
                        <Input  style={{borderBottomColor: 'white', borderBottomWidth: 1  }}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(email)=>this.setState({email})}
                        />
                        
                    </Item>
                    <Item floatingLabel style={{marginLeft:50, marginRight:50, marginBottom:10}}>
                        <Label style={{fontSize: 18,  color:"white"}}>PASSWORD</Label>
                        <Input style={{borderBottomColor: 'white', borderBottomWidth: 1 }}
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(password)=>this.setState({password})}

                        />
                        
                    </Item>

                    <Button style={{marginTop: 30, marginBottom:0, marginLeft:48, marginRight:48, backgroundColor: "white"}} full rounded success
                        onPress={()=> this.loginUser(this.state.email, this.state.password, this.context, this.props.navigation)}
                    >
                        <Text style={{fontSize: 18, color: '#739261'}}>                   L O G  I N                    </Text>

                    </Button>
                    <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: "center", color: 'white'}}></Text>

                    <Button style={{marginTop:10, backgroundColor:"#95A778",  marginLeft:48, marginRight:48, }} full rounded primary
                        onPress={()=> this.signUpUser(this.state.email, this.state.password, this.context, this.props.navigation)}

                    >
                    <Text style={{fontSize: 18, color: 'white', }}>                    S I G N  U P                     </Text>
                    </Button>
                    <Text style={{fontSize: 22, fontWeight: 'bold', textAlign: "center", color: 'white'}}></Text>

                    {/*
                    <TouchableOpacity 
                        style={styles.googleSignInButton}
                       
                        onPress= {() => {
                            this.signInWithGoogleAsync(this.context);
                        }}>

                    <Text style={styles.googleSignInButton}>SIGN IN WITH GOOGLE</Text>
                    </TouchableOpacity>
                    */}
                    <View>

                    <TouchableOpacity onPress={()=> this.forgotPassword()} >

                    <Text style={{marginTop:20, color: 'darkblue', textAlign: "center"}}> Forgot Password?</Text>
                    </TouchableOpacity> 
                    
                    <Button style={{marginTop:30, backgroundColor:"gray",  marginLeft:120, marginRight:120 }} full rounded primary
                            onPress= {() => {this.props.navigation.navigate('Landing');}}

                    >
                            <Text style={{fontSize: 18, color: 'white', }}>BACK</Text>
                    </Button>
                    </View>

                </Form>
            </ImageBackground>
            </Container>
        )
    }

    forgotPassword = async () => {
        this.props.navigation.navigate('PasswordReset');
    }

    signInWithGoogleAsync = async (context) => {
        try {
          console.log('signInWithGoogleAsync...');
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
                            user_id: result.user.uid,
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
                        }).error(function (e) {
                            console.log("write error:" + JSON.stringify(e, null, 4))

                        });
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
                          user_id: result.user.uid,
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
                    alert('Login failed. Please check your account info.');
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
        backgroundColor: "#fff",
        justifyContent: 'center',
        padding: 0
    },
    container2: {
        //flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonImageIconStyle: {
        padding: 0,
        margin: 0,
        height: 350,
        width: 380,
        resizeMode: 'center',
    },
    buttonIconSeparatorStyle: {
        
        backgroundColor: '#fff',
        width: 1,
        height: 40,
      },
    image: {
        alignItems: 'center',
        resizeMode: "center",
        width: 400,
        height: 400
    },
    googleSignInButton: {
        backgroundColor: "#949393",
        fontSize: 17,
        textAlign: "center",
        padding: 4,
        borderRadius:20,
        borderWidth: 1,
        borderColor: '#949393',
        color: "white", 
        marginLeft:48, marginRight:48, 
      },
    backButton: {
        backgroundColor: "#cfe1e0",
        fontSize: 14,
        textAlign: "center",
        padding: 4,
        borderRadius:20,
        borderWidth: 1,
        borderColor: '#cfe1e0',
        color: "white", 
        marginLeft: 0, marginRight:0, 
      },
    backgroundImage: {
        resizeMode: 'center', // or 'stretch',
        //justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
})

export default LoginScreen;