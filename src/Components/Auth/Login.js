import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,ScrollView,
 Navigator,KeyboardAvoidingView,TouchableOpacity
} from 'react-native';

import { FormLabel, FormInput,Button, Header,SearchBar } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import logo from '../../images/logo.png'
import connect from '../HOC'
import { Context } from '../../../App'


class Login extends Component<{}> { 
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password:"",
            name:"",
            error:false,
            login:true
        }
    }

    render() {
      // const { navigate } = this.props.navigation
      return (
        <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
              {
                this.state.login ?
                <KeyboardAvoidingView behavior='position' enabled>
                    <ScrollView containerStyle={{display:'flex',flexDirection:'column',flex:1}}>
                          <View style={styles.logo}>
                              <Image source={logo} resizeMode='cover' style={styles.image} />
                          </View>
                          <View style={styles.authBox}>
                          <Text style={{color:'#a020f0',fontWeight:'bold',paddingLeft:10,fontSize:25,marginBottom:5}}>Login</Text>
                              <SearchBar 
                                  raised
                                  noIcon
                                  onChangeText={(e) => this.setState({email:e})}
                                  // icon={{ type: 'material-community', name: 'email-outline',color:'#a020f0'}}
                                  inputStyle={this.state.error ? styles.errorInput : styles.input}
                                  placeholder='Email'
                                  placeholderTextColor={ this.state.error ? 'red' : '#a020f0'}
                                  containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0}}
                              />
                              <View>
                              <SearchBar 
                                  raised
                                  noIcon
                                  onChangeText={(e) => this.setState({password:e})}
                                  // icon={{ type: 'material-community', name: 'key',color:'#a020f0',marginTop:20}}
                                  inputStyle={this.state.error ? styles.errorInput : styles.input}
                                  placeholder='Password'
                                  secureTextEntry
                                  placeholderTextColor={ this.state.error ? 'red' : '#a020f0'}
                                  containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0,marginTop:10}}
                              />
                              <Text onPress={() => console.log('forgot')} style={{color:'#a020f0',fontSize:12,marginLeft:'auto',paddingRight:10,marginBottom:10}}>Forgot Password?</Text>
                              </View>
                              <TouchableOpacity style={styles.button}>
                                  <Text style={{color:'white',fontWeight:'bold'}} onPress={() => this.props.authenticate()}>Log in</Text>
                              </TouchableOpacity>
                          </View>
                          <View style={styles.switch}>
                              <Text style={{color:'white',fontSize:18,width:'90%',textAlign:'center'}} onPress={() => this.setState({login:false})}>New User? <Text style={{textDecorationLine:'underline'}}>Sign up here</Text></Text>
                          </View>
                      </ScrollView>
                  </KeyboardAvoidingView>
                  :
                  <KeyboardAvoidingView behavior='position' enabled>
                      <ScrollView containerStyle={{display:'flex',flexDirection:'column',flex:1}}>
                          <View>
                              <View  style={styles.logo}>
                                  <Image source={logo} resizeMode='cover' style={{height:100,width:100,marginBottom:20}} />
                                  <Text style={{color:'white',textAlign:'center'}}>Change the world in your sleep with Mr. Sleepy. The alarm clock that donates a dollar to a charity of your choice when you Snooze!</Text>
                              </View>
                          </View>
                          <View style={styles.authBox2}>
                          <Text style={{color:'#a020f0',fontWeight:'bold',paddingLeft:10,fontSize:25,marginBottom:5}}>Sign up</Text>
                              <SearchBar 
                                  // raised
                                  noIcon
                                  onChangeText={(e) => this.setState({name:e})}
                                  // icon={{ type: 'material-community', name: 'email-outline',color:'#a020f0'}}
                                  inputStyle={this.state.error ? styles.errorInput : styles.input}
                                  placeholder='Name'
                                  placeholderTextColor={ this.state.error ? 'red' : '#a020f0'}
                                  containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0}}
                              />
                              <SearchBar 
                                  // raised
                                  noIcon
                                  onChangeText={(e) => this.setState({email:e})}
                                  // icon={{ type: 'material-community', name: 'email-outline',color:'#a020f0'}}
                                  inputStyle={this.state.error ? styles.errorInput : styles.input}
                                  placeholder='Email'
                                  placeholderTextColor={ this.state.error ? 'red' : '#a020f0'}
                                  containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0,marginTop:10,marginBottom:10}}
                              />
                              <SearchBar 
                                  raised
                                  noIcon
                                  onChangeText={(e) => this.setState({password:e})}
                                  // icon={{ type: 'material-community', name: 'key',color:'#a020f0',marginTop:20}}
                                  inputStyle={this.state.error ? styles.errorInput : styles.input}
                                  placeholder='Password'
                                  secureTextEntry
                                  placeholderTextColor={ this.state.error ? 'red' : '#a020f0'}
                                  containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0}}
                              />
                              <TouchableOpacity style={styles.button}>
                                  <Text style={{color:'white',fontWeight:'bold'}}>Sign up</Text>
                              </TouchableOpacity>
                              <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                                  <Text style={{color:'#a020f0',width:'90%',textAlign:'center'}}>By signing up you agree to our <Text style={{textDecorationLine:'underline'}}>Terms & Conditions</Text> and <Text style={{textDecorationLine:'underline'}}>Privacy Policy</Text></Text>
                              </View>
                          </View>
                          <View style={styles.switch}>
                              <Text style={{color:'white',fontSize:15,width:'90%',textAlign:'center'}} onPress={() => this.setState({login:true})}>Already have an account? <Text style={{textDecorationLine:'underline'}}>Login here</Text></Text>
                          </View>
                      </ScrollView>
                  </KeyboardAvoidingView>
              }
        </LinearGradient>
      );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
      flex:1,
      paddingLeft:20,
      paddingRight:20
      // justifyContent:'center',
    },
    input:{
      borderRadius:10,
      backgroundColor:'white',
      borderColor:'#a020f0',
      borderWidth:1,
      color:'#a020f0',
      height:40
    },
    errorInput:{
      borderRadius:10,
      backgroundColor:'white',
      borderColor:'red',
      borderWidth:1,
      color:'#a020f0',
      height:40
    },
    logo:{
      justifyContent:'center',
      alignItems:'center',
      flexGrow:1,
      marginTop:30
    },
    authBox:{
      padding:20,
      backgroundColor:'white',
      borderRadius:10,
      flexGrow:1,
      marginTop:50,
      marginBottom:30
    },
     authBox2:{
      padding:20,
      backgroundColor:'white',
      borderRadius:10,
      flexGrow:1,
      marginTop:30,
      marginBottom:15
    },
    button:{
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#a020f0',
      borderRadius:10,
      padding:13,
      marginTop:10,
      marginRight:9,
      marginLeft:9
    },
    image:{
      height:200,
      width:200,
    },
    switch:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexGrow:1
    }
});


export default connect(Login,Context)