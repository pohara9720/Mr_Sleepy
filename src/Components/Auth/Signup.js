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



class Signup extends Component<{}> { 
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password:"",
            error:false
        }
    }


    render() {
        const { navigate } = this.props.navigation
        return (
            <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                <Text>Name</Text>
                <TextInput />
                <Text>Email</Text>
                <TextInput />
                <Text>Password</Text>
                <TextInput />
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    linearGradient: {
      flex:1
    }
});


export default connect(Signup,Context)