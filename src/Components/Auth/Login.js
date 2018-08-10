import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,ScrollView,
 Navigator,TextInput,KeyboardAvoidingView,TouchableOpacity
} from 'react-native';

import { FormLabel, FormInput, Button, Header } from 'react-native-elements'
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
            <View style={{padding:10}}>
                <Button
                    raised
                    icon={{
                      name: 'login',
                      type:'material-community',
                      size: 15,
                      color: '#670093'
                    }}
                    titleStyle={{ fontWeight: "bold",fontSize:16,color:'#670093'}}
                    buttonStyle={{
                      backgroundColor: "#E6E6FA",
                      width: '100%',
                      borderColor: "transparent",
                      borderWidth: 0,
                      color:'#670093',
                      borderRadius: 4
                    }}
                    title='Login'/>
              </View>
            <View style={{padding:10}}>
                <Button
                    raised
                    icon={{
                      name: 'user-plus',
                      type:'font-awesome',
                      size: 15,
                      color: 'white'
                    }}
                    titleStyle={{ fontWeight: "bold",fontSize:16}}
                    buttonStyle={{
                      backgroundColor: "#670093",
                      width: '100%',
                      // height: 45,
                      // padding:13,
                      borderColor: "transparent",
                      borderWidth: 0,
                      borderRadius: 4
                    }}
                    title='Sign Up'/>
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
    }
});


export default connect(Login,Context)