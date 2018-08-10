import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,ScrollView,
 Navigator,TextInput,KeyboardAvoidingView,TouchableOpacity
} from 'react-native';

import { FormLabel, FormInput,Button, Header } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import connect from '../HOC'
import {  Context } from '../../../App'


class Login extends Component<{}> { 
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password:"",
            error:false
        }
    }


    render() {
      // const { navigate } = this.props.navigation
      return (
        <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
            <View style={styles.authBox}>
                <Text style={styles.label}>Email</Text>
                <TextInput placeholder='Enter Email' style={styles.input} />
                <View style={styles.forgot}>
                    <Text style={styles.label}>Password</Text>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </View>
                <TextInput placeholder='Enter Password' type='secureTextEntry' style={styles.input} />                
            </View>
            <View style={{paddingLeft:20,paddingRight:20}}>
                  <TouchableOpacity style={styles.button2}>
                      <Text style={{color:'#670093',fontWeight:'bold'}}>Login</Text>
                  </TouchableOpacity>
              </View>
              <View style={{padding:20}}>
                  <TouchableOpacity style={styles.button}>
                      <Text style={{color:'white',fontWeight:'bold'}}>Sign Up</Text>
                  </TouchableOpacity>
              </View>
        </LinearGradient>
      );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
      flex:1,
      justifyContent:'center',
    },
    authBox:{
      padding:20
    },
    forgot:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    forgotText:{
      marginLeft:'auto',
      color:'white',
      fontSize:12,
    },
    label:{
      color:'white',
      fontSize:13,
      fontWeight:'bold',
      paddingBottom:5,
      paddingTop:10
    },
    labelSign:{
      color:'white',
      fontSize:11,
      fontWeight:'bold',
      paddingBottom:5,
      paddingTop:10
    },
    signup:{
      fontSize:13
    },
    input:{
        padding:15,
        backgroundColor:'white',
        borderRadius:4,
        color:'#a020f0'
    },
    button:{
      borderRadius:4,
      backgroundColor:'#670093',
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      padding:15
    },
    button2:{
      backgroundColor:'#E6E6FA',
      borderRadius:4,
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      padding:15
    }
});


export default connect(Login,Context)