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

// <View style={styles.authBox}>
//                 <Text style={styles.label}>Email</Text>
//                 <TextInput placeholder='Enter Email' style={styles.input} />
//                 <View style={styles.forgot}>
//                     <Text style={styles.label}>Password</Text>
//                     <Text style={styles.forgotText}>Forgot Password?</Text>
//                 </View>
//                 <TextInput placeholder='Enter Password' type='secureTextEntry' style={styles.input} />                
//             </View>
//             <View style={{paddingLeft:20,paddingRight:20}}>
//                   <TouchableOpacity style={styles.button2}>
//                       <Text style={{color:'#670093',fontWeight:'bold'}}>Login</Text>
//                   </TouchableOpacity>
//               </View>
//               <View style={{padding:20}}>
//                   <TouchableOpacity style={styles.button}>
//                       <Text style={{color:'white',fontWeight:'bold'}}>Sign Up</Text>
//                   </TouchableOpacity>
//               </View>
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
                                  // raised
                                  noIcon
                                  onChangeText={(e) => this.setState({email:e})}
                                  // icon={{ type: 'material-community', name: 'email-outline',color:'#a020f0'}}
                                  inputStyle={{borderRadius:10,backgroundColor:'white',borderColor:'#a020f0',borderWidth:1,color:'#a020f0',height:40}}
                                  placeholder='Email'
                                  placeholderTextColor='#a020f0'
                                  containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0}}
                              />
                              <SearchBar 
                                  raised
                                  noIcon
                                  onChangeText={(e) => this.setState({password:e})}
                                  // icon={{ type: 'material-community', name: 'key',color:'#a020f0',marginTop:20}}
                                  inputStyle={{borderRadius:10,backgroundColor:'white',borderColor:'#a020f0',borderWidth:1,color:'#a020f0',height:40}}
                                  placeholder='Password'
                                  secureTextEntry
                                  placeholderTextColor='#a020f0'
                                  containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0,marginTop:10,marginBottom:10}}
                              />
                              <TouchableOpacity style={styles.button}>
                                  <Text style={{color:'white'}} onPress={() => this.props.authenticate()}>Log in</Text>
                              </TouchableOpacity>
                          </View>
                          <View style={styles.switch}>
                              <Text style={{color:'white',fontSize:18,width:'90%',textAlign:'center'}} onPress={() => this.setState({login:false})}>New User? Sign up here</Text>
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
                                  inputStyle={{borderRadius:10,backgroundColor:'white',borderColor:'#a020f0',borderWidth:1,color:'#a020f0',height:40}}
                                  placeholder='Name'
                                  placeholderTextColor='#a020f0'
                                  containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0}}
                              />
                              <SearchBar 
                                  // raised
                                  noIcon
                                  onChangeText={(e) => this.setState({email:e})}
                                  // icon={{ type: 'material-community', name: 'email-outline',color:'#a020f0'}}
                                  inputStyle={{borderRadius:10,backgroundColor:'white',borderColor:'#a020f0',borderWidth:1,color:'#a020f0',height:40}}
                                  placeholder='Email'
                                  placeholderTextColor='#a020f0'
                                  containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0,marginTop:10,marginBottom:10}}
                              />
                              <SearchBar 
                                  raised
                                  noIcon
                                  onChangeText={(e) => this.setState({password:e})}
                                  // icon={{ type: 'material-community', name: 'key',color:'#a020f0',marginTop:20}}
                                  inputStyle={{borderRadius:10,backgroundColor:'white',borderColor:'#a020f0',borderWidth:1,color:'#a020f0',height:40}}
                                  placeholder='Password'
                                  secureTextEntry
                                  placeholderTextColor='#a020f0'
                                  containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0}}
                              />
                              <TouchableOpacity style={styles.button}>
                                  <Text style={{color:'white'}}>Sign up</Text>
                              </TouchableOpacity>
                          </View>
                          <View style={styles.switch}>
                              <Text style={{color:'white',fontSize:18,width:'90%',textAlign:'center'}} onPress={() => this.setState({login:true})}>Already have an account? Login here</Text>
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
      marginBottom:50
    },
     authBox2:{
      padding:20,
      backgroundColor:'white',
      borderRadius:10,
      flexGrow:1,
      marginTop:30,
      marginBottom:50
    },
    button:{
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#a020f0',
      borderRadius:10,
      padding:13,
      marginTop:10
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